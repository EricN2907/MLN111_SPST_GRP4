/* Ambient particles for scene movement. */

const ParticleLayer = (() => {
  let canvas;
  let ctx;
  let particles = [];
  let scene = 'office';
  let rafId = null;

  function init() {
    canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    ctx = canvas.getContext('2d');
    resize();
    window.addEventListener('resize', resize);
    setScene(scene);
    tick();
  }

  function resize() {
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(window.innerWidth * dpr);
    canvas.height = Math.floor(window.innerHeight * dpr);
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function setScene(nextScene) {
    scene = nextScene || 'office';
    const count = window.innerWidth < 700 ? 34 : 74;
    particles = Array.from({ length: count }, () => makeParticle(true));
  }

  function makeParticle(randomY = false) {
    const w = window.innerWidth;
    const h = window.innerHeight;
    const profile = {
      protest: { color: 'rgba(230,90,30,0.28)', size: 2.4, vy: -0.35, vx: 0.18 },
      factory: { color: 'rgba(190,170,125,0.16)', size: 2.1, vy: -0.18, vx: 0.08 },
      village: { color: 'rgba(160,220,165,0.13)', size: 2.6, vy: -0.04, vx: 0.24 },
      cyber: { color: 'rgba(52,152,219,0.26)', size: 1.8, vy: 0.42, vx: -0.08 },
      hospital: { color: 'rgba(180,230,255,0.14)', size: 1.9, vy: 0.14, vx: 0.04 },
      classroom: { color: 'rgba(240,220,170,0.13)', size: 2.1, vy: -0.08, vx: 0.1 },
      diplomacy: { color: 'rgba(201,150,26,0.14)', size: 2.2, vy: -0.08, vx: 0.12 },
      parliament: { color: 'rgba(201,150,26,0.13)', size: 2.0, vy: -0.06, vx: 0.05 },
      office: { color: 'rgba(201,150,26,0.11)', size: 1.9, vy: -0.05, vx: 0.04 }
    }[scene] || {};

    return {
      x: Math.random() * w,
      y: randomY ? Math.random() * h : h + 20,
      size: (profile.size || 2) * (0.55 + Math.random()),
      vx: (profile.vx || 0.05) + (Math.random() - 0.5) * 0.25,
      vy: (profile.vy || -0.05) + (Math.random() - 0.5) * 0.16,
      color: profile.color || 'rgba(255,255,255,0.12)',
      pulse: Math.random() * Math.PI * 2
    };
  }

  function tick() {
    if (!ctx || !canvas) return;
    const w = window.innerWidth;
    const h = window.innerHeight;
    ctx.clearRect(0, 0, w, h);

    particles.forEach((p, index) => {
      p.x += p.vx;
      p.y += p.vy;
      p.pulse += 0.025;

      if (p.x < -30 || p.x > w + 30 || p.y < -30 || p.y > h + 30) {
        particles[index] = makeParticle(false);
        return;
      }

      ctx.globalAlpha = 0.65 + Math.sin(p.pulse) * 0.25;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.globalAlpha = 1;
    rafId = requestAnimationFrame(tick);
  }

  function stop() {
    if (rafId) cancelAnimationFrame(rafId);
  }

  return { init, setScene, stop };
})();
