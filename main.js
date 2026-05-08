// ─────────────────────────────────────────────────
// Animated gradient — Sean Halpin technique
// Draw colors onto a tiny 32×32 canvas, CSS scales it
// up. The browser's bilinear interpolation creates a
// silky smooth gradient with zero banding on OLED.
// ─────────────────────────────────────────────────

const canvas = document.getElementById('bg');
const ctx = canvas.getContext('2d');
const SIZE = 32;

// Three "pools" of color that wander around the canvas.
// Each has a hue, position offset, and animation speed.
const pools = [
  { r: 60,  g: 40,  b: 140, baseX: 0.2, baseY: 0.3, speedX: 0.00012, speedY: 0.00009, radius: 0.55 },
  { r: 30,  g: 90,  b: 70,  baseX: 0.8, baseY: 0.7, speedX: -0.00010, speedY: 0.00013, radius: 0.5  },
  { r: 130, g: 50,  b: 90,  baseX: 0.5, baseY: 0.5, speedX: 0.00011, speedY: -0.00010, radius: 0.45 }
];

const baseColor = { r: 10, g: 10, b: 16 };

function render(t) {
  const img = ctx.createImageData(SIZE, SIZE);
  const data = img.data;

  // Move pool centers in slow loops
  const centers = pools.map(p => ({
    x: p.baseX + Math.sin(t * p.speedX) * 0.3,
    y: p.baseY + Math.cos(t * p.speedY) * 0.3,
    r: p.r, g: p.g, b: p.b, radius: p.radius
  }));

  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      let r = baseColor.r, g = baseColor.g, b = baseColor.b;

      // Blend each pool based on distance
      for (const c of centers) {
        const dx = (x / SIZE) - c.x;
        const dy = (y / SIZE) - c.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const fall = Math.max(0, 1 - dist / c.radius);
        const w = fall * fall;            // smooth falloff
        r += c.r * w;
        g += c.g * w;
        b += c.b * w;
      }

      const i = (y * SIZE + x) * 4;
      data[i]     = Math.min(255, r);
      data[i + 1] = Math.min(255, g);
      data[i + 2] = Math.min(255, b);
      data[i + 3] = 255;
    }
  }

  ctx.putImageData(img, 0, 0);
  requestAnimationFrame(render);
}

requestAnimationFrame(render);

// ─────────────────────────────────────────────────
// Name letter animation
// ─────────────────────────────────────────────────
const lines = [
  { text: 'Jiří',         gold: false },
  { text: 'Pohořelický',  gold: true  }
];

const nameEl = document.getElementById('name');
let delay = 0.5;

lines.forEach(line => {
  const lineEl = document.createElement('span');
  lineEl.className = 'line';

  [...line.text].forEach(ch => {
    const span = document.createElement('span');
    span.className = 'char' + (line.gold ? ' gold' : '');
    span.textContent = ch;
    span.style.animationDelay = delay + 's';
    delay += 0.04;
    lineEl.appendChild(span);
  });

  nameEl.appendChild(lineEl);
  delay += 0.1;
});
