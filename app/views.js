// 数览中国 — 各栏目的渲染。每个栏目返回 HTML 字符串；
// afterRender 在页面插入后接管控件（图表切换、表格排序、搜索筛选）。
import {
  SOURCE, SOURCE_SHORT, KPIS, YEARS, GDP_SERIES, GDP_STRUCTURE, ECONOMY_FACTS,
  GRAIN_SERIES, INCOME_SERIES, POP_SERIES, POP_2024, BIRTH_RATE, DEATH_RATE,
  UNEMPLOYMENT_SERIES, EMPLOYMENT_2024, CPI_SERIES, PPI_SERIES, PRICE_2024,
  TRADE_TOTAL, TRADE_EXPORT, TRADE_IMPORT, TRADE_2024, REGIONS, REGION_NOTES,
} from './data.js';
import { barChart, lineChart, donutChart } from './charts.js';

const RED = '#c8402a';
const TEAL = '#2e6f6a';
const GOLD = '#b98a2f';
const BLUE = '#3d6e9e';

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function sourceNote() {
  return `<p class="source">数据来源：${esc(SOURCE)}。数字按公报取整呈现；未核实的精确小数不收录。</p>`;
}

function sectionHead(title, intro) {
  return `<h1>${esc(title)}</h1><p class="intro">${esc(intro)}</p>`;
}

// 可排序表格：headers 为 [显示名, 键名]，rows 为对象数组
function sortableTable(id, headers, rows, renderRow) {
  const th = headers.map(([label, key]) => `<th data-table="${id}" data-key="${key}" tabindex="0">${esc(label)} <span class="sortmark">↕</span></th>`).join('');
  const body = rows.map(renderRow).join('');
  return `<table class="data" id="tbl-${id}"><thead><tr>${th}</tr></thead><tbody>${body}</tbody></table>`;
}

// 图表切换块：id 唯一；barHtml / lineHtml 由调用方给出
function chartBlock(id, title, barHtml, lineHtml, defKind) {
  const kind = defKind || 'bar';
  const html = kind === 'bar' ? barHtml : lineHtml;
  return `<div class="chartbox" data-chartbox="${id}">
    <div class="charthead"><h2>${esc(title)}</h2>
      <div class="toggle" role="group" aria-label="图表类型">
        <button type="button" data-kind="bar" class="${kind === 'bar' ? 'on' : ''}">柱状图</button>
        <button type="button" data-kind="line" class="${kind === 'line' ? 'on' : ''}">折线图</button>
      </div>
    </div>
    <div class="chartbody" data-chartbody>${html}</div>
  </div>`;
}

// 切换时要用的两种渲染，存在内存里
const CHART_VARIANTS = {};
function registerChart(id, barHtml, lineHtml) {
  CHART_VARIANTS[id] = { bar: barHtml, line: lineHtml };
}

const yearLabels = YEARS.map(String);

// ---------------- 总览 ----------------
export function viewOverview() {
  const kpis = KPIS.map((k) => `<div class="kpi">
      <div class="kpi-label">${esc(k.label)}</div>
      <div class="kpi-value">${esc(k.value)}<span class="kpi-unit">${esc(k.unit)}</span></div>
      <div class="kpi-change">${esc(k.change)}</div>
      <div class="kpi-note">${esc(k.note)}</div>
    </div>`).join('');
  registerChart('gdp',
    barChart(yearLabels, GDP_SERIES, '万亿元', RED),
    lineChart(yearLabels, [{ name: 'GDP', values: GDP_SERIES, color: RED }], '万亿元'));
  const links = [
    ['#/population', '人口', '14.08 亿人，城镇化率 67.00%'],
    ['#/economy', '经济', 'GDP 134.9 万亿元，增长 5.0%'],
    ['#/employment', '就业', '城镇新增就业 1,256 万人'],
    ['#/prices', '物价', 'CPI 上涨 0.2%，PPI 下降 2.2%'],
    ['#/trade', '贸易', '进出口 43.85 万亿元'],
    ['#/regions', '地区', '广东 14.16 万亿元居首'],
  ].map(([href, name, desc]) => `<a class="navcard" href="${href}"><strong>${esc(name)}</strong><span>${esc(desc)}</span></a>`).join('');
  return `${sectionHead('中国经济社会发展 · 2024年一览', '本站收录国家统计局《2024年国民经济和社会发展统计公报》的 headline 数字：总量、结构与五年变化。全部数字标明年份与来源，只取公报原数，不编造。')}
  <div class="kpis">${kpis}</div>
  ${chartBlock('gdp', '国内生产总值 2020—2024年', CHART_VARIANTS.gdp.bar, CHART_VARIANTS.gdp.line, 'bar')}
  <h2>按栏目浏览</h2>
  <div class="navcards">${links}</div>
  ${sourceNote()}`;
}

