import redis
import json

r = redis.Redis(host="localhost", port=6379, decode_responses=True)

CACHE_TTL = 60 * 60 * 12  # 12 hours

def cache_recommendations(user_id, jobs):
    r.setex(f"rec:{user_id}", CACHE_TTL, json.dumps(jobs))

def get_cached_recommendations(user_id):
    data = r.get(f"rec:{user_id}")
    if data:
        return json.loads(data)
    return None

def cache_profile_hash(user_id, hash_val):
    r.set(f"profile_hash:{user_id}", hash_val)

def get_profile_hash(user_id):
    return r.get(f"profile_hash:{user_id}")