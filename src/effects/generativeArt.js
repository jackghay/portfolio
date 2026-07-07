export function initGenerativeArt() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let dots = [];
  const dotCount = 80;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  function createDots() {
    const seed = hashString(navigator.userAgent + new Date().toDateString());
    dots = [];
    for (let i = 0; i < dotCount; i++) {
      dots.push({
        x: seededRandom(seed + i * 3) * width,
        y: seededRandom(seed + i * 3 + 1) * height,
        vx: (seededRandom(seed + i * 3 + 2) - 0.5) * 0.3,
        vy: (seededRandom(seed + i * 3 + 3) - 0.5) * 0.3,
        r: seededRandom(seed + i * 3 + 4) * 2 + 0.5,
      });
    }
  }

  function hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash);
  }

  function seededRandom(seed) {
    const x = Math.sin(seed + 1) * 10000;
    return x - Math.floor(x);
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    const style = getComputedStyle(document.documentElement);
    const accent = style.getPropertyValue('--accent').trim() || '#00d4ff';

    dots.forEach((dot, i) => {
      dot.x += dot.vx;
      dot.y += dot.vy;

      if (dot.x < 0) dot.x = width;
      if (dot.x > width) dot.x = 0;
      if (dot.y < 0) dot.y = height;
      if (dot.y > height) dot.y = 0;

      ctx.beginPath();
      ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
      ctx.fillStyle = accent;
      ctx.globalAlpha = 0.3;
      ctx.fill();

      for (let j = i + 1; j < dots.length; j++) {
        const dx = dot.x - dots[j].x;
        const dy = dot.y - dots[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          ctx.beginPath();
          ctx.moveTo(dot.x, dot.y);
          ctx.lineTo(dots[j].x, dots[j].y);
          ctx.strokeStyle = accent;
          ctx.globalAlpha = 0.08 * (1 - dist / 150);
          ctx.stroke();
        }
      }
    });

    ctx.globalAlpha = 1;
    requestAnimationFrame(draw);
  }

  resize();
  createDots();
  draw();
  window.addEventListener('resize', () => {
    resize();
    createDots();
  });

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    canvas.style.display = 'none';
  }
}