// ---------------- 人口 ----------------
export function viewPopulation() {
  registerChart('pop',
    barChart(yearLabels, POP_SERIES, '万人', TEAL),
    lineChart(yearLabels, [{ name: '年末总人口', values: POP_SERIES, color: TEAL }], '万人'));
  registerChart('birthdeath',
    lineChart(yearLabels, [
      { name: '出生率', values: BIRTH_RATE, color: RED },
      { name: '死亡率', values: DEATH_RATE, color: BLUE },
    ], '‰'),
    barChart(yearLabels, BIRTH_RATE, '‰（出生率）', RED));
  const rows = POP_2024.map((r) => `<tr><td>${esc(r.item)}</td><td class="num">${esc(r.value)}</td><td>${esc(r.note)}</td></tr>`).join('');
  return `${sectionHead('人口', '2024年末全国人口 14.08 亿人，比上年末减少 139 万人，连续第三年下降。城镇常住人口占 67.00%，60岁及以上人口占 22.0%。')}
  ${chartBlock('pop', '年末总人口 2020—2024年', CHART_VARIANTS.pop.bar, CHART_VARIANTS.pop.line, 'bar')}
  ${chartBlock('birthdeath', '出生率与死亡率 2020—2024年', CHART_VARIANTS.birthdeath.bar, CHART_VARIANTS.birthdeath.line, 'line')}
  <h2>2024年人口主要指标</h2>
  <table class="data"><thead><tr><th>指标</th><th>数值</th><th>说明</th></tr></thead><tbody>${rows}</tbody></table>
  ${sourceNote()}`;
}

// ---------------- 经济 ----------------
export function viewEconomy() {
  registerChart('gdp2',
    barChart(yearLabels, GDP_SERIES, '万亿元', RED),
    lineChart(yearLabels, [{ name: 'GDP', values: GDP_SERIES, color: RED }], '万亿元'));
  registerChart('grain',
    barChart(yearLabels, GRAIN_SERIES, '万吨', GOLD),
    lineChart(yearLabels, [{ name: '粮食产量', values: GRAIN_SERIES, color: GOLD }], '万吨'));
  const donut = donutChart(
    GDP_STRUCTURE.map((g, i) => ({ name: g.name, share: g.share, value: g.value, color: [TEAL, BLUE, GOLD][i] })),
    '三次产业');
  const rows = ECONOMY_FACTS.map((f) => `<tr><td>${esc(f.item)}</td><td class="num">${esc(f.value)}</td><td class="num">${esc(f.change)}</td></tr>`).join('');
  return `${sectionHead('经济', '2024年国内生产总值 134.9 万亿元，比上年增长 5.0%。三次产业中，第三产业占 56.7%，第二产业占 36.5%，第一产业占 6.8%。人均国内生产总值 95,749 元。')}
  ${chartBlock('gdp2', '国内生产总值 2020—2024年', CHART_VARIANTS.gdp2.bar, CHART_VARIANTS.gdp2.line, 'bar')}
  <div class="chartbox"><div class="charthead"><h2>三次产业结构 2024年</h2></div><div class="chartbody">${donut}</div></div>
  ${chartBlock('grain', '粮食总产量 2020—2024年', CHART_VARIANTS.grain.bar, CHART_VARIANTS.grain.line, 'bar')}
  <h2>2024年主要经济指标</h2>
  <table class="data"><thead><tr><th>指标</th><th>数值</th><th>比上年</th></tr></thead><tbody>${rows}</tbody></table>
  ${sourceNote()}`;
}

