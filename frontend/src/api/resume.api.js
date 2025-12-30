import axiosClient from "./axiosClient";

export const uploadResumeApi = (file) => {
  const formData = new FormData();
  formData.append("resume", file);

  return axiosClient.post("/resume/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
