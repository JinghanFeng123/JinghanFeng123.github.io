/* 冒烟测试：用最小 DOM 桩执行 data.js + main.js，验证渲染无报错 */
const fs = require('fs');
const vm = require('vm');
const path = require('path');

class ClassList {
    constructor() { this.set = new Set(); }
    add(...c) { c.forEach(x => this.set.add(x)); }
    remove(...c) { c.forEach(x => this.set.delete(x)); }
    toggle(c, force) {
        const has = this.set.has(c);
        const want = force === undefined ? !has : !!force;
        want ? this.set.add(c) : this.set.delete(c);
        return want;
    }
    contains(c) { return this.set.has(c); }
}

class El {
    constructor(tag = 'div') {
        this.tagName = tag;
        this.children = [];
        this.fakeChildren = [];
        this.style = {};
        this.dataset = {};
        this.classList = new ClassList();
        this.listeners = {};
        this.textContent = '';
        this.innerHTML = '';
        this.attributes = {};
        this.offsetTop = 0;
    }
    addEventListener(type, fn) { (this.listeners[type] = this.listeners[type] || []).push(fn); }
    setAttribute(k, v) { this.attributes[k] = String(v); }
    getAttribute(k) { return this.attributes[k] === undefined ? null : this.attributes[k]; }
    appendChild(c) { this.children.push(c); this.fakeChildren.push(c); }
    querySelector() { return null; }
    querySelectorAll(sel) {
        const m = sel.match(/\.([\w-]+)/);
        const cls = m && m[1];
        return cls ? this.fakeChildren.filter(c => c.classList.contains(cls)) : [];
    }
    closest() { return null; }
    matches() { return false; }
}

const byId = {};
function el(id) { return byId[id] || (byId[id] = new El('div')); }

const domReady = [];
const document = {
    body: new El('body'),
    hidden: false,
    title: 'test',
    getElementById: el,
    querySelector(sel) {
        const id = sel && sel.startsWith('#') ? sel.slice(1) : sel;
        return el(id);
    },
    querySelectorAll() { return []; },
    addEventListener(type, fn) { if (type === 'DOMContentLoaded') domReady.push(fn); },
    createElement() { return new El('div'); }
};

global.document = document;
global.window = {
    scrollY: 0,
    innerWidth: 1200,
    addEventListener() {},
    matchMedia() { return { matches: false }; }
};
global.IntersectionObserver = class { observe() {} unobserve() {} };
global.setInterval = () => 1;
global.clearInterval = () => {};

vm.runInThisContext(fs.readFileSync(path.join(__dirname, 'js', 'data.js'), 'utf8'));
vm.runInThisContext(fs.readFileSync(path.join(__dirname, 'js', 'main.js'), 'utf8'));

// 模拟作品集页 5 张卡片 + 5 个指示点
const showcase = el('showcase');
for (let i = 0; i < 5; i++) {
    const card = new El('article');
    card.classList.add('window-card');
    showcase.appendChild(card);
    const dot = new El('button');
    dot.classList.add('dot');
    showcase.appendChild(dot);
}

domReady.forEach(fn => fn());

let failed = false;
function assert(cond, name) {
    if (cond) { console.log('PASS  ' + name); }
    else { console.log('FAIL  ' + name); failed = true; }
}

const skillsHtml = el('skills-grid').innerHTML;
assert(skillsHtml.includes('Agent 核心技能'), '技能组「Agent 核心技能」已渲染');
assert(skillsHtml.includes('LangGraph'), '技能「LangGraph」已渲染');
assert(skillsHtml.includes('CC Switch'), '技能「CC Switch」已渲染');
assert(skillsHtml.includes('注意力机制'), '技能「注意力机制」已渲染');
assert(skillsHtml.includes('持续扩充中'), '「持续扩充中」标签已渲染');

const rollsHtml = el('project-rolls').innerHTML;
assert(rollsHtml.includes('ShizukuClaw'), '首页项目条目 ShizukuClaw 已渲染');
assert(rollsHtml.includes('zhisaotong'), '首页项目条目 zhisaotong 已渲染');
assert(rollsHtml.includes('AzumaClaw'), '首页项目条目 AzumaClaw 已渲染');
assert(rollsHtml.includes('project-cover'), '项目封面占位逻辑已生成');

const recordsHtml = el('records-grid').innerHTML;
assert(recordsHtml.includes('沈阳建筑大学'), '教育经历卡片已渲染');
assert(recordsHtml.includes('中软国际大数据挑战赛'), '荣誉卡片已渲染');
assert(recordsHtml.includes('CET-6'), '证书卡片已渲染');

const stackHtml = el('window-stack').innerHTML;
const dotHtml = el('dots').innerHTML;
assert((stackHtml.match(/window-card/g) || []).length === 5, '5 个作品窗口已渲染');
assert(stackHtml.includes('ShizukuClaw'), 'ShizukuClaw 已渲染');
assert(stackHtml.includes('AzumaClaw'), 'AzumaClaw 已渲染');
assert(stackHtml.includes('JinghanFeng123/AzumaClaw'), 'AzumaClaw GitHub 链接已渲染');
assert(stackHtml.includes('霓殇'), '霓殇 已渲染');
assert(stackHtml.includes('window-placeholder'), '占位图逻辑已生成');
assert((dotHtml.match(/class="dot/g) || []).length === 5, '5 个指示点已渲染');
assert(el('slide-count').textContent === '01 / 05', '轮播计数初始化为 01 / 05');
byId['next-btn'].listeners.click[0]();
assert(el('slide-count').textContent === '02 / 05', '点击「下一个」后计数变为 02 / 05');

console.log(failed ? 'SMOKE TEST FAILED' : 'SMOKE TEST PASSED');
process.exit(failed ? 1 : 0);
