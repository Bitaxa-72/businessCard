export const initLanguageModal = () => {
  const modal = document.querySelector('[data-lang-modal]');
  if (!modal) return;

  const btns = modal.querySelectorAll('[data-lang]');
  const overlay = modal.querySelector('[data-lang-close]');
  const triggers = document.querySelectorAll('[data-lang-open]');

  const isRU = location.pathname.includes('index.html') || location.pathname === '/' || location.pathname === '';
  const isEN = location.pathname.includes('indexEng.html');
  const isVN = location.pathname.includes('indexViet.html');

  const current = localStorage.getItem('lang');

  if (current) {
    if (current === 'ru' && !isRU) {
      location.href = 'index.html';
      return;
    }
    if (current === 'en' && !isEN) {
      location.href = 'indexEng.html';
      return;
    }
    if (current === 'vn' && !isVN) {
      location.href = 'indexViet.html';
      return;
    }
  } else {
    modal.classList.add('is-active');
  }

  triggers.forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      modal.classList.add('is-active');
    });
  });

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      localStorage.setItem('lang', lang);

      if (lang === 'ru') location.href = 'index.html';
      if (lang === 'en') location.href = 'indexEng.html';
      if (lang === 'vn') location.href = 'indexViet.html';
    });
  });

  if (overlay) {
    overlay.addEventListener('click', () => {
      modal.classList.remove('is-active');
    });
  }
};
