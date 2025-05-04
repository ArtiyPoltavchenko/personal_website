import { parseSection } from './parser.js';

const content = document.querySelector('.main-grid');

(async () => {
  const path = window.location.pathname;
  const page = path.split("/").pop().replace('.html', '') || 'home';
  const jsonPath = `../data/${page}.json`;

  const pageData = await fetch(jsonPath).then(r => r.json());

  pageData.render_order.forEach(type => {
    const sectionsData = pageData.sections.filter(section => section[type]);
    sectionsData.forEach(sectionData => {
      const sectionElement = parseSection(sectionData);
      if (sectionElement) content.appendChild(sectionElement);
    });
  });

  observeSections();
})();

function observeSections() {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');

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
    rootMargin: '0px 0px -20% 0px'
  });

  document.querySelectorAll('.main-grid > section').forEach(section => {
    observer.observe(section);
  });
}
