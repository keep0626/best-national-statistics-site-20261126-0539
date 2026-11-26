// 数览中国 — 手写 SVG 图表。不用任何外部图表库。
// 三个函数：barChart（柱状图）、lineChart（折线图）、donutChart（环形图）。
// 全部返回 SVG 字符串，由 views 拼进页面。

const INK = '#22303a';
const MUTED = '#6b7a82';
const GRID = '#e3ddd0';
const RED = '#c8402a';
const TEAL = '#2e6f6a';
const GOLD = '#b98a2f';
const BLUE = '#3d6e9e';
const SLATE = '#7a8a94';
const PALETTE = [RED, TEAL, GOLD, BLUE, '#8a5a9e', SLATE];

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// 画坐标轴刻度：返回 [min, max, step]，取整到好看的数
function niceScale(values) {
  let max = Math.max(...values);
  let min = Math.min(...values);
  if (min > 0) min = 0;
  if (max === min) max = min + 1;
  const span = max - min;
  const raw = span / 4;
  const mag = Math.pow(10, Math.floor(Math.log10(raw)));
  const norm = raw / mag;
  const step = (norm <= 1 ? 1 : norm <= 2 ? 2 : norm <= 5 ? 5 : 10) * mag;
  max = Math.ceil(max / step) * step;
  min = Math.floor(min / step) * step;
  return { min, max, step };
}

function fmtNum(v) {
  if (Math.abs(v) >= 10000) return (v / 10000).toFixed(1) + '万';
  if (Number.isInteger(v)) return String(v);
  return String(Math.round(v * 100) / 100);
}

// 柱状图：labels 年份，values 数值，unit 单位说明
export function barChart(labels, values, unit, color) {
  const W = 720;
  const H = 300;
  const L = 64;
  const R = 16;
  const T = 26;
  const B = 34;
  const { min, max, step } = niceScale(values);
  const plotW = W - L - R;
  const plotH = H - T - B;
  const y = (v) => T + plotH - ((v - min) / (max - min)) * plotH;
  const slot = plotW / values.length;
  const bw = Math.min(64, slot * 0.58);
  let s = '';
  s += `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="柱状图：${esc(unit)}" class="chart">`;
  for (let v = min; v <= max + 0.0001; v += step) {
    const yy = y(v);
    s += `<line x1="${L}" y1="${yy}" x2="${W - R}" y2="${yy}" stroke="${GRID}" stroke-width="1"/>`;
    s += `<text x="${L - 8}" y="${yy + 4}" text-anchor="end" class="axis">${fmtNum(v)}</text>`;
  }
  s += `<line x1="${L}" y1="${T}" x2="${L}" y2="${H - B}" stroke="${MUTED}" stroke-width="1"/>`;
  s += `<line x1="${L}" y1="${H - B}" x2="${W - R}" y2="${H - B}" stroke="${MUTED}" stroke-width="1"/>`;
  values.forEach((v, i) => {
    const x = L + slot * i + (slot - bw) / 2;
    const top = y(v);
    const fill = i === values.length - 1 ? color : PALETTE[i % PALETTE.length];
    s += `<rect x="${x.toFixed(1)}" y="${top.toFixed(1)}" width="${bw.toFixed(1)}" height="${(H - B - top).toFixed(1)}" rx="3" fill="${fill}"/>`;
    s += `<text x="${(x + bw / 2).toFixed(1)}" y="${(top - 6).toFixed(1)}" text-anchor="middle" class="barval">${fmtNum(v)}</text>`;
    s += `<text x="${(x + bw / 2).toFixed(1)}" y="${H - B + 20}" text-anchor="middle" class="axis">${esc(labels[i])}</text>`;
  });
  s += `<text x="${L}" y="14" class="unit">单位：${esc(unit)}</text>`;
  s += '</svg>';
  return s;
}

