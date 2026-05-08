// game.js — Matter.js physics + Canvas rendering

const { Engine, Bodies, Body, World } = Matter;

if (!CanvasRenderingContext2D.prototype.roundRect) {
  CanvasRenderingContext2D.prototype.roundRect = function(x, y, w, h, r) {
    r = Math.min(r, w / 2, h / 2);
    this.moveTo(x + r, y);
    this.arcTo(x + w, y, x + w, y + h, r);
    this.arcTo(x + w, y + h, x, y + h, r);
    this.arcTo(x, y + h, x, y, r);
    this.arcTo(x, y, x + w, y, r);
    this.closePath();
  };
}

export class Game {
  constructor(canvas, config, playerIndex, onAllStopped) {
    this.canvas = canvas;
    this.cfg = config;
    this.playerIndex = playerIndex;
    this.onAllStopped = onAllStopped;

    this.scale = 1;
    this.engine = Engine.create({ gravity: { x: 0, y: 0 } });
    this.world = this.engine.world;

    this.stones = [];
    this.isPaused = false;
    this.gameOver = false;
    this.allStonesStopped = true;
    this._canShoot = true;

    this._animId = null;
    this._lastTime = 0;
    this._stoppedTimer = 0;

    this._dragging = false;
    this._dragStart = null;
    this._mousePos = null;

    this._setupWalls();
    this._setupInput();
 
    this._onResize = () => this._resize();
    window.addEventListener('resize', this._onResize);
    this._resize();
    this._startLoop();
  }

  // resize canvas
  _resize() {
    const wrapper = this.canvas.parentElement;
    if (!wrapper) return;
    const ww = wrapper.clientWidth  || window.innerWidth;
    const wh = wrapper.clientHeight || (window.innerHeight - 80);
    if (ww === 0 || wh === 0) return;

    const bw = this.cfg.board.width;
    const bh = this.cfg.board.height;
    this.scale = Math.min(ww / bw, wh / bh) * 0.98;

    this.canvas.width  = Math.round(bw * this.scale);
    this.canvas.height = Math.round(bh * this.scale);
  }

  // walls around
  _setupWalls() {
    const { width: W, height: H } = this.cfg.board;
    const T = 60;
    const opts = { isStatic: true, restitution: 0.65, friction: 0, frictionAir: 0, label: 'wall' };
    World.add(this.world, [
      Bodies.rectangle(W / 2,      -T / 2,     W + T * 2, T, opts),
      Bodies.rectangle(W / 2,  H + T / 2,      W + T * 2, T, opts),
      Bodies.rectangle(-T / 2,     H / 2,  T,  H + T * 2, opts),
      Bodies.rectangle(W + T / 2,  H / 2,  T,  H + T * 2, opts),
    ]);
  }

  // spawn new stone for player
  spawnStone(pIdx) {
    const { x, y } = this.cfg.startZone;
    const body = Bodies.circle(x, y, this.cfg.stone.radius, {
      restitution: this.cfg.stone.restitution,
      friction: 0,
      frictionAir: this.cfg.stone.frictionAir,
      density: this.cfg.stone.density,
      label: `stone_${pIdx}`,
    });
    body._playerIndex = pIdx;
    World.add(this.world, body);
    this.stones.push({ body, playerIndex: pIdx });
    return body;
  }

  shoot(pIdx, vx, vy) {
    const stone = this.spawnStone(pIdx);
    Body.setVelocity(stone, { x: vx, y: vy });
    this.allStonesStopped = false;
    this._stoppedTimer = 0;
  }

