import React, { useState } from "react";
import { Search } from "lucide-react";
import axios from "axios";

export default function SkillGap() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (!query) return;
    try {
      const res = await axios.get(`http://localhost:5000/skills?search=${query}`);
      setResults(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="py-20 px-6 md:px-20 bg-blue-700 bg-opacity-80">
      <h2 className="text-4xl font-bold mb-6 text-center">
        Skill Gaps <Search className="inline-block ml-2" />
      </h2>

      {/* Search Box */}
      <div className="flex justify-center mb-10">
        <input
          type="text"
          placeholder="Search a skill..."
          className="px-4 py-2 rounded-l-lg w-80 text-black"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button
          onClick={handleSearch}
          className="bg-yellow-400 text-blue-900 px-4 py-2 rounded-r-lg font-bold hover:bg-yellow-500 transition duration-300"
        >
          Search
        </button>
      </div>

      {/* Results */}
      <div className="grid md:grid-cols-3 gap-8">
        {results.map((s, i) => (
          <div
            key={i}
            className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6 flex flex-col items-center text-center hover:scale-105 transform transition duration-300"
          >
            <h3 className="text-2xl font-semibold mb-2">{s.skill}</h3>
            <p>Path: {s.path}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
