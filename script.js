'use strict';

const navbar = document.querySelector('.navbar');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

function updateNavbar() {
    navbar?.classList.toggle('is-scrolled', window.scrollY > 50);
}

function closeNavigation() {
    if (!navToggle || !navLinks) return;
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', '打开导航菜单');
    navLinks.classList.remove('is-open');
}

navToggle?.addEventListener('click', () => {
    const willOpen = navToggle.getAttribute('aria-expanded') !== 'true';
    navToggle.setAttribute('aria-expanded', String(willOpen));
    navToggle.setAttribute('aria-label', willOpen ? '关闭导航菜单' : '打开导航菜单');
    navLinks?.classList.toggle('is-open', willOpen);
});

document.querySelectorAll('.nav-links a').forEach((link) => {
    link.addEventListener('click', closeNavigation);
});

document.querySelectorAll('[data-scroll-target]').forEach((button) => {
    button.addEventListener('click', () => {
        document.getElementById(button.dataset.scrollTarget)?.scrollIntoView({ behavior: 'smooth' });
    });
});

const panelGroups = {
    electric: { button: '.el-btn', panel: '.el-content', prefix: 'el-', section: 'ele' },
    mechanical: { button: '.mc-btn', panel: '.mc-content', prefix: 'mc-', section: 'machine' },
    past: { button: '.past-btn', panel: '.past-content', prefix: 'past-' }
};

document.querySelectorAll('[data-panel-group]').forEach((button) => {
    button.addEventListener('click', () => {
        const config = panelGroups[button.dataset.panelGroup];
        if (!config) return;
        document.querySelectorAll(config.panel).forEach((panel) => panel.classList.remove('active'));
        document.querySelectorAll(config.button).forEach((item) => {
            item.classList.remove('active');
            item.setAttribute('aria-pressed', 'false');
        });
        document.getElementById(config.prefix + button.dataset.panel)?.classList.add('active');
        button.classList.add('active');
        button.setAttribute('aria-pressed', 'true');
        if (config.section) {
            document.getElementById(config.section)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

window.addEventListener('scroll', updateNavbar, { passive: true });
window.addEventListener('resize', () => {
    if (window.innerWidth > 900) closeNavigation();
});
updateNavbar();