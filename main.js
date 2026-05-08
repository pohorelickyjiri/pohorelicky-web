const lines = [
  { text: "Jiří",        gold: false },
  { text: "Pohořelický", gold: true  }
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
    delay += 0.045;
    lineEl.appendChild(span);
  });

  nameEl.appendChild(lineEl);
  delay += 0.1;
});
