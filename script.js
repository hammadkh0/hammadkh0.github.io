/* ===========================
   Portfolio JavaScript
   =========================== */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initTypingAnimation();
  initScrollAnimations();
  initActiveNavHighlight();
  initSmoothScroll();
  initMobileMenu();
  initNavbarScroll();
  initFormValidation();
});

/* ===========================
   Theme Toggle
   =========================== */

function initTheme() {
  const toggle = document.getElementById('theme-toggle');
  const saved = localStorage.getItem('theme');

  if (saved) {
    document.documentElement.setAttribute('data-theme', saved);
  } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
    document.documentElement.setAttribute('data-theme', 'light');
  }

  toggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });
}

/* ===========================
   Typing Animation
   =========================== */

function initTypingAnimation() {
  const el = document.getElementById('typing-text');
  if (!el) return;

  const roles = [
    'Software Developer',
    'Backend Engineer',
    'API Architect',
    'Problem Solver'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let isPaused = false;

  function tick() {
    const currentRole = roles[roleIndex];

    if (isPaused) {
      isPaused = false;
      isDeleting = true;
      setTimeout(tick, 50);
      return;
    }

    if (!isDeleting) {
      // Typing
      el.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === currentRole.length) {
        isPaused = true;
        setTimeout(tick, 2000); // Pause before deleting
        return;
      }
      setTimeout(tick, 80 + Math.random() * 40);
    } else {
      // Deleting
      el.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(tick, 400);
        return;
      }
      setTimeout(tick, 40);
    }
  }

  setTimeout(tick, 1000);
}

/* ===========================
   Scroll Animations
   =========================== */

function initScrollAnimations() {
  const targets = document.querySelectorAll('.fade-up');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger animations for sibling elements
          const delay = entry.target.dataset.delay || 0;
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    targets.forEach((el, index) => {
      // Add stagger delay for grid items
      const parent = el.parentElement;
      if (parent && (parent.classList.contains('skills-grid') ||
                     parent.classList.contains('projects-grid'))) {
        const siblings = Array.from(parent.querySelectorAll('.fade-up'));
        const siblingIndex = siblings.indexOf(el);
        el.dataset.delay = siblingIndex * 100;
      }
      observer.observe(el);
    });
  } else {
    // Fallback: show everything
    targets.forEach(el => el.classList.add('visible'));
  }
}

/* ===========================
   Active Navigation Highlight
   =========================== */

function initActiveNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            }
          });
        }
      });
    }, {
      threshold: 0.2,
      rootMargin: '-80px 0px -40% 0px'
    });

    sections.forEach(section => observer.observe(section));
  }
}

/* ===========================
   Smooth Scroll
   =========================== */

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth' });

        // Close mobile menu if open
        closeMobileMenu();
      }
    });
  });
}

/* ===========================
   Mobile Menu
   =========================== */

function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  // Create overlay
  const overlay = document.createElement('div');
  overlay.className = 'nav-overlay';
  overlay.id = 'nav-overlay';
  document.body.appendChild(overlay);

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.contains('open');
    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  overlay.addEventListener('click', closeMobileMenu);

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMobileMenu();
    }
  });
}

function openMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  const overlay = document.getElementById('nav-overlay');

  navLinks.classList.add('open');
  hamburger.classList.add('active');
  hamburger.setAttribute('aria-expanded', 'true');
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  const overlay = document.getElementById('nav-overlay');

  navLinks.classList.remove('open');
  hamburger.classList.remove('active');
  hamburger.setAttribute('aria-expanded', 'false');
  if (overlay) overlay.classList.remove('active');
  document.body.style.overflow = '';
}

/* ===========================
   Navbar Scroll Effect
   =========================== */

function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        if (window.scrollY > 50) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
        ticking = false;
      });
      ticking = true;
    }
  });
}

/* ===========================
   Form Validation
   =========================== */

function initFormValidation() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const fields = {
    name: {
      el: document.getElementById('form-name'),
      error: document.getElementById('error-name'),
      validate: (v) => v.trim().length >= 2 ? '' : 'Please enter your name'
    },
    email: {
      el: document.getElementById('form-email'),
      error: document.getElementById('error-email'),
      validate: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'Please enter a valid email'
    },
    subject: {
      el: document.getElementById('form-subject'),
      error: document.getElementById('error-subject'),
      validate: (v) => v.trim().length >= 2 ? '' : 'Please enter a subject'
    },
    message: {
      el: document.getElementById('form-message'),
      error: document.getElementById('error-message'),
      validate: (v) => v.trim().length >= 10 ? '' : 'Message should be at least 10 characters'
    }
  };

  // Real-time validation on blur
  Object.values(fields).forEach(field => {
    field.el.addEventListener('blur', () => {
      validateField(field);
    });
    field.el.addEventListener('input', () => {
      if (field.el.classList.contains('error')) {
        validateField(field);
      }
    });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    let isValid = true;
    Object.values(fields).forEach(field => {
      if (!validateField(field)) {
        isValid = false;
      }
    });

    if (isValid) {
      const submitBtn = document.getElementById('btn-submit');
      const originalText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending...';

      try {
        const formData = new FormData(form);
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData
        });
        const result = await response.json();

        if (result.success) {
          form.reset();
          submitBtn.innerHTML = '✓ Message Sent!';
          submitBtn.style.background = '#22c55e';
          setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
          }, 3000);
        } else {
          throw new Error(result.message || 'Something went wrong');
        }
      } catch (err) {
        submitBtn.innerHTML = '✗ Failed to send';
        submitBtn.style.background = '#ef4444';
        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.style.background = '';
          submitBtn.disabled = false;
        }, 3000);
      }
    }
  });
}

function validateField(field) {
  const msg = field.validate(field.el.value);
  field.error.textContent = msg;
  if (msg) {
    field.el.classList.add('error');
    return false;
  } else {
    field.el.classList.remove('error');
    return true;
  }
}
