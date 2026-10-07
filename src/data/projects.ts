// src/data/projects.ts
import { Project, ProjectMetric, ProjectInsight } from "@/types";

export const allProjects: Project[] = [
  // ============================================
  // AI & DATA PROJECTS (Featured)
  // ============================================
  {
    id: "shaky-isles",
    title: "Shaky Isles - NZ Quake Pipeline",
    description:
      "Hourly NZ earthquake pipeline: GeoNet API to bronze JSON, idempotent DuckDB loads deduped on quake ID, dbt staging plus daily-counts mart with 5/5 tests passing. Scheduled green runs on GitHub Actions plus an Airflow DAG version.",
    category: "Data Engineering",
    techStack: ["Python", "DuckDB", "dbt", "Airflow", "GitHub Actions"],
    features: [
      "Hourly GeoNet API ingestion",
      "Bronze JSON raw storage",
      "Idempotent quake-ID dedup loads",
      "dbt staging + daily mart",
      "5/5 dbt tests passing",
      "GitHub Actions green runs",
      "Airflow DAG version",
      "Documented debugging record",
    ],
    github: "https://github.com/achla26/shaky-isles",
    featured: true,
    status: "completed",
    year: "2026",
  },
  {
    id: "rag-handbook",
    title: "AI Handbook Q&A System",
    description:
      "Production-ready Q&A system using Retrieval-Augmented Generation (RAG). Achieved 100% accuracy on test queries with 1.01s average latency. Implemented three guardrails: citation validation, hallucination detection, and confidence scoring. Automated regression testing pipeline for iterative updates.",
    category: "AI/ML",
    techStack: ["Python", "LangChain", "Qdrant", "FastAPI", "Streamlit", "Groq"],
    features: [
      "100% accuracy on test queries",
      "1.01s average latency",
      "Citation validation guardrail",
      "Hallucination detection",
      "Confidence scoring system",
      "FastAPI REST backend",
      "Streamlit chat interface",
      "Automated regression testing pipeline",
    ],
    github: "https://github.com/achla26/handbook-rag",
    featured: true,
    status: "completed",
    year: "2024",
  },
  {
    id: "resume-matcher",
    title: "AI Resume Matcher",
    description:
      "Live AI-powered tool where users paste a job description and their resume to get a match score and specific improvement suggestions. Built and deployed within one day - demonstrates ability to ship fast with AI APIs.",
    category: "AI/ML",
    techStack: ["Python", "Streamlit", "Groq API"],
    features: [
      "Job description analysis",
      "Resume parsing & scoring",
      "Match percentage calculation",
      "Specific improvement suggestions",
      "Live deployed tool",
      "Built and shipped in one day",
      "Clean Streamlit interface",
      "AI-powered recommendations",
    ],
    github: "https://github.com/achla26/resume-matcher",
    featured: true,
    status: "completed",
    year: "2024",
  },
  {
    id: "walmart-analysis",
    title: "Walmart Sales Analysis",
    description:
      "Comprehensive analysis of retail sales data across 45 stores to identify underperforming locations and revenue opportunities. Discovered top store generates 8.1x more revenue than bottom performer. Found holiday seasons drive $54M extra revenue annually.",
    category: "Data Analysis",
    techStack: ["Python", "Pandas", "SQL", "Matplotlib", "Seaborn", "Jupyter"],
    features: [
      "Analyzed 6,400+ weekly sales records",
      "SQL window functions for ranking",
      "Statistical correlation analysis",
      "Business recommendations delivered",
      "Identified 8.1x revenue gap between stores",
      "Found $54M annual holiday revenue impact",
      "Data-driven staffing recommendations",
      "Targeted marketing strategies",
    ],
    github: "https://github.com/achla26/walmart-analysis",
    featured: true,
    status: "completed",
    year: "2024",
  },
  {
    id: "sql-warehouse",
    title: "SQL Data Warehouse",
    description:
      "Designed and built a data warehouse using industry-standard Bronze→Silver→Gold layering architecture. Created ETL stored procedures for data ingestion and transformation. Implemented star schema with dimension and fact tables.",
    category: "Data Engineering",
    techStack: ["PostgreSQL", "SQL", "ETL", "Star Schema", "Docker"],
    features: [
      "Bronze→Silver→Gold architecture",
      "ETL stored procedures",
      "Star schema design",
      "Data quality validation",
      "Dimension and fact tables",
      "Docker containerization",
      "Automated data ingestion",
      "Comprehensive documentation",
    ],
    github: "https://github.com/achla26/sql-warehouse",
    featured: true,
    status: "completed",
    year: "2024",
  },
  {
    id: "eda-toolkit",
    title: "EDA Automation Library",
    description:
      "Reusable Python library that automates exploratory data analysis. Includes five modules: data summarization, missing value analysis, outlier detection using IQR and Z-score methods, visualization generation, and automated HTML report creation.",
    category: "Data Analysis",
    techStack: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn"],
    features: [
      "5 analysis modules",
      "Automated HTML reports",
      "IQR outlier detection",
      "Z-score outlier detection",
      "Missing value suggestions",
      "Data summarization",
      "Visualization generation",
      "Clean API design",
    ],
    github: "https://github.com/achla26/eda-toolkit",
    featured: true,
    status: "completed",
    year: "2024",
  },

  // ============================================
  // WEB DEVELOPMENT PROJECTS
  // ============================================
  {
    id: "home-services",
    title: "Home Services Marketplace",
    description:
      "React Native marketplace app allowing homeowners to browse, book and manage home services. Features service listings, provider profiles, booking flow, and JWT authentication. Laravel REST API backend. Collaborating with a UI/UX designer.",
    category: "Web Development",
    techStack: ["React Native", "Laravel", "MySQL", "REST API", "JWT"],
    features: [
      "Service listings & search",
      "Provider profiles",
      "Booking flow",
      "JWT authentication",
      "Laravel REST API backend",
      "UI/UX designer collaboration",
      "Cross-platform mobile app",
      "Active development",
    ],
    featured: false,
    status: "in-progress",
    year: "2024",
  },
  {
    id: "poker-app",
    title: "Whispering Shouts",
    description:
      "Full-stack poker platform built with Laravel and Vue.js. Features real-time gaming using WebSockets, secure payment processing, tournament management system, and comprehensive user authentication.",
    category: "Web Development",
    techStack: ["Laravel", "Vue.js", "MySQL", "WebSockets"],
    features: [
      "Real-time gaming",
      "Payment processing",
      "Tournament system",
      "User profiles",
      "Game rooms",
      "User authentication",
      "Scalable architecture",
      "WebSocket integration",
    ],
    link: "https://whisperingshouts.com/",
    featured: false,
    status: "completed",
    year: "2023",
  },
  {
    id: "catking",
    title: "Catking.in EdTech Platform",
    description:
      "EdTech platform built with Laravel and Vue.js for online learning and exam preparation. Features course management, student dashboards, and content delivery systems for educational institutions.",
    category: "Web Development",
    techStack: ["Laravel", "Vue.js", "MySQL", "REST API"],
    features: [
      "Course management",
      "Student dashboards",
      "Content delivery",
      "User authentication",
      "REST API backend",
      "Admin panel",
      "Progress tracking",
      "Exam preparation tools",
    ],
    link: "https://catking.in/",
    featured: false,
    status: "completed",
    year: "2023",
  },
  {
    id: "brew-my-idea",
    title: "Brew My Idea",
    description:
      "Client web application built during tenure at NJ Graphica. Full-stack development with Laravel backend, featuring custom business logic and client-facing interfaces.",
    category: "Web Development",
    techStack: ["Laravel", "MySQL", "JavaScript", "Bootstrap"],
    features: [
      "Custom business logic",
      "Client-facing interface",
      "Admin dashboard",
      "User management",
      "Responsive design",
      "Database optimization",
      "API integration",
      "Deployment & maintenance",
    ],
    link: "https://brewmyidea.com/",
    featured: false,
    status: "completed",
    year: "2023",
  },
  {
    id: "medical-app",
    title: "Pediatric Cardiac Academy",
    description:
      "Research collaboration platform for medical professionals in pediatric cardiology. Enables researchers to upload papers, receive feedback, and collaborate with document management and user permission systems.",
    category: "Web Development",
    techStack: ["Laravel", "MySQL", "Bootstrap"],
    features: [
      "Research upload",
      "Comment system",
      "User collaboration",
      "Document management",
      "Feedback system",
      "Professional networking",
      "Knowledge sharing",
      "Secure file storage",
    ],
    link: "https://level3echoportal.com/",
    featured: false,
    status: "completed",
    year: "2023",
  },
  {
    id: "ecom",
    title: "Ecommerce Platform",
    description:
      "Full-featured ecommerce platform built with Laravel. Includes product catalog, shopping cart, payment gateway integration, and order management with scalable database design.",
    category: "Web Development",
    techStack: ["Laravel", "MySQL", "Bootstrap", "Stripe API"],
    features: [
      "Product catalog",
      "Shopping cart",
      "Payment gateway",
      "Order management",
      "Secure checkout",
      "Scalable architecture",
      "Customizable design",
      "Inventory management",
    ],
    link: "https://www.globehost.xyz/templets/theme1/demo3/",
    featured: false,
    status: "completed",
    year: "2022",
  },
  {
    id: "youtube-clone",
    title: "YouTube Clone",
    description:
      "Video streaming application built with React. Integrates with Rapid API for video data, features search functionality, pagination, and responsive Material-UI design.",
    category: "Web Development",
    techStack: ["React", "Material-UI", "Rapid API"],
    features: [
      "Video streaming",
      "Search functionality",
      "API integration",
      "Responsive design",
      "Pagination",
      "Content discovery",
      "Material-UI components",
      "API data handling",
    ],
    link: "https://youtube-clone-rapid-api.netlify.app/",
    featured: false,
    status: "completed",
    year: "2023",
  },
  {
    id: "jassi-photography",
    title: "Jassi Photography",
    description:
      "Professional photography portfolio website with elegant showcase of photography work. Features responsive design, image galleries, and smooth user experience.",
    category: "Web Development",
    techStack: ["HTML", "CSS", "JavaScript", "PHP"],
    features: [
      "Photography portfolio showcase",
      "Responsive gallery design",
      "Service listings",
      "Contact inquiry form",
      "Image optimization",
      "Cross-browser compatibility",
      "SEO optimized",
      "Fast loading times",
    ],
    link: "https://jassiphotography.com/",
    featured: false,
    status: "completed",
    year: "2022",
  },
  {
    id: "food-app",
    title: "Food Ordering App",
    description:
      "Online food ordering system with menu browsing, cart management, and checkout. Includes admin panel for restaurant management and order tracking.",
    category: "Web Development",
    techStack: ["PHP", "MySQL", "JavaScript", "Bootstrap"],
    features: [
      "Online ordering",
      "Admin panel",
      "Order tracking",
      "Menu management",
      "User accounts",
      "Payment integration",
      "Shopping cart",
      "Checkout process",
    ],
    link: "https://webgenix.jassiphotography.com/online_food/",
    featured: false,
    status: "completed",
    year: "2021",
  },
];

