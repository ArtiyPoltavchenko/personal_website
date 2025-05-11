import { mdToHtml } from './utils/miniMarkdown.js';

const root = document.getElementById('modal-root');
let active = null;

export async function openProject(slug, jsonPath) {
  if (active) closeModal(); // close if opened, just in case

  const data = await fetch(jsonPath).then(res => res.json());

  const modal = document.createElement('div');
  modal.className = 'modal';

  modal.innerHTML = `
    <div class="modal__header">
      <h2>${data.title}</h2>
      <button class="modal__close" aria-label="Close">×</button>
    </div>
    <div class="modal__tags">
      ${data.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
    </div>
    <div class="modal__desc">${mdToHtml(data.description)}</div>
    <div class="modal__images">
      ${data.images.map(img => `<img src="${img}" alt="">`).join('')}
    </div>
  `;

  root.innerHTML = '';
  root.appendChild(modal);
  root.classList.add('show');
  document.body.style.overflow = 'hidden';

  modal.querySelector('.modal__close').addEventListener('click', closeModal);
  root.addEventListener('click', e => {
    if (e.target === root) closeModal();
  });

  document.addEventListener('keydown', escClose);

  active = modal;
}

function closeModal() {
  if (!active) return;
  root.classList.remove('show');
  root.innerHTML = '';
  document.body.style.overflow = '';
  document.removeEventListener('keydown', escClose);
  active = null;
}

function escClose(e) {
  if (e.key === 'Escape') closeModal();
}
