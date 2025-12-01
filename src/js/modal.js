const getCurrentLang = () => {
  const stored = localStorage.getItem('lang');
  if (stored === 'ru' || stored === 'en' || stored === 'vn') return stored;

  const path = location.pathname;
  if (path.includes('indexEng.html')) return 'en';
  if (path.includes('indexViet.html')) return 'vn';
  return 'ru';
};

const modalPresets = {
  ru: {
    order: {
      label: 'Заявка',
      title: 'Сделать заказ',
      subtitle: 'Коротко опишите проект, приложите ссылки на сайт или макеты и укажите желаемые сроки.',
    },
    question: {
      label: 'Вопрос',
      title: 'Задать вопрос',
      subtitle: 'Напишите, что вас интересует по проекту или технологии, и как удобнее ответить.',
    },
  },
  en: {
    order: {
      label: 'Request',
      title: 'Place an order',
      subtitle: 'Briefly describe your project, attach links to the website or designs, and specify desired deadlines.',
    },
    question: {
      label: 'Question',
      title: 'Ask a question',
      subtitle: 'Write what you want to ask about the project or technology and how it is more convenient to reply.',
    },
  },
  vn: {
    order: {
      label: 'Yêu cầu',
      title: 'Đặt dịch vụ',
      subtitle: 'Mô tả ngắn gọn dự án, gửi liên kết đến website hoặc bản thiết kế và ghi thời hạn mong muốn.',
    },
    question: {
      label: 'Câu hỏi',
      title: 'Đặt câu hỏi',
      subtitle: 'Hãy viết điều bạn muốn hỏi về dự án hoặc công nghệ và cách tiện trả lời cho bạn.',
    },
  },
};

const submitSuccessText = {
  ru: 'Отправлено',
  en: 'Sent',
  vn: 'Đã gửi',
};

const detectIntent = (element, lang) => {
  const custom = element.dataset.modalIntent;
  if (custom === 'order' || custom === 'question') return custom;

  const text = (element.textContent || '').toLowerCase();

  if (lang === 'ru') {
    if (text.includes('вопрос') || text.includes('напишите')) return 'question';
    if (text.includes('заявк') || text.includes('заказ') || text.includes('консультац')) return 'order';
    return 'order';
  }

  if (lang === 'en') {
    if (text.includes('question') || text.includes('ask') || text.includes('contact')) return 'question';
    if (text.includes('order') || text.includes('project') || text.includes('request')) return 'order';
    return 'order';
  }

  if (lang === 'vn') {
    if (text.includes('câu hỏi') || text.includes('hỏi')) return 'question';
    if (text.includes('đặt') || text.includes('dịch vụ') || text.includes('dự án')) return 'order';
    return 'order';
  }

  return 'order';
};

export const initModals = () => {
  const modal = document.querySelector('[data-modal]');
  if (!modal) return;

  const lang = getCurrentLang();

  const overlay = modal.querySelector('[data-modal-close]');
  const card = modal.querySelector('.modal__card');
  const closeButtons = modal.querySelectorAll('[data-modal-close]');
  const labelEl = modal.querySelector('[data-modal-label]');
  const titleEl = modal.querySelector('[data-modal-title]');
  const subtitleEl = modal.querySelector('[data-modal-subtitle]');
  const intentInput = modal.querySelector('[data-modal-intent]');
  const form = modal.querySelector('.modal__form');
  const submitBtn = modal.querySelector('.modal__submit');

  let currentIntent = 'order';
  let scrollBarCompensation = 0;

  const setPreset = intent => {
    const langPresets = modalPresets[lang] || modalPresets.ru;
    const preset = langPresets[intent] || langPresets.order;
    currentIntent = intent;
    labelEl.textContent = preset.label;
    titleEl.textContent = preset.title;
    subtitleEl.textContent = preset.subtitle;
    intentInput.value = intent;
  };

  const openModal = intent => {
    if (!modal.classList.contains('is-open')) {
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      scrollBarCompensation = scrollBarWidth > 0 ? scrollBarWidth : 0;
      document.documentElement.style.overflow = 'hidden';
      if (scrollBarCompensation) {
        document.documentElement.style.paddingRight = scrollBarCompensation + 'px';
      }
    }
    setPreset(intent);
    modal.classList.add('is-open');
    card.focus();
  };

  const closeModal = () => {
    modal.classList.remove('is-open');
    document.documentElement.style.overflow = '';
    if (scrollBarCompensation) {
      document.documentElement.style.paddingRight = '';
      scrollBarCompensation = 0;
    }
  };

  if (overlay) {
    overlay.addEventListener('click', () => closeModal());
  }

  closeButtons.forEach(btn => btn.addEventListener('click', () => closeModal()));

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if (modal.classList.contains('is-open')) {
        closeModal();
      }
    }
  });

  const triggerSelectors = [
    '.header__feedback',
    '.contacts__btn',
    '.hero__contactsLink',
    '.prices__link',
    '.footer__feedback',
  ];
  const triggers = document.querySelectorAll(triggerSelectors.join(','));

  triggers.forEach(trigger => {
    const intent = detectIntent(trigger, lang);
    trigger.addEventListener('click', e => {
      e.preventDefault();
      openModal(intent);
    });
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    submitBtn.disabled = true;
    const originalText = submitBtn.textContent;
    const successText = submitSuccessText[lang] || submitSuccessText.ru;
    submitBtn.textContent = successText;
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
      form.reset();
      closeModal();
    }, 900);
  });
};
