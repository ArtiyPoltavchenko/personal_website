import { parseSection } from './parser.js';

const content = document.querySelector('#dynamic-content');

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
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('main > section').forEach(section => {
    observer.observe(section);
  });
}
