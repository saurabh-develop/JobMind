import { v2 as cloudinary } from "cloudinary";
import { promises as fs } from "node:fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  if (!localFilePath) return null;

  try {
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      folder: "resumes",
    });

    console.log("Resume uploaded successfully");

    return response.secure_url;
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    throw new Error("Resume not uploaded");
  } finally {
    try {
      await fs.unlink(localFilePath);
    } catch (err) {
      console.error("File delete failed:", err);
    }
  }
};

export { uploadOnCloudinary };
