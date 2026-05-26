/* Dramatic VN/courtroom-anime scene overrides. */

function animeWindowGrid(x, y, w, h, cols, rows, fill = 'rgba(255,222,134,0.24)') {
  const cells = [];
  const gap = 7;
  const cw = (w - gap * (cols - 1)) / cols;
  const ch = (h - gap * (rows - 1)) / rows;
  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      cells.push(`<rect x="${x + c * (cw + gap)}" y="${y + r * (ch + gap)}" width="${cw}" height="${ch}" rx="2" fill="${fill}" opacity="${0.46 + ((r + c) % 3) * 0.14}"/>`);
    }
  }
  return cells.join('');
}

function speedClouds(count, color = 'rgba(255,255,255,0.28)') {
  return Array.from({ length: count }, (_, i) => {
    const x = 40 + (i * 137) % 850;
    const y = 48 + (i * 57) % 210;
    return `<ellipse class="scene-anim-slow" cx="${x}" cy="${y}" rx="${54 + i % 4 * 18}" ry="${12 + i % 3 * 5}" fill="${color}" opacity="${0.22 + i % 4 * 0.08}"/>`;
  }).join('');
}

function crowd(count) {
  return Array.from({ length: count }, (_, i) => {
    const x = 14 + i * 24;
    const y = 506 + (i % 5) * 7;
    const body = ['#23304a', '#3c2234', '#273d2e', '#49311f'][i % 4];
    return `<path d="M${x - 9},${y + 43} Q${x},${y + 9} ${x + 9},${y + 43} Z" fill="${body}" stroke="#111019" stroke-width="1.4"/>
      <circle cx="${x}" cy="${y + 8}" r="7" fill="#30221f" stroke="#111019" stroke-width="1"/>`;
  }).join('');
}

function chain(points, scale = 1) {
  return points.map(([x, y, rot], i) => `
    <g transform="translate(${x} ${y}) rotate(${rot}) scale(${scale})">
      <rect x="-18" y="-8" width="36" height="16" rx="8" fill="none" stroke="#8d9690" stroke-width="5"/>
      <rect x="-10" y="-4" width="20" height="8" rx="4" fill="#59625f" opacity="0.38"/>
    </g>
  `).join('');
}

function columns() {
  return [86, 206, 694, 814].map((x) => `
    <g>
      <rect x="${x - 19}" y="72" width="38" height="372" rx="4" fill="#d8d0b5" opacity="0.28" stroke="#fff2c8" stroke-opacity="0.2" stroke-width="2"/>
      <rect x="${x - 30}" y="58" width="60" height="18" rx="3" fill="#f2d98d" opacity="0.28"/>
      <rect x="${x - 28}" y="438" width="56" height="18" rx="3" fill="#f2d98d" opacity="0.22"/>
      <path d="M${x-10},88 V425 M${x+10},88 V425" stroke="#423b42" stroke-opacity="0.18" stroke-width="2"/>
    </g>
  `).join('');
}

SCENE_RENDERERS.office = () => `
  <img src="assets/office.png" style="width: 100vw; height: 100vh; object-fit: cover; opacity: 0.85;" />
`;

SCENE_RENDERERS.factory = () => `
  <img src="assets/factory.png" style="width: 100vw; height: 100vh; object-fit: cover; opacity: 0.85;" />
`;

SCENE_RENDERERS.protest = () => `
  <img src="assets/protest.png" style="width: 100vw; height: 100vh; object-fit: cover; opacity: 0.85;" />
`;

SCENE_RENDERERS.village = () => `
  <img src="assets/village.png" style="width: 100vw; height: 100vh; object-fit: cover; opacity: 0.85;" />
`;

SCENE_RENDERERS.parliament = () => `
  <img src="assets/parliament.png" style="width: 100vw; height: 100vh; object-fit: cover; opacity: 0.85;" />
`;

SCENE_RENDERERS.hospital = () => `
  <img src="assets/hospital.png" style="width: 100vw; height: 100vh; object-fit: cover; opacity: 0.85;" />
`;

SCENE_RENDERERS.cyber = () => `
  <img src="assets/cyber.png" style="width: 100vw; height: 100vh; object-fit: cover; opacity: 0.85;" />
`;

SCENE_RENDERERS.classroom = () => `
  <img src="assets/classroom.png" style="width: 100vw; height: 100vh; object-fit: cover; opacity: 0.85;" />
`;

SCENE_RENDERERS.diplomacy = () => `
  <img src="assets/diplomacy.png" style="width: 100vw; height: 100vh; object-fit: cover; opacity: 0.85;" />
`;
