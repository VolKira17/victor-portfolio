(() => {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    if (!menuToggle || !navMenu) return;

    const mobileViewport = window.matchMedia('(max-width: 768px)');
    const setMenuOpen = (isOpen, restoreFocus = false) => {
        menuToggle.setAttribute('aria-expanded', String(isOpen));
        menuToggle.setAttribute(
            'aria-label',
            isOpen ? 'Close navigation menu' : 'Open navigation menu'
        );
        navMenu.classList.toggle('active', isOpen);

        if (restoreFocus && mobileViewport.matches) {
            menuToggle.focus();
        } else if (isOpen) {
            navMenu.querySelector('.nav-link')?.focus();
        }
    };

    menuToggle.addEventListener('click', () => {
        const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
        setMenuOpen(!isOpen, isOpen);
    });

    navMenu.addEventListener('click', (event) => {
        if (event.target.closest('.nav-link') && mobileViewport.matches) {
            setMenuOpen(false, true);
        }
    });

    document.addEventListener('click', (event) => {
        const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
        if (
            isOpen &&
            !menuToggle.contains(event.target) &&
            !navMenu.contains(event.target)
        ) {
            setMenuOpen(false);
        }
    });

    document.addEventListener('keydown', (event) => {
        const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
        if (event.key === 'Escape' && isOpen) {
            setMenuOpen(false, true);
        }
    });

    const closeOnDesktop = (event) => {
        if (!event.matches) setMenuOpen(false);
    };

    if (typeof mobileViewport.addEventListener === 'function') {
        mobileViewport.addEventListener('change', closeOnDesktop);
    } else {
        mobileViewport.addListener(closeOnDesktop);
    }
})();
(() => {
    const intro = document.getElementById('signatureIntro');
    const skipButton = document.getElementById('signatureSkip');

    if (!intro || !skipButton) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let finished = false;
    let exitTimer;

    const finishIntro = () => {
        if (finished) return;
        finished = true;
        window.clearTimeout(exitTimer);
        intro.classList.add('is-leaving');
        window.setTimeout(() => {
            intro.hidden = true;
            intro.classList.remove('is-leaving');
            }, 650);
    };

    document.querySelector('.skip-link')?.addEventListener('click', () => {
        if (!intro.hidden) finishIntro();
    });
    intro.hidden = false;
    skipButton.addEventListener('click', finishIntro);
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !intro.hidden) finishIntro();
    });

    exitTimer = window.setTimeout(finishIntro, 5000);
})();