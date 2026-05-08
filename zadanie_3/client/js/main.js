import { Network } from './network.js';
import { Game } from './game.js';

const $ = id => document.getElementById(id);
let config = null;

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  $(id).classList.add('active');
}

function toast(msg, duration = 3200) {
  const el = $('toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove('show'), duration);
}

function showOverlay(title, body, buttons) {
  $('overlay-title').textContent = title;
  $('overlay-body').innerHTML = body;
  const row = $('overlay-btns');
  row.innerHTML = '';
  buttons.forEach(({ label, cls, action }) => {
    const b = document.createElement('button');
    b.className = `btn ${cls}`;
    b.textContent = label;
    b.addEventListener('click', action);
    row.appendChild(b);
  });
  $('overlay').classList.add('visible');
}
function hideOverlay() { $('overlay').classList.remove('visible'); }

// top bar menu update
function updateHUD() {
  const { playerIndex, yourName, opponentName, currentPlayer, stonesThrown, paused } = appState;
  const spp = config.stonesPerPlayer;

  const name0 = playerIndex === 0 ? yourName : opponentName;
  const name1 = playerIndex === 1 ? yourName : opponentName;
  $('hud-name-p1').textContent = name0;
  $('hud-name-p2').textContent = name1;

  $('hud-avatar-p1').classList.toggle('active', currentPlayer === 0);
  $('hud-avatar-p2').classList.toggle('active', currentPlayer === 1);

  const isMyTurn = currentPlayer === playerIndex;
  $('hud-status').textContent   = paused ? '⏸ PAUZA' : (isMyTurn ? 'Si na ťahu' : 'Súper je na ťahu…');
  $('hud-turn').textContent     = paused
    ? 'Hra je pozastavená'
    : `Na rade: ${currentPlayer === playerIndex ? yourName : opponentName}`;

  [0, 1].forEach(globalPi => {
    const el = $(`dots-p${globalPi + 1}`);
    el.innerHTML = '';
    const thrown = stonesThrown[globalPi] || 0;
    for (let i = 0; i < spp; i++) {
      const d = document.createElement('div');
      d.className = 'stone-dot' + (i < thrown ? ' used' : ` p${globalPi + 1}`);
      el.appendChild(d);
    }
  });
}

// app state
let net  = null;
let game = null;
const appState = {
  playerIndex:  null,
  yourName:     '',
  opponentName: '',
  currentPlayer: 0,
  stonesThrown: [0, 0],
  paused:    false,
  gameOver:  false,
};

// config
async function loadConfig() {
  const res = await fetch('config.json');
  config = await res.json();
}

// network message handler
function handleMessage(msg) {
  switch (msg.type) {

    case 'waiting':
      showScreen('screen-waiting');
      $('waiting-name').textContent = appState.yourName;
      break;

    case 'game_start':
      appState.playerIndex   = msg.playerIndex;
      appState.opponentName  = msg.opponentName;
      appState.yourName      = msg.yourName;
      appState.currentPlayer = msg.currentPlayer;
      appState.stonesThrown  = [0, 0];
      appState.paused   = false;
      appState.gameOver = false;
      hideOverlay();
      startGame();
      break;

    case 'shoot':
      // Both clients receive this and simulate the same shot
      game.shoot(msg.playerIndex, msg.vx, msg.vy);
      appState.stonesThrown[msg.playerIndex]++;
      updateHUD();
      break;

    case 'turn_change':
      appState.currentPlayer = msg.currentPlayer;
      appState.stonesThrown  = msg.stonesThrown;
      game.setCanShoot(appState.currentPlayer === appState.playerIndex);
      updateHUD();
      // Check if all stones are thrown
      maybeEndGame();
      break;

    case 'paused':
      appState.paused = true;
      game.setPaused(true);
      $('btn-pause').textContent = '▶ Pokračovať';
      updateHUD();
      if (msg.by !== appState.playerIndex) toast(`${msg.byName} pozastavil hru`);
      break;

    case 'resumed':
      appState.paused = false;
      game.setPaused(false);
      $('btn-pause').textContent = '⏸ Pauza';
      updateHUD();
      hideOverlay();
      break;

    case 'game_over':
      appState.gameOver = true;
      if (game) game.gameOver = true;
      showResult(msg.winner, msg.winnerName, msg.best);
      break;

    case 'restart_requested':
      showOverlay(
        'Reštart?',
        `<strong>${msg.byName}</strong> navrhuje reštartovať hru. Súhlasíš?`,
        [
          { label: 'Áno', cls: 'btn-primary',   action: () => { net.send({ type: 'restart_request' }); hideOverlay(); } },
          { label: 'Nie', cls: 'btn-secondary',  action: () => { net.send({ type: 'restart_decline' }); hideOverlay(); } },
        ]
      );
      break;

    case 'restart':
      hideOverlay();
      appState.stonesThrown  = [0, 0];
      appState.currentPlayer = msg.currentPlayer;
      appState.paused   = false;
      appState.gameOver = false;
      game.reset();
      game.setCanShoot(appState.currentPlayer === appState.playerIndex);
      $('btn-pause').textContent = '⏸ Pauza';
      updateHUD();
      const starterName = msg.currentPlayer === appState.playerIndex ? 'Ty začínaš' : `Začína ${appState.opponentName}`;
      toast(`Nová hra! ${starterName}.`);
      break;

    case 'restart_waiting':
      toast('Čakám na súhlas súpera…');
      break;

    case 'restart_declined':
      hideOverlay();
      toast('Súper odmietol reštart.');
      break;

    case 'restart_declined_moving':
      toast('Počkaj kým sa kamene zastavia!');
      break;

    case 'opponent_disconnected':
      showOverlay(
        'Súper odišiel',
        `${msg.name || 'Súper'} prerušil spojenie.`,
        [{ label: 'Hlavné menu', cls: 'btn-primary', action: returnToMenu }]
      );
      break;

    case '_disconnected':
      if (!appState.gameOver) {
        showOverlay(
          'Spojenie bolo prerušené',
          'Stratil som spojenie so serverom.',
          [{ label: 'Hlavné menu', cls: 'btn-primary', action: returnToMenu }]
        );
      }
      break;
  }
}

// game loop
function startGame() {
  showScreen('screen-game');
  if (game) game.destroy();

  const canvas = $('game-canvas');
  game = new Game(canvas, config, appState.playerIndex, onAllStopped);

  game.onShoot = (vx, vy) => {
    if (appState.currentPlayer !== appState.playerIndex) return;
    if (!game.allStonesStopped || appState.paused || appState.gameOver) return;
    net.send({ type: 'shoot', vx, vy });
  };

  game.setCanShoot(appState.currentPlayer === appState.playerIndex);
  updateHUD();
}

function onAllStopped() {
  if (appState.currentPlayer === appState.playerIndex) {
    net.send({ type: 'all_stopped' });
  }
  maybeEndGame();
}

function maybeEndGame() {
  const spp = config.stonesPerPlayer;
  if (
    appState.stonesThrown[0] >= spp &&
    appState.stonesThrown[1] >= spp &&
    game && game.allStonesStopped &&
    !appState.gameOver
  ) {
    appState.gameOver = true;
    game.gameOver = true;

    if (appState.playerIndex === 0) {
      const result = game.computeResult();
      const p0name = appState.yourName;
      const p1name = appState.opponentName;
      const winnerName = result.winner === 0 ? p0name : result.winner === 1 ? p1name : null;
      net.send({ type: 'game_over', winner: result.winner, winnerName, best: result.best });
    }
  }
}

function showResult(winner, winnerName, best) {
  const isMe  = winner === appState.playerIndex;
  const isTie = winner === -1;

  const targetR = config.target.radius;
  const myRaw  = best ? best[appState.playerIndex]       : null;
  const oppRaw = best ? best[1 - appState.playerIndex]   : null;

  function fmtDist(v) {
    if (v === null || v === undefined || !isFinite(v)) return 'žiadny kameň';
    if (v <= targetR * 0.25) return `v strede (${v.toFixed(0)}px)`;
    if (v <= targetR)        return `v terči (${v.toFixed(0)}px)`;
    return `najbližší kameň (${v.toFixed(0)}px)`;
  }

  const title = isTie ? 'REMÍZA!' : isMe ? 'VYHRAL SI!' : 'PREHRAL SI';
  const body  = isTie
    ? `Obaja máte najbližší kameň rovnako ďaleko od stredu!<br><br>
       <small>Tvoj ${fmtDist(myRaw)}<br>Súperov ${fmtDist(oppRaw)}</small>`
    : `<strong>${winnerName || '?'}</strong> má najbližší kameň k stredu.<br><br>
       <small>Tvoj ${fmtDist(myRaw)}<br>Súperov ${fmtDist(oppRaw)}</small>`;

  showOverlay(title, body, [
    { label: '↺ Hrať znova', cls: 'btn-primary',   action: () => { net.send({ type: 'restart_request' }); } },
    { label: 'Hlavné menu',  cls: 'btn-secondary',  action: returnToMenu },
  ]);
}

function returnToMenu() {
  if (net)  { net.disconnect();  net  = null; }
  if (game) { game.destroy();    game = null; }
  hideOverlay();
  showScreen('screen-menu');
}

// top bar buttons
$('btn-pause').addEventListener('click', () => {
  if (!net || !game) return;
  net.send({ type: appState.paused ? 'resume' : 'pause' });
});

$('btn-restart-req').addEventListener('click', () => {
  if (!net) return;
  if (game && !game.allStonesStopped && !appState.gameOver) {
    toast('⚠️ Počkaj kým sa kamene zastavia!');
    return;
  }
  net.send({ type: 'restart_request' });
  toast('Čakám na súhlas súpera…');
});

// menu buttons
$('btn-play').addEventListener('click',       () => showScreen('screen-join'));
$('btn-rules').addEventListener('click',      () => showScreen('screen-rules'));
$('btn-rules-back').addEventListener('click', () => showScreen('screen-menu'));
$('btn-join-back').addEventListener('click',  () => showScreen('screen-menu'));

$('btn-join-submit').addEventListener('click', joinGame);
$('input-name').addEventListener('keydown', e => { if (e.key === 'Enter') joinGame(); });

$('btn-waiting-cancel').addEventListener('click', () => {
  if (net) { net.disconnect(); net = null; }
  showScreen('screen-menu');
});

async function joinGame() {
  const name = $('input-name').value.trim();
  if (!name) { toast('Zadaj prezývku!'); $('input-name').focus(); return; }
  appState.yourName = name;
  try {
    net = new Network(handleMessage);
    await net.connect();
    net.send({ type: 'join', name });
  } catch {
    toast('Nepodarilo sa pripojiť k serveru!');
    net = null;
  }
}

// init
// debug
//window.dbg = { getNet: () => net, getGame: () => game, getState: () => appState, sendRestart: () => net && net.send({ type: 'restart_request' }) };
await loadConfig();
showScreen('screen-menu');