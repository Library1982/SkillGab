import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import CareerPath from "./components/CareerPath";
import SkillGap from "./components/SkillGap";
import MentorMap from "./components/MentorMap";
import "./index.css";

function App() {
  return (
    <Router>
      {/* Navbar */}
      <nav className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 text-white p-4 shadow-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">SkillSync</h1>
          <div className="flex space-x-6">
            <Link className="hover:text-yellow-300 font-medium" to="/">Home</Link>
            <Link className="hover:text-yellow-300 font-medium" to="/career">Career Path</Link>
            <Link className="hover:text-yellow-300 font-medium" to="/skills">Skill Gap</Link>
            <Link className="hover:text-yellow-300 font-medium" to="/mentors">Mentors</Link>
          </div>
        </div>
      </nav>

      {/* Pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/career" element={<CareerPath />} />
        <Route path="/skills" element={<SkillGap />} />
        <Route path="/mentors" element={<MentorMap />} />
      </Routes>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-6 mt-10">
        <div className="max-w-6xl mx-auto text-center">
          <p>© 2025 SkillGab. All rights reserved.</p>
        </div>
      </footer>
    </Router>
  );
}

export default App;
