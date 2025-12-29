import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadToCloudinary = async (filePath) => {
  return cloudinary.v2.uploader.upload(filePath, {
    folder: "jobmind/resumes",
    resource_type: "raw",
  });
};