  // input handling for shooting
  _setupInput() {
    this.canvas.addEventListener('mousedown',  e => this._onDown(e.clientX, e.clientY));
    this.canvas.addEventListener('mousemove',  e => this._onMove(e.clientX, e.clientY));
    this.canvas.addEventListener('mouseup',    e => this._onUp(e.clientX, e.clientY));
    this.canvas.addEventListener('mouseleave', () => { this._dragging = false; });

    this.canvas.addEventListener('touchstart', e => {
      e.preventDefault();
      this._onDown(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: false });
    this.canvas.addEventListener('touchmove', e => {
      e.preventDefault();
      this._onMove(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: false });
    this.canvas.addEventListener('touchend', e => {
      const t = e.changedTouches[0];
      this._onUp(t.clientX, t.clientY);
    });
  }

  _toLogical(clientX, clientY) {
    const rect = this.canvas.getBoundingClientRect();
    return {
      x: (clientX - rect.left)  / this.scale,
      y: (clientY - rect.top)   / this.scale,
    };
  }

  _nearStart(pos) {
    const { x, y } = this.cfg.startZone;
    const r = this.cfg.stone.radius * 3;
    return Math.hypot(pos.x - x, pos.y - y) < r;
  }

  _onDown(cx, cy) {
    if (this.isPaused || this.gameOver || !this.allStonesStopped || !this._canShoot) return;
    const pos = this._toLogical(cx, cy);
    if (!this._nearStart(pos)) return;
    this._dragging  = true;
    this._dragStart = { x: this.cfg.startZone.x, y: this.cfg.startZone.y };
    this._mousePos  = pos;
  }

  _onMove(cx, cy) {
    if (!this._dragging) return;
    this._mousePos = this._toLogical(cx, cy);
  }

  _onUp(cx, cy) {
    if (!this._dragging) return;
    this._dragging = false;
    this._fireShot(this._dragStart, this._mousePos);
    this._mousePos = null;
  }

  _fireShot(anchor, mousePos) {
    if (!mousePos) return;
    const dx = anchor.x - mousePos.x;
    const dy = anchor.y - mousePos.y;
    const dist = Math.hypot(dx, dy);
    if (dist < 5) return;

    const maxPull = this.cfg.maxPullDistance;
    const ratio   = Math.min(dist / maxPull, 1);
    const force   = this.cfg.minShotForce + ratio * (this.cfg.maxShotForce - this.cfg.minShotForce);
    const nx = dx / dist;
    const ny = dy / dist;
    const vx = nx * force * 1000;
    const vy = ny * force * 1000;

    if (this.onShoot) this.onShoot(vx, vy);
  }

  // loop
  _startLoop() {
    const FIXED_DT = 1000 / 60;
    let accumulator = 0;

    const loop = (ts) => {
      this._animId = requestAnimationFrame(loop);
      const elapsed = this._lastTime ? Math.min(ts - this._lastTime, 64) : FIXED_DT;
      this._lastTime = ts;

      if (!this.isPaused) {
        accumulator += elapsed;
        while (accumulator >= FIXED_DT) {
          Engine.update(this.engine, FIXED_DT);
          this._checkStopped(FIXED_DT);
          accumulator -= FIXED_DT;
        }
      }
      this._draw();
    };
    this._animId = requestAnimationFrame(loop);
  }

  _checkStopped(dt) {
    if (this.allStonesStopped || this.stones.length === 0) return;
    const THR = 0.07;
    const allStop = this.stones.every(({ body }) =>
      Math.abs(body.velocity.x) < THR && Math.abs(body.velocity.y) < THR
    );
    if (allStop) {
      this._stoppedTimer += dt;
      if (this._stoppedTimer > 500) {
        this.stones.forEach(({ body }) => Body.setVelocity(body, { x: 0, y: 0 }));
        this.allStonesStopped = true;
        this._stoppedTimer = 0;
        if (this.onAllStopped) this.onAllStopped();
      }
    } else {
      this._stoppedTimer = 0;
    }
  }

  // drawing game state
  _draw() {
    const ctx = this.canvas.getContext('2d');
    const s   = this.scale;
    const W   = this.cfg.board.width  * s;
    const H   = this.cfg.board.height * s;
    const cfg = this.cfg;

    if (W === 0 || H === 0) return;

    // ice background
    ctx.fillStyle = '#b8d4e8';
    ctx.fillRect(0, 0, W, H);

    // lane lines
    ctx.strokeStyle = 'rgba(255,255,255,0.15)';
    ctx.lineWidth = 1;
    for (let i = 1; i < 10; i++) {
      ctx.beginPath();
      ctx.moveTo(0, H / 10 * i);
      ctx.lineTo(W, H / 10 * i);
      ctx.stroke();
    }

    // hog line
    const hogX = cfg.startZone.x * 1.7 * s;
    ctx.save();
    ctx.strokeStyle = 'rgba(220,50,50,0.4)';
    ctx.lineWidth = 3;
    ctx.setLineDash([10 * s, 6 * s]);
    ctx.beginPath(); ctx.moveTo(hogX, 0); ctx.lineTo(hogX, H); ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();

    // center line
    ctx.strokeStyle = 'rgba(255,255,255,0.18)';
    ctx.lineWidth = 1;
    ctx.setLineDash([10 * s, 7 * s]);
    ctx.beginPath(); ctx.moveTo(0, H / 2); ctx.lineTo(W, H / 2); ctx.stroke();
    ctx.setLineDash([]);

    // target rings
    const tx = cfg.target.x * s;
    const ty = cfg.target.y * s;
    const tr = cfg.target.radius * s;
    const ringColors = ['#1a3a5c', '#ffffff', '#cc2222', '#ffffff'];
    for (let i = ringColors.length - 1; i >= 0; i--) {
      ctx.beginPath();
      ctx.arc(tx, ty, tr * (i + 1) / ringColors.length, 0, Math.PI * 2);
      ctx.fillStyle = ringColors[i];
      ctx.fill();
    }
    ctx.beginPath();
    ctx.arc(tx, ty, tr, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255,255,255,0.5)';
    ctx.lineWidth = 2;
    ctx.stroke();
    // middle dot
    ctx.beginPath();
    ctx.arc(tx, ty, 4 * s, 0, Math.PI * 2);
    ctx.fillStyle = '#fff';
    ctx.fill();

    // start zone
    const szx = cfg.startZone.x * s;
    const szy = cfg.startZone.y * s;
    const szr = cfg.stone.radius * s;
    ctx.beginPath();
    ctx.arc(szx, szy, szr * 1.8, 0, Math.PI * 2);
    ctx.strokeStyle = this.playerIndex === 0
      ? 'rgba(231,76,60,0.6)' : 'rgba(41,128,185,0.6)';
    ctx.lineWidth = 2;
    ctx.setLineDash([5 * s, 4 * s]);
    ctx.stroke();
    ctx.setLineDash([]);

    // aim indicator
    if (this._dragging && this._dragStart && this._mousePos) {
      const sx = this._dragStart.x * s;
      const sy = this._dragStart.y * s;
      const mx = this._mousePos.x  * s;
      const my = this._mousePos.y  * s;
      const pullX = mx - sx;
      const pullY = my - sy;
      const dist = Math.hypot(pullX, pullY);
      const maxPull = cfg.maxPullDistance * s;
      const ratio = Math.min(dist / maxPull, 1);
      const ex = sx - (pullX / (dist || 1)) * maxPull * ratio;
      const ey = sy - (pullY / (dist || 1)) * maxPull * ratio;

      // force bar
      const bw = 70 * s, bh = 7 * s;
      const bx = szx - bw / 2, by = szy + szr * 2.6;
      ctx.fillStyle = 'rgba(0,0,0,0.45)';
      ctx.beginPath(); ctx.roundRect(bx, by, bw, bh, 3); ctx.fill();
      const fc = ratio < 0.45 ? '#2ecc71' : ratio < 0.75 ? '#f39c12' : '#e74c3c';
      ctx.fillStyle = fc;
      ctx.beginPath(); ctx.roundRect(bx, by, bw * ratio, bh, 3); ctx.fill();

      // direction line
      ctx.beginPath();
      ctx.moveTo(szx, szy);
      ctx.lineTo(ex, ey);
      const grad = ctx.createLinearGradient(szx, szy, ex, ey);
      grad.addColorStop(0, 'rgba(255,255,255,0.9)');
      grad.addColorStop(1, 'rgba(255,255,255,0.05)');
      ctx.strokeStyle = grad;
      ctx.lineWidth = 2.5 * s;
      ctx.stroke();

      // arrowhead
      if (dist > 8) {
        const ang = Math.atan2(ey - szy, ex - szx);
        const aw = 9 * s;
        ctx.beginPath();
        ctx.moveTo(ex, ey);
        ctx.lineTo(ex - aw * Math.cos(ang - 0.42), ey - aw * Math.sin(ang - 0.42));
        ctx.lineTo(ex - aw * Math.cos(ang + 0.42), ey - aw * Math.sin(ang + 0.42));
        ctx.closePath();
        ctx.fillStyle = 'rgba(255,255,255,0.85)';
        ctx.fill();
      }

      // ghost stone
      ctx.beginPath();
      ctx.arc(szx, szy, szr, 0, Math.PI * 2);
      const gc = this.playerIndex === 0 ? '#e74c3c' : '#2980b9';
      ctx.fillStyle = gc + '44';
      ctx.fill();
      ctx.strokeStyle = gc + 'cc';
      ctx.lineWidth = 2 * s;
      ctx.stroke();
    }

    // stones
    this.stones.forEach(({ body, playerIndex: pi }) => {
      const bx = body.position.x * s;
      const by = body.position.y * s;
      const r  = cfg.stone.radius * s;
      const color = pi === 0 ? '#e74c3c' : '#2980b9';
      const light = pi === 0 ? '#f1948a' : '#85c1e9';

      // shadow
      ctx.beginPath();
      ctx.arc(bx + 2 * s, by + 2 * s, r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0,0,0,0.22)';
      ctx.fill();

      // body gradient
      const g = ctx.createRadialGradient(bx - r * 0.3, by - r * 0.3, r * 0.05, bx, by, r);
      g.addColorStop(0, light);
      g.addColorStop(1, color);
      ctx.beginPath();
      ctx.arc(bx, by, r, 0, Math.PI * 2);
      ctx.fillStyle = g;
      ctx.fill();

      // outline
      ctx.beginPath();
      ctx.arc(bx, by, r * 0.42, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255,255,255,0.55)';
      ctx.lineWidth = 2 * s;
      ctx.stroke();

      // shiny spot
      ctx.beginPath();
      ctx.arc(bx - r * 0.28, by - r * 0.3, r * 0.17, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,0.38)';
      ctx.fill();
    });

    // pause overlay
    if (this.isPaused) {
      ctx.fillStyle = 'rgba(0,0,0,0.38)';
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = 'rgba(255,255,255,0.7)';
      ctx.font = `bold ${28 * s}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.fillText('⏸  PAUZA', W / 2, H / 2);
    }
  }

  // score calculation after all stones stopped
  computeResult() {
    const { x: tx, y: ty } = this.cfg.target;
    const dists = [[], []];
    this.stones.forEach(({ body, playerIndex: pi }) => {
      dists[pi].push(Math.hypot(body.position.x - tx, body.position.y - ty));
    });
    dists[0].sort((a, b) => a - b);
    dists[1].sort((a, b) => a - b);
    const b0 = dists[0][0] ?? Infinity;
    const b1 = dists[1][0] ?? Infinity;
    return {
      winner: b0 < b1 ? 0 : b1 < b0 ? 1 : -1,
      best: [b0, b1],
    };
  }

  // reset game state for new round
  reset() {
    this.stones.forEach(({ body }) => World.remove(this.world, body));
    this.stones = [];
    this.allStonesStopped = true;
    this._dragging = false;
    this._dragStart = null;
    this._mousePos = null;
    this.isPaused = false;
    this.gameOver = false;
    this._stoppedTimer = 0;
    this._canShoot = true;
  }

  setCanShoot(val) { this._canShoot = val; }
  setPaused(val)   { this.isPaused = val;  }

  destroy() {
    cancelAnimationFrame(this._animId);
    window.removeEventListener('resize', this._onResize);
    World.clear(this.world);
    Engine.clear(this.engine);
  }
}