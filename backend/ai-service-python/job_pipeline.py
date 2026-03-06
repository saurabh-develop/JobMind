from utils import clean_text, compute_hash
from embedding_model import generate_embedding
from vector_store import add_job, delete_job

job_hash_store = {}

def process_job(job_id, description, active=True):
    if not active:
        delete_job(job_id)
        return "Job removed"

    cleaned = clean_text(description)
    new_hash = compute_hash(cleaned)

    if job_id in job_hash_store and job_hash_store[job_id] == new_hash:
        return "Job unchanged"

    embedding = generate_embedding(cleaned)
    add_job(job_id, cleaned, embedding)

    job_hash_store[job_id] = new_hash
    return "Job embedded"