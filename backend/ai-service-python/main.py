from fastapi import FastAPI, UploadFile, File
import shutil, uuid
import fitz

from resume_pipeline import process_resume
from recommender import recommend_jobs

app = FastAPI()

@app.post("/upload-resume/{user_id}")
async def upload_resume(user_id: str, file: UploadFile = File(...)):
    path = f"temp_{uuid.uuid4()}.pdf"
    with fitz.open(path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    result = process_resume(user_id, path)
    return {"status": result}

@app.get("/recommend/{user_id}")
def get_recommendations(user_id: str):
    jobs = recommend_jobs(user_id)
    return {"recommended_jobs": jobs}