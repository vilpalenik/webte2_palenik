const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static('/var/www/node75.webte.fei.stuba.sk/zadanie3'))

const waiting = [];
const rooms = new Map();
let roomCounter = 0;

function send(ws, obj) {
  if (ws.readyState === WebSocket.OPEN) ws.send(JSON.stringify(obj));
}

function broadcast(room, obj) {
  const msg = JSON.stringify(obj);
  room.players.forEach(p => {
    if (p.ws.readyState === WebSocket.OPEN) p.ws.send(msg);
  });
}

function createRoom(p1, p2) {
  const id = `r${++roomCounter}`;
  const room = {
    id,
    players: [
      { ws: p1.ws, name: p1.name },
      { ws: p2.ws, name: p2.name },
    ],
    currentPlayer: 0,
    firstPlayer: 0,
    stonesThrown: [0, 0],
    allStopped: true,
    paused: false,
    gameOver: false,
    votes: new Set(),
  };
  rooms.set(id, room);
  p1.ws._rid = id; p1.ws._idx = 0;
  p2.ws._rid = id; p2.ws._idx = 1;

  send(p1.ws, { type: 'game_start', playerIndex: 0, yourName: p1.name, opponentName: p2.name, currentPlayer: 0 });
  send(p2.ws, { type: 'game_start', playerIndex: 1, yourName: p2.name, opponentName: p1.name, currentPlayer: 0 });
  console.log(`Room ${id}: ${p1.name} vs ${p2.name}`);
}

wss.on('connection', ws => {
  ws._rid = null;
  ws._idx = null;

  ws.on('message', raw => {
    let msg;
    try { msg = JSON.parse(raw); } catch { return; }

    // join
    if (msg.type === 'join') {
      const name = (msg.name || 'Hráč').trim().slice(0, 20);
      ws._name = name;
      if (waiting.length > 0) {
        createRoom(waiting.shift(), { ws, name });
      } else {
        waiting.push({ ws, name });
        send(ws, { type: 'waiting' });
      }
      return;
    }

    const room = rooms.get(ws._rid);
    const me = ws._idx;
    if (room === undefined || me === null) {
      console.log(`No room for type=${msg.type} rid=${ws._rid}`);
      return;
    }

    if (msg.type === 'shoot') {
      if (room.paused || room.gameOver || !room.allStopped) return;
      if (room.currentPlayer !== me) return;
      room.allStopped = false;
      room.stonesThrown[me]++;
      broadcast(room, { type: 'shoot', playerIndex: me, vx: msg.vx, vy: msg.vy });
      return;
    }

    if (msg.type === 'all_stopped') {
      if (room.allStopped) return;
      room.allStopped = true;
      room.currentPlayer = 1 - room.currentPlayer;
      broadcast(room, { type: 'turn_change', currentPlayer: room.currentPlayer, stonesThrown: room.stonesThrown });
      return;
    }

    if (msg.type === 'game_over') {
      if (room.gameOver) return;
      room.gameOver = true;
      broadcast(room, { type: 'game_over', winner: msg.winner, winnerName: msg.winnerName, best: msg.best });
      return;
    }

    if (msg.type === 'pause') {
      if (room.gameOver || room.paused) return;
      room.paused = true;
      broadcast(room, { type: 'paused', by: me, byName: room.players[me].name });
      return;
    }

    if (msg.type === 'resume') {
      if (!room.paused) return;
      room.paused = false;
      broadcast(room, { type: 'resumed' });
      return;
    }

    if (msg.type === 'restart_request') {
      if (!room.allStopped && !room.gameOver) {
        send(ws, { type: 'restart_blocked' });
        return;
      }
      room.votes.add(me);
      console.log(`Restart votes in ${room.id}: [${[...room.votes]}]`);
      if (room.votes.size === 1) {
        // Notify opponent
        send(room.players[1 - me].ws, { type: 'restart_requested', byName: room.players[me].name });
        send(ws, { type: 'restart_waiting' });
      }
      if (room.votes.size >= 2) {
        room.firstPlayer = 1 - room.firstPlayer;
        room.currentPlayer = room.firstPlayer;
        room.stonesThrown = [0, 0];
        room.allStopped = true;
        room.paused = false;
        room.gameOver = false;
        room.votes = new Set();
        broadcast(room, { type: 'restart', currentPlayer: room.currentPlayer });
        console.log(`Room ${room.id} restarted, currentPlayer=${room.currentPlayer}`);
      }
      return;
    }

    if (msg.type === 'restart_decline') {
      room.votes.clear();
      broadcast(room, { type: 'restart_declined' });
      return;
    }
  });

  ws.on('close', () => {
    const i = waiting.findIndex(p => p.ws === ws);
    if (i !== -1) waiting.splice(i, 1);
    const room = rooms.get(ws._rid);
    if (room) {
      broadcast(room, { type: 'opponent_disconnected', name: ws._name });
      rooms.delete(ws._rid);
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Curling server on http://localhost:${PORT}`));