import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const optimizeResumeWithAI = async (
  resumeData,
  targetRole,
  jobDescription
) => {
  const aiResponse = await callOpenAI(resumeData, targetRole, jobDescription);

  return normalizeOptimization(aiResponse);
};

const callOpenAI = async (resumeData, targetRole, jobDescription) => {
  const response = await client.chat.completions.create({
    model: process.env.OPENAI_MODEL,
    temperature: 0,
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: `
                You are an ATS resume optimization expert.
                Analyse resumes strictly against job requirements.
                Do not hallucinate.
            `,
      },
      {
        role: "user",
        content: `
            Resume Data: 
            ${JSON.stringify(resumeData)}

            Target Role: 
            ${targetRole}

            Job Description: 
            ${jobDescription}

            Return JSON ONLY in this schema: 
            {
                "missingSkills": string[],
                "atsKeywordsMissing": string[],
                "matchScore": number,
                "bulletSuggestions": [
                    {
                        "original": string,
                        "improved": string
                    }
                ]
            }
        `,
      },
    ],
  });

  return JSON.parse(response.choices[0].message.content);
};

const normalizeOptimization = (data) => {
  return {
    missingSkills: Array.isArray(data.missingSkills)
      ? data.missingSkills.map((s) => s.trim())
      : [],

    atsKeywordsMissing: Array.isArray(data.atsKeywordsMissing)
      ? data.atsKeywordsMissing.map((s) => s.trim())
      : [],

    matchScore: clamp(data.matchScore, 0, 100),

    bulletSuggestions: Array.isArray(data.bulletSuggestions)
      ? data.bulletSuggestions.map((b) => ({
          original: b.original || "",
          improved: b.improved || "",
        }))
      : [],
  };
};

const clamp = (n, min, max) => {
  if (typeof n !== "number") return min;
  return Math.min(Math.max(n, min), max);
};