// 折线图：可画一条或两条线（series 为 [{name, values, color}]）
export function lineChart(labels, series, unit) {
  const W = 720;
  const H = 300;
  const L = 64;
  const R = 16;
  const T = 30;
  const B = 34;
  const all = series.flatMap((s) => s.values);
  const { min, max, step } = niceScale(all);
  const plotW = W - L - R;
  const plotH = H - T - B;
  const x = (i) => L + (plotW * i) / (labels.length - 1);
  const y = (v) => T + plotH - ((v - min) / (max - min)) * plotH;
  let s = '';
  s += `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="折线图：${esc(unit)}" class="chart">`;
  for (let v = min; v <= max + 0.0001; v += step) {
    const yy = y(v);
    s += `<line x1="${L}" y1="${yy}" x2="${W - R}" y2="${yy}" stroke="${GRID}" stroke-width="1"/>`;
    s += `<text x="${L - 8}" y="${yy + 4}" text-anchor="end" class="axis">${fmtNum(v)}</text>`;
  }
  s += `<line x1="${L}" y1="${T}" x2="${L}" y2="${H - B}" stroke="${MUTED}" stroke-width="1"/>`;
  s += `<line x1="${L}" y1="${H - B}" x2="${W - R}" y2="${H - B}" stroke="${MUTED}" stroke-width="1"/>`;
  series.forEach((ser) => {
    const pts = ser.values.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(' ');
    s += `<polyline points="${pts}" fill="none" stroke="${ser.color}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>`;
    ser.values.forEach((v, i) => {
      s += `<circle cx="${x(i).toFixed(1)}" cy="${y(v).toFixed(1)}" r="4" fill="#fff" stroke="${ser.color}" stroke-width="2"/>`;
      s += `<text x="${x(i).toFixed(1)}" y="${(y(v) - 10).toFixed(1)}" text-anchor="middle" class="barval">${fmtNum(v)}</text>`;
    });
  });
  labels.forEach((lb, i) => {
    s += `<text x="${x(i).toFixed(1)}" y="${H - B + 20}" text-anchor="middle" class="axis">${esc(lb)}</text>`;
  });
  s += `<text x="${L}" y="14" class="unit">单位：${esc(unit)}</text>`;
  if (series.length > 1) {
    let lx = W - R;
    series.forEach((ser) => {
      const w = ser.name.length * 13 + 26;
      lx -= w;
      s += `<rect x="${lx}" y="4" width="12" height="12" rx="2" fill="${ser.color}"/>`;
      s += `<text x="${lx + 17}" y="14" class="unit">${esc(ser.name)}</text>`;
    });
  }
  s += '</svg>';
  return s;
}

// 环形图：parts 为 [{name, share, color}]，share 为百分比数字
export function donutChart(parts, centerLabel) {
  const W = 720;
  const H = 260;
  const cx = 150;
  const cy = 130;
  const r = 96;
  const ir = 62;
  let s = '';
  s += `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="环形图" class="chart">`;
  let a0 = -Math.PI / 2;
  parts.forEach((p) => {
    const a1 = a0 + (p.share / 100) * Math.PI * 2;
    const large = a1 - a0 > Math.PI ? 1 : 0;
    const x0 = cx + r * Math.cos(a0);
    const y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1);
    const y1 = cy + r * Math.sin(a1);
    const x2 = cx + ir * Math.cos(a1);
    const y2 = cy + ir * Math.sin(a1);
    const x3 = cx + ir * Math.cos(a0);
    const y3 = cy + ir * Math.sin(a0);
    s += `<path d="M ${x0.toFixed(1)} ${y0.toFixed(1)} A ${r} ${r} 0 ${large} 1 ${x1.toFixed(1)} ${y1.toFixed(1)} L ${x2.toFixed(1)} ${y2.toFixed(1)} A ${ir} ${ir} 0 ${large} 0 ${x3.toFixed(1)} ${y3.toFixed(1)} Z" fill="${p.color}"/>`;
    a0 = a1;
  });
  s += `<text x="${cx}" y="${cy - 6}" text-anchor="middle" class="donutcenter">${esc(centerLabel)}</text>`;
  s += `<text x="${cx}" y="${cy + 16}" text-anchor="middle" class="donutsub">2024年</text>`;
  parts.forEach((p, i) => {
    const yPos = 52 + i * 52;
    s += `<rect x="330" y="${yPos}" width="14" height="14" rx="3" fill="${p.color}"/>`;
    s += `<text x="354" y="${yPos + 12}" class="legend">${esc(p.name)}：${p.share}%（${esc(p.value || '')}）</text>`;
  });
  s += '</svg>';
  return s;
}
