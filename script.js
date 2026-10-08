document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('main section[id]');

  const setActiveNav = () => {
    const scrollPosition = window.scrollY + 140;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      const link = document.querySelector(`.nav-link[href="#${id}"]`);

      if (link && scrollPosition >= top && scrollPosition < top + height) {
        navLinks.forEach((item) => item.classList.remove('active'));
        link.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', setActiveNav, { passive: true });
  setActiveNav();

  const copyButton = document.querySelector('.copy-button');
  const emailText = document.getElementById('emailText');

  if (copyButton) {
    copyButton.addEventListener('click', async () => {
      const email = copyButton.dataset.copy || emailText?.textContent || '';

      try {
        await navigator.clipboard.writeText(email);
        const icon = copyButton.querySelector('.material-symbols-outlined');
        if (icon) {
          const previous = icon.textContent;
          icon.textContent = 'done';

          setTimeout(() => {
            icon.textContent = previous;
          }, 1500);
        }
      } catch (error) {
        console.warn('Clipboard copy failed:', error);
      }
    });
  }

  const form = document.getElementById('contactForm');
  const successMessage = document.getElementById('formSuccess');

  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();

      const formData = new FormData(form);
      const name = String(formData.get('name') || '').trim();
      const email = String(formData.get('email') || '').trim();
      const message = String(formData.get('message') || '').trim();

      if (!name || !email || !message) {
        return;
      }

      if (successMessage) {
        successMessage.classList.remove('hidden');
      }

      form.reset();
    });
  }
});
