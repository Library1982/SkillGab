import React, { useEffect, useState } from "react";

const API = "http://localhost:4000/api";

export default function App() {
  const [careers, setCareers] = useState([]);
  const [skills, setSkills] = useState([]);
  const [selectedCareer, setSelectedCareer] = useState("");
  const [userSkills, setUserSkills] = useState(new Set());
  const [gap, setGap] = useState(null);
  const [mentors, setMentors] = useState([]);
  const [location, setLocation] = useState({ lat: "25.2048", lon: "55.2708" });

  useEffect(() => {
    fetch(`${API}/careers`).then(r => r.json()).then(setCareers);
    fetch(`${API}/skills`).then(r => r.json()).then(setSkills);
  }, []);

  async function analyze() {
    const body = {
      careerId: selectedCareer,
      userSkills: Array.from(userSkills),
    };
    const res = await fetch(`${API}/gap`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    setGap(data);

    const mres = await fetch(
      `${API}/mentors?lat=${location.lat}&lon=${location.lon}&max_km=200`
    );
    setMentors(await mres.json());
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center text-blue-700">
        Skills Gap Solver
      </h1>

      <div className="bg-white rounded-xl shadow p-5 mb-6">
        <label className="font-medium">Choose a Career</label>
        <select
          className="w-full border rounded p-2 mt-2"
          value={selectedCareer}
          onChange={(e) => setSelectedCareer(e.target.value)}
        >
          <option value="">-- Select --</option>
          {careers.map((c) => (
            <option key={c.id} value={c.id}>
              {c.title}
            </option>
          ))}
        </select>

        <div className="mt-4">
          <label className="font-medium">Select Your Skills</label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {skills.map((s) => (
              <label key={s.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={userSkills.has(s.id)}
                  onChange={(e) => {
                    const next = new Set(userSkills);
                    e.target.checked ? next.add(s.id) : next.delete(s.id);
                    setUserSkills(next);
                  }}
                />
                {s.name}
              </label>
            ))}
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <input
            className="border rounded p-2 w-1/2"
            value={location.lat}
            onChange={(e) => setLocation({ ...location, lat: e.target.value })}
          />
          <input
            className="border rounded p-2 w-1/2"
            value={location.lon}
            onChange={(e) => setLocation({ ...location, lon: e.target.value })}
          />
        </div>

        <button
          onClick={analyze}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Analyze My Skills Gap
        </button>
      </div>

      {gap && (
        <div className="bg-white rounded-xl shadow p-5 mb-6">
          <h2 className="text-xl font-semibold">{gap.career.title}</h2>
          <h3 className="mt-3 font-semibold">Required Skills</h3>
          <ul className="list-disc ml-6">
            {gap.requiredSkills.map((s) => (
              <li key={s.id}>{s.name}</li>
            ))}
          </ul>

          <h3 className="mt-3 font-semibold">You Have</h3>
          <ul className="list-disc ml-6">
            {gap.have.length ? gap.have.map((s) => <li key={s.id}>{s.name}</li>) : <li>None</li>}
          </ul>

          <h3 className="mt-3 font-semibold">You Need to Learn</h3>
          <ul className="list-disc ml-6">
            {gap.missing.length
              ? gap.missing.map((s) => <li key={s.id}>{s.name}</li>)
              : <li>You're ready!</li>}
          </ul>
        </div>
      )}

      {mentors.length > 0 && (
        <div className="bg-white rounded-xl shadow p-5">
          <h3 className="text-lg font-semibold mb-3">Nearby Mentors</h3>
          {mentors.map((m) => (
            <div key={m.id} className="border rounded p-3 mb-2">
              <div className="font-semibold">{m.name}</div>
              <div className="text-sm">{m.title}</div>
              <div className="text-sm">Skills: {m.skills.join(", ")}</div>
              <div className="text-sm text-gray-600">
                Distance: {m.distance_km?.toFixed(1)} km
              </div>
              <div className="text-sm text-blue-600">{m.email}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