// ============================================
// HELPER FUNCTIONS
// ============================================
export const getFeaturedProjects = (): Project[] => {
  return allProjects.filter((p) => p.featured);
};

export const getProjectsByCategory = (category: string): Project[] => {
  if (category === "All") return allProjects;
  return allProjects.filter((p) => p.category === category);
};

export const getCategories = (): string[] => {
  return ["All", "Data Analysis", "Data Engineering", "AI/ML", "Web Development"];
};

export const getProjectById = (id: string): Project | undefined => {
  return allProjects.find((p) => p.id === id);
};

export const getHomeProjects = (): Project[] => {
  return allProjects.filter((p) => p.id !== "rag-handbook").slice(0, 3);
};

export const getProjectType = (
  id: string
): { type: string; isPersonal: boolean } => {
  const personalIds = [
    "shaky-isles",
    "rag-handbook",
    "resume-matcher",
    "walmart-analysis",
    "sql-warehouse",
    "eda-toolkit",
    "youtube-clone",
  ];
  return personalIds.includes(id)
    ? { type: "Personal Project", isPersonal: true }
    : { type: "Client Project", isPersonal: false };
};

export const getProjectRole = (category: string): string => {
  const roles: Record<string, string> = {
    "Data Analysis": "Data Analyst",
    "Data Engineering": "Data Engineer",
    "AI/ML": "AI Engineer",
    "Web Development": "Full-Stack Developer",
  };
  return roles[category] || "Developer";
};

