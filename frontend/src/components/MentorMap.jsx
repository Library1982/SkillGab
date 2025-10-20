import React, { useState, useEffect } from "react";
import axios from "axios";

export default function MentorMap() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [mentorsData, setMentorsData] = useState([]);

  const AIRTABLE_API_KEY = "YOUR_API_KEY";
  const BASE_ID = "YOUR_BASE_ID";
  const TABLE_NAME = "Mentors"; // New table called Mentors

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }

    const fetchData = async () => {
      try {
        const url = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}?filterByFormula=SEARCH("${query}", {Expertise})`;
        const res = await axios.get(url, {
          headers: { Authorization: `Bearer ${AIRTABLE_API_KEY}` },
        });
        setMentorsData(res.data.records);
        const uniqueMentors = [...new Set(res.data.records.map(r => r.fields.Name))];
        setResults(uniqueMentors);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [query]);

  return (
    <section className="py-20 px-6 md:px-20 bg-gradient-to-b from-green-700 to-green-500 min-h-screen">
      <h2 className="text-4xl font-bold mb-8 text-center text-white">Mentor Map</h2>

      {/* Search */}
      <div className="max-w-md mx-auto mb-12">
        <input
          type="text"
          placeholder="Search mentor expertise (e.g., Software Engineer)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-3 rounded-lg shadow-lg text-gray-800 font-medium"
        />
      </div>

      {/* Mentor Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mentorsData.map((mentor) => (
          <div
            key={mentor.id}
            className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6 flex flex-col items-center text-center hover:scale-105 transform transition duration-300"
          >
            <h3 className="text-2xl font-semibold mb-2 text-yellow-300">{mentor.fields.Name}</h3>
            <p>{mentor.fields.Expertise}</p>
            <p className="text-sm mt-1">{mentor.fields.Details}</p>
          </div>
        ))}
      </div>

      {/* Suggestions */}
      {results.length > 0 && (
        <div className="mt-10 text-center text-white">
          <h3 className="font-bold mb-2">Did you mean:</h3>
          <div className="flex justify-center flex-wrap gap-4">
            {results.map((r, i) => (
              <button
                key={i}
                onClick={() => setQuery(r)}
                className="bg-yellow-400 px-4 py-2 rounded-lg font-bold hover:bg-yellow-500 transition"
              >
                {r}
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
