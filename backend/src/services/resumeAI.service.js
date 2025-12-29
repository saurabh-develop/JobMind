import OpenAI from "openai";
import { extractTextFromResumeUrl } from "../utils/fileExtractor";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const parseResumeWithAI = async (resumeUrl) => {
  const resumeText = await extractTextFromResumeUrl(resumeUrl);
  const aiResult = await callOpenAI(resumeText);

  return normalizeAIResponse(aiResult, resumeText);
};

const callOpenAI = async (resumeText) => {
  const response = await client.chat.completions.create({
    model: process.env.OPENAI_MODEL,
    temperature: 0,
    response_format: { type: "josn_object" },
    messages: [
      {
        role: "system",
        content: `You are an expert resume parser. 
        Extract structured information ONLY. 
        Do NOT hallucinate. 
        If something is missing, use null or empty array.`,
      },
      {
        role: "user",
        content: `Parse the following resume and return JSON in this exact schema:
        {
            "skills": string,[
                {
                    "name": string,
                    "confidence": number (0 to 1),
                    "years": number
                }
            ],
            "totalExperience": number,
            "locations": string[],
            "education": string | null
        }
        Resume:
        ${resumeText}`,
      },
    ],
  });
  return JSON.parse(response.choices[0].message.content);
};

const normalizeAIResponse = (aiData, rawText) => {
  return {
    skills: Array.isArray(aiData.skills)
      ? aiData.skills.map((s) => ({
          name: sanitizeString(s.name),
          confidence: clamp(s.confidence, 0, 1),
          years: clamp(s.years, 0, 50),
        }))
      : [],
    totalExperience: clamp(aiData.totalExperience, 0, 50),
    locations: Array.isArray(aiData.locations)
      ? aiData.locations.map(sanitizeString)
      : [],
    education: aiData.education || null,
    rawText,
  };
};

const clamp = (num, min, max) => {
  if (typeof num !== "number") return min;
  return Math.min(Math.max(num, min), max);
};

const sanitizeString = (str) => {
  if (!str || typeof str !== "string") return null;
  return str.trim();
};