// ============================================
// PROJECT METRICS
// ============================================
export const projectMetrics: Record<string, ProjectMetric[]> = {
  "shaky-isles": [
    { label: "Schedule", value: "Hourly" },
    { label: "dbt Tests", value: "5/5" },
    { label: "CI Runs", value: "Green" },
    { label: "Dedup Key", value: "Quake ID" },
  ],
  "rag-handbook": [
    { label: "Test Accuracy", value: "100%" },
    { label: "Avg Latency", value: "1.01s" },
    { label: "Guardrails", value: "3 Active" },
    { label: "Citation Rate", value: "100%" },
  ],
  "resume-matcher": [
    { label: "Time to Ship", value: "1 Day" },
    { label: "AI Provider", value: "Groq" },
    { label: "Interface", value: "Streamlit" },
    { label: "Status", value: "Live" },
  ],
  "walmart-analysis": [
    { label: "Records Analyzed", value: "6,400+" },
    { label: "Stores Covered", value: "45" },
    { label: "Revenue Insight", value: "$54M" },
    { label: "Performance Gap", value: "8.1x" },
  ],
  "sql-warehouse": [
    { label: "Architecture", value: "3-Layer" },
    { label: "Schema Type", value: "Star" },
    { label: "ETL Procedures", value: "Yes" },
    { label: "Quality Checks", value: "Built-in" },
  ],
  "eda-toolkit": [
    { label: "Modules", value: "5" },
    { label: "Report Type", value: "HTML" },
    { label: "Outlier Methods", value: "2" },
    { label: "Unit Tests", value: "Yes" },
  ],
};

