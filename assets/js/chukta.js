/**
 * Chukta Application JavaScript
 * Theme: Warm Editorial / Terracotta
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Nav Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

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

  // Ensure legal links always resolve inside /chukta/
  document.querySelectorAll('a[href="privacy-policy.html"], a[href="terms-and-conditions.html"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = link.getAttribute('href');
      const pathname = window.location.pathname;
      if (!pathname.includes('/chukta/') && !pathname.endsWith('/chukta/index.html')) {
        e.preventDefault();
        window.location.href = window.location.origin + '/chukta/' + target;
      }
    });
  });
});
