  const slider = document.getElementById('themeSlider');
  const icon   = document.getElementById('theme-icon');
  const body   = document.body;
  const THEME_KEY = 'theme';

  // SVG icons
  const sunSVG = `
    <svg viewBox="0 0 24 24" width="22" height="22" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="12" cy="12" r="4.2" fill="#FFC857"/>
      <g stroke="#FFC857" stroke-width="1.6" stroke-linecap="round">
        <line x1="12" y1="2" x2="12" y2="4.2" />
        <line x1="12" y1="19.8" x2="12" y2="22" />
        <line x1="4.22" y1="4.22" x2="5.76" y2="5.76" />
        <line x1="18.24" y1="18.24" x2="19.78" y2="19.78" />
        <line x1="2" y1="12" x2="4.2" y2="12" />
        <line x1="19.8" y1="12" x2="22" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.76" y2="18.24" />
        <line x1="18.24" y1="5.76" x2="19.78" y2="4.22" />
      </g>
    </svg>
  `;

  const moonSVG = `
    <svg viewBox="0 0 24 24" width="22" height="22" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M20.4 14.2A7.6 7.6 0 0 1 10 3.6 7.7 7.7 0 1 0 20.4 14.2Z"
        fill="#F4F4FB" stroke="#C2C4FF" stroke-width="1.3" />
      <circle cx="13.5" cy="9.5" r="0.8" fill="#C2C4FF"/>
      <circle cx="15.3" cy="12.4" r="0.6" fill="#C2C4FF"/>
    </svg>
  `;

  function applyTheme(mode) {
    if (mode === 'light') {
      body.classList.add('light');
      icon.innerHTML = sunSVG;
      slider.checked = true;
    } else {
      body.classList.remove('light');
      icon.innerHTML = moonSVG;
      slider.checked = false;
    }
    localStorage.setItem(THEME_KEY, mode);
  }

  // انتخاب تم بر اساس ساعت سیستم اگر چیزی ذخیره نشده
  function getTimeBasedTheme() {
    const hour = new Date().getHours(); // 0-23
    // مثلاً 7 صبح تا 7 شب تم روشن، بقیه تیره
    return (hour >= 7 && hour < 19) ? 'light' : 'dark';
  }

  // Init theme on load
  (function initTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'light' || saved === 'dark') {
      applyTheme(saved);
    } else {
      const timeTheme = getTimeBasedTheme();
      applyTheme(timeTheme);
    }
  })();

  // Toggle theme on slider change
  slider.addEventListener('change', () => {
    const mode = slider.checked ? 'light' : 'dark';
    applyTheme(mode);
  });

  // ScrollReveal animations
  ScrollReveal().reveal('h1, h2', { distance:'40px', origin:'bottom', duration:800 });
  ScrollReveal().reveal('.card, .timeline-item', { distance:'60px', origin:'left', duration:900, interval:200 });
  ScrollReveal().reveal('.profile-pic', { scale:0.85, duration:1000 });

  // ===== Certificates modal logic =====
  const certCards = document.querySelectorAll('.cert-card');
  const certModal = document.getElementById('certModal');
  const certModalImg = document.getElementById('certModalImg');
  const certModalTitle = document.getElementById('certModalTitle');
  const certModalOverlay = certModal.querySelector('.modal-overlay');
  const certModalClose = certModal.querySelector('.modal-close');

  function openCertModal(imgSrc, title) {
    certModalImg.src = imgSrc;
    certModalImg.alt = title;
    certModalTitle.textContent = title || 'Certificate';
    certModal.classList.add('show');
    certModal.setAttribute('aria-hidden', 'false');
  }

  function closeCertModal() {
    certModal.classList.remove('show');
    certModal.setAttribute('aria-hidden', 'true');
    // کمی تاخیر برای انیمیشن اگر خواستی می‌تونی برداری
    setTimeout(() => {
      certModalImg.src = '';
    }, 200);
  }

  certCards.forEach(card => {
    card.addEventListener('click', () => {
      const imgSrc = card.dataset.img;
      const title = card.dataset.title || card.textContent.trim();
      if (imgSrc) {
        openCertModal(imgSrc, title);
      }
    });
  });

  certModalOverlay.addEventListener('click', closeCertModal);
  certModalClose.addEventListener('click', closeCertModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && certModal.classList.contains('show')) {
      closeCertModal();
    }
  });