// ---------------- 就业 ----------------
export function viewEmployment() {
  registerChart('income',
    barChart(yearLabels, INCOME_SERIES, '元', TEAL),
    lineChart(yearLabels, [{ name: '人均可支配收入', values: INCOME_SERIES, color: TEAL }], '元'));
  registerChart('unemp',
    barChart(yearLabels, UNEMPLOYMENT_SERIES, '%', BLUE),
    lineChart(yearLabels, [{ name: '调查失业率', values: UNEMPLOYMENT_SERIES, color: BLUE }], '%'));
  const rows = EMPLOYMENT_2024.map((r) => `<tr><td>${esc(r.item)}</td><td class="num">${esc(r.value)}</td><td>${esc(r.note)}</td></tr>`).join('');
  return `${sectionHead('就业与收入', '2024年城镇新增就业 1,256 万人，全国城镇调查失业率年均 5.1%。居民人均可支配收入 41,314 元，比上年名义增长 5.3%，扣除价格因素实际增长 5.1%。')}
  ${chartBlock('income', '居民人均可支配收入 2020—2024年', CHART_VARIANTS.income.bar, CHART_VARIANTS.income.line, 'bar')}
  ${chartBlock('unemp', '全国城镇调查失业率 2020—2024年（年均）', CHART_VARIANTS.unemp.bar, CHART_VARIANTS.unemp.line, 'bar')}
  <h2>2024年就业与收入主要指标</h2>
  <table class="data"><thead><tr><th>指标</th><th>数值</th><th>说明</th></tr></thead><tbody>${rows}</tbody></table>
  ${sourceNote()}`;
}

// ---------------- 物价 ----------------
export function viewPrices() {
  registerChart('cpi',
    barChart(yearLabels, CPI_SERIES, '%', RED),
    lineChart(yearLabels, [
      { name: 'CPI', values: CPI_SERIES, color: RED },
      { name: 'PPI', values: PPI_SERIES, color: BLUE },
    ], '%'));
  registerChart('ppi',
    barChart(yearLabels, PPI_SERIES, '%', BLUE),
    lineChart(yearLabels, [{ name: 'PPI', values: PPI_SERIES, color: BLUE }], '%'));
  const rows = PRICE_2024.map((r) => `<tr><td>${esc(r.item)}</td><td class="num">${esc(r.value)}</td><td>${esc(r.note)}</td></tr>`).join('');
  return `${sectionHead('物价', '2024年居民消费价格（CPI）比上年上涨 0.2%，其中食品价格下降 0.6%，扣除食品和能源的核心 CPI 上涨 0.5%。工业生产者出厂价格（PPI）比上年下降 2.2%。')}
  ${chartBlock('cpi', 'CPI 与 PPI 涨幅 2020—2024年', CHART_VARIANTS.cpi.bar, CHART_VARIANTS.cpi.line, 'line')}
  ${chartBlock('ppi', '工业生产者出厂价格涨幅 2020—2024年', CHART_VARIANTS.ppi.bar, CHART_VARIANTS.ppi.line, 'bar')}
  <h2>2024年物价主要指标</h2>
  <table class="data"><thead><tr><th>指标</th><th>数值</th><th>说明</th></tr></thead><tbody>${rows}</tbody></table>
  ${sourceNote()}`;
}

// ---------------- 贸易 ----------------
export function viewTrade() {
  registerChart('trade',
    barChart(yearLabels, TRADE_TOTAL, '万亿元', GOLD),
    lineChart(yearLabels, [
      { name: '出口', values: TRADE_EXPORT, color: RED },
      { name: '进口', values: TRADE_IMPORT, color: BLUE },
    ], '万亿元'));
  registerChart('trade2',
    lineChart(yearLabels, [
      { name: '出口', values: TRADE_EXPORT, color: RED },
      { name: '进口', values: TRADE_IMPORT, color: BLUE },
    ], '万亿元'),
    barChart(yearLabels, TRADE_EXPORT, '万亿元（出口）', RED));
  const rows = TRADE_2024.map((r) => `<tr><td>${esc(r.item)}</td><td class="num">${esc(r.value)}</td><td>${esc(r.note)}</td></tr>`).join('');
  return `${sectionHead('贸易', '2024年货物进出口总额 43.85 万亿元，比上年增长 5.0%。其中出口 25.45 万亿元，增长 7.1%；进口 18.39 万亿元，增长 2.3%；货物贸易顺差 7.06 万亿元。')}
  ${chartBlock('trade', '货物进出口总额 2020—2024年', CHART_VARIANTS.trade.bar, CHART_VARIANTS.trade.line, 'bar')}
  ${chartBlock('trade2', '出口与进口 2020—2024年', CHART_VARIANTS.trade2.bar, CHART_VARIANTS.trade2.line, 'line')}
  <h2>2024年贸易主要指标</h2>
  <table class="data"><thead><tr><th>指标</th><th>数值</th><th>说明</th></tr></thead><tbody>${rows}</tbody></table>
  ${sourceNote()}`;
}

// ---------------- 地区 ----------------
export function viewRegions() {
  const max = Math.max(...REGIONS.map((r) => r.gdp));
  const bars = REGIONS.map((r) => {
    const w = ((r.gdp / max) * 100).toFixed(1);
    return `<div class="hbar"><span class="hbar-name">${esc(r.name)}</span>
      <div class="hbar-track"><div class="hbar-fill" style="width:${w}%"></div></div>
      <span class="hbar-val">${r.gdp.toFixed(2)}万亿元</span></div>`;
  }).join('');
  const table = sortableTable('regions',
    [['名次', 'rank'], ['省份', 'name'], ['生产总值（万亿元）', 'gdp']],
    [...REGIONS],
    (r) => `<tr><td class="num">${r.rank}</td><td>${esc(r.name)}</td><td class="num">${r.gdp.toFixed(2)}</td></tr>`);
  const notes = REGION_NOTES.map((n) => `<div class="regionnote"><strong>${esc(n.region)}</strong><p>${esc(n.text)}</p></div>`).join('');
  return `${sectionHead('地区', '2024年各省（自治区、直辖市）生产总值：广东 14.16 万亿元、江苏 13.70 万亿元居前两位。下表为前八名（初步核算数），可按名次、省份或数值排序，也可在搜索框里筛选。')}
  <div class="chartbox"><div class="charthead"><h2>生产总值前八名 2024年</h2></div><div class="chartbody">${bars}</div></div>
  <h2>前八名一览</h2>
  <label class="searchlabel">搜索省份 <input type="search" id="region-search" placeholder="输入省份，如 浙江" aria-label="搜索省份"></label>
  ${table}
  <p class="hint">点击表头可按该列排序；搜索框输入文字可筛选省份。</p>
  <h2>分区域看点</h2>
  <div class="regionnotes">${notes}</div>
  <p class="source">数据来源：${esc(SOURCE_SHORT)}及各省统计公报初步核算数。省份生产总值为初步核算数，四舍五入后合计数与全国数略有出入属正常。</p>`;
}

// 栏目注册表
export const VIEWS = {
  overview: viewOverview,
  population: viewPopulation,
  economy: viewEconomy,
  employment: viewEmployment,
  prices: viewPrices,
  trade: viewTrade,
  regions: viewRegions,
};

export const NAV = [
  ['overview', '总览'],
  ['population', '人口'],
  ['economy', '经济'],
  ['employment', '就业'],
  ['prices', '物价'],
  ['trade', '贸易'],
  ['regions', '地区'],
];

// 渲染后绑定控件
export function afterRender() {
  // 图表切换
  document.querySelectorAll('[data-chartbox]').forEach((box) => {
    const id = box.getAttribute('data-chartbox');
    const body = box.querySelector('[data-chartbody]');
    box.querySelectorAll('button[data-kind]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const kind = btn.getAttribute('data-kind');
        if (!CHART_VARIANTS[id]) return;
        body.innerHTML = CHART_VARIANTS[id][kind];
        box.querySelectorAll('button[data-kind]').forEach((b) => b.classList.toggle('on', b === btn));
      });
    });
  });
  // 地区搜索
  const search = document.getElementById('region-search');
  if (search) {
    search.addEventListener('input', () => {
      const q = search.value.trim();
      document.querySelectorAll('#tbl-regions tbody tr').forEach((tr) => {
        tr.style.display = tr.textContent.includes(q) ? '' : 'none';
      });
    });
  }
  // 表格排序（点击表头）
  document.querySelectorAll('th[data-table]').forEach((th) => {
    const sort = () => {
      const table = document.getElementById(`tbl-${th.getAttribute('data-table')}`);
      if (!table) return;
      const key = th.getAttribute('data-key');
      const idx = [...th.parentNode.children].indexOf(th);
      const tbody = table.querySelector('tbody');
      const rows = [...tbody.querySelectorAll('tr')];
      const asc = th.getAttribute('data-dir') !== 'asc';
      rows.sort((a, b) => {
        const av = a.children[idx].textContent.trim();
        const bv = b.children[idx].textContent.trim();
        const an = parseFloat(av);
        const bn = parseFloat(bv);
        if (!Number.isNaN(an) && !Number.isNaN(bn)) return asc ? an - bn : bn - an;
        return asc ? av.localeCompare(bv, 'zh') : bv.localeCompare(av, 'zh');
      });
      rows.forEach((r) => tbody.appendChild(r));
      th.setAttribute('data-dir', asc ? 'asc' : 'desc');
      table.querySelectorAll('th .sortmark').forEach((m) => { m.textContent = '↕'; });
      th.querySelector('.sortmark').textContent = asc ? '↑' : '↓';
    };
    th.addEventListener('click', sort);
    th.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); sort(); } });
  });
}
