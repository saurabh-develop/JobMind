import pdf from "pdf-parse";
import mammoth from "mammoth";
import axios from "axios";

export const extractTextFromResumeUrl = async (resumeUrl) => {
  const response = await axios.get(resumeUrl, {
    responseType: "arraybuffer",
  });

  const buffer = Buffer.from(response.data);

  if (resumeUrl.endsWith(".pdf")) {
    const data = await pdf(buffer);
    return data.text;
  }

  if (resumeUrl.endsWith("docx")) {
    const result = await mammoth.extractRawText({ buffer });
    return result.value;
  }

  throw new Error("Unsupported resume format");
};
