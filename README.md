# Hari Sai Yugesh — 3D Interactive Portfolio

An award-level (Awwwards / FWA style) 3D portfolio website for **Hari Sai Yugesh**, Aspiring Data & Business Analyst.

Built with **Vite + React 18 + TypeScript**, **Three.js** (`@react-three/fiber` + `@react-three/drei`), **GSAP ScrollTrigger**, **Lenis**, and **Tailwind CSS**.

---

## 🌟 Highlights & Signature Features

1. **Interactive 3D Reactive Portrait (Hero)**:
   - Real studio portrait rendered onto a 3D plane using custom GLSL depth/displacement shaders (`me.png` + `me-depth.png`).
   - Damped cursor tracking (max ~12° tilt) with dynamic chromatic aberration on mouse velocity and soft cyan rim lighting.
   - Instanced floating data particles in Three.js with gentle cursor repulsion.
   - Character-by-character staggered GSAP headline reveal and hacker-style analytical scramble subtitle.
   - Orbiting glassmorphism stat chips with spring physics.

2. **Scrubbed Kinetic Narrative (About)**:
   - Pinned GSAP ScrollTrigger section with word-by-word illumination.
   - 4 live animated metric roll-up counters strictly derived from resume facts.

3. **The 3D Logo Universe (Signature Skills Section)**:
   - Dedicated R3F spatial constellation showcasing 19 extruded 3D tech logos (Python, React, SQL, Power BI, Excel, etc.) bevelled with glossy `MeshPhysicalMaterial`.
   - Category filter pills with smooth constellation reflow.
   - Hover scaling & spin with frosted glass context tooltip.
   - Click inspection detail drawer.
   - Accessible animated 2D matrix fallback for mobile or reduced-motion.
   - Business & soft skills grid beneath.

4. **Self-Drawing Vertical Timeline (Experience & Education)**:
   - ScrollTrigger-scrubbed glowing SVG path connecting career milestones.
   - Infyntrek Remote Internship card with 3 quantitative impact bullets and tech tags.
   - Education milestones (B.Tech at NRI Institute of Technology, Intermediate 79.1%, SSC GPA 10.0).

5. **Pinned Horizontal Projects Gallery (Projects)**:
   - Horizontal scrub gallery with 3D tilt cards and mouse glare.
   - **Vyaptiq IQ**: Retail Intelligence Platform with live Recharts Z-Score anomaly scatter chart + KPI strip.
   - **Customer Retention Analytics**: Cohort matrix decay heatmap (M0–M5) + RFM customer segment donut chart.
   - Shared-layout full-screen case study modal with problem, approach, outcomes, and strategic recommendations.

6. **3D Honors & Awards Showcase (Achievements)**:
   - Procedural metallic 3D awards in Three.js (Gold trophy cup, Gold design crest, Silver medal, Taylor & Francis peer-reviewed academic journal tome).
   - 4 verified cards revealing on scroll.

7. **Contact Suite & Infinite Marquee**:
   - Kinetic headline: *"Let's turn data into decisions."*
   - Glass contact form with validation, Formspree / EmailJS webhook integration, confetti celebration, and graceful `mailto:` fallback.
   - Direct communication channels (phone, email, resume download).
   - Infinite skills marquee ticker tape and footer.

8. **Global Performance & Motion**:
   - Lenis smooth scroll synchronized with GSAP ticker (`gsap.ticker.add`).
   - Custom magnetic cursor with contextual labels.
   - Single WebGL canvas strategy with `IntersectionObserver` pause when off-screen.
   - Mobile responsive layout with touch-friendly interactions.

---

## 📁 Project Structure

