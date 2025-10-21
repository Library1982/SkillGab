import React from "react";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center text-center py-32 px-6 bg-gradient-to-b from-blue-800 to-blue-600">
      <h1 className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
        Welcome to SkillSync
      </h1>
      <p className="text-xl md:text-2xl mb-8 drop-shadow">
        Discover your career path, skills, and mentors in one interactive platform.
      </p>
      <a
        href="/career"
        className="px-6 py-3 bg-yellow-400 text-blue-900 font-bold rounded-lg hover:bg-yellow-500 transition duration-300"
      >
        Get Started
      </a>
    </section>
  );
}
