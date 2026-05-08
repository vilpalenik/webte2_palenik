// network.js — WebSocket wrapper

export class Network {
  constructor(onMessage) {
    this.ws = null;
    this.onMessage = onMessage;
    this.connected = false;
  }

  connect() {
    return new Promise((resolve, reject) => {
      const protocol = location.protocol === 'https:' ? 'wss' : 'ws';
      // local ws://localhost:3000/ — server: wss://host/ws/
      const path = location.hostname === 'localhost' ? '/' : '/ws/';
      const url = `${protocol}://${location.host}${path}`;
      this.ws = new WebSocket(url);

      this.ws.onopen = () => {
        this.connected = true;
        resolve();
      };

      this.ws.onerror = (e) => {
        reject(new Error('WebSocket connection failed'));
      };

      this.ws.onmessage = (e) => {
        try {
          const msg = JSON.parse(e.data);
          console.log('[WS IN]', msg.type, msg);
          this.onMessage(msg);
        } catch {}
      };

      this.ws.onclose = () => {
        this.connected = false;
        this.onMessage({ type: '_disconnected' });
      };
    });
  }

  send(obj) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(obj));
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.onclose = null; // suppress disconnect event
      this.ws.close();
      this.ws = null;
      this.connected = false;
    }
  }
}