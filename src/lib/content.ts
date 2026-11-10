export const services = [
  {
    id: "websites",
    title: "Website design & development",
    short: "A clear first impression. A better way to connect.",
    description:
      "Responsive websites that introduce your organisation, showcase your services, and help customers get in touch.",
    audience:
      "Businesses, schools and brands ready for a stronger online presence.",
    features: [
      "Business and brand websites",
      "School websites and landing pages",
      "Content management features",
      "Responsive redesigns",
    ],
    proof: "Built on our Presbyterian High School and Florins website work.",
  },
  {
    id: "applications",
    title: "Custom web applications",
    short: "Your workflow, brought together in one place.",
    description:
      "Tailored portals, dashboards, and administration tools that bring your records and workflows into one place.",
    audience:
      "Organisations managing information across spreadsheets and disconnected tools.",
    features: [
      "Database-backed applications",
      "User accounts and role-based access",
      "Administration dashboards and reporting",
      "API integrations",
    ],
    proof: "Built on the School Results Management & Report Card Portal.",
  },
  {
    id: "education",
    title: "School & education systems",
    short: "Less paperwork. More room for education.",
    description:
      "Practical digital tools for managing student records, examination results, and report cards.",
    audience:
      "Schools looking to organise academic records and results workflows.",
    features: [
      "Student records and subject enrolment",
      "CSV marks validation and grade calculation",
      "Authorised corrections and controlled publication",
      "PDF report cards and role-based portals",
    ],
    proof: "Demonstrated through our school results portal workflows.",
  },
  {
    id: "ai",
    title: "AI integration & prototypes",
    short: "Explore what AI can do for your actual problem.",
    description:
      "Practical AI features and prototypes built around a clearly defined use case.",
    audience:
      "Teams exploring a prediction or computer vision use case before committing to a larger system.",
    features: [
      "Prediction interfaces",
      "Existing machine learning model integration",
      "Computer vision prototypes",
      "AI connected to web applications and APIs",
    ],
    proof:
      "Demonstrated through the Student Performance Predictor and Object Detector. Feasibility, data requirements and evaluation are established during discovery.",
  },
  {
    id: "support",
    title: "Software maintenance & support",
    short: "Keep your software moving with your business.",
    description:
      "Troubleshooting, improvements, and ongoing care for websites and applications.",
    audience:
      "Organisations that need help improving or maintaining existing software.",
    features: [
      "Bug fixes and responsive improvements",
      "Content management improvements",
      "Deployment assistance",
      "Agreed feature enhancements and maintenance",
    ],
    proof:
      "Grounded in school website troubleshooting, media management improvements and deployment work.",
  },
];
export const projects = [
  {
    slug: "school-results",
    name: "School Results Portal",
    category: "Custom education software",
    status: "Development project",
    summary: "From subject marks to a complete report card.",
    description:
      "A role-based portal for student records, examination results and report cards, with dedicated administrator, teacher and student workflows.",
    features: [
      "CSV validation and marks matching by unique student numbers",
      "Grade calculations and audited mark corrections",
      "Controlled results publication and downloadable PDF report cards",
    ],
    stack: ["React", "FastAPI", "MySQL", "SQLAlchemy", "JWT"],
    repo: "https://github.com/mmapikotendai-afk/School-Results-Portal",
    visual: "results",
  },
  {
    slug: "presbyterian",
    name: "Presbyterian High School",
    category: "School website & content management",
    status: "Website development work",
    summary: "A school community, connected online.",
    description:
      "Responsive school website work bringing school information, academics, admissions, news and media management together.",
    features: [
      "School information, academics and admissions pages",
      "News and media administration features",
      "Website maintenance and troubleshooting",
    ],
    stack: ["Next.js", "React", "TypeScript"],
    visual: "school",
  },
  {
    slug: "florins",
    name: "Florins",
    category: "Brand website & frontend development",
    status: "Website development work",
    summary: "An editorial presence for a fashion brand.",
    description:
      "Fashion website development with responsive photography, considered collection navigation and appointment calls to action.",
    features: [
      "Editorial layouts and responsive photography",
      "Collection navigation and appointment calls to action",
      "Careful image presentation across screen sizes",
    ],
    stack: ["Next.js", "React", "Tailwind CSS"],
    visual: "fashion",
  },
  {
    slug: "performance-predictor",
    name: "Student Performance Predictor",
    category: "Machine learning demonstration",
    status: "Prototype · synthetic training data",
    summary: "Connecting a prediction model to a usable interface.",
    description:
      "A logistic regression demonstration connected to a FastAPI endpoint and prediction history. Uses synthetic training data to demonstrate integration; it is not validated for real educational decisions.",
    features: [
      "Prediction interface connected to a Python API",
      "Saved prediction history",
      "Synthetic-data model integration demonstration",
    ],
    stack: ["Python", "FastAPI", "scikit-learn", "React", "Supabase"],
    repo: "https://github.com/mmapikotendai-afk/Student-Performance-Predictor",
    visual: "prediction",
  },
  {
    slug: "object-detector",
    name: "Object Detector",
    category: "Computer vision demonstration",
    status: "Prototype · pretrained model",
    summary: "Making live camera input understandable.",
    description:
      "A desktop application that detects and labels objects in webcam footage using a pretrained YOLOv3-tiny model.",
    features: [
      "Live webcam detection and labelled bounding boxes",
      "Filtering of overlapping detections",
      "Camera start and stop controls",
    ],
    stack: ["Python", "OpenCV", "YOLOv3-tiny", "Tkinter"],
    repo: "https://github.com/mmapikotendai-afk/Object-Detector",
    visual: "vision",
  },
];
