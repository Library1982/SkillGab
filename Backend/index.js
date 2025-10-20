// index.js
import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Sample career data
const careers = [
  {
    title: "Doctor",
    path: ["MBBS Degree", "Internship", "Specialization", "Residency", "Board Certification"]
  },
  {
    title: "Software Engineer",
    path: ["Computer Science Degree", "Learn Programming", "Build Projects", "Apply for Jobs"]
  },
  {
    title: "Data Scientist",
    path: ["Statistics Degree", "Python & ML", "Projects & Portfolio", "Apply for Jobs"]
  }
];

// API endpoint
app.get("/api/careers", (req, res) => {
  const query = req.query.q?.toLowerCase() || "";
  const filtered = careers.filter(c => c.title.toLowerCase().includes(query));
  res.json(filtered);
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
