export type ResumeRole = {
  company: string;
  title: string;
  period: string;
  location: string;
  startYear: number;
  endYear: number | null;
  responsibilities: string[];
};

export const resumeRoles: ResumeRole[] = [
  {
    company: "Microsoft",
    title: "Senior UX Designer",
    period: "2025 – Present",
    location: "Bay Area, California",
    startYear: 2025,
    endYear: null,
    responsibilities: [
      "Create experience guidance and a shared Storybook of components and patterns for generated ERP experiences as part of Microsoft’s horizontal AI ERP team.",
      "Own ERP agent lifecycle design, translating customer research into prototypes and aligning onboarding and management experiences with PM and partner teams.",
    ],
  },
  {
    company: "Microsoft",
    title: "Senior UX Designer",
    period: "September 2021 – 2025",
    location: "Shanghai, China",
    startYear: 2021,
    endYear: 2025,
    responsibilities: [
      "Led UX for Pricing Service, using customer research and vision prototyping to shape product direction.",
      "Designed Traceability from the ground up in Supply Chain Management, using user research and prototype testing to connect product relationships and production evidence for recall investigations.",
    ],
  },
  {
    company: "Alibaba Group",
    title: "Interaction Design Expert",
    period: "October 2020 – September 2021",
    location: "Shanghai, China",
    startYear: 2020,
    endYear: 2021,
    responsibilities: [
      "Led the redesign of ele.me’s instant messaging experience on mobile and desktop, helping businesses build trusted connections with customers.",
      "Designed an invoicing system and financial services experiences to support business users’ accounting needs.",
    ],
  },
  {
    company: "GroupM",
    title: "UX Designer",
    period: "October 2018 – September 2020",
    location: "New York, New York",
    startYear: 2018,
    endYear: 2020,
    responsibilities: [
      "Led product design for a data ingestion tool in [m]Platform from ideation to launch, simplifying data operations for marketers.",
      "Designed dashboards and audience segmentation, including Lookalike audiences, to support consumer data analysis. Contributed reusable UI patterns to the design system.",
    ],
  },
  {
    company: "Jop",
    title: "UX Designer",
    period: "December 2017 – October 2018",
    location: "Brooklyn, New York",
    startYear: 2017,
    endYear: 2018,
    responsibilities: [
      "Designed an on-demand service booking system informed by user research, balancing the needs of customers and service providers.",
      "Designed earning and spending flows for Jop-issued cryptocurrency.",
    ],
  },
];

export const resumeEducation = [
  { school: "Pratt Institute", degree: "M.S. Information Experience Design" },
  { school: "South China University of Technology", degree: "M.E. Industrial Design" },
];

export const resumeSkillGroups = [
  { label: "AI & Enterprise", items: ["AI experience design", "AI-assisted prototyping", "ERP and enterprise SaaS"] },
  { label: "Product Design", items: ["Product strategy", "User research", "Interaction design", "Information architecture"] },
  { label: "Design Systems", items: ["Experience standards", "Cross-team collaboration"] },
] as const;
export const resumeTools = "Lovable · VS Code · Autopilot · Cursor · Figma · Adobe Creative Suite · HTML · CSS · JavaScript · Node.js · n8n";