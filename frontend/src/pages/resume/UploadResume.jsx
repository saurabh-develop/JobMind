import { useState } from "react";
import { uploadResumeApi } from "../../api/resume.api";

const UploadResume = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      return;
    }
    setLoading(true);

    try {
      await uploadResumeApi(file);
      alert("Resume uploaded and processing started");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept=".pdf, .doc, .docx"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button onClick={handleUpload} disabled={loading}>
        Upload Resume
      </button>
    </div>
  );
};

export default UploadResume;