```
yugesh-portfolio/
├── public/
│   ├── assets/
│   │   ├── me.png                   # Transparent studio portrait (RGBA)
│   │   ├── me-depth.png             # Parallax depth map
│   │   ├── me-original.png          # Original untouched photo
│   │   └── Yugesh_Resume_main.pdf   # Official PDF Resume
│   └── favicon.svg                  # High-tech YS monogram vector
├── src/
│   ├── components/
│   │   ├── About/                   # Scrubbed kinetic narrative & counters
│   │   ├── Achievements/            # 3D procedural medals & award cards
│   │   ├── Contact/                 # Contact form, marquee & channels
│   │   ├── Experience/              # Self-drawing vertical timeline
│   │   ├── Hero/                    # 3D portrait, particles, kinetic text
│   │   ├── Projects/                # Horizontal gallery, Recharts & modal
│   │   ├── Skills/                  # 3D Logo Universe, 2D fallback, soft skills
│   │   ├── Cursor.tsx               # Magnetic custom cursor
│   │   ├── Loader.tsx               # Monogram YS assembling curtain loader
│   │   └── Navbar.tsx               # Sticky glass navbar with section spy
│   ├── data/
│   │   ├── profile.ts               # Name, titles, contact, bio, education
│   │   ├── skills.ts                # 19 3D tech logos, SVG paths, soft skills
│   │   ├── projects.ts              # Vyaptiq IQ & Retention data models
│   │   └── achievements.ts          # 4 verified honors & publications
│   ├── hooks/
│   │   ├── useLenis.ts              # Lenis smooth scroll engine
│   │   └── useMousePosition.ts      # Normalized cursor & velocity tracking
│   ├── shaders/
│   │   └── portraitShader.ts        # Depth displacement & chromatic aberration
│   ├── App.tsx                      # Main composition
│   ├── index.css                    # Tailwind & glassmorphism primitives
│   └── main.tsx                     # React 18 mount
├── .env.example                     # Webhook environment variables
├── tailwind.config.js               # Theme colors, fonts & keyframes
├── vercel.json                      # Vercel SPA deployment config
├── netlify.toml                     # Netlify deployment config
└── package.json
```

---

## 🛠️ How to Edit Content & Personalize

ALL site content is centralized in typed TypeScript files inside `src/data/`:

### 1. Update Profile & Social Links
Open `src/data/profile.ts`:
- Edit `social.linkedin` with your real profile URL.
- Edit `social.github` with your real GitHub username.
- Contact details (`phone`, `email`, `college`) can be updated directly here.

### 2. Update Projects & Repositories
Open `src/data/projects.ts`:
- Edit `githubUrl` and `liveDemoUrl` with your actual repositories or hosted demo URLs.
- Edit metrics, recommendations, or chart data if new figures arise.

### 3. Swap Photo or Resume
- **Resume**: Replace `public/assets/Yugesh_Resume_main.pdf` with your updated PDF.
- **Photo**: Replace `public/assets/me.png` (transparent RGBA PNG). If changing photo dimensions, run the automated `process_portrait.py` script to regenerate the depth map `public/assets/me-depth.png`.

### 4. Wire the Contact Form
Create a `.env` file from `.env.example`:
```env
# Formspree endpoint (free & easiest)
VITE_FORMSPREE_ENDPOINT="https://formspree.io/f/your_form_id"
```
*Note: If left with the placeholder, the form automatically falls back to an interactive client mailto link.*

---

## 🚀 Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Start Vite dev server
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build
npm run preview
```

---

## 🚢 Deployment

### Deploy to Vercel
1. Push your repository to GitHub.
2. Import repository in [Vercel](https://vercel.com).
3. The included `vercel.json` automatically configures Vite SPA routes and asset caching.
4. Add environment variables if using Formspree (`VITE_FORMSPREE_ENDPOINT`).

### Deploy to Netlify
1. Connect your repository in [Netlify](https://netlify.com).
2. Build command: `npm run build`
3. Publish directory: `dist`
4. The included `netlify.toml` handles redirects and caching headers.

---

## 📝 Placeholders to Customize When Ready
- `src/data/profile.ts` ➔ `social.linkedin` (currently `https://linkedin.com/in/hari-sai-yugesh-placeholder`)
- `src/data/profile.ts` ➔ `social.github` (currently `https://github.com/yugesh-placeholder`)
- `src/data/projects.ts` ➔ `githubUrl` & `liveDemoUrl` placeholders for Vyaptiq IQ and Retention Analytics
- `.env` ➔ `VITE_FORMSPREE_ENDPOINT` (form defaults to mailto fallback if untouched)
#   p o r t f o l i o - w e b s i t e 

 
 
