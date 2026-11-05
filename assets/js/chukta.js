/**
 * Chukta Application JavaScript
 * Handles FAQ accordion, mobile navigation, and waitlist submission.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Nav Toggle
  const mobileToggle = document.getElementById('chuktaMobileToggle');
  const navLinks = document.getElementById('chuktaNavLinks');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
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

        // Close all other accordion items
        faqItems.forEach(otherItem => {
          otherItem.classList.remove('active');
        });

        // Toggle current item
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
      submitBtn.textContent = 'Joining...';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        input.value = '';

        if (waitlistMsg) {
          waitlistMsg.className = 'waitlist-msg success';
          waitlistMsg.textContent = "You're on the list! We'll notify you the moment Chukta launches for early access.";
          waitlistMsg.style.display = 'block';

          setTimeout(() => {
            waitlistMsg.style.display = 'none';
          }, 6000);
        }
      }, 900);
    });
  }

  // Copyright Year
  const yearSpans = document.querySelectorAll('.current-year');
  const thisYear = new Date().getFullYear();
  yearSpans.forEach(span => {
    span.textContent = thisYear;
  });
});

