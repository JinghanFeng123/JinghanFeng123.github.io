/* ============================================================
 * 页面逻辑：导航、滚动动画、技能渲染、项目展示、荣誉时间线、作品轮播
 * ============================================================ */
(function () {
    'use strict';

    const $ = (sel, root) => (root || document).querySelector(sel);
    const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

    /* ---------- 顶部导航：滚动状态 + 移动端菜单 ---------- */
    function initNav() {
        const header = $('#header');
        const hamburger = $('#hamburger');
        const menu = $('#nav-menu');

        if (hamburger && menu) {
            hamburger.addEventListener('click', () => {
                const open = menu.classList.toggle('active');
                hamburger.classList.toggle('active', open);
                hamburger.setAttribute('aria-expanded', String(open));
                document.body.classList.toggle('menu-open', open);
            });

            $$('.nav-link', menu).forEach(link => {
                link.addEventListener('click', () => {
                    menu.classList.remove('active');
                    hamburger.classList.remove('active');
                    hamburger.setAttribute('aria-expanded', 'false');
                    document.body.classList.remove('menu-open');
                });
            });
        }

        if (header) {
            let lastY = window.scrollY;
            window.addEventListener('scroll', () => {
                const y = window.scrollY;
                header.classList.toggle('fixed', y > 40);
                if (y > 120 && y > lastY) {
                    header.classList.add('hidden');
                } else {
                    header.classList.remove('hidden');
                }
                lastY = y;
            }, { passive: true });
        }
    }

    /* ---------- 滚动渐入动画 ---------- */
    function initReveal() {
        const els = $$('.reveal');
        if (!('IntersectionObserver' in window)) {
            els.forEach(el => el.classList.add('visible'));
            return;
        }
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });
        els.forEach(el => observer.observe(el));
    }

    /* ---------- 提示气泡 ---------- */
    let toastTimer = null;
    function showToast(text) {
        const toast = $('#toast');
        if (!toast) return;
        toast.textContent = text;
        toast.classList.add('show');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
    }

    /* ---------- 技术栈渲染（首页） ---------- */
    function renderSkills() {
        const grid = $('#skills-grid');
        if (!grid || !RESUME_DATA || !Array.isArray(RESUME_DATA.skills)) return;

        grid.innerHTML = RESUME_DATA.skills.map((group, gi) => `
            <div class="skill-group glass-effect reveal" style="--d:${gi * 0.08}s">
                <div class="skill-group-head">
                    <span class="skill-index eng">0${gi + 1}</span>
                    <h3 class="skill-group-title">${group.group}</h3>
                </div>
                <div class="skill-chips">
                    ${group.items.map(item => `<span class="skill-chip">${item}</span>`).join('')}
                    <span class="skill-chip skill-chip-add" title="持续扩充中">＋ 持续扩充中</span>
                </div>
            </div>
        `).join('');

        $$('.skill-chip-add', grid).forEach(chip => {
            chip.addEventListener('click', () => {
                showToast('打开 js/data.js，在 skills 数组里新增一项即可随时扩充技术栈 ✦');
            });
        });
    }

    /* ---------- 首页：项目展示（SHIFT UP 式滚动条目） ---------- */
    function renderProjectRolls() {
        const wrap = $('#project-rolls');
        if (!wrap || !RESUME_DATA || !Array.isArray(RESUME_DATA.works)) return;

        wrap.innerHTML = RESUME_DATA.works.map((w, i) => `
            <article class="project-roll reveal" style="--d:${i * 0.05}s">
                <div class="project-media">
                    ${w.image
                        ? `<img src="${w.image}" alt="${w.title}" loading="lazy">`
                        : `<div class="project-cover" aria-hidden="true">
                                <span class="cover-grid"></span>
                                <span class="cover-index eng">0${i + 1}</span>
                                <span class="cover-name">${w.title}</span>
                            </div>`}
                    <div class="project-media-badge eng">${w.badge || w.status.split('·')[0].trim()}</div>
                </div>
                <div class="project-info">
                    <p class="project-period eng">${w.period}</p>
                    <h3 class="project-title">${w.title}</h3>
                    <p class="project-status">${w.status}</p>
                    <p class="project-desc">${w.description}</p>
                    <div class="project-tags">
                        ${w.tags.map(t => `<span class="tag">${t}</span>`).join('')}
                    </div>
                    <div class="project-links">
                        ${w.links && w.links.github
                            ? `<a class="more_btn kor" href="${w.links.github}" target="_blank" rel="noopener"><em>VIEW GITHUB</em></a>`
                            : ''}
                        ${w.links && w.links.demo
                            ? `<a class="more_btn more_btn-white kor" href="${w.links.demo}" target="_blank" rel="noopener"><em>ONLINE DEMO</em></a>`
                            : ''}
                    </div>
                </div>
            </article>
        `).join('');
    }

    /* ---------- 首页：荣誉 / 经历时间线（新闻式卡片） ---------- */
    function renderRecords() {
        const grid = $('#records-grid');
        if (!grid || !RESUME_DATA || !Array.isArray(RESUME_DATA.records)) return;

        grid.innerHTML = RESUME_DATA.records.map((r, i) => `
            <a class="record-card${r.accent === 'green' ? ' accent-green' : ''} reveal" href="mailto:${RESUME_DATA.email}" style="--d:${(i % 3) * 0.07}s">
                <div class="record-thumb">
                    <span class="record-thumb-index eng">0${i + 1}</span>
                    <span class="record-thumb-cat eng">${r.category}</span>
                </div>
                <div class="record-body">
                    <p class="record-date eng">${r.date}</p>
                    <h3 class="record-title">${r.title}</h3>
                    <p class="record-desc">${r.desc}</p>
                </div>
            </a>
        `).join('');
    }

    /* ---------- 作品集页：轮播窗口渲染 ---------- */
    function renderWorks() {
        const stack = $('#window-stack');
        const dotsBox = $('#dots');
        if (!stack || !RESUME_DATA || !Array.isArray(RESUME_DATA.works)) return;

        const works = RESUME_DATA.works;
        stack.innerHTML = works.map((w, i) => `
            <article class="window-card${i === 0 ? ' active' : ''}" data-index="${i}">
                <div class="window-titlebar">
                    <span class="traffic-dots"><i></i><i></i><i></i></span>
                    <span class="window-address eng">${w.title} · ${w.period}</span>
                </div>
                <div class="window-body">
                    ${w.image
                        ? `<img src="${w.image}" alt="${w.title}" loading="lazy">`
                        : `<div class="window-placeholder">
                                <span class="cover-grid"></span>
                                <span class="placeholder-index eng">0${i + 1}</span>
                                <p class="placeholder-name">${w.title}</p>
                                <p class="muted">${w.period}</p>
                            </div>`}
                    ${w.status ? `<span class="status-badge">${w.status}</span>` : ''}
                </div>
                <div class="window-footer">
                    <h3>${w.title}</h3>
                    <p>${w.description}</p>
                    ${w.tags && w.tags.length
                        ? `<div class="project-tags">${w.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>`
                        : ''}
                    <div class="window-links">
                        ${w.links && w.links.github
                            ? `<a class="window-link eng" href="${w.links.github}" target="_blank" rel="noopener">VIEW GITHUB</a>`
                            : ''}
                        ${w.links && w.links.demo
                            ? `<a class="window-link eng" href="${w.links.demo}" target="_blank" rel="noopener">ONLINE DEMO</a>`
                            : ''}
                        ${(!w.links || (!w.links.github && !w.links.demo))
                            ? '<span class="muted">链接待补充</span>'
                            : ''}
                    </div>
                </div>
            </article>
        `).join('');

        if (dotsBox) {
            dotsBox.innerHTML = works.map((_, i) =>
                `<button class="dot${i === 0 ? ' active' : ''}" data-index="${i}" aria-label="第 ${i + 1} 个作品"></button>`
            ).join('');
        }
    }

    /* ---------- 作品集页：轮播交互（自动播放 + 键盘 + 触摸） ---------- */
    function initShowcase() {
        const showcase = $('#showcase');
        if (!showcase) return;

        const cards = $$('.window-card', showcase);
        const dots = $$('.dot', showcase);
        const counter = $('#slide-count');
        const INTERVAL = 5000;
        let current = 0;
        let timer = null;

        function goTo(index) {
            current = (index + cards.length) % cards.length;
            cards.forEach((card, i) => card.classList.toggle('active', i === current));
            dots.forEach((dot, i) => dot.classList.toggle('active', i === current));
            if (counter) counter.textContent = `${String(current + 1).padStart(2, '0')} / ${String(cards.length).padStart(2, '0')}`;
        }

        const next = () => goTo(current + 1);
        const prev = () => goTo(current - 1);

        function start() {
            stop();
            timer = setInterval(next, INTERVAL);
        }

        function stop() {
            if (timer) {
                clearInterval(timer);
                timer = null;
            }
        }

        $('#prev-btn').addEventListener('click', () => { prev(); start(); });
        $('#next-btn').addEventListener('click', () => { next(); start(); });

        dots.forEach(dot => {
            dot.addEventListener('click', () => { goTo(Number(dot.dataset.index)); start(); });
        });

        showcase.addEventListener('mouseenter', stop);
        showcase.addEventListener('mouseleave', start);

        let startX = 0;
        showcase.addEventListener('touchstart', e => {
            startX = e.touches[0].clientX;
            stop();
        }, { passive: true });
        showcase.addEventListener('touchend', e => {
            const dx = e.changedTouches[0].clientX - startX;
            if (Math.abs(dx) > 50) {
                dx > 0 ? prev() : next();
            }
            start();
        }, { passive: true });

        document.addEventListener('keydown', e => {
            if (e.target.matches('input, textarea, select')) return;
            if (e.key === 'ArrowLeft') { prev(); start(); }
            if (e.key === 'ArrowRight') { next(); start(); }
        });

        document.addEventListener('visibilitychange', () => {
            document.hidden ? stop() : start();
        });

        goTo(0);
        start();
    }

    /* ---------- 初始化 ---------- */
    document.addEventListener('DOMContentLoaded', () => {
        initNav();
        initReveal();
        renderSkills();
        renderProjectRolls();
        renderRecords();
        renderWorks();
        initShowcase();

        const yearEl = $('#year');
        if (yearEl) yearEl.textContent = new Date().getFullYear();
    });
})();
