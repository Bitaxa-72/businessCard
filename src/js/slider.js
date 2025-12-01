import Swiper from 'swiper';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';

export const portfolioSwiper = () => {
  const el = document.querySelector('.portfolio__swiper');
  if (!el) return;

  const swiper = new Swiper(el, {
    modules: [Navigation, Autoplay],
    slidesPerView: 1,
    spaceBetween: 24,
    loop: true,
    speed: 600,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false
    },
    navigation: {
      nextEl: '.portfolio__button-next',
      prevEl: '.portfolio__button-prev'
    },
    on: {
      init(swiper) {
        const activeImg = swiper.slides[swiper.activeIndex]?.querySelector('.portfolio__img img');
        if (activeImg) {
          activeImg.style.transform = 'scale(1.03) translateX(8px)';
        }
      },
      slideChangeTransitionStart(swiper) {
        swiper.slides.forEach(slide => {
          const img = slide.querySelector('.portfolio__img img');
          if (img) {
            img.style.transform = 'scale(1) translateX(0)';
          }
        });
        const activeImg = swiper.slides[swiper.activeIndex]?.querySelector('.portfolio__img img');
        if (activeImg) {
          activeImg.style.transform = 'scale(1.06) translateX(12px)';
        }
      },
      slideChangeTransitionEnd(swiper) {
        const activeImg = swiper.slides[swiper.activeIndex]?.querySelector('.portfolio__img img');
        if (activeImg) {
          activeImg.style.transform = 'scale(1.03) translateX(6px)';
        }
      }
    }
  });
};

export const contactsBannerTilt = () => {
  const banner = document.querySelector('.contacts__banner');
  if (!banner) return;
  const inner = banner.querySelector('.contacts__bannerInner');
  if (!inner) return;

  const maxTilt = 9;
  const maxShiftX = 8;
  const maxShiftY = 5;

  let targetRx = 0;
  let targetRy = 0;
  let targetTx = 0;
  let targetTy = 0;
  let targetGlowX = 50;
  let targetGlowY = 12;

  let currentRx = 0;
  let currentRy = 0;
  let currentTx = 0;
  let currentTy = 0;
  let currentGlowX = 50;
  let currentGlowY = 12;

  let pointerInside = false;

  const lerp = (from, to, t) => from + (to - from) * t;

  const update = time => {
    const t = time * 0.00045;

    if (!pointerInside) {
      const idleTilt = 2.4;
      const idleShiftX = 2.3;
      const idleShiftY = 1.6;

      targetRx = Math.sin(t) * idleTilt;
      targetRy = Math.cos(t * 1.1) * idleTilt;
      targetTx = Math.cos(t * 1.2) * idleShiftX;
      targetTy = Math.sin(t * 0.9) * idleShiftY;

      targetGlowX = 50 + Math.sin(t * 1.3) * 14;
      targetGlowY = 14 + Math.cos(t * 1.6) * 8;
    }

    currentRx = lerp(currentRx, targetRx, 0.14);
    currentRy = lerp(currentRy, targetRy, 0.14);
    currentTx = lerp(currentTx, targetTx, 0.14);
    currentTy = lerp(currentTy, targetTy, 0.14);
    currentGlowX = lerp(currentGlowX, targetGlowX, 0.16);
    currentGlowY = lerp(currentGlowY, targetGlowY, 0.16);

    inner.style.transform =
      `translate3d(${currentTx}px, ${currentTy}px, 0) rotateX(${currentRx}deg) rotateY(${currentRy}deg)`;

    inner.style.setProperty('--mx', `${currentGlowX}%`);
    inner.style.setProperty('--my', `${currentGlowY}%`);

    requestAnimationFrame(update);
  };

  banner.addEventListener('pointermove', e => {
    const rect = banner.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    pointerInside = true;

    targetRx = y * -maxTilt;
    targetRy = x * maxTilt;
    targetTx = x * maxShiftX;
    targetTy = y * maxShiftY;

    const gx = 50 + x * 26;
    const gy = 10 + y * 18;

    targetGlowX = gx;
    targetGlowY = gy;
  });

  banner.addEventListener('pointerleave', () => {
    pointerInside = false;
  });

  requestAnimationFrame(update);
};






const reviewsData = [
  {
    id: 'r1',
    name: 'damqut',
    role: 'Клиент',
    source: 'Kwork',
    project: 'Сайт под ключ',
    type: 'Сайт под ключ',
    platform: 'WordPress',
    rating: 5,
    text: 'Верстка дизайна с нуля, посадка на WordPress, всё сделано аккуратно и в срок. Был на связи, отвечал на вопросы, помогал разобраться и подсказывал, как сделать лучше.',
    reply: 'Был рад помочь, если что всегда на связи — пишите.',
    footer: 'Скрин отзыва: Kwork'
  },
  {
    id: 'r2',
    name: 'damqut',
    role: 'Постоянный клиент',
    source: 'Kwork',
    project: 'Доработка сайта WordPress',
    type: 'Доработка сайта',
    platform: 'WordPress',
    rating: 5,
    text: 'Ещё одна доработка сайта, всё сделано по высшему классу. Приятно работать с человеком, который знает своё дело.',
    reply: 'Благодарю за доверие, всегда рад долгосрочным проектам.',
    footer: 'Скрин отзыва: Kwork'
  },
  {
    id: 'r3',
    name: 'alexseomsk',
    role: 'Клиент',
    source: 'Kwork',
    project: 'Доработка сайта MODX Revolution',
    type: 'Доработка сайта',
    platform: 'MODX',
    rating: 5,
    text: 'Быстрое выполнение задач, всё время на связи. Работой довольны, рекомендую.',
    reply: 'Спасибо за отзыв, если что-то потребуется по проекту — пишите.',
    footer: 'Скрин отзыва: Kwork'
  },
  {
    id: 'r4',
    name: 'vladmar',
    role: 'Клиент',
    source: 'Kwork',
    project: 'Создание лендинга',
    type: 'Лендинг под ключ',
    platform: 'HTML · CSS · JS',
    rating: 5,
    text: 'Качество работ на высоком уровне. Всегда на связи, правки вносились оперативно, могу смело рекомендовать к сотрудничеству.',
    reply: 'Спасибо за отзыв, рад, что лендинг зашёл.',
    footer: 'Скрин отзыва: Kwork'
  },
  {
    id: 'r5',
    name: 'itstart',
    role: 'Клиент',
    source: 'Kwork',
    project: 'Поддержка и доработки',
    type: 'Сопровождение',
    platform: 'WordPress',
    rating: 5,
    text: 'Отличный исполнитель, профессионал своего дела. Разобрался в чужом коде, поправил проблемные места и подробно объяснил, что было не так.',
    reply: 'Спасибо, комфортная и быстрая коммуникация помогает делать результат.',
    footer: 'Скрин отзыва: Kwork'
  },
  {
    id: 'r6',
    name: 'ia01',
    role: 'Клиент',
    source: 'Kwork',
    project: 'Перенос каталогов и дополнительные задачи',
    type: 'Каталоги',
    platform: 'WordPress',
    rating: 5,
    text: 'Работать с вами было одно удовольствие. Всё делалось быстро и аккуратно, по ходу выполнил ещё ряд задач.',
    reply: 'Всегда рад помочь с развитием проекта, обращайтесь.',
    footer: 'Скрин отзыва: Kwork'
  },
  {
    id: 'r7',
    name: 'securesys',
    role: 'Клиент',
    source: 'Kwork',
    project: 'Интернет-магазин WordPress',
    type: 'Интернет-магазин',
    platform: 'WordPress',
    rating: 5,
    text: 'Нужно было доработать интернет-магазин и интегрировать платёжную систему. Всё сделали на 10/10 в короткий срок.',
    reply: 'Спасибо, было интересно прокачать магазин и оплату.',
    footer: 'Скрин отзыва: Kwork'
  },
  {
    id: 'r8',
    name: 'nadeya',
    role: 'Клиент',
    source: 'Telegram',
    project: 'Сопровождение проекта',
    type: 'Поддержка',
    platform: 'Долгосрочный проект',
    rating: 5,
    text: 'Спасибо, вы очень хороший специалист, главное нас не бросайте. За пару дней закрыли большой объём работ.',
    reply: 'Рад, что смог помочь, двигаем проект дальше.',
    footer: 'Фрагмент переписки: Telegram'
  }
];

export const initReviews = () => {
  const container = document.querySelector('.reviews');
  if (!container) return;

  const items = Array.from(container.querySelectorAll('.reviews__item'));
  const panel = container.querySelector('[data-review-panel]');
  if (!items.length || !panel) return;

  const nameEl = panel.querySelector('[data-review-name]');
  const roleEl = panel.querySelector('[data-review-role]');
  const sourceEl = panel.querySelector('[data-review-source]');
  const projectEl = panel.querySelector('[data-review-project]');
  const typeEl = panel.querySelector('[data-review-type]');
  const platformEl = panel.querySelector('[data-review-platform]');
  const textEl = panel.querySelector('[data-review-text]');
  const replyEl = panel.querySelector('[data-review-reply]');
  const footerEl = panel.querySelector('[data-review-footer]');
  const starsEl = panel.querySelector('[data-review-stars]');
  const avatarEl = panel.querySelector('[data-review-avatar]');

  const map = {};
  reviewsData.forEach(r => {
    map[r.id] = r;
  });

  const render = id => {
    const data = map[id];
    if (!data) return;

    panel.classList.add('is-changing');

    requestAnimationFrame(() => {
      nameEl.textContent = data.name;
      roleEl.textContent = data.role;
      sourceEl.textContent = data.source;
      projectEl.textContent = data.project;
      typeEl.textContent = data.type;
      platformEl.textContent = data.platform;
      textEl.textContent = data.text;
      replyEl.textContent = data.reply;
      footerEl.textContent = data.footer;
      starsEl.textContent = '★★★★★';
      avatarEl.textContent = data.name.slice(0, 1).toUpperCase();

      setTimeout(() => {
        panel.classList.remove('is-changing');
      }, 140);
    });
  };

  items.forEach(item => {
    item.addEventListener('click', () => {
      if (item.classList.contains('is-active')) return;
      items.forEach(i => i.classList.remove('is-active'));
      item.classList.add('is-active');
      const id = item.getAttribute('data-review-id');
      render(id);
    });
  });

  const firstId = items[0].getAttribute('data-review-id');
  render(firstId);
};

