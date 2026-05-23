# Pratyush Sharma — Developer Portfolio

A premium, modern developer portfolio built with React + Vite + Framer Motion.

## ✨ Features

- **Dark glassmorphism theme** with neon blue/purple gradients
- **Custom animated cursor** (desktop)
- **Typing animation** for roles in Hero section
- **Scroll-reveal animations** via Framer Motion + IntersectionObserver
- **7 sections**: Hero, About, Skills, Projects, Achievements, Contact, Footer
- **Animated skill progress bars**, floating badges, and particle effects
- **Fully responsive** — mobile, tablet, desktop
- **Sticky glassmorphism navbar** with smooth scroll
- **Animated contact form** with loading/success states
- **Timeline-style Achievements section**
- Custom fonts: Syne (display) + DM Sans (body) + JetBrains Mono

## 📁 Folder Structure

```
pratyush-portfolio/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── hooks/
    │   └── useInView.js          # Custom scroll-reveal hook
    └── components/
        ├── CustomCursor.jsx      # Animated custom cursor
        ├── Navbar.jsx            # Sticky navigation bar
        ├── Hero.jsx              # Hero section with typing animation
        ├── About.jsx             # About + code snippet visual
        ├── Skills.jsx            # Skill cards with progress bars
        ├── Projects.jsx          # Project cards with hover effects
        ├── Achievements.jsx      # Timeline of hackathons & achievements
        ├── Contact.jsx           # Contact form + info
        └── Footer.jsx            # Footer with social links
```

## 🚀 Getting Started

### Prerequisites
- Node.js v18+ 
- npm v8+

### Installation & Run

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Open in browser
# → http://localhost:5173
```

### Build for Production

```bash
npm run build
npm run preview
```

## 🎨 Customization

### Update Your Info
- **Name & tagline**: `src/components/Hero.jsx`
- **About text**: `src/components/About.jsx`
- **Skills & levels**: `src/components/Skills.jsx` → `categories` array
- **Projects**: `src/components/Projects.jsx` → `projects` array
- **Achievements**: `src/components/Achievements.jsx` → `timeline` array
- **Contact email/social links**: `src/components/Contact.jsx` + `Footer.jsx`

### Add a Profile Photo
Replace the avatar placeholder in `Hero.jsx`:
```jsx
// Replace the <div> with PS initials with:
<img src="/your-photo.jpg" alt="Pratyush" className="w-full h-full object-cover rounded-full" />
```
Place your photo in the `public/` folder.

### Add Resume PDF
Place `resume.pdf` in the `public/` folder. The Download Resume button already links to `/resume.pdf`.

### Color Theme
Edit `src/index.css` CSS variables or `tailwind.config.js` to tweak colors.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React 18 | UI Framework |
| Vite 5 | Build tool & dev server |
| Tailwind CSS 3 | Utility-first styling |
| Framer Motion 11 | Animations & transitions |
| Lucide React | Icon library |
| Google Fonts | Syne, DM Sans, JetBrains Mono |

---

Made with ❤️ by Pratyush Sharma
