export interface ProjectData {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  tagline: string;
  problem: string;
  dataset: string;
  approach: string[];
  outcomes: string[];
  recommendations?: string[];
  techStack: string[];
  metrics: { label: string; value: string; delta?: string }[];
  githubUrl: string;
  liveDemoUrl: string;
  chartType: 'retail-anomalies' | 'cohort-retention';
  // Illustrative data for live Recharts
  chartData: any;
}

export const PROJECTS: ProjectData[] = [
  {
    id: 'vyaptiq-iq',
    title: 'Vyaptiq IQ',
    subtitle: 'Data-Driven Retail Intelligence Platform',
    year: '2026',
    tagline: 'Automated KPI computation, Z-score anomaly detection & algorithmic action mapping for enterprise retail datasets.',
    problem: 'Retail operations frequently leak gross margins and misallocate promotional budgets because manual reporting takes days to identify margin decay, pricing anomalies, and SKU velocity drops across transactional stores.',
    dataset: '14,200+ transactional records across 8 retail store outlets including item SKUs, timestamped purchases, gross amounts, and discount codes.',
    approach: [
      'Ingested transactional datasets into Supabase PostgreSQL with optimized indexing on SKU, store, and timestamps.',
      'Constructed algorithmic pipelines computing Core KPIs: Gross Revenue, Margin %, ARPU (Average Revenue Per User), and Promo Penetration Rate.',
      'Implemented real-time Z-score statistical anomaly detection (|z| > 2.5) to flag sudden demand surges or severe margin drops.',
      'Developed a rule-based recommendation engine prioritizing intervention actions: pricing revisions, discount caps, and marketing reallocations.'
    ],
    outcomes: [
      'Reduced anomaly identification window from 72 hours to near-instant automated alerting.',
      'Flagged promotional bleed across low-margin SKU lines, recovering up to 8.4% potential margin.',
      'Provided executive stakeholders with single-pane-of-glass real-time KPI telemetry via Recharts.'
    ],
    recommendations: [
      'Dynamic Price Throttling: Cap promotional discounts dynamically when raw margin drops below 18%.',
      'Inventory Rebalancing: Automatically flag store branches experiencing Z-score > 2.0 velocity surges.',
      'Channel Rationalization: Divert underperforming ad spend into high-ARPU localized demographics.'
    ],
    techStack: ['SQL (PostgreSQL)', 'Python', 'Z-Score Modeling', 'Anomaly Detection', 'Recharts'],
    metrics: [
      { label: 'Revenue Analyzed', value: 'Rs. 4.2M+' },
      { label: 'Avg Margin %', value: '34.2%', delta: '+4.1%' },
      { label: 'ARPU', value: 'Rs. 1,240' },
      { label: 'Promo Rate', value: '18.5%' }
    ],
    githubUrl: 'https://github.com/yugesh23/vyaptiq-iq',
    liveDemoUrl: 'https://www.youtube.com/@VyaptiqOfficial',
    chartType: 'retail-anomalies',
    chartData: {
      anomalies: [
        { batch: 'B1', zScore: 0.4, margin: 36, revenue: 140, isAnomaly: false },
        { batch: 'B2', zScore: -0.2, margin: 35, revenue: 165, isAnomaly: false },
        { batch: 'B3', zScore: 1.1, margin: 38, revenue: 210, isAnomaly: false },
        { batch: 'B4', zScore: 2.8, margin: 19, revenue: 380, isAnomaly: true },
        { batch: 'B5', zScore: 0.1, margin: 34, revenue: 155, isAnomaly: false },
        { batch: 'B6', zScore: -0.8, margin: 33, revenue: 130, isAnomaly: false },
        { batch: 'B7', zScore: -2.7, margin: 14, revenue: 85, isAnomaly: true },
        { batch: 'B8', zScore: 0.6, margin: 37, revenue: 190, isAnomaly: false },
        { batch: 'B9', zScore: 1.3, margin: 36, revenue: 220, isAnomaly: false },
        { batch: 'B10', zScore: 2.6, margin: 42, revenue: 340, isAnomaly: true },
        { batch: 'B11', zScore: 0.3, margin: 35, revenue: 175, isAnomaly: false },
        { batch: 'B12', zScore: -0.1, margin: 34, revenue: 160, isAnomaly: false },
      ],
      kpis: [
        { metric: 'Revenue', value: 'Rs. 4.2M' },
        { metric: 'Margin %', value: '34.2%' },
        { metric: 'ARPU', value: 'Rs. 1,240' },
        { metric: 'Promo Rate', value: '18.5%' }
      ]
    }
  },
  {
    id: 'customer-retention',
    title: 'Customer Retention & Cohort Analytics',
    subtitle: 'Interactive Behavioral Intelligence Dashboard',
    year: '2026',
    tagline: '1,400+ customer lifecycle segmentation, M0–M5 cohort decay curves, and RFM predictive retention modeling.',
    problem: 'Without behavioral cohort tracking, consumer businesses misattribute customer acquisition success and fail to recognize that early drop-off occurs within the first 17 days, leading to inefficient retention ad spend.',
    dataset: '5,000+ customer transactions spanning 1,400+ unique user accounts with timestamps, order baskets, and retention timestamps.',
    approach: [
      'Analyzed lifecycle data using SQL & Python across 1,400+ customer transaction logs.',
      'Built cohort decay models mapping monthly retention from Month 0 through Month 5.',
      'Identified retention patterns and 17-day mean purchase cycle to improve repeat purchases.'
    ],
    outcomes: [
      'Uncovered that customers not re-engaging within the 17-day window showed 83% churn risk.',
      'Identified Champions segment (31% of users) delivering 58% of net business revenue.',
      'Designed automated Day-14 trigger notifications to recover at-risk cohorts.'
    ],
    recommendations: [
      'Referral Budget Reallocation: Shift 25% of top-of-funnel acquisition ad spend toward high-LTV referral channel incentives.',
      'Automated CRM Re-Engagement: Trigger customized dynamic SMS/WhatsApp notifications on Day 14 before the critical 17-day churn cliff.',
      'Cross-Sell Strategy: Pair top complementary SKUs in basket checkout during Day 5–10 post initial order.'
    ],
    techStack: ['SQL', 'Python (Pandas, NumPy)', 'Power BI', 'Cohort Modeling', 'RFM Segmentation'],
    metrics: [
      { label: 'Customers Analyzed', value: '1,400+' },
      { label: 'Repeat Purchase Rate', value: '79.3%', delta: 'High Benchmark' },
      { label: 'Average Order Value (AOV)', value: 'Rs. 863' },
      { label: 'Mean Repeat Window', value: '17 Days' }
    ],
    githubUrl: 'https://github.com/yugesh23/retention-cohort-analytics',
    liveDemoUrl: 'https://www.youtube.com/@VyaptiqOfficial',
    chartType: 'cohort-retention',
    chartData: {
      rfmSegments: [
        { name: 'Champions', value: 31, color: '#38BDF8' },
        { name: 'Loyal Regulars', value: 38, color: '#A78BFA' },
        { name: 'At-Risk', value: 19, color: '#64748B' },
        { name: 'Churned', value: 12, color: '#334155' },
      ],
      cohortMatrix: [
        { cohort: 'Jan (M0)', m0: 100, m1: 82, m2: 79, m3: 76, m4: 73, m5: 71 },
        { cohort: 'Feb (M1)', m0: 100, m1: 84, m2: 80, m3: 77, m4: 75, m5: null },
        { cohort: 'Mar (M2)', m0: 100, m1: 81, m2: 79, m3: 78, m4: null, m5: null },
        { cohort: 'Apr (M3)', m0: 100, m1: 85, m2: 82, m3: null, m4: null, m5: null },
        { cohort: 'May (M4)', m0: 100, m1: 83, m2: null, m3: null, m4: null, m5: null },
        { cohort: 'Jun (M5)', m0: 100, m1: null, m2: null, m3: null, m4: null, m5: null },
      ]
    }
  }
];
