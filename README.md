# 🧠 Personal Website

A handcrafted single-page portfolio site powered by **vanilla HTML, CSS, and JavaScript**, populated dynamically from **JSON files**.  
No frameworks. No build tools. Just clean logic, responsive design and full control.

---

## 🚀 Features

- 🔧 **Parser-based rendering** — all sections (intro, skills, experience, projects) are dynamically generated via JS from JSON
- 📄 **Markdown support** for inline formatting in content (bold, underline, breaks, etc.)
- 💡 **Mobile-first responsive layout** built with CSS Grid & Flexbox
- 🎯 **Modular architecture** with reusable utilities and renderers
- 📦 **Component-style sections**: intro, skills, experience, project gallery with modal
- 🖱️ **Animated scroll-in**, hover effects, responsive buttons
- 🧩 **Modal project viewer** with tag display, markdown description and image carousel
- 🌌 **Parallax background icons** following mouse movement
- 🌙 **No dependencies** — clean frontend logic, extendable via utilities

---

## 🧱 Tech Stack

| Layer     | Tooling               |
|-----------|------------------------|
| Structure | HTML5, JS (ES6)        |
| Style     | CSS3, Flexbox, Grid    |
| Logic     | Vanilla JS, JSON data  |
| UX        | IntersectionObserver, smooth scroll, `mdToHtml()` parser

---

## 📁 Folder Structure

```
project-root/
├── index.html
├── styles/
│   ├── styles.css
│   └── modal.css
├── js/
│   ├── main.js
│   ├── parser.js
│   ├── modal.js
│   └── utils/
│       └── miniMarkdown.js
├── data/
│   ├── index.json
│   ├── projects/
│   │   └── personal-website.json
├── assets/
│   ├── img/
│   ├── icons/
│   └── pdf/
```

---

## 📸 Screenshots

| Section | Preview |
|--------|---------|
| Hero / Intro | ![intro](./assets/img/website-1.jpg) |
| Projects Grid | ![projects](./assets/img/website-2.jpg) |
| Modal Viewer | ![modal](./assets/img/website-3.jpg) |

---

## 👨‍💻 How it works

1. `main.js` loads JSON (`index.json`)
2. Sections are parsed via `parser.js` with per-section functions
3. Text is formatted using `mdToHtml()`, including:
   - `**bold**`
   - `__outline__` → via `.text-outline`
   - `\n` → line breaks
4. Projects open via `modal.js` and show dynamic content

---

## 🧩 JSON-driven content example

```json
{
  "title": "About me",
  "text": "I'm a **developer** focused on clean logic and creative systems.\n__Self-taught__, pragmatic and growing every day."
}
```

---

## 🔓 License

MIT — feel free to reuse structure or code for your own site. Attribution appreciated 🙏

---

## ✨ Author

**Arsentii Poltavchenko**  
[LinkedIn](https://linkedin.com/in/arsentii-poltavchenko-794bb1221/) — [Portfolio](https://tbd-link.com)
