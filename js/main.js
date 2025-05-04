import { parseSection } from './parser.js';

const content = document.querySelector('.main-grid');

(async () => {
  const pageData = await fetch('../data/home.json').then(r => r.json());

  pageData.render_order.forEach(type => {
    const sectionData = pageData.sections.find(section => section[type]);
    if (sectionData) {
      const sectionElement = parseSection(sectionData);
      if (sectionElement) content.appendChild(sectionElement);
    }
  });

  observeSections();
})();

function observeSections() {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');

        // Add latency before cards will appear
        const cards = entry.target.querySelectorAll('.card');
        cards.forEach((card, index) => {
          setTimeout(() => {
            card.classList.add('visible');
          }, index * 500);
        });

        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -30% 0px' 
  });

  document.querySelectorAll('.main-grid > section').forEach(section => {
    observer.observe(section);
  });
}