// ============================================
// PROJECT INSIGHTS
// ============================================
export const projectInsights: Record<string, ProjectInsight> = {
  "shaky-isles": {
    title: "Pipeline Highlights",
    items: [
      "Bronze keeps raw GeoNet JSON as-is - never transformed",
      "Loads deduped on quake publicID - run twice, same count",
      "Staging parses JSON with json_extract plus proper casts",
      "Retries on extract/load, zero retries on dbt (bugs, not flakes)",
      "Debugging record in LEARNED.md: bytes, cwd, profiles",
    ],
  },
  "rag-handbook": {
    title: "System Guardrails",
    items: [
      "Citation Validator: Checks if [Source X] references point to real retrieved sources",
      "Hallucination Detector: Compares each sentence against context using semantic similarity",
      "Confidence Scorer: HIGH (>0.6) answers confidently, LOW (<0.3) triggers 'I don't know'",
      "FastAPI backend with health, ingest, query, and stats endpoints",
      "Automated regression testing for iterative updates",
    ],
  },
  "resume-matcher": {
    title: "How It Works",
    items: [
      "User pastes a job description and their resume",
      "Groq API analyzes both documents for keyword and skill matching",
      "Returns a match percentage score",
      "Provides specific suggestions on what to add or improve",
      "Deployed live - demonstrates fast shipping with AI APIs",
    ],
  },
  "walmart-analysis": {
    title: "Key Business Insights",
    items: [
      "Top performing store (Store 20) generates 8.1x more revenue than bottom performer",
      "Stores in high unemployment areas (8.5%+) underperform by 18% on average",
      "November-December generates 14.6% higher sales, contributing $54M extra annually",
      "No significant correlation (0.009) between fuel prices and sales",
      "Recommended 15-20% staff increase for holiday season",
    ],
  },
  "sql-warehouse": {
    title: "Architecture Highlights",
    items: [
      "Bronze layer: Raw data ingestion from CSV sources (CRM & ERP systems)",
      "Silver layer: Cleaned, deduplicated, and standardized data",
      "Gold layer: Business-ready dimensions and facts as views",
      "Stored procedures with RAISE NOTICE for progress tracking",
      "Comprehensive quality checks at Silver and Gold layers",
    ],
  },
  "eda-toolkit": {
    title: "Module Features",
    items: [
      "DataSummarizer: Shape, types, memory usage, numeric/categorical statistics",
      "MissingAnalyzer: Counts, percentages, visualizations, handling suggestions",
      "OutlierDetector: IQR method (threshold 1.5) and Z-score method (threshold 3)",
      "DataVisualizer: Histograms, correlations, scatter plots, box plots",
      "ReportGenerator: Self-contained HTML reports for stakeholder sharing",
    ],
  },
};