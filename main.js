// SPECC Neon Shop UI with Animations, Toggle Fullscreen, Polished Modals and Buttons (2025)
// (C) AltF4-official & Copilot

(function () {
  // ==== CLEANUP ====
  [
    'specc-title-root', 'shop-root', 'specc-player-root', 'equip-modal-root',
    'specials-modal-root', 'specc-orbitron-font', 'coolPlayButtonStyles',
    'specc-start-btn-fixed', 'specc-modal-overlay', 'specc-dynamic-style'
  ].forEach(id => document.getElementById(id)?.remove());

  // ==== FONT ====
  if (!document.getElementById('specc-orbitron-font')) {
    const font = document.createElement('link');
    font.id = 'specc-orbitron-font';
    font.rel = 'stylesheet';
    font.href = 'https://fonts.googleapis.com/css2?family=Orbitron:wght@700&display=swap';
    document.head.appendChild(font);
  }

  // ==== STYLE ====
  const style = document.createElement('style');
  style.id = 'specc-dynamic-style';
  style.textContent = `
  html, body { height: 100%; width: 100%; margin: 0; padding: 0; }

  /* ANIMATIONS */
  .fade-slide-in { opacity: 0; transform: translateY(40px); animation: fadeSlideIn 0.45s cubic-bezier(.4,1.3,.4,1) forwards; }
  .fade-slide-out { opacity: 1; transform: translateY(0); animation: fadeSlideOut 0.36s cubic-bezier(.5,-0.2,1,.5) forwards; }
  @keyframes fadeSlideIn { to { opacity: 1; transform: translateY(0); } }
  @keyframes fadeSlideOut { to { opacity: 0; transform: translateY(40px); pointer-events:none; } }
  .pop-in { opacity: 0; transform: scale(0.85); animation: popIn 0.34s cubic-bezier(.33,1.6,.45,1.08) forwards;}
  @keyframes popIn { to { opacity: 1; transform: scale(1); } }
  .pop-out { opacity: 1; transform: scale(1); animation: popOut 0.21s cubic-bezier(.33,1.6,.45,1.08) forwards;}
  @keyframes popOut { to { opacity: 0; transform: scale(0.85); pointer-events:none; } }
  .equip-animate { animation: equipGlow 0.32s; }
  @keyframes equipGlow { 0% {box-shadow:0 0 0 #0ff;} 60%{box-shadow:0 0 25px #0ff;} 100%{box-shadow:0 0 10px #0ff;} }
  .chips-float { position: absolute; color: #0ff; font-size: 1.5em; font-family: Orbitron; left: 50vw; top: 40vh; z-index: 99999999; pointer-events:none; animation: chipFloat 1s cubic-bezier(.2,1,1,.8) forwards;}
  @keyframes chipFloat { 0% {opacity:1;transform:translateY(0) scale(1);} 70%{opacity:.9;transform:translateY(-28px) scale(1.12);} 100%{opacity:0;transform:translateY(-85px) scale(.89);} }
  /* Neon base screens */
  #specc-title-root, #shop-root, #specc-player-root, #equip-modal-root, #specials-modal-root {
    position: fixed; z-index: 9999999; top: 0; left: 0; width: 100vw; height: 100vh;
    background: radial-gradient(ellipse 84% 62% at 58vw 27vh, #13233a 0%, #041726 70%, #000 100%);
    display: flex; flex-direction: column; font-family: 'Orbitron', 'Segoe UI', 'Consolas', monospace;
    overflow: hidden;
    opacity: 1;
    transition: opacity 0.26s cubic-bezier(.4,1.3,.4,1);
  }
  .neon-btn {
    font-size: 1.01em; font-family: inherit; color: #0ff; background: #171c2b;
    border: 2px solid #0ff; border-radius: 9px; padding: 0.26em 1.2em; margin: 7px 0;
    cursor: pointer; outline: none; box-shadow: 0 0 7px #0ff5, 0 0 1px #fff3;
    transition: background .12s, box-shadow .18s, color .18s;
    min-width: 70px;
  }
  .neon-btn:hover, .neon-btn:focus { background: #09e9ee; color: #000; box-shadow: 0 0 13px #0ff, 0 0 6px #fff; }
  #specc-fullscreen-btn {
    position: absolute; bottom: 18px; left: 50%; transform: translateX(-50%);
    font-size: 0.95em; width: 180px; padding: 7px 0; min-width: 0;
    border-radius: 40px; background: #13233a; color: #0ff;
    border: 1.7px solid #0ff7; box-shadow: 0 0 8px #0ff2; opacity: 0.95;
    display: flex; align-items: center; justify-content: center; gap: 0.5em;
    transition: background .14s, color .14s, box-shadow .14s;
    font-weight: 700;
  }
  #specc-fullscreen-btn.fullscreen { background: #0ff; color: #000; border: 1.7px solid #0ff; box-shadow: 0 0 19px #0ff; }
  #specc-fullscreen-btn .fs-icon { font-size: 1.23em; }
  #specc-fullscreen-btn:active { transform: translateX(-50%) scale(0.98);}
  .specc-close-x-btn { display: flex !important; align-items: center; justify-content: center;
    width: 38px; height: 38px; border-radius: 50%; background: #26030b; border: 2px solid #f44b;
    cursor: pointer; z-index: 101; box-shadow: 0 0 8px #f004, 0 2px 8px #0007;
    outline: none; transition: background .15s, border .15s, box-shadow .15s, transform .1s;
  }
  .specc-close-x-btn .specc-close-x { color: #fa2128; font-size: 2em; text-shadow: 0 0 9px #f22, 0 0 4px #fff;}
  .specc-close-x-btn:hover, .specc-close-x-btn:focus {
    background: #ff2b3a; border-color: #fff; box-shadow: 0 0 17px #f22, 0 2px 9px #f005;
    transform: scale(1.13) rotate(-10deg);
  }
  #specc-title-stars { position: absolute; width: 100vw; height: 100vh; top: 0; left: 0; pointer-events: none; z-index: 0; }
  .specc-star { position: absolute; border-radius: 50%; background: #fff; pointer-events: none; opacity: 0.5;}
  .specc-star.bright { box-shadow: 0 0 15px 2px #fff, 0 0 16px 7px #7df9ff82; opacity: 0.83;}
  .specc-star.blue { box-shadow: 0 0 13px 4px #00e6fb99, 0 0 15px 6px #7df9ff66; background: #7df9ff; opacity: 0.75;}
  .specc-star.gold { box-shadow: 0 0 10px 4px #ffe47a77; background: #ffe47a; opacity: 0.68;}
  .specc-star.faint { opacity: 0.17; box-shadow: 0 0 3px 1.1px #fff; }
  #speccTitle {
    position: absolute; top: 7%; width: 100%; text-align: center;
    font-size: 76px; font-weight: 900; color: #0ff;
    text-shadow: 0 0 12px #0ff, 0 0 21px #0ffb; /* MUCH LESS GLOW */
    font-family: 'Orbitron', 'Consolas', 'monospace'; z-index: 2; user-select: none; letter-spacing: 0.13em;
    transition: text-shadow .14s;
  }
  #speccMenu {
    position: absolute; top: 56%; left: 50%; transform: translate(-50%, -50%);
    display: flex; flex-direction: column; align-items: center;
    gap: 38px; z-index: 2; width: 100%;
  }
  #speccMenu button {
    font-size: 20px; padding: 13px 0; border: none; border-radius: 14px;
    background: #041726; color: #0ff; cursor: pointer; box-shadow: 0 0 9px #0ff4, 0 0 2px #0ffb;
    font-family: 'Orbitron', 'Consolas', 'monospace'; font-weight: 700; letter-spacing: 0.10em;
    transition: background 0.13s, color 0.13s, box-shadow 0.13s, filter 0.09s;
    filter: brightness(1.04); user-select: none; margin: 0;
    width: 270px; max-width: 98vw; text-align: center; min-height: 2em; line-height: 1.25;
    display: flex; justify-content: center; align-items: center;
  }
  #speccMenu button:not([disabled]):hover {
    background: #0ff; color: #000; box-shadow: 0 0 19px #0ff, 0 0 2px #fff9; filter: brightness(1.09);
  }
  #speccMenu button[disabled], #speccMenu button.specc-btn-disabled {
    background: #222 !important; color: #50c5c8 !important; cursor: not-allowed; filter: grayscale(0.4) brightness(0.86); box-shadow: none; border: none;
  }

  /* SHOP UI (unchanged except for close button) */
  .shop-header { width: 100vw; box-sizing: border-box; display: flex; align-items: center; justify-content: flex-start;
    padding: 2.5vw 3vw 0.5vw 3vw; background: rgba(10, 48, 60, 0.32); border-radius: 0 0 22px 22px;
    box-shadow: 0 4px 28px #0ff4, 0 0 6px #0ffb; min-height: 70px; margin-bottom: 18px; position: relative; gap: 17px;}
  .shop-title { font-size: 2.2em; font-weight: 900; letter-spacing: 0.12em; text-shadow: 0 0 11px #0ff, 0 0 38px #0ffb;
    color: #0ff; user-select: none; flex-shrink: 0;}
  .shop-balance { font-size: 1.15em; color: #7df9ff; font-weight: 700; text-shadow: 0 0 8px #0ffb; background: rgba(0,0,0,0.45); padding: 8px 16px; border-radius: 12px; border: 1.5px solid #0ff3; margin-left: 24px; flex-shrink: 0;}
  #open-player-menu-btn {
    margin-left: 24px; padding: 9px 18px; font-size: 1.05em; border-radius: 13px; font-weight: bold;
    background: #0ff3; color: #004950; border: 2px solid #0ff; letter-spacing: 2px; box-shadow: 0 0 10px 2px #0ff3;
    cursor: pointer; transition: background .18s, color .18s, box-shadow .18s;
    font-family: 'Orbitron', 'Consolas', 'monospace'; user-select: none;
    filter: brightness(1.38) drop-shadow(0 0 5px #0ff8);
    outline: none;
  }
  #open-player-menu-btn:focus, #open-player-menu-btn:hover {
    box-shadow: 0 0 20px #0ff, 0 0 32px 8px #0ff;
    background: #fff; color: #02384a;
    border-color: #0ff;
    filter: brightness(1.19) drop-shadow(0 0 19px #0ff8);
  }
  .specc-close-x-btn.shop-x { display: flex !important; margin-left: auto; margin-right: 2vw; }

  /* SHOP content */
  .shop-content { flex: 1 1 auto; overflow-y: auto; padding: 2vw 4vw 2vw 4vw; display: flex; flex-direction: column; gap: 2.5vw;}
  .shop-section { margin-bottom: 1.5vw; background: rgba(10, 48, 60, 0.22); border-radius: 20px; box-shadow: 0 0 10px #0ff1; padding: 1vw 1.5vw 1.5vw 1.5vw;}
  .shop-section h2 { font-size: 2em; color: #0ff; text-shadow: 0 0 5px #0ffb; margin-bottom: .2em; letter-spacing: .07em;}
  .shop-item { background: rgba(0, 24, 40, 0.24); border: 2px solid #0ff4; border-radius: 14px; margin-bottom: 1.1vw; box-shadow: 0 0 6px #0ff2; padding: 1.2vw 1.5vw; display: flex; flex-direction: column; gap: 0.6vw;}
  .shop-item-head { display: flex; gap: 1.3vw; align-items: center; flex-wrap: wrap; }
  .shop-item-name, .shop-item-level, .shop-item-price, .shop-info-title, .shop-info-desc, .shop-info-stats, .shop-item-info { color: #fff !important;}
  .shop-starter { font-size: 0.8em; font-style: italic; color: #77f9ff; margin-left: 4px; }
  .shop-show-info, .shop-buy-btn { font-family: 'Orbitron', 'Segoe UI', 'Consolas', monospace; font-size: 1em; border-radius: 10px; border: 1.5px solid #0ffb; margin-right: 6px; padding: 0.44em 1.1em; background: #111; color: #0ff; font-weight: 700; letter-spacing: 0.08em; cursor: pointer; transition: background 0.15s, color 0.15s, border 0.15s, filter 0.15s, box-shadow 0.15s; box-shadow: 0 0 6px #0ff6; filter: brightness(1.04); margin-bottom: 8px;}
  .shop-show-info:not([disabled]):hover, .shop-buy-btn:not([disabled]):hover { background: #0ff; color: #000; border-color: #0ff; filter: brightness(1.11); box-shadow: 0 0 8px #0ff;}
  .shop-buy-btn[disabled] { background: #222 !important; color: #50c5c8 !important; cursor: not-allowed; filter: grayscale(0.4) brightness(0.84); box-shadow: none; border: none;}
  .shop-item-info { background: rgba(0, 24, 40, 0.32); border-radius: 8px; padding: 0.7vw 1.2vw; margin-top: 0.3vw; font-size: 1.1em; animation: fadeIn 0.25s; box-shadow: 0 0 2px #0ff4; }

  /* ======= PLAYER UI POLISH ======= */
  .player-menu-outer {
    margin: 0 auto; margin-top: 44px; margin-bottom: 60px;
    padding: 2.2em 2.5em 2em 2.5em;
    background: rgba(18,30,54,0.93); border-radius: 30px;
    box-shadow: 0 2px 23px 4px #0ff2, 0 0 10px #0ff9;
    width: 97vw; max-width: 430px; display: flex; flex-direction: column; align-items: center; gap: 1.5em; position: relative;
    border: 2.5px solid #0ff4;
    animation: fadeSlideIn 0.5s cubic-bezier(.4,1.3,.4,1) forwards;
  }
  .player-menu-title {
    font-size: 2.2em; font-weight: 900; letter-spacing: 0.13em; color: #0ff;
    text-shadow: 0 0 7px #0ff, 0 0 20px #0ffb; user-select: none; text-align: center;
    margin-bottom: .5em; margin-top: 0.2em;
  }
  .player-stats-row {
    display: flex; flex-direction: row; gap: 18px; justify-content: center; align-items: center; margin-bottom: 0.7em;
  }
  .player-stat-box {
    background: #101e2a; border: 1.5px solid #0ff7; border-radius: 13px; min-width: 110px;
    min-height: 34px; color: #0ff; font-size: 1.1em; font-weight: 700; text-align: center; display: flex;
    align-items: center; justify-content: center; margin: 0 6px; box-shadow: none; letter-spacing: 0.02em; font-family: 'Orbitron', 'Consolas', 'monospace'; user-select: none;
  }
  .player-wep-label, .player-special-label { font-size: 1.08em; color: #fff; margin-bottom: 0.3em; text-align: center; font-weight: 700; text-shadow: 0 0 8px #0ff4; letter-spacing: 0.07em;}
  .player-weps, .player-specials {
    display: flex; flex-direction: row; gap: 12px; justify-content: center; align-items: center; margin-bottom: 0.2em; width: 100%;
  }
  .player-wep-slot, .player-special-slot {
    background: #182d3b; color: #fff; font-weight: bold; border-radius: 14px; min-width: 86px; min-height: 42px; font-size: 1.01em;
    text-align: center; display: flex; align-items: center; justify-content: center;
    border: 2px solid #0ff5; margin: 0 5px; font-family: 'Orbitron', 'Segoe UI', Arial, sans-serif;
    letter-spacing: 0.04em; cursor: pointer; transition: background 0.14s, color 0.14s, border 0.14s, box-shadow 0.13s, filter 0.13s;
    outline: none; position: relative; z-index: 1; padding: 0.4em 0.2em; flex-direction: column;
  }
  .player-wep-slot.selected, .player-special-slot.selected {
    background: #0ff;
    color: #000;
    border-color: #00ffc8;
    box-shadow: 0 0 20px #0ffcf, 0 0 3px #0ff6;
    font-weight: bolder;
    filter: brightness(1.25);
    animation: equipGlow 0.38s;
  }
  .player-wep-slot .equip-check, .player-special-slot .equip-check {
    position: absolute; top: 6px; right: 10px; color: #0ff; font-size: 1.08em; filter: drop-shadow(0 0 2px #0ffb);
    pointer-events: none;
    font-weight: bold;
  }
  .player-wep-slot.empty .slot-name, .player-special-slot.empty .slot-name { color: #7ddbe7 !important; font-weight: normal;}
  .player-wep-slot.empty, .player-special-slot.empty {
    background: #26313b; color: #7ddbe7; border: 2.5px dashed #0ff6; font-weight: normal; opacity: 0.58;
  }
  .player-wep-slot:hover, .player-special-slot:hover { background: #0ff; color: #000; border-color: #0ff; }
  .player-back-btn {
    margin-top: 8px; font-size: 1.08em; padding: 0.7em 2em; border-radius: 14px; border: 2px solid #0ff;
    background: linear-gradient(90deg,#041726 70%,#0ff2 100%);
    color: #0ff; font-family: 'Orbitron', 'Segoe UI', Arial, sans-serif; font-weight: bold;
    letter-spacing: 0.13em; cursor: pointer; transition: background .13s, color .13s, border .13s, box-shadow .10s;
    filter: brightness(1.12); display: block; box-shadow: 0 0 13px #0ff9, 0 0 2px #0ffb;
    text-shadow: 0 0 4px #0ffb;
  }
  .player-back-btn:hover {
    background: #0ff; color: #000; border-color: #0ff; filter: brightness(1.18); box-shadow: 0 0 17px #0ffb;
    text-shadow: none;
  }

  /* ==== EQUIP & SPECIALS MODALS POLISH ==== */
  .equip-modal-outer, .specials-modal-outer {
    background: rgba(15,26,36,0.96); border-radius: 20px;
    box-shadow: 0 2px 20px 3px #0ff2, 0 0 4px #0ffb;
    padding: 2.1em 2.1em 1.7em 2.1em; min-width: 260px; max-width: 92vw;
    display: flex; flex-direction: column; align-items: center;
    font-family: 'Orbitron', 'Consolas', 'monospace';
    border: 2px solid #0ff6;
    margin: 38px auto;
    gap: 0.8em;
    animation: popIn 0.34s cubic-bezier(.33,1.6,.45,1.08) forwards;
  }
  .equip-modal-title, .specials-modal-title {
    font-size: 1.38em; color: #0ff; text-shadow: 0 0 7px #0ffb; margin-bottom: 1em; letter-spacing: .09em; font-weight: bold; text-align: center;
  }
  .equip-modal-weplist, .specials-modal-list {
    display: flex; flex-direction: column; gap: 0.5em; width: 100%; align-items: center; margin-bottom: 0.7em;
  }
  .equip-modal-weapon, .specials-modal-special {
    background: #182d3b; color: #0ff; border: 2px solid #0ff4; border-radius: 11px; padding: 0.5em 1.1em;
    font-size: 1.01em; min-width: 110px; text-align: center; cursor: pointer; font-family: inherit;
    transition: background 0.12s, border 0.12s, color 0.11s, box-shadow 0.13s, filter 0.14s;
    margin-bottom: 2px;
  }
  .equip-modal-weapon.selected, .specials-modal-special.selected {
    background: #0ff; color: #000; border-color: #00ffc8; font-weight: bold; box-shadow: 0 0 10px #0ff8;
    animation: equipGlow 0.3s;
    filter: brightness(1.15);
  }
  .equip-modal-weapon:hover, .specials-modal-special:hover {
    background: #0ff; color: #000; border-color: #0ff;
  }
  .equip-name, .specials-name { margin-right: 0.3em;}
  .equip-check { color: #0ff; font-size: 1.12em; margin-left: 0.3em; vertical-align: middle;}
  .equip-modal-btns, .specials-modal-btns { width: 100%; display: flex; gap: 1.2em; justify-content: center; margin-top: 1.1em;}
  .equip-modal-btn, .specials-modal-btn, .equip-modal-unequip-btn, #specials-unequip-btn {
    font-size: 1em; padding: 0.6em 1.8em; border-radius: 9px; border: 2px solid #0ff8;
    background: #1a2330; color: #0ff; font-family: 'Orbitron', 'Segoe UI', Arial, sans-serif; font-weight: bold;
    box-shadow: 0 0 6px #0ff7; letter-spacing: 0.09em; cursor: pointer;
    transition: background 0.12s, color 0.12s, border 0.12s, filter 0.11s, box-shadow 0.13s;
    filter: brightness(1.08);
    margin: 0 0.2em;
    margin-bottom: 5px;
  }
  .equip-modal-btn:hover, .specials-modal-btn:hover, .equip-modal-unequip-btn:hover, #specials-unequip-btn:hover {
    background: #0ff; color: #000; border-color: #0ff; filter: brightness(1.12); box-shadow: 0 0 10px #0ffb;
  }
  .equip-modal-unequip-btn, #specials-unequip-btn {
    width: 100%; text-align: center; margin-top: 0.1em; margin-bottom: 0.5em; border-radius: 8px;
    background: #19293b;
  }
  `;
  document.head.appendChild(style);

  // ==== SFX ====
  const sfx = {
    click: new Audio("https://cdn.jsdelivr.net/gh/AltF4-oss/game-audio-ui@main/click-neon.mp3"),
    buy: new Audio("https://cdn.jsdelivr.net/gh/AltF4-oss/game-audio-ui@main/buy-neon.mp3"),
    equip: new Audio("https://cdn.jsdelivr.net/gh/AltF4-oss/game-audio-ui@main/equip-neon.mp3"),
    microchips: new Audio("https://cdn.jsdelivr.net/gh/AltF4-oss/game-audio-ui@main/chips-neon.mp3"),
    swoosh: new Audio("https://cdn.jsdelivr.net/gh/AltF4-oss/game-audio-ui@main/woosh-neon.mp3"),
  };
  let sfxEnabled = true;
  for (const snd of Object.values(sfx)) snd.volume = 0.22;
  function playSFX(name) {
    if (!sfxEnabled || !sfx[name]) return;
    try { sfx[name].currentTime = 0; sfx[name].play(); } catch (e) {}
  }

  // ==== Modal Dialog ====
  function showModal(opts) {
    // opts: {title, message, yes, no, onyes, onno}
    let overlay = document.createElement('div');
    overlay.id = 'specc-modal-overlay';
    overlay.style.cssText = `position:fixed;left:0;top:0;width:100vw;height:100vh;background:rgba(7,24,39,0.86);z-index:10000000;display:flex;align-items:center;justify-content:center;animation:fadeSlideIn 0.28s;`;
    overlay.innerHTML = `
      <div class="specc-modal-box" style="background:#11324d;border-radius:18px;box-shadow:0 0 18px #0ff9, 0 0 2px #fff7;padding:2em 2.7em;display:flex;flex-direction:column;align-items:center;animation:popIn 0.32s;">
        <div class="specc-modal-title" style="font-size:1.3em;color:#0ff;font-weight:bold;text-shadow:0 0 7px #0ffb;margin-bottom:1em;text-align:center;">
          ${opts.title || "Are you sure?"}
        </div>
        <div style="font-size:1.13em; color:#bafcff; text-align:center; margin-bottom:1.2em; max-width:300px;">
          ${opts.message || ''}
        </div>
        <div class="specc-modal-btns" style="display:flex;gap:1.2em;">
          <button class="neon-btn" id="specc-modal-yes">${opts.yes || "Yes, Exit"}</button>
          <button class="neon-btn" id="specc-modal-no">${opts.no || "No, Stay"}</button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);
    overlay.querySelector('#specc-modal-yes').onclick = () => {
      overlay.classList.remove('fade-slide-in');
      overlay.classList.add('fade-slide-out');
      setTimeout(() => overlay.remove(), 350);
      if (opts.onyes) opts.onyes();
    };
    overlay.querySelector('#specc-modal-no').onclick = () => {
      playSFX('swoosh');
      overlay.classList.remove('fade-slide-in');
      overlay.classList.add('fade-slide-out');
      setTimeout(() => overlay.remove(), 350);
      if (opts.onno) opts.onno();
    };
  }

  // ==== DATA ====
  const SHOP_ITEMS = {
    'laser-gun': { type: 'weapon', name: 'Laser Gun', price: 20000, desc: 'Light-based Alien Tech, high destruction at light speed.', knockback: 0 },
    'blaster':   { type: 'weapon', name: 'Blaster', price: 0, starter: true, desc: 'Standard-issue energy sidearm. Reliable but basic.', knockback: 20 },
    'armor':     { type: 'upgrade', name: 'Armor', price: 5000, maxLevel: 20 },
    'speed':     { type: 'upgrade', name: 'Movement Speed', price: 2000, maxLevel: 10 },
    'energy-shield': { type: 'special', name: 'Energy Shield', price: 30000 }
  };
  const SPECIALS = [
    { key: 'energy-shield', name: 'Energy Shield' }
  ];
  const playerState = {
    mc: 1000,
    inventory: { 'blaster': true },
    upgrades: { armor: 1, speed: 1 },
    specials: { 'energy-shield': false },
    equipped: ['blaster', null, null],
    equippedSpecial: null
  };

  // ==== TITLE ====
  const title = document.createElement('div');
  title.id = 'specc-title-root';
  title.innerHTML = `
    <div id="specc-title-stars"></div>
    <div id="speccTitle">SPECC</div>
    <div id="speccMenu">
      <button id="new-game-btn">New Game</button>
      <button id="continue-btn" disabled class="specc-btn-disabled">Continue (Unavailable)</button>
      <button id="settings-btn">Settings</button>
    </div>
    <button id="specc-fullscreen-btn" class="neon-btn">
      <span class="fs-label">Enter Fullscreen</span>
      <span class="fs-icon">⛶</span>
    </button>
  `;
  document.body.appendChild(title);

  // ==== FULLSCREEN TOGGLE BUTTON LOGIC ====
  const fsBtn = document.getElementById('specc-fullscreen-btn');
  function updateFSBtn() {
    const isFS = !!(document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement);
    if (isFS) {
      fsBtn.classList.add('fullscreen');
      fsBtn.querySelector('.fs-label').textContent = "Exit Fullscreen";
    } else {
      fsBtn.classList.remove('fullscreen');
      fsBtn.querySelector('.fs-label').textContent = "Enter Fullscreen";
    }
  }
  function goFullScreenToggle() {
    const isFS = !!(document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement);
    const elem = document.documentElement;
    if (!isFS) {
      if (elem.requestFullscreen) elem.requestFullscreen();
      else if (elem.webkitRequestFullscreen) elem.webkitRequestFullscreen();
      else if (elem.msRequestFullscreen) elem.msRequestFullscreen();
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
      else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
      else if (document.msExitFullscreen) document.msExitFullscreen();
    }
  }
  fsBtn.onclick = function () {
    goFullScreenToggle();
  };
  document.addEventListener("fullscreenchange", updateFSBtn);
  document.addEventListener("webkitfullscreenchange", updateFSBtn);
  document.addEventListener("msfullscreenchange", updateFSBtn);
  updateFSBtn();

  // ==== STAR BG ====
  (function speccStarBG() {
    const starsDiv = document.getElementById('specc-title-stars');
    if (!starsDiv) return;
    const vw = Math.max(window.innerWidth, document.documentElement.clientWidth);
    const vh = Math.max(window.innerHeight, document.documentElement.clientHeight);
    const numStars = Math.min(110, Math.floor((vw * vh) / 950));
    for (let i = 0; i < numStars; ++i) {
      const star = document.createElement('div');
      star.className = 'specc-star';
      star.style.left = (Math.random() * 100) + 'vw';
      star.style.top = (Math.random() * 100) + 'vh';
      let size = (Math.random() * 2.5 + 0.6);
      const r = Math.random();
      if (r < 0.13) { star.classList.add('blue'); size *= 1.09; }
      else if (r < 0.22) { star.classList.add('gold'); size *= 1.07; }
      else if (r < 0.36) { star.classList.add('bright'); size *= 1.13; }
      else if (r < 0.48) { star.classList.add('faint'); size *= 0.88; }
      star.style.width = size + 'px';
      star.style.height = size + 'px';
      if (!star.classList.contains('faint') && Math.random() < 0.19) {
        star.style.opacity = (Math.random() * 0.3 + 0.32).toFixed(2);
      }
      starsDiv.appendChild(star);
    }
  })();

  // ==== SHOP ====
  const shop = document.createElement('div');
  shop.id = 'shop-root';
  shop.style.display = 'none';
  shop.innerHTML = `
    <div class="shop-header">
      <span class="shop-title">SHOP</span>
      <span class="shop-balance">MicroChips: <span id="shop-mc-balance">1000</span></span>
      <button id="open-player-menu-btn">View Player</button>
      <div class="specc-close-x-btn shop-x" id="shop-close-btn"><span class="specc-close-x">&#10005;</span></div>
    </div>
    <div class="shop-content" id="shop-content-custom-btn"></div>
  `;
  document.body.appendChild(shop);

  // ==== PLAYER MENU ====
  const player = document.createElement('div');
  player.id = 'specc-player-root';
  player.style.display = 'none';
  player.innerHTML = `
    <div class="player-menu-outer fade-slide-in" id="player-menu-outer">
      <div class="player-menu-title">PLAYER</div>
      <div class="player-stats-row">
        <div class="player-stat-box" id="player-armor-box">Armour: <span id="player-armor-stat"></span></div>
        <div class="player-stat-box" id="player-speed-box">Speed: <span id="player-speed-stat"></span></div>
      </div>
      <div class="player-wep-label">Weapons Equipped</div>
      <div class="player-weps" id="player-weps"></div>
      <div class="player-special-label">Specials</div>
      <div class="player-specials" id="player-specials"></div>
      <button class="player-back-btn" id="player-back-btn">Back to Shop</button>
    </div>
  `;
  document.body.appendChild(player);

  // ==== EQUIP WEAPON MODAL ====
  const equipModal = document.createElement('div');
  equipModal.id = 'equip-modal-root';
  equipModal.style.display = 'none';
  equipModal.innerHTML = `
    <div class="equip-modal-outer pop-in" id="equip-modal-outer">
      <div class="equip-modal-title">Equip Weapon</div>
      <button class="equip-modal-unequip-btn" id="equip-unequip-btn">Unequip Slot</button>
      <div class="equip-modal-weplist" id="equip-modal-weplist"></div>
      <div class="equip-modal-btns">
        <button class="equip-modal-btn" id="equip-done-btn">Done</button>
      </div>
    </div>
  `;
  document.body.appendChild(equipModal);

  // ==== SPECIALS MODAL ====
  const specialsModal = document.createElement('div');
  specialsModal.id = 'specials-modal-root';
  specialsModal.style.display = 'none';
  specialsModal.innerHTML = `
    <div class="specials-modal-outer pop-in" id="specials-modal-outer">
      <div class="specials-modal-title">Equip Special</div>
      <button class="equip-modal-unequip-btn" id="specials-unequip-btn">Unequip Special</button>
      <div class="specials-modal-list" id="specials-modal-list"></div>
      <div class="specials-modal-btns">
        <button class="specials-modal-btn" id="specials-done-btn">Done</button>
      </div>
    </div>
  `;
  document.body.appendChild(specialsModal);

  // ==== SHOP CONTENT (with Knockback) ====
  document.getElementById('shop-content-custom-btn').innerHTML = `
      <!-- Weapons Section -->
      <div class="shop-section">
        <h2>Ranged Weapons</h2>
        <div class="shop-item" data-item="laser-gun">
          <div class="shop-item-head">
            <span class="shop-item-name">Laser Gun</span>
            <span class="shop-item-price">20,000 MicroChips</span>
            <button class="shop-show-info" data-item="laser-gun">Show Info</button>
            <button class="shop-buy-btn" data-item="laser-gun">Buy</button>
          </div>
          <div class="shop-item-info" id="info-laser-gun" style="display:none;">
            <div class="shop-info-title">Laser Gun</div>
            <div class="shop-info-desc">
              The Laser Gun is a type of Light-based Alien Technology, capable of high destruction at the speed of light.
            </div>
            <ul class="shop-info-stats">
              <li>Item Type: <b>Ranged Weapon</b></li>
              <li>Damage: <b>5</b></li>
              <li>Rate of Fire: <b>2500</b></li>
              <li>Piercing: <b>2</b> (Can pierce 2 enemies)</li>
              <li>Bullet Speed: <b>Instant</b></li>
              <li>Knockback: <b>0</b></li>
            </ul>
          </div>
        </div>
        <div class="shop-item" data-item="blaster">
          <div class="shop-item-head">
            <span class="shop-item-name">Blaster <span class="shop-starter">(Starter)</span></span>
            <span class="shop-item-price">Owned</span>
            <button class="shop-show-info" data-item="blaster">Show Info</button>
            <button class="shop-buy-btn" data-item="blaster" disabled>Buy</button>
          </div>
          <div class="shop-item-info" id="info-blaster" style="display:none;">
            <div class="shop-info-title">Blaster</div>
            <div class="shop-info-desc">
              The standard-issue energy sidearm. Reliable but basic.
            </div>
            <ul class="shop-info-stats">
              <li>Item Type: <b>Ranged Weapon</b></li>
              <li>Damage: <b>2</b></li>
              <li>Rate of Fire: <b>1300</b></li>
              <li>Piercing: <b>0</b></li>
              <li>Bullet Speed: <b>Fast</b></li>
              <li>Knockback: <b>20</b></li>
            </ul>
          </div>
        </div>
      </div>
      <!-- Player Upgrades Section -->
      <div class="shop-section">
        <h2>Player Upgrades</h2>
        <div class="shop-item" data-item="armor">
          <div class="shop-item-head">
            <span class="shop-item-name">Armor</span>
            <span class="shop-item-price">5,000 MicroChips / level</span>
            <span class="shop-item-level">Level: <span id="armor-lvl">1</span></span>
            <button class="shop-show-info" data-item="armor">Show Info</button>
            <button class="shop-buy-btn" data-item="armor">Upgrade</button>
          </div>
          <div class="shop-item-info" id="info-armor" style="display:none;">
            <div class="shop-info-title">Armor</div>
            <div class="shop-info-desc">
              Increases your resistance to enemy attacks. Maximum 20 levels.
            </div>
            <ul class="shop-info-stats">
              <li>Protection: <b>+1</b> per level</li>
              <li>Max Level: <b>20</b></li>
              <li>Price: <b>5,000 MicroChips</b> per level</li>
            </ul>
          </div>
        </div>
        <div class="shop-item" data-item="speed">
          <div class="shop-item-head">
            <span class="shop-item-name">Movement Speed</span>
            <span class="shop-item-price">2,000 MicroChips / level</span>
            <span class="shop-item-level">Level: <span id="speed-lvl">1</span></span>
            <button class="shop-show-info" data-item="speed">Show Info</button>
            <button class="shop-buy-btn" data-item="speed">Upgrade</button>
          </div>
          <div class="shop-item-info" id="info-speed" style="display:none;">
            <div class="shop-info-title">Movement Speed</div>
            <div class="shop-info-desc">
              Increases your base movement speed. Maximum 10 levels.
            </div>
            <ul class="shop-info-stats">
              <li>Speed: <b>+1</b> per level</li>
              <li>Max Level: <b>10</b></li>
              <li>Price: <b>2,000 MicroChips</b> per level</li>
            </ul>
          </div>
        </div>
      </div>
      <!-- Special Upgrades Section -->
      <div class="shop-section">
        <h2>Special Upgrades</h2>
        <div class="shop-item" data-item="energy-shield">
          <div class="shop-item-head">
            <span class="shop-item-name">Energy Shield</span>
            <span class="shop-item-price">30,000 MicroChips</span>
            <button class="shop-show-info" data-item="energy-shield">Show Info</button>
            <button class="shop-buy-btn" data-item="energy-shield">Buy</button>
          </div>
          <div class="shop-item-info" id="info-energy-shield" style="display:none;">
            <div class="shop-info-title">Energy Shield</div>
            <div class="shop-info-desc">
              Absorbs enemy hits. Shield is replenished each round.
            </div>
            <ul class="shop-info-stats">
              <li>Hit Capacity: <b>3</b> hits (Upgradeable)</li>
              <li>Price: <b>30,000 MicroChips</b></li>
              <li>Effect: Negates damage until depleted</li>
            </ul>
          </div>
        </div>
      </div>
  `;

  // ==== SHOP BUTTONS LOGIC + SHOW INFO ANIMATION ====
  function updateBalance() {
    document.querySelectorAll('#shop-mc-balance').forEach(e => e.textContent = playerState.mc);
    updateShopButtons();
  }
  function updateLevels() {
    document.getElementById('armor-lvl').textContent = playerState.upgrades.armor;
    document.getElementById('speed-lvl').textContent = playerState.upgrades.speed;
    updateShopButtons();
  }
  function canAfford(amount) { return playerState.mc >= amount; }
  function updateShopButtons() {
    const laserGunBtn = document.querySelector('.shop-buy-btn[data-item="laser-gun"]');
    if (playerState.inventory['laser-gun']) { laserGunBtn.textContent = "Owned"; laserGunBtn.disabled = true; }
    else if (canAfford(SHOP_ITEMS['laser-gun'].price)) { laserGunBtn.textContent = "Buy"; laserGunBtn.disabled = false; }
    else { laserGunBtn.textContent = "Buy"; laserGunBtn.disabled = true; }
    const armorBtn = document.querySelector('.shop-buy-btn[data-item="armor"]');
    if (playerState.upgrades.armor >= SHOP_ITEMS['armor'].maxLevel) { armorBtn.textContent = "Maxed"; armorBtn.disabled = true; }
    else if (canAfford(SHOP_ITEMS['armor'].price)) { armorBtn.textContent = "Upgrade"; armorBtn.disabled = false; }
    else { armorBtn.textContent = "Upgrade"; armorBtn.disabled = true; }
    const speedBtn = document.querySelector('.shop-buy-btn[data-item="speed"]');
    if (playerState.upgrades.speed >= SHOP_ITEMS['speed'].maxLevel) { speedBtn.textContent = "Maxed"; speedBtn.disabled = true; }
    else if (canAfford(SHOP_ITEMS['speed'].price)) { speedBtn.textContent = "Upgrade"; speedBtn.disabled = false; }
    else { speedBtn.textContent = "Upgrade"; speedBtn.disabled = true; }
    const shieldBtn = document.querySelector('.shop-buy-btn[data-item="energy-shield"]');
    if (playerState.specials['energy-shield']) { shieldBtn.textContent = "Owned"; shieldBtn.disabled = true; }
    else if (canAfford(SHOP_ITEMS['energy-shield'].price)) { shieldBtn.textContent = "Buy"; shieldBtn.disabled = false; }
    else { shieldBtn.textContent = "Buy"; shieldBtn.disabled = true; }
    const blasterBtn = document.querySelector('.shop-buy-btn[data-item="blaster"]');
    if (blasterBtn) { blasterBtn.textContent = "Owned"; blasterBtn.disabled = true; }
  }
  shop.querySelectorAll('.shop-show-info').forEach(btn => {
    btn.addEventListener('click', function () {
      playSFX('click');
      const item = btn.getAttribute('data-item');
      const info = document.getElementById('info-' + item);
      const isOpen = info.style.display !== 'none';
      shop.querySelectorAll('.shop-item-info').forEach(div => {
        if (div !== info) div.style.display = 'none';
      });
      shop.querySelectorAll('.shop-show-info').forEach(b => {
        if (b !== btn) b.textContent = "Show Info";
      });
      if (!isOpen) {
        info.style.display = '';
        info.classList.remove('fade-slide-in');
        void info.offsetWidth; // force reflow for animation
        info.classList.add('fade-slide-in');
        btn.textContent = "Hide Info";
      } else {
        info.classList.remove('fade-slide-in');
        info.classList.add('fade-slide-out');
        setTimeout(() => { info.style.display = 'none'; info.classList.remove('fade-slide-out'); }, 350);
        btn.textContent = "Show Info";
      }
    });
  });
  shop.querySelectorAll('.shop-buy-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const item = btn.getAttribute('data-item');
      if (item === 'laser-gun') {
        if (!playerState.inventory['laser-gun'] && canAfford(SHOP_ITEMS['laser-gun'].price)) {
          playerState.mc -= SHOP_ITEMS['laser-gun'].price;
          playerState.inventory['laser-gun'] = true;
          playSFX('buy');
        }
      }
      if (item === 'armor') {
        if (playerState.upgrades.armor < SHOP_ITEMS['armor'].maxLevel && canAfford(SHOP_ITEMS['armor'].price)) {
          playerState.mc -= SHOP_ITEMS['armor'].price;
          playerState.upgrades.armor++;
          playSFX('buy');
        }
      }
      if (item === 'speed') {
        if (playerState.upgrades.speed < SHOP_ITEMS['speed'].maxLevel && canAfford(SHOP_ITEMS['speed'].price)) {
          playerState.mc -= SHOP_ITEMS['speed'].price;
          playerState.upgrades.speed++;
          playSFX('buy');
        }
      }
      if (item === 'energy-shield') {
        if (!playerState.specials['energy-shield'] && canAfford(SHOP_ITEMS['energy-shield'].price)) {
          playerState.mc -= SHOP_ITEMS['energy-shield'].price;
          playerState.specials['energy-shield'] = true;
          playSFX('buy');
        }
      }
      updateBalance();
      updateLevels();
      updateShopButtons();
      renderPlayerMenu();
    });
  });

  // ==== UI NAVIGATION ====
  document.getElementById('new-game-btn').addEventListener('click', () => {
    playSFX('click');
    fadeToScreen(shop, title);
    playerState.mc = 1000;
    playerState.inventory = { 'blaster': true };
    playerState.upgrades = { armor: 1, speed: 1 };
    playerState.specials = { 'energy-shield': false };
    playerState.equipped = ['blaster', null, null];
    playerState.equippedSpecial = null;
    updateBalance(); updateLevels(); updateShopButtons();
    shop.querySelectorAll('.shop-item-info').forEach(div => div.style.display = 'none');
    shop.querySelectorAll('.shop-show-info').forEach(b => b.textContent = "Show Info");
    renderPlayerMenu();
  });
  document.getElementById('shop-close-btn').onclick = function () {
    playSFX('swoosh');
    fadeToScreen(title, shop);
  };
  document.getElementById('player-back-btn').onclick = function () {
    playSFX('swoosh');
    fadeToScreen(shop, player);
    renderPlayerMenu();
  };

  // ==== VIEW PLAYER BUTTON ====
  document.getElementById('open-player-menu-btn').onclick = function () {
    playSFX('click');
    fadeToScreen(player, shop);
    renderPlayerMenu();
  };

  // ==== SCREEN ANIMATION FADE/SLIDE ====
  function fadeToScreen(show, hide) {
    if (!show || !hide) return;
    hide.classList.remove('fade-slide-in');
    hide.classList.add('fade-slide-out');
    setTimeout(() => {
      hide.style.display = 'none';
      hide.classList.remove('fade-slide-out');
      show.style.display = 'flex';
      show.classList.add('fade-slide-in');
      setTimeout(() => show.classList.remove('fade-slide-in'), 470);
    }, 350);
  }

  // ==== PLAYER MENU LOGIC ====
  function renderPlayerMenu() {
    document.getElementById('player-armor-stat').textContent = `${playerState.upgrades.armor}/20`;
    document.getElementById('player-speed-stat').textContent = `${playerState.upgrades.speed}/10`;
    const weps = document.getElementById('player-weps');
    weps.innerHTML = '';
    for (let i = 0; i < 3; ++i) {
      const w = playerState.equipped[i];
      const div = document.createElement('div');
      div.className = 'player-wep-slot' + (w ? ' selected' : ' empty');
      div.tabIndex = 0;
      div.setAttribute('aria-label', 'Weapon Slot ' + (i + 1));
      div.dataset.slot = String(i);
      if (w && SHOP_ITEMS[w]) {
        div.innerHTML = `<span class="slot-name">${SHOP_ITEMS[w].name}</span>
        <span class="equip-check">&#10003;</span>`;
      } else {
        div.innerHTML = `<span class="slot-name">EMPTY</span>`;
      }
      div.addEventListener('click', () => {
        playSFX('click');
        div.classList.add('equip-animate');
        setTimeout(() => div.classList.remove('equip-animate'), 390);
        openEquipModal(i);
      });
      weps.appendChild(div);
    }
    // Specials
    const sbox = document.getElementById('player-specials');
    sbox.innerHTML = '';
    const sDiv = document.createElement('div');
    const eqKey = playerState.equippedSpecial;
    let eqSpecial = eqKey ? SPECIALS.find(s => s.key === eqKey) : null;
    sDiv.className = 'player-special-slot' + (eqSpecial ? ' selected' : ' empty');
    sDiv.tabIndex = 0;
    if (eqSpecial)
      sDiv.innerHTML = `<span class="slot-name">${eqSpecial.name}</span><span class="equip-check">&#10003;</span>`;
    else
      sDiv.innerHTML = `<span class="slot-name">EMPTY</span>`;
    sDiv.onclick = () => {
      playSFX('click');
      sDiv.classList.add('equip-animate');
      setTimeout(() => sDiv.classList.remove('equip-animate'), 390);
      openSpecialsModal();
    };
    sbox.appendChild(sDiv);
  }

  // ==== EQUIP WEAPON MODAL LOGIC ====
  let equipModalSlot = -1;
  let equipModalStaged = [];
  function openEquipModal(slotIdx) {
    equipModalSlot = slotIdx;
    equipModalStaged = playerState.equipped.slice();
    equipModal.style.display = 'flex';
    equipModal.firstElementChild.classList.remove('pop-in');
    void equipModal.firstElementChild.offsetWidth;
    equipModal.firstElementChild.classList.add('pop-in');
    player.style.display = 'none';
    renderEquipModal();
  }
  function closeEquipModal(save) {
    equipModal.style.display = 'none';
    if (save) {
      // Enforce at least one weapon equipped
      if (!equipModalStaged.some(w => w && playerState.inventory[w])) {
        showModal({
          title: "Equip Error",
          message: "You must have at least one weapon equipped.",
          yes: "OK", no: "",
          onyes: () => { equipModal.style.display = 'flex'; }
        });
        return;
      }
      playerState.equipped = equipModalStaged.slice();
      playSFX('equip');
    } else playSFX('swoosh');
    player.style.display = 'flex';
    renderPlayerMenu();
  }
  document.getElementById('equip-done-btn').onclick = function () { closeEquipModal(true); };
  document.getElementById('equip-unequip-btn').onclick = function () {
    let staged = equipModalStaged.slice();
    staged[equipModalSlot] = null;
    if (!staged.some(w => w && playerState.inventory[w])) {
      showModal({
        title: "Equip Error",
        message: "You must have at least one weapon equipped.",
        yes: "OK", no: "",
        onyes: () => {}
      });
      return;
    }
    equipModalStaged[equipModalSlot] = null;
    renderEquipModal();
  };
  function renderEquipModal() {
    const slotIdx = equipModalSlot;
    const equippedSet = new Set(equipModalStaged.filter((w, i) => w && i !== slotIdx));
    const ownedWeapons = Object.keys(playerState.inventory).filter(k => playerState.inventory[k] && SHOP_ITEMS[k] && SHOP_ITEMS[k].type === 'weapon');
    const availableWeapons = ownedWeapons.filter(w => !equippedSet.has(w) || equipModalStaged[slotIdx] === w);
    const list = document.getElementById('equip-modal-weplist');
    list.innerHTML = '';
    availableWeapons.forEach(w => {
      const itm = SHOP_ITEMS[w];
      const div = document.createElement('div');
      div.className = 'equip-modal-weapon' + (equipModalStaged[slotIdx] === w ? ' selected' : '');
      div.tabIndex = 0;
      div.innerHTML = `<span class="equip-name">${itm.name}</span>${equipModalStaged[slotIdx] === w ? ' <span class="equip-check">&#10003;</span>' : ''}`;
      div.onclick = () => {
        playSFX('equip');
        div.classList.add('equip-animate');
        setTimeout(() => div.classList.remove('equip-animate'), 390);
        equipModalStaged[slotIdx] = w;
        renderEquipModal();
      };
      list.appendChild(div);
    });
  }

  // ==== SPECIALS MODAL LOGIC ====
  let specialsModalStaged = null;
  function openSpecialsModal() {
    specialsModalStaged = playerState.equippedSpecial;
    specialsModal.style.display = 'flex';
    specialsModal.firstElementChild.classList.remove('pop-in');
    void specialsModal.firstElementChild.offsetWidth;
    specialsModal.firstElementChild.classList.add('pop-in');
    player.style.display = 'none';
    renderSpecialsModal();
  }
  function closeSpecialsModal(save) {
    specialsModal.style.display = 'none';
    if (save) {
      playerState.equippedSpecial = specialsModalStaged;
      playSFX('equip');
    } else playSFX('swoosh');
    player.style.display = 'flex';
    renderPlayerMenu();
  }
  document.getElementById('specials-done-btn').onclick = function () { closeSpecialsModal(true); };
  document.getElementById('specials-unequip-btn').onclick = function () {
    specialsModalStaged = null;
    renderSpecialsModal();
  };
  function renderSpecialsModal() {
    const unlocked = SPECIALS.filter(s => playerState.specials[s.key]);
    const list = document.getElementById('specials-modal-list');
    list.innerHTML = '';
    // REMOVE THE "None" option
    unlocked.forEach(s => {
      const div = document.createElement('div');
      div.className = 'specials-modal-special' + (specialsModalStaged === s.key ? ' selected' : '');
      div.tabIndex = 0;
      div.innerHTML = `<span class="specials-name">${s.name}</span>${specialsModalStaged === s.key ? ' <span class="equip-check">&#10003;</span>' : ''}`;
      div.onclick = () => {
        playSFX('equip');
        div.classList.add('equip-animate');
        setTimeout(() => div.classList.remove('equip-animate'), 390);
        specialsModalStaged = s.key;
        renderSpecialsModal();
      };
      list.appendChild(div);
    });
  }

  // ==== GLOBAL KEYBINDS ====
  window.addEventListener('keydown', e => {
    if (e.key?.toLowerCase() === 'm') {
      playerState.mc += 10000;
      playSFX('microchips');
      updateBalance();
      let c = document.createElement('div');
      c.className = 'chips-float';
      c.textContent = '+10,000';
      let shopBalance = document.querySelector('.shop-balance');
      if (shopBalance) {
        const rect = shopBalance.getBoundingClientRect();
        c.style.left = `${rect.left + rect.width / 2}px`;
        c.style.top = `${rect.top - 16}px`;
        document.body.appendChild(c);
      } else {
        document.body.appendChild(c);
      }
      setTimeout(() => { c.remove(); }, 950);
    }
  });

  // ==== INIT ====
  updateBalance(); updateLevels(); updateShopButtons();
  renderPlayerMenu();
})();
