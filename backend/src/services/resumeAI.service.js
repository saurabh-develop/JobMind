export const parseResumeWithAI = async (resumeUrl) => {
  // Replace with OpenAI / Gemini later
  return {
    skills: [
      { name: "JavaScript", confidence: 0.92, years: 3 },
      { name: "React", confidence: 0.88, years: 2 },
    ],
    totalExperience: 4,
    locations: ["Remote", "Bangalore"],
    education: "B.Tech Computer Science",
  };
};
