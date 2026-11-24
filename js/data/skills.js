// Daftar skill
const SK = [
  "Python",
  "FastAPI",
  "Go",
  "Java Spring Boot",
  "Next.js",
  "React",
  "PostgreSQL",
  "SQLAlchemy",
  "Alembic",
  "Docker",
  "GitHub Actions",
  "pytest",
  "Looker Studio",
  "Power BI",
  "Tableau",
  "Excel Power Query",
  "scikit-learn",
  "TensorFlow",
  "LSTM",
  "Flask",
  "Laravel",
];

// Kategori untuk tombol filter di bagian Skills. Nama harus sama persis dengan isi SK.
// Label tombol ada di "skcat" pada js/data/lang-*.js (kunci harus sama dengan key di bawah).
const SK_GROUPS = [
  {
    key: "backend",
    items: ["Python", "FastAPI", "Go", "Java Spring Boot", "Flask", "Laravel"],
  },
  { key: "frontend", items: ["Next.js", "React"] },
  { key: "database", items: ["PostgreSQL", "SQLAlchemy", "Alembic"] },
  { key: "devops", items: ["Docker", "GitHub Actions", "pytest"] },
  {
    key: "data",
    items: ["Looker Studio", "Power BI", "Tableau", "Excel Power Query"],
  },
  { key: "ml", items: ["scikit-learn", "TensorFlow", "LSTM"] },
];
