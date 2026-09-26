export interface Achievement {
  id: string;
  title: string;
  organization: string;
  description: string;
  result: string;
  year: string;
  category: 'Presentation' | 'Design' | 'Research';
  iconType: 'presentation' | 'design' | 'research' | 'analytics';
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'mvr-paper-1st',
    title: '1st Prize — Paper Presentation',
    organization: 'MVR College of Engineering',
    description: 'Presented research on data-driven architectures and statistical intelligence paradigms.',
    result: 'Awarded top position among participants',
    year: '2025',
    category: 'Presentation',
    iconType: 'presentation',
  },
  {
    id: 'ciet-logo-1st',
    title: '1st Prize — Logo Design & Visual Identity',
    organization: 'Chalapathi Institute of Engineering & Technology',
    description: 'Engineered minimalist geometric brand identity balancing visual precision with brand clarity.',
    result: 'Awarded 1st Place out of all collegiate entrants',
    year: '2025',
    category: 'Design',
    iconType: 'design',
  },
  {
    id: 'pbs-paper-2nd',
    title: '2nd Prize — Technical Presentation',
    organization: 'PB Siddhartha College',
    description: 'Presented technical evaluation on modern analytics frameworks and structured data modeling.',
    result: 'Runner-up distinction for analytical rigor',
    year: '2025',
    category: 'Presentation',
    iconType: 'analytics',
  },
  {
    id: 'taylor-francis-journal',
    title: 'Published Author — Peer-Reviewed Journal',
    organization: 'Taylor & Francis Indexed Journal',
    description: 'Authored and published research paper demonstrating empirical methodologies.',
    result: 'Peer-reviewed international publication',
    year: '2025',
    category: 'Research',
    iconType: 'research',
  }
];
