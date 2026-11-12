/**
 * Chukta Application JavaScript
 * Theme: Warm Editorial / Terracotta
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile & Tablet Nav Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navBackdrop = document.getElementById('navBackdrop');

  const closeNav = () => {
    if (navMenu && navMenu.classList.contains('open')) {
      navMenu.classList.remove('open');
      if (mobileToggle) {
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
      if (navBackdrop) {
        navBackdrop.classList.remove('open');
      }
    }
  };

  const openNav = () => {
    if (navMenu) {
      navMenu.classList.add('open');
      if (mobileToggle) {
        mobileToggle.classList.add('active');
        mobileToggle.setAttribute('aria-expanded', 'true');
      }
      if (navBackdrop) {
        navBackdrop.classList.add('open');
      }
    }
  };

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navMenu.classList.contains('open');
      if (isOpen) {
        closeNav();
      } else {
        openNav();
      }
    });

    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        closeNav();
      });
    });

    if (navBackdrop) {
      navBackdrop.addEventListener('click', closeNav);
    }

    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        closeNav();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeNav();
      }
    });
  }

  // Scroll Header Effect & Active Link ScrollSpy
  const siteHeader = document.getElementById('siteHeader') || document.querySelector('header');
  const scrollLinks = document.querySelectorAll('.nav-menu .nav-link[href^="#"]');
  const observedSections = [];

  scrollLinks.forEach(link => {
    const id = link.getAttribute('href').substring(1);
    const targetEl = document.getElementById(id);
    if (targetEl) {
      observedSections.push({ id, el: targetEl, link });
    }
  });

  const handleScroll = () => {
    // Header elevation & shrink on scroll
    if (siteHeader) {
      if (window.scrollY > 15) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    }

    // ScrollSpy active highlighting
    if (observedSections.length > 0) {
      const scrollY = window.scrollY + 140;
      let activeId = '';
      for (let i = observedSections.length - 1; i >= 0; i--) {
        if (scrollY >= observedSections[i].el.offsetTop) {
          activeId = observedSections[i].id;
          break;
        }
      }

      observedSections.forEach(item => {
        if (activeId && item.id === activeId) {
          item.link.classList.add('active');
        } else {
          item.link.classList.remove('active');
        }
      });
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // Close all others
        faqItems.forEach(otherItem => {
          otherItem.classList.remove('active');
        });

        // Toggle clicked
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // Waitlist Form Handler
  const waitlistForm = document.getElementById('waitlistForm');
  const waitlistMsg = document.getElementById('waitlistMsg');

  if (waitlistForm) {
    waitlistForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = waitlistForm.querySelector('input[type="email"]');
      const submitBtn = waitlistForm.querySelector('button[type="submit"]');

      if (!input || !input.value) return;

      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Saving...';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        input.value = '';

        if (waitlistMsg) {
          waitlistMsg.className = 'waitlist-msg success';
          waitlistMsg.textContent = "Thank you! You're on the early access list. We'll send your invite soon.";
          waitlistMsg.style.display = 'block';

          setTimeout(() => {
            waitlistMsg.style.display = 'none';
          }, 6000);
        }
      }, 700);
    });
  }

  // Ensure chukta internal links always resolve inside /chukta/
  document.querySelectorAll('a[href="invite"], a[href="privacy-policy.html"], a[href="terms-and-conditions.html"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = link.getAttribute('href');
      const pathname = window.location.pathname;
      if (!pathname.includes('/chukta/') && !pathname.endsWith('/chukta/index.html')) {
        e.preventDefault();
        window.location.href = window.location.origin + '/chukta/' + target;
      }
    });
  });

  // Light / Dark Mode Screenshot Switcher
  const updateScreenshotThemes = (mode) => {
    const switchableImages = document.querySelectorAll('.theme-switchable-img');
    const screenFrames = document.querySelectorAll('.screen-frame');

    // Update all theme toggle buttons state
    document.querySelectorAll('[data-theme-btn]').forEach(btn => {
      if (btn.getAttribute('data-theme-btn') === mode) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Update background frame contrast for dark vs light
    screenFrames.forEach(frame => {
      if (mode === 'light') {
        frame.classList.add('light-bg');
      } else {
        frame.classList.remove('light-bg');
      }
    });

    // Animate & swap sources smoothly
    switchableImages.forEach(img => {
      img.classList.add('switching');
      setTimeout(() => {
        const newSrc = mode === 'light' ? img.getAttribute('data-light-src') : img.getAttribute('data-dark-src');
        if (newSrc) {
          img.src = newSrc;
        }
        img.classList.remove('switching');
      }, 150);
    });
  };

  document.querySelectorAll('[data-theme-btn]').forEach(btn => {
    btn.addEventListener('click', () => {
      const mode = btn.getAttribute('data-theme-btn');
      updateScreenshotThemes(mode);
    });
  });
});
