/**
 * Utility: apply odd/even class to element
 */
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

  h2.innerText = data.title;
  p.innerText = data.text;

  section.append(h2, p);
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

    title.innerText = exp.title;
    date.innerText = exp.date;
    desc.innerText = exp.description;

    top.append(title, date);
    block.append(top, desc);
    container.appendChild(block);
  });

  return section;
}

/**
 * Render portfolio block
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
 * Parse section based on its type
 */
export function parseSection(data) {
  if (data.introduction) return renderIntro(data.introduction);
  if (data.skills) return renderSkills(data.skills);
  if (data.experiences) return renderExperience(data.experiences);
  if (data.portfolio) return renderPortfolio(data.portfolio);
  return null;
}
