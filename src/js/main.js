import '../css/mainStyle.scss';
import { portfolioSwiper } from './slider';
import { contactsBannerTilt } from './slider';
import { initReviews } from './slider';
import { initModals } from './modal.js';
import { initLanguageModal } from './lang.js';
import { initModalForm } from './modalform.js';

document.addEventListener('DOMContentLoaded', () => {
  initModalForm();
  initLanguageModal();
  contactsBannerTilt();
  initReviews();
  portfolioSwiper();
  initModals();
  menuBurger();
});

document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.header__nav');
  const burger = document.querySelector('.header__burgerBtn');

  if (!nav || !burger) return;

  const openClass = 'open';

  const closeMenu = () => {
    nav.classList.remove(openClass);
  };

  burger.addEventListener('click', () => {
    nav.classList.toggle(openClass);
  });

  nav.addEventListener('click', event => {
    const target = event.target;
    if (!target) return;
    if (target.closest('a') || target.closest('button') || target === nav) {
      closeMenu();
    }
  });

  document.addEventListener('click', event => {
    if (!nav.classList.contains(openClass)) return;
    const target = event.target;
    if (target.closest('.header__burgerBtn') || target.closest('.header__nav')) return;
    closeMenu();
  });
});