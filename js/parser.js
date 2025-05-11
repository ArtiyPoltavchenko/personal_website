import { mdToHtml } from "./utils/miniMarkdown.js";


function applyOddEvenClass(element, index) {
  element.classList.add(index % 2 === 0 ? 'even' : 'odd');
}

/**
 * Utility: create section with title and container
 */
function createSectionContainer(titleText, sectionClass) {
  const section = document.createElement('section');
  section.classList.add(sectionClass);

  const h2 = document.createElement('h2');
  const container = document.createElement('div');

  h2.innerText = titleText;
  section.append(h2, container);

  return { section, container };
}

/**
 * Render introduction block
 */
function renderIntro(data) {
  const section = document.createElement('section');
  section.classList.add('introduction');

  const h2 = document.createElement('h2');
  const p = document.createElement('p');
  const textWrap = document.createElement('div');

  h2.innerHTML = mdToHtml(data.title);
  p.innerHTML = mdToHtml(data.text);

  textWrap.append(h2,p);
  const btnWrap = document.createElement('div');
  btnWrap.className = 'about__cv-button';

  const btn = document.createElement('a');
  btn.href = '../data/pdf/CV_ArsentiiPOLTAVCHENKO.pdf';
  btn.download = '';
  btn.textContent = 'Download CV';
  btnWrap.appendChild(btn);

  section.append(textWrap, btnWrap);

  return section;
}

/**
 * Render skills block
 */
function renderSkills(skills) {
  const { section, container } = createSectionContainer("My Skills", "skills");

  skills.forEach((skill, index) => {
    const block = document.createElement('div');
    applyOddEvenClass(block, index);
    block.classList.add('card');
    
    const img = document.createElement('img');
    const p = document.createElement('p');

    img.src = skill.icon;
    img.alt = skill.name;
    p.innerText = skill.name;

    block.append(img, p);
    container.appendChild(block);
  });

  return section;
}

/**
 * Render experience block
 */
function renderExperience(experiences) {
  const { section, container } = createSectionContainer("My Experience", "experience");

  experiences.forEach((exp, index) => {
    const block = document.createElement('div');
    applyOddEvenClass(block, index);
    block.classList.add('card');


    const top = document.createElement('div');
    const title = document.createElement('h3');
    const date = document.createElement('span');
    const desc = document.createElement('p');

    title.innerHTML = mdToHtml(exp.title);
    date.innerHTML = mdToHtml(exp.date);
    desc.innerHTML = mdToHtml(exp.description);

    top.append(title, date);
    block.append(top, desc);
    container.appendChild(block);
  });

  return section;
}

/**
 * Render portfolio block
 * DEPRECATED
 */
function renderPortfolio(projects) {
  const { section, container } = createSectionContainer("My Portfolio", "portfolio");

  projects.forEach((proj, index) => {
    const block = document.createElement('div');
    applyOddEvenClass(block, index);
    block.classList.add('card');

    const title = document.createElement('h3');
    const desc = document.createElement('p');
    const link = document.createElement('a');

    title.innerText = proj.title;
    desc.innerText = proj.description;
    link.href = proj.url;
    link.innerText = "View Project";

    block.append(title, desc, link);
    container.appendChild(block);
  });

  return section;
}

/**
 * Render projects block
 * UPDATED
 */
function renderProjects(projects) {
  const { section, container } = createSectionContainer("My Projects", "projects");
  container.classList.add('projects__grid');

  projects.forEach((proj, index) => {
    const card = document.createElement('div');
    applyOddEvenClass(card, index);
    card.classList.add('card');

    card.dataset.slug = proj.slug;
    card.dataset.json = proj.json;
    card.style.backgroundImage = `url(${proj.thumb})`;

    const overlay = document.createElement('div');
    overlay.classList.add('card__overlay');

    const title = document.createElement('h3');
    title.textContent = proj.title;

    const desc = document.createElement('p');
    desc.textContent = proj.description;

    overlay.append(title, desc);
    card.appendChild(overlay);
    container.appendChild(card);
  });

  return section;
}



/**
 * Parse section based on its type
 */
export function parseSection(data) {
  if (data.introduction) return renderIntro(data.introduction);
  if (data.projects) return renderProjects(data.projects);
  if (data.skills) return renderSkills(data.skills);
  if (data.experiences) return renderExperience(data.experiences);
  //if (data.portfolio) return renderPortfolio(data.portfolio);
  return null;
}
