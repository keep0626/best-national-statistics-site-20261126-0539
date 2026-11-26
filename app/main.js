// 数览中国 — hash 路由与页面骨架。
// 路由：#/overview #/population #/economy #/employment #/prices #/trade #/regions。
// 每次切换重新渲染 <main>，并把当前栏目标在导航上。
import { VIEWS, NAV, afterRender } from './views.js';

const main = document.getElementById('view');
const nav = document.getElementById('mainnav');

function renderNav(active) {
  nav.innerHTML = NAV.map(([key, label]) =>
    `<a href="#/${key}" class="${key === active ? 'active' : ''}" ${key === active ? 'aria-current="page"' : ''}>${label}</a>`
  ).join('');
}

function route() {
  const key = (location.hash || '#/overview').replace(/^#\//, '').split('?')[0];
  const view = VIEWS[key] || VIEWS.overview;
  const active = VIEWS[key] ? key : 'overview';
  renderNav(active);
  main.innerHTML = view();
  afterRender();
  document.title = `数览中国 · ${NAV.find(([k]) => k === active)[1]}`;
  window.scrollTo(0, 0);
}

window.addEventListener('hashchange', route);
route();
