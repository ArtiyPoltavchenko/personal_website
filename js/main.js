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



// Background-icons moove
const icons = document.querySelectorAll('.background-icons .bg-icon');

// Change positions amount when changing amount of icons
const positions = [
  { x: '8%', y: '15%' },
  { x: '5%', y: '50%' },
  { x: '85%', y: '20%' },
  { x: '90%', y: '75%' }
];

// Applying positions
icons.forEach((icon, index) => {
  icon.style.left = positions[index].x;
  icon.style.top = positions[index].y;
});

// Move icons a bit with mouse
document.addEventListener('mousemove', (e) => {
  const { clientX, clientY } = e;
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  const moveX = (clientX - centerX) / centerX;
  const moveY = (clientY - centerY) / centerY;

  icons.forEach((icon, index) => {
    const offset = 10 + index * 5;
    icon.style.transform = `translate(${moveX * offset}px, ${moveY * offset}px)`;
  });
});