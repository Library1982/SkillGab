import React, { useState } from "react";
import axios from "axios";
import { Compass } from "lucide-react";

export default function CareerPath() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  // Fetch suggestions from backend
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;

    try {
      const res = await axios.get(`http://localhost:5000/api/careers?q=${query}`);
      setResults(res.data); // assuming backend returns an array of career objects
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  return (
    <section className="py-20 px-6 md:px-20">
      <h2 className="text-4xl font-bold mb-6 text-center">
        Career Paths <Compass className="inline-block ml-2" />
      </h2>

      {/* Search Box */}
      <form onSubmit={handleSearch} className="mb-8 text-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a career (e.g., Doctor)"
          className="px-4 py-2 rounded-l-lg border-2 border-blue-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-yellow-400 text-blue-900 font-bold rounded-r-lg hover:bg-yellow-500 transition"
        >
          Search
        </button>
      </form>

      {/* Results */}
      <div className="grid md:grid-cols-3 gap-10">
        {results.map((career, i) => (
          <div
            key={i}
            className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6 flex flex-col items-center text-center hover:scale-105 transform transition duration-300"
          >
            <h3 className="text-2xl font-semibold mb-2">{career.title}</h3>
            <p>{career.desc}</p>
            {career.steps && (
              <ul className="mt-2 text-left list-disc list-inside">
                {career.steps.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
