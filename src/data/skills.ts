export type SkillCategory =
  | 'All'
  | 'Core Analytics'
  | 'Data Science & AI'
  | 'Databases'
  | 'Developer Tools'
  | 'Web & Frameworks'
  | 'Analytics Methodologies';

export interface TechSkill {
  id: string;
  name: string;
  category: Exclude<SkillCategory, 'All'>;
  color: string;
  secondaryColor?: string;
  context: string;
  resumeBullet: string;
  logoUrl: string;
  svgIcon: string;
}

export interface SoftSkill {
  name: string;
  type: 'Business' | 'Soft' | 'Data';
  description: string;
}

export const TECH_SKILLS: TechSkill[] = [
  // -------------------------------------------------------------
  // 1. Core Analytics Engine
  // -------------------------------------------------------------
  {
    id: 'sql',
    name: 'SQL',
    category: 'Core Analytics',
    color: '#00F5A0',
    secondaryColor: '#0284C7',
    context: 'Complex queries, CTEs, window functions, aggregations, dataset filtering and join optimization.',
    resumeBullet: 'Performed data analysis using SQL on 5,000+ records to identify business trends and customer insights.',
    logoUrl: '/logos/sql.svg',
    svgIcon: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="32" cy="14" rx="20" ry="7" fill="#00F5A0"/><path d="M12 14v12c0 3.87 8.95 7 20 7s20-3.13 20-7V14" fill="#0284C7"/><ellipse cx="32" cy="26" rx="20" ry="7" fill="#00F5A0" fill-opacity="0.85"/><path d="M12 26v12c0 3.87 8.95 7 20 7s20-3.13 20-7V26" fill="#0369A1"/><ellipse cx="32" cy="38" rx="20" ry="7" fill="#00F5A0" fill-opacity="0.9"/><path d="M12 38v12c0 3.87 8.95 7 20 7s20-3.13 20-7V38" fill="#075985"/><ellipse cx="32" cy="50" rx="20" ry="7" fill="#38BDF8"/></svg>`
  },
  {
    id: 'python',
    name: 'Python',
    category: 'Core Analytics',
    color: '#38BDF8',
    secondaryColor: '#FFD43B',
    context: 'Data analysis, statistical computing, dataframe manipulation, anomaly detection and ETL automation.',
    resumeBullet: 'Analyzed multi-source transactional datasets using Python; extracted key KPIs and detected retail anomalies.',
    logoUrl: '/logos/python.svg',
    svgIcon: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M31.88 7c-7.3 0-6.85 3.16-6.85 3.16l.03 3.28h6.95v1.03H19.04s-3.34-.38-3.34 6.84c0 7.22 2.91 6.84 2.91 6.84h1.98v-3.31s-.11-3.81 3.8-3.81h6.54v-1.07h-8.11s-2.75.26-2.75-2.75v-4.32s-.13-3.28 3.4-3.28h8.24s3.14-.13 3.14 3.14v2.36h1.05V11.45S37.07 7 31.88 7zm-2.36 2.04a1.14 1.14 0 110 2.28 1.14 1.14 0 010-2.28z" fill="#3776AB"/><path d="M32.12 57c7.3 0 6.85-3.16 6.85-3.16l-.03-3.28h-6.95v-1.03h12.97s3.34.38 3.34-6.84c0-7.22-2.91-6.84-2.91-6.84h-1.98v3.31s.11 3.81-3.8 3.81h-6.54v1.07h8.11s2.75-.26 2.75 2.75v4.32s.13 3.28-3.4 3.28h-8.24s-3.14.13-3.14-3.14v-2.36h-1.05v3.66s-1.17 4.45 4.02 4.45zm2.36-2.04a1.14 1.14 0 110-2.28 1.14 1.14 0 010 2.28z" fill="#FFD43B"/></svg>`
  },
  {
    id: 'powerbi',
    name: 'Power BI',
    category: 'Core Analytics',
    color: '#D97706',
    secondaryColor: '#E6AD10',
    context: 'Interactive dashboards, DAX queries, data modeling, automated refreshes and executive business reporting.',
    resumeBullet: 'Built 2 automated dashboards in Power BI, cutting manual reporting time by 15% at Infyntrek.',
    logoUrl: '/logos/powerbi.svg',
    svgIcon: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="30" width="9" height="24" rx="2.5" fill="#D97706"/><rect x="22" y="20" width="9" height="34" rx="2.5" fill="#F59E0B"/><rect x="34" y="12" width="9" height="42" rx="2.5" fill="#FBBF24"/><rect x="46" y="6" width="6" height="48" rx="3" fill="#FDE68A"/></svg>`
  },
  {
    id: 'excel',
    name: 'Excel (Pivots & VLOOKUP)',
    category: 'Core Analytics',
    color: '#107C41',
    secondaryColor: '#21A366',
    context: 'Advanced pivot tables, VLOOKUP, XLOOKUP, trend forecasting models and automated reporting templates.',
    resumeBullet: 'Managed and cleaned 5,000+ record datasets using advanced Excel formulas and interactive Pivot Tables.',
    logoUrl: '/logos/excel.svg',
    svgIcon: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="18" y="10" width="36" height="44" rx="4" fill="#107C41"/><rect x="26" y="18" width="20" height="4" rx="1" fill="#FFFFFF" fill-opacity="0.5"/><rect x="26" y="26" width="20" height="4" rx="1" fill="#FFFFFF" fill-opacity="0.5"/><rect x="26" y="34" width="20" height="4" rx="1" fill="#FFFFFF" fill-opacity="0.5"/><rect x="26" y="42" width="20" height="4" rx="1" fill="#FFFFFF" fill-opacity="0.5"/><rect x="10" y="16" width="24" height="32" rx="4" fill="#0E6435"/><path d="M16 24l5 8-5 8h4l3-5.5 3 5.5h4l-5-8 5-8h-4l-3 5.5-3-5.5h-4z" fill="#FFFFFF"/></svg>`
  },
  {
    id: 'bi-reporting',
    name: 'BI Reporting & Telemetry',
    category: 'Core Analytics',
    color: '#059669',
    secondaryColor: '#0284C7',
    context: 'Executive decision telemetry, automated scheduled refreshes and stakeholder KPI scorecards.',
    resumeBullet: 'Designed automated BI reporting workflows to improve data accuracy and leadership decision speed.',
    logoUrl: '/logos/bi-reporting.svg',
    svgIcon: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="6" y="8" width="52" height="40" rx="8" stroke="#059669" stroke-width="3" fill="#F0FDF4"/><path d="M26 48h12v6H26zM20 54h24v3H20z" fill="#0284C7"/><rect x="14" y="30" width="6" height="12" rx="2" fill="#059669" fill-opacity="0.7"/><rect x="24" y="24" width="6" height="18" rx="2" fill="#059669" fill-opacity="0.85"/><rect x="34" y="18" width="6" height="24" rx="2" fill="#0284C7"/><rect x="44" y="14" width="6" height="28" rx="2" fill="#0284C7"/><path d="M14 26l10-4 10 4 16-12" stroke="#F59E0B" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="50" cy="14" r="3" fill="#F59E0B"/></svg>`
  },

  // -------------------------------------------------------------
  // 2. Data Science & AI Exposure
  // -------------------------------------------------------------
  {
    id: 'pandas',
    name: 'Pandas',
    category: 'Data Science & AI',
    color: '#4338CA',
    secondaryColor: '#E70488',
    context: 'High-performance DataFrame indexing, aggregation, missing data imputation and merging.',
    resumeBullet: 'Cleaned and structured messy transactional records with Pandas for cohort and margin analysis.',
    logoUrl: '/logos/pandas.svg',
    svgIcon: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="12" y="16" width="8" height="32" rx="2" fill="#38BDF8"/><rect x="24" y="24" width="8" height="24" rx="2" fill="#FFD13B"/><rect x="36" y="8" width="8" height="40" rx="2" fill="#E70488"/><rect x="48" y="20" width="8" height="28" rx="2" fill="#00D4FF"/><circle cx="16" cy="10" r="3.5" fill="#38BDF8"/></svg>`
  },
  {
    id: 'numpy',
    name: 'NumPy',
    category: 'Data Science & AI',
    color: '#4DABCF',
    secondaryColor: '#013243',
    context: 'Multi-dimensional arrays, vectorized mathematical computation and statistical distribution calculations.',
    resumeBullet: 'Computed Z-score outlier detection and numerical customer retention metrics efficiently.',
    logoUrl: '/logos/numpy.svg',
    svgIcon: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M32 8l20 11.5v23L32 54 12 42.5v-23L32 8z" fill="#013243"/><path d="M32 8l20 11.5L32 31 12 19.5 32 8z" fill="#4DABCF"/><path d="M32 31v23L12 42.5v-23L32 31z" fill="#012838"/><path d="M32 31l20-11.5v23L32 54V31z" fill="#2E7E9E"/><path d="M22 28v16l6-10v10" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M38 34v10m0-10h4a3 3 0 010 6h-4" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  },
  {
    id: 'matplotlib',
    name: 'Matplotlib',
    category: 'Data Science & AI',
    color: '#11557C',
    secondaryColor: '#3082BE',
    context: 'Data visualization, histogram plotting, customer retention curves and correlation matrices.',
    resumeBullet: 'Rendered exploratory distribution charts and customer acquisition breakdown plots.',
    logoUrl: '/logos/matplotlib.svg',
    svgIcon: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="32" cy="32" r="26" fill="#11557C"/><circle cx="32" cy="32" r="18" fill="#1B6A9C"/><circle cx="32" cy="32" r="10" fill="#2984BD"/><path d="M10 40c8-12 16-16 24-8s12 16 20 4" stroke="#FFD13B" stroke-width="3" stroke-linecap="round"/><path d="M10 48c10-6 18-20 28-10s8 14 16 2" stroke="#FF4B4B" stroke-width="3" stroke-linecap="round"/><circle cx="28" cy="28" r="3" fill="#FFFFFF"/><circle cx="44" cy="36" r="3" fill="#FFFFFF"/></svg>`
  },
  {
    id: 'applied-ai',
    name: 'Applied AI & ATS Scoring',
    category: 'Data Science & AI',
    color: '#7C3AED',
    secondaryColor: '#2563EB',
    context: 'Natural language semantic parsing, TF-IDF resume ranking and automated candidate scoring algorithms.',
    resumeBullet: 'Applied AI features (ATS scoring, resume analysis) in academic project research work.',
    logoUrl: '/logos/applied-ai.svg',
    svgIcon: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="32" cy="32" r="26" stroke="#7C3AED" stroke-width="2.5" stroke-dasharray="3 3"/><circle cx="32" cy="32" r="10" fill="#7C3AED"/><circle cx="32" cy="32" r="5" fill="#FFFFFF"/><circle cx="32" cy="12" r="4.5" fill="#7C3AED"/><circle cx="50" cy="24" r="4.5" fill="#2563EB"/><circle cx="46" cy="46" r="4.5" fill="#00D4FF"/><circle cx="18" cy="46" r="4.5" fill="#059669"/><circle cx="14" cy="24" r="4.5" fill="#7C3AED"/><path d="M32 16.5v5.5M46.5 26.5l-5 3M43 43.5l-4-3M25 40.5l-4 3M21.5 29.5l5-3" stroke="#2563EB" stroke-width="2" stroke-linecap="round"/></svg>`
  },

  // -------------------------------------------------------------
  // 3. Databases & Data Warehousing
  // -------------------------------------------------------------
  {
    id: 'mysql',
    name: 'MySQL',
    category: 'Databases',
    color: '#00758F',
    secondaryColor: '#F29111',
    context: 'Relational database schemas, ACID transactions, indexing strategies and optimized subqueries.',
    resumeBullet: 'Structured and queried transactional retail datasets in MySQL with strict schema validation.',
    logoUrl: '/logos/mysql.svg',
    svgIcon: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="8" y="8" width="48" height="48" rx="12" fill="#00758F"/><path d="M20 42c3-8 9-16 18-18 6-1 11 1 14 4-2-6-8-12-16-13-11-1-20 8-20 19 0 3 .6 6 1.8 8.8l2.2-.8z" fill="#F29111"/><path d="M22 41c5-7 12-11 20-11 5 0 9 2 12 5-2-4-5-8-10-10-8-3-17 1-20 8-.8 2.3-1.4 5.3-2 8z" fill="#FFFFFF"/></svg>`
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL / Supabase',
    category: 'Databases',
    color: '#336791',
    secondaryColor: '#3ECF8E',
    context: 'Cloud relational data warehousing, row-level security, analytical window aggregations.',
    resumeBullet: 'Integrated Supabase PostgreSQL database for Vyaptiq IQ real-time KPI computing.',
    logoUrl: '/logos/postgresql.svg',
    svgIcon: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="8" y="8" width="48" height="48" rx="12" fill="#336791"/><path d="M32 16c-8 0-14 6-14 14 0 6 3.5 11 8.5 13v7h6v-5.5c1-.1 2-.3 3-.6 4-1.2 7-4.5 7.5-8.9.5-4.5-1.5-8.5-5-11-2-1.5-4-3-6-8z" fill="#FFFFFF"/><path d="M25 32c0 5 4 9 9 9s9-4 9-9" stroke="#336791" stroke-width="2.5" stroke-linecap="round"/></svg>`
  },

  // -------------------------------------------------------------
  // 4. Developer Tools & Environments
  // -------------------------------------------------------------
  {
    id: 'git',
    name: 'Git & GitHub',
    category: 'Developer Tools',
    color: '#F05032',
    secondaryColor: '#FFFFFF',
    context: 'Version control for analytics repositories, reproducible Jupyter notebooks and team collaboration.',
    resumeBullet: 'Maintained version-controlled analytical pipelines and collaborative codebases on GitHub.',
    logoUrl: '/logos/git.svg',
    svgIcon: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M57.6 28.9L35.1 6.4c-1.6-1.6-4.2-1.6-5.8 0L24 11.7l7.2 7.2c1.7-.6 3.7-.2 5.1 1.2 1.4 1.4 1.8 3.4 1.2 5.1l7.2 7.2c1.7-.6 3.7-.2 5.1 1.2 1.9 1.9 1.9 5.1 0 7-1.9 1.9-5.1 1.9-7 0-1.4-1.4-1.8-3.4-1.2-5.1L35 29.4v13.2c.5.2 1 .5 1.4.9 1.9 1.9 1.9 5.1 0 7-1.9 1.9-5.1 1.9-7 0-1.9-1.9-1.9-5.1 0-7 .4-.4.9-.7 1.4-.9V29.2L18.4 17.3 6.4 29.3c-1.6 1.6-1.6 4.2 0 5.8l22.5 22.5c1.6 1.6 4.2 1.6 5.8 0l22.9-22.9c1.6-1.6 1.6-4.2 0-5.8z" fill="#F05032"/></svg>`
  },
  {
    id: 'vscode',
    name: 'VS Code',
    category: 'Developer Tools',
    color: '#007ACC',
    secondaryColor: '#1F8AD2',
    context: 'Primary development IDE, interactive Jupyter environments, Python scripts and SQL formatting.',
    resumeBullet: 'Configured robust development and scripting workflows for data models and automated analytics.',
    logoUrl: '/logos/vscode.svg',
    svgIcon: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M46.7 5.6L30 21.2 17.1 11.4 5.3 18v28l11.8 6.6L30 42.8l16.7 15.6L58.7 53V11L46.7 5.6z" fill="#0065A9"/><path d="M46.7 5.6l-16.7 15.6 16.7 15.6V5.6z" fill="#007ACC"/><path d="M46.7 58.4L30 42.8l16.7-15.6v31.2z" fill="#1F8AD2"/><path d="M5.3 46V18l11.8 6.6v14.8L5.3 46z" fill="#0065A9"/><path d="M17.1 24.6L30 32l-12.9 7.4V24.6z" fill="#007ACC"/></svg>`
  },
  {
    id: 'eclipse',
    name: 'Eclipse IDE',
    category: 'Developer Tools',
    color: '#2C2255',
    secondaryColor: '#C792EA',
    context: 'Structured programming IDE, algorithmic development and academic software engineering.',
    resumeBullet: 'Used Eclipse IDE for academic foundational computer science and systems training.',
    logoUrl: '/logos/eclipse.svg',
    svgIcon: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="32" cy="32" r="26" fill="#2C2255"/><path d="M8 26h48v4H8v-4zm0 8h48v4H8v-4zm4 8h40v4H12v-4z" fill="#C792EA"/><path d="M54 18c4 7 4 17 0 24" stroke="#F59E0B" stroke-width="4" stroke-linecap="round"/></svg>`
  },
  {
    id: 'c-lang',
    name: 'C Language',
    category: 'Developer Tools',
    color: '#00599C',
    secondaryColor: '#A8B9CC',
    context: 'Procedural algorithmic logic, memory management, computational complexity and data structures.',
    resumeBullet: 'Developed core computational thinking and algorithmic problem solving through C programming.',
    logoUrl: '/logos/c.svg',
    svgIcon: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M32 6L54 19v26L32 58 10 45V19L32 6z" fill="#00599C"/><path d="M32 11L49 21v22L32 53 15 43V21L32 11z" fill="#004482"/><path d="M42 25c-2.5-3-6-4.5-10-4.5-8 0-14 5.5-14 13.5s6 13.5 14 13.5c4 0 7.5-1.5 10-4.5l-4-3.5c-1.5 2-3.5 3-6 3-5 0-8.5-3.5-8.5-8.5s3.5-8.5 8.5-8.5c2.5 0 4.5 1 6 3l4-3.5z" fill="#FFFFFF"/></svg>`
  },

  // -------------------------------------------------------------
  // 5. Web Technologies & Frameworks
  // -------------------------------------------------------------
  {
    id: 'react',
    name: 'React.js',
    category: 'Web & Frameworks',
    color: '#61DAFB',
    secondaryColor: '#00D4FF',
    context: 'Component-driven analytical dashboards, dynamic state management and interactive Recharts data UI.',
    resumeBullet: 'Built the Vyaptiq IQ web dashboard end-to-end using React and dynamic telemetry charts.',
    logoUrl: '/logos/react.svg',
    svgIcon: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="32" cy="32" rx="26" ry="10" stroke="#61DAFB" stroke-width="2.5" transform="rotate(0 32 32)"/><ellipse cx="32" cy="32" rx="26" ry="10" stroke="#61DAFB" stroke-width="2.5" transform="rotate(60 32 32)"/><ellipse cx="32" cy="32" rx="26" ry="10" stroke="#61DAFB" stroke-width="2.5" transform="rotate(120 32 32)"/><circle cx="32" cy="32" r="5" fill="#61DAFB"/></svg>`
  },
  {
    id: 'html5',
    name: 'HTML5',
    category: 'Web & Frameworks',
    color: '#E34F26',
    secondaryColor: '#EF652A',
    context: 'Semantic DOM architecture, structured analytics markup and accessibility compliance.',
    resumeBullet: 'Crafted responsive, accessible layouts for data presentations and intelligence portals.',
    logoUrl: '/logos/html5.svg',
    svgIcon: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 6l4.4 49.3L32 60l17.6-4.7L54 6H10z" fill="#E34F26"/><path d="M32 56.4l14.1-3.8 3.5-39.6H32v43.4z" fill="#EF652A"/><path d="M32 23.6h9.7l-.7 7.7H32v7.7h8.3l-.8 9.3L32 50.4V43l4.6-1.2.3-3.6H32V23.6z" fill="#FFFFFF"/><path d="M32 23.6H22.3l.7 7.7H32v-7.7zm0 15.4H23.8l.8 9.3L32 50.4v-7.4l-4.6-1.2-.3-3.6H32V39z" fill="#EBEBEB"/></svg>`
  },
  {
    id: 'css3',
    name: 'CSS3',
    category: 'Web & Frameworks',
    color: '#1572B6',
    secondaryColor: '#33A9DC',
    context: 'Responsive styling, CSS Grid, Flexbox, glassmorphic themes and cyber dark-mode aesthetics.',
    resumeBullet: 'Implemented custom responsive styling for high-density analytics portals.',
    logoUrl: '/logos/css3.svg',
    svgIcon: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 6l4.4 49.3L32 60l17.6-4.7L54 6H10z" fill="#1572B6"/><path d="M32 56.4l14.1-3.8 3.5-39.6H32v43.4z" fill="#33A9DC"/><path d="M32 23.6h9.7l-.7 7.7H32v7.7h8.3l-.8 9.3L32 50.4V43l4.6-1.2.3-3.6H32V23.6z" fill="#FFFFFF"/><path d="M32 23.6H22.3l.7 7.7H32v-7.7zm0 15.4H23.8l.8 9.3L32 50.4v-7.4l-4.6-1.2-.3-3.6H32V39z" fill="#EBEBEB"/></svg>`
  },
  {
    id: 'bootstrap',
    name: 'Bootstrap',
    category: 'Web & Frameworks',
    color: '#7952B3',
    secondaryColor: '#563D7C',
    context: 'Rapid responsive grid prototyping, clean card containers and executive dashboard layouting.',
    resumeBullet: 'Utilized Bootstrap components for rapid front-end data dashboard prototyping.',
    logoUrl: '/logos/bootstrap.svg',
    svgIcon: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="8" y="8" width="48" height="48" rx="14" fill="#7952B3"/><path d="M26 19h10c4 0 7 2 7 5.5s-2 4.5-5 5c4 .5 6 2.5 6 6s-3 6.5-8 6.5H26V19zm6 10h3.5c2 0 3.5-1 3.5-2.5s-1.5-2.5-3.5-2.5H32v5zm0 8h4c2 0 4-1 4-3s-2-3-4-3H32v6z" fill="#FFFFFF"/></svg>`
  },
  {
    id: 'rest-api',
    name: 'REST APIs',
    category: 'Web & Frameworks',
    color: '#0284C7',
    secondaryColor: '#7C3AED',
    context: 'Data pipeline integration, JSON payload transformations, asynchronous fetches and endpoint caching.',
    resumeBullet: 'Connected front-end metric widgets to live REST API backend endpoints for dynamic updates.',
    logoUrl: '/logos/rest-api.svg',
    svgIcon: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="8" y="12" width="48" height="40" rx="10" stroke="#0284C7" stroke-width="3" fill="#F0F9FF"/><circle cx="16" cy="20" r="2.5" fill="#10B981"/><circle cx="24" cy="20" r="2.5" fill="#F59E0B"/><circle cx="32" cy="20" r="2.5" fill="#0284C7"/><path d="M22 34l-5 4 5 4m20-8l5 4-5 4m-11-8l-4 16" stroke="#2563EB" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><circle cx="32" cy="12" r="4" fill="#0284C7"/><circle cx="32" cy="52" r="4" fill="#7C3AED"/></svg>`
  },

  // -------------------------------------------------------------
  // 6. Analytics Methodologies
  // -------------------------------------------------------------
  {
    id: 'cohort-analysis',
    name: 'Cohort Analysis',
    category: 'Analytics Methodologies',
    color: '#7C3AED',
    secondaryColor: '#00D4FF',
    context: 'M0–M5 customer lifecycle decay modeling, retention curve inflection point tracking.',
    resumeBullet: 'Performed monthly cohort analysis across 1,400+ customers, uncovering a 17-day mean repeat-purchase window.',
    logoUrl: '/logos/cohort-analysis.svg',
    svgIcon: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="8" y="10" width="10" height="10" rx="3" fill="#6D28D9"/><rect x="20" y="10" width="10" height="10" rx="3" fill="#7C3AED"/><rect x="32" y="10" width="10" height="10" rx="3" fill="#8B5CF6"/><rect x="44" y="10" width="10" height="10" rx="3" fill="#A78BFA"/><rect x="8" y="22" width="10" height="10" rx="3" fill="#6D28D9"/><rect x="20" y="22" width="10" height="10" rx="3" fill="#7C3AED"/><rect x="32" y="22" width="10" height="10" rx="3" fill="#8B5CF6"/><rect x="8" y="34" width="10" height="10" rx="3" fill="#6D28D9"/><rect x="20" y="34" width="10" height="10" rx="3" fill="#7C3AED"/><rect x="8" y="46" width="10" height="10" rx="3" fill="#6D28D9"/><path d="M13 15l12 12 12 12 12 12" stroke="#00D4FF" stroke-width="2.5" stroke-dasharray="2 2"/></svg>`
  },
  {
    id: 'rfm-segmentation',
    name: 'RFM Segmentation',
    category: 'Analytics Methodologies',
    color: '#E11D48',
    secondaryColor: '#7C3AED',
    context: 'Recency, Frequency, and Monetary scoring dividing customers into Champions, Regulars, and At-Risk tiers.',
    resumeBullet: 'Segmented customer base into Champions, Regulars, and Churned to optimize marketing spend allocation.',
    logoUrl: '/logos/rfm-segmentation.svg',
    svgIcon: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="32" cy="32" r="26" stroke="#0284C7" stroke-width="3" stroke-dasharray="5 3"/><circle cx="32" cy="32" r="18" stroke="#7C3AED" stroke-width="3"/><circle cx="32" cy="32" r="10" stroke="#E11D48" stroke-width="3"/><circle cx="32" cy="32" r="4.5" fill="#F59E0B"/></svg>`
  },
  {
    id: 'data-cleaning',
    name: 'Data Cleaning & ETL',
    category: 'Analytics Methodologies',
    color: '#0D9488',
    secondaryColor: '#10B981',
    context: 'Deduplication, missing value imputation, type normalization, outlier winsorization and pipeline validation.',
    resumeBullet: 'Cleaned and pre-processed 5,000+ row datasets to improve reporting reliability and executive trust.',
    logoUrl: '/logos/data-cleaning.svg',
    svgIcon: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 12h48l-18 20v18l-12-6V32L8 12z" fill="#CCFBF1" stroke="#0D9488" stroke-width="3" stroke-linejoin="round"/><circle cx="24" cy="18" r="2.5" fill="#0D9488"/><circle cx="32" cy="22" r="3" fill="#0D9488"/><circle cx="40" cy="18" r="2.5" fill="#0D9488"/><circle cx="42" cy="44" r="12" fill="#10B981"/><path d="M37 44l3.5 3.5 7.5-7.5" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  },
  {
    id: 'data-visualization',
    name: 'Data Visualization',
    category: 'Analytics Methodologies',
    color: '#2563EB',
    secondaryColor: '#D97706',
    context: 'Translating complex quantitative distributions into intuitive charts, scatter plots and heatmaps.',
    resumeBullet: 'Transformed raw transaction logs into executive visual stories that directly guided pricing decisions.',
    logoUrl: '/logos/data-visualization.svg',
    svgIcon: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="32" width="8" height="22" rx="3" fill="#F59E0B" fill-opacity="0.85"/><rect x="22" y="22" width="8" height="32" rx="3" fill="#F59E0B"/><rect x="34" y="16" width="8" height="38" rx="3" fill="#0284C7" fill-opacity="0.85"/><rect x="46" y="24" width="8" height="30" rx="3" fill="#0284C7"/><path d="M6 54h52" stroke="#94A3B8" stroke-width="2.5" stroke-linecap="round"/><path d="M14 28l12-10 12 4 14-12" stroke="#2563EB" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><circle cx="14" cy="28" r="3" fill="#2563EB"/><circle cx="26" cy="18" r="3" fill="#2563EB"/><circle cx="38" cy="22" r="3" fill="#2563EB"/><circle cx="52" cy="10" r="3.5" fill="#EF4444"/></svg>`
  },
  {
    id: 'kpi-tracking',
    name: 'KPI Tracking & Metrics',
    category: 'Analytics Methodologies',
    color: '#059669',
    secondaryColor: '#0284C7',
    context: 'Translating business objectives into automated scorecards (revenue, gross margin %, ARPU, churn).',
    resumeBullet: 'Computed core business KPIs (revenue, margin %, ARPU) and anomaly flags for retail intelligence.',
    logoUrl: '/logos/kpi-tracking.svg',
    svgIcon: `<svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 44 A24 24 0 1 1 52 44" stroke="#059669" stroke-width="4.5" stroke-linecap="round"/><circle cx="32" cy="40" r="5" fill="#0F172A"/><path d="M32 40 L44 22" stroke="#EF4444" stroke-width="3" stroke-linecap="round"/><path d="M22 28l6-6 6 6m-6-6v12" stroke="#059669" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>`
  }
];

export const SOFT_AND_BUSINESS_SKILLS: SoftSkill[] = [
  { name: 'KPI Tracking', type: 'Business', description: 'Translating strategic business targets into automated quantitative scorecards.' },
  { name: 'Stakeholder Reporting', type: 'Business', description: 'Executive summary presentations and interactive BI communication for decision makers.' },
  { name: 'Forecasting', type: 'Business', description: 'Trend projection and demand modeling based on historical retail sales data.' },
  { name: 'Data-Driven Decision Making', type: 'Business', description: 'Eliminating guesswork with empirical cohort, RFM, and margin analysis.' },
  { name: 'Requirement Gathering', type: 'Business', description: 'Transforming ambiguous business queries into structured SQL datasets.' },
  { name: 'Problem Solving', type: 'Soft', description: 'Deconstructing root causes behind churn, anomalies, and reporting bottlenecks.' },
  { name: 'Analytical Thinking', type: 'Soft', description: 'Rigorous statistical mindset from distribution shape to significance testing.' },
  { name: 'Team Collaboration', type: 'Soft', description: 'Cross-functional alignment with engineering, management, and marketing.' },
  { name: 'Adaptability', type: 'Soft', description: 'Rapid mastery of emerging analytical frameworks, tooling, and AI workflows.' },
  { name: 'Applied AI Features', type: 'Data', description: 'Integrating LLM/ATS scoring and automated resume classification workflows.' }
];
