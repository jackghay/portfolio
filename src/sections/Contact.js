import { t } from '../i18n.js';

const FORMSPREE_URL = 'https://formspree.io/f/';
const RATE_LIMIT_MS = 30000;
const RATE_KEY = 'contact-last-send';

function isRateLimited() {
  const last = localStorage.getItem(RATE_KEY);
  return last && Date.now() - parseInt(last, 10) < RATE_LIMIT_MS;
}

function validateForm(name, email, message) {
  if (typeof name !== 'string' || name.trim().length < 2 || name.length > 100) return t('contact.error');
  if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Please enter a valid email address';
  if (typeof message !== 'string' || message.trim().length < 10 || message.length > 5000) return 'Message must be between 10 and 5000 characters';
  return null;
}

export function initContact() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const honeypot = document.getElementById('form-honeypot');
  const isConfigured = () => FORMSPREE_URL !== 'https://formspree.io/f/';

  form.addEventListener('submit', async e => {
    e.preventDefault();

    const btn = form.querySelector('.btn');
    const nameInput = document.getElementById('form-name');
    const emailInput = document.getElementById('form-email');
    const msgInput = document.getElementById('form-message');

    if (!btn || !nameInput || !emailInput || !msgInput) return;

    // Honeypot check
    if (honeypot && honeypot.value.trim() !== '') return;

    // Rate limit check
    if (isRateLimited()) {
      btn.innerHTML = t('contact.sent');
      setTimeout(() => { btn.innerHTML = t('contact.send'); }, 2000);
      return;
    }

    // Validation
    const error = validateForm(nameInput.value, emailInput.value, msgInput.value);
    if (error) {
      btn.innerHTML = error;
      setTimeout(() => { btn.innerHTML = t('contact.send'); }, 3000);
      return;
    }

    const original = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = 'Sending...';

    try {
      if (isConfigured()) {
        const data = new FormData(form);
        const res = await fetch(FORMSPREE_URL, {
          method: 'POST',
          body: data,
          headers: { 'Accept': 'application/json' },
        });
        if (!res.ok) throw new Error();
      } else {
        await new Promise(r => setTimeout(r, 800));
      }
      localStorage.setItem(RATE_KEY, String(Date.now()));
      btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg> ' + t('contact.sent');
      form.reset();
    } catch {
      btn.innerHTML = t('contact.error');
    }

    setTimeout(() => {
      btn.innerHTML = original;
      btn.disabled = false;
    }, 3000);
  });
}
