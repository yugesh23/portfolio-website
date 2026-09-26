export interface Education {
  institution: string;
  degree: string;
  period: string;
  score: string;
  details?: string;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  type: string;
  bullets: string[];
  skills: string[];
}

export interface ProfileData {
  name: string;
  title: string;
  headline: string;
  subtext: string;
  phone: string;
  email: string;
  college: string;
  degree: string;
  gradYear: string;
  rollNo: string;
  education: Education[];
  experience: Experience[];
  social: {
    linkedin: string;
    github: string;
    youtube: string;
    whatsapp: string;
  };
  metrics: {
    reportingEfficiency: string;
    dashboardsBuilt: string;
    cohortAnalysis: string;
    businessInsights: string;
  };
}

export const PROFILE: ProfileData = {
  name: "Hari Sai Yugesh",
  title: "Data Analyst",
  headline: "Data Analyst | Turning Data into Business Decisions",
  subtext: "Built automated dashboards, reduced reporting time by 15%, and analyzed customer behavior using SQL, Python, and Power BI.",
  phone: "+91-7396352627",
  email: "saiyugesh60@gmail.com",
  college: "NRI Institute of Technology, Agiripalli",
  degree: "B.Tech, Information Technology",
  gradYear: "2023–2027",
  rollNo: "23KN1A1239",
  education: [
    {
      institution: "NRI Institute of Technology, Agiripalli",
      degree: "B.Tech in Information Technology",
      period: "2023–2027",
      score: "Roll: 23KN1A1239",
      details: "Focusing on data structures, database architecture, statistical computing, and predictive models."
    },
    {
      institution: "Sr Junior College, Andhra Pradesh",
      degree: "Intermediate",
      period: "2021–2023",
      score: "79.1%",
      details: "Mathematics, Physics, Chemistry."
    },
    {
      institution: "KC High School, Andhra Pradesh",
      degree: "SSC",
      period: "2020–2021",
      score: "GPA 10.0",
      details: "Secondary School Certificate with perfect 10.0 cumulative grade point average."
    }
  ],
  experience: [
    {
      role: "Data Analyst Intern",
      company: "Infyntrek",
      period: "Aug 2026 – Present",
      type: "Remote",
      bullets: [
        "Analyzed datasets using SQL, Python, Excel",
        "Built 2 automated dashboards in Power BI",
        "Reduced reporting time by 15%",
        "Cleaned large datasets for improved insights"
      ],
      skills: ["SQL", "Python", "Power BI", "Excel", "Data Cleaning", "Business Insights"]
    }
  ],
  social: {
    linkedin: "https://www.linkedin.com/in/hari-sai-yugesh-5299b12b9/",
    github: "https://github.com/yugesh23",
    youtube: "https://www.youtube.com/@VyaptiqOfficial",
    whatsapp: "https://wa.me/917396352627",
  },
  metrics: {
    reportingEfficiency: "15%",
    dashboardsBuilt: "2",
    cohortAnalysis: "2,400+",
    businessInsights: "100%"
  }
};
