import chromadb

client = chromadb.Client()
job_collection = client.get_or_create_collection("jobs")
candidate_collection = client.get_or_create_collection("candidates")

def add_job(job_id, text, embedding):
    job_collection.upsert(
        ids=[job_id],
        documents=[text],
        embeddings=[embedding],
        metadatas=[{"job_id": job_id}]
    )

def delete_job(job_id):
    job_collection.delete(ids=[job_id])

def add_candidate(user_id, text, embedding):
    candidate_collection.upsert(
        ids=[user_id],
        documents=[text],
        embeddings=[embedding]
    )

def search_jobs(candidate_embedding, k=10):
    results = job_collection.query(
        query_embeddings=[candidate_embedding],
        n_results=k
    )
    return results["ids"][0]