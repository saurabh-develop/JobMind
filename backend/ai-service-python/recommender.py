from vector_store import search_jobs, candidate_collection
from redis_cache import cache_recommendations, get_cached_recommendations

def recommend_jobs(user_id):
    cached = get_cached_recommendations(user_id)
    if cached:
        return cached

    # get candidate embedding
    data = candidate_collection.get(ids=[user_id], include=["embeddings"])
    embedding = data["embeddings"][0]

    job_ids = search_jobs(embedding, k=10)

    cache_recommendations(user_id, job_ids)
    return job_ids