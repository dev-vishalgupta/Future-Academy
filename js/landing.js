/**
 * Future Academy — Landing Page JavaScript
 * Lightweight, performant scripts for theme switching, mobile drawer, and subtle scroll reveals.
 */

document.addEventListener('DOMContentLoaded', () => {
    initThemeToggle();
    initMobileNav();
    initScrollHeader();
    initScrollReveal();
});

/**
 * 1. Theme Toggle System (Light / Dark Mode)
 */
function initThemeToggle() {
    const themeToggleBtn = document.getElementById('theme-toggle');

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('fa_theme', theme);
        if (themeToggleBtn) {
            themeToggleBtn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
        }
    }

    // Determine initial theme: default to 'light' unless user has explicitly chosen 'dark'
    const savedTheme = localStorage.getItem('fa_theme');
    if (savedTheme === 'dark') {
        setTheme('dark');
    } else {
        setTheme('light');
    }

    // Toggle button event
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        });
    }
}

/**
 * 2. Mobile Navigation Drawer
 */
function initMobileNav() {
    const mobileBtn = document.getElementById('mobile-toggle-btn');
    const navMenu = document.getElementById('nav-menu');
    if (!mobileBtn || !navMenu) return;

    function toggleMenu(open) {
        const isOpen = open !== undefined ? open : !navMenu.classList.contains('open');
        navMenu.classList.toggle('open', isOpen);
        mobileBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        document.body.style.overflow = isOpen ? 'hidden' : '';
        
        const icon = mobileBtn.querySelector('i');
        if (icon) {
            if (isOpen) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    }

    mobileBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    // Close when clicking any navigation link
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            toggleMenu(false);
        });
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !mobileBtn.contains(e.target)) {
            toggleMenu(false);
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('open')) {
            toggleMenu(false);
            mobileBtn.focus();
        }
    });
}

/**
 * 3. Sticky Navbar Elevation on Scroll
 */
function initScrollHeader() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    const handleScroll = () => {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
}

/**
 * 4. Subtle Scroll Reveal Animations
 */
function initScrollReveal() {
    const elementsToReveal = document.querySelectorAll('.reveal-on-scroll');
    if (!elementsToReveal.length) return;

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    obs.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        });

        elementsToReveal.forEach(el => observer.observe(el));
    } else {
        // Fallback for older browsers
        elementsToReveal.forEach(el => el.classList.add('revealed'));
    }
}
