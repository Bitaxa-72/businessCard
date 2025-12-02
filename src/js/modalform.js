export const initModalForm = () => {
  const form = document.querySelector('.modal__form');
  if (!form) return;

  const submitButton = form.querySelector('.modal__submit');
  const hint = form.querySelector('.modal__hint');

  form.addEventListener('submit', async e => {
    e.preventDefault();

    if (submitButton) {
      submitButton.disabled = true;
    }

    const formData = new FormData(form);

    try {
      const response = await fetch('/send-form.php', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (response.ok && data.success) {
        form.reset();
        if (hint) {
          hint.textContent = 'Заявка отправлена, я свяжусь с вами в ближайшее время.';
        }
      } else {
        if (hint) {
          hint.textContent = data.message || 'Ошибка при отправке. Попробуйте ещё раз или напишите мне напрямую.';
        }
      }
    } catch (error) {
      if (hint) {
        hint.textContent = 'Сетевая ошибка при отправке. Попробуйте ещё раз или напишите мне напрямую.';
      }
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
      }
    }
  });
};