from utils import clean_text, compute_hash
from embedding_model import generate_embedding
from vector_store import add_candidate
from redis_cache import get_profile_hash, cache_profile_hash
import requests
import fitz 
import json
import re


def extract_text(pdf_path):
    doc = fitz.open(pdf_path)
    text = ""
    for page in doc:
        text += page.get_text()
    return text

def split_llm_output(llm_output):
    """
    Splits:
    - JSON profile
    - EMBEDDING_PROFILE text
    """

    # Extract EMBEDDING_PROFILE section
    match = re.search(r"EMBEDDING_PROFILE:\s*(.*)", llm_output, re.DOTALL)
    if not match:
        raise ValueError("EMBEDDING_PROFILE not found in LLM output")

    embedding_text = match.group(1).strip()

    # Extract JSON (everything before EMBEDDING_PROFILE)
    json_part = llm_output.split("EMBEDDING_PROFILE:")[0].strip()

    # Ensure valid JSON
    profile_json = json.loads(json_part)

    return profile_json, embedding_text

def call_llm_for_profile(resume_text):
    response = requests.post(
        url="https://openrouter.ai/api/v1/chat/completions",
        headers={
            "Authorization": "Bearer <OPENROUTER_API_KEY>",
            "Content-Type": "application/json",
        },
        json={
            "model": "nvidia/nemotron-3-nano-30b-a3b:free",
            "messages": [{
                "role": "user",
                "content": f"""
You are an AI system that converts a developer's resume into a machine-readable hiring profile for a job recommendation engine.

Your task is NOT to summarize.
DO NOT Hallucinate
Your task is to extract, normalize, and infer professional capability so it can be used for semantic job matching and ATS ranking.

Read the resume carefully and produce TWO outputs:

---

## SECTION 1 — STRICT JSON PROFILE

Return VALID JSON ONLY. No explanation. No markdown. No commentary.

Schema:

{
"candidate_role": "",
"experience_years": number,
"seniority": "intern | junior | mid | senior | lead",
"primary_domain": "",
"skills": {
"languages": [],
"frameworks": [],
"databases": [],
"tools": [],
"concepts": [],
"cloud": []
},
"backend_capabilities": [],
"frontend_capabilities": [],
"devops_capabilities": [],
"ai_ml_capabilities": [],
"projects_summary": [
{
"title": "",
"technologies": [],
"what_candidate_built": "",
"complexity": "low | medium | high"
}
],
"education": "",
"notable_strengths": [],
"inferred_job_titles": [],
"job_level_fit": ["intern", "junior", "mid", "senior"],
"industry_fit": []
}

Rules:

* Infer experience from projects + internships if years not explicitly written
* Normalize skills (e.g. "node js" → "Node.js")
* Remove generic soft skills
* If a technology appears 2+ times → treat as strong skill
* Do not hallucinate certifications or companies

---

## SECTION 2 — EMBEDDING PROFILE TEXT

After the JSON, output a single paragraph called:

EMBEDDING_PROFILE:

Write a dense technical recruiter-style description of the candidate.

Rules:

* 120–220 words
* Use technology names heavily
* Mention architecture patterns
* Mention scale if visible
* Mention what systems they can build
* Mention APIs, databases, authentication, caching, async processing if present
* No motivational or personality statements
* No bullet points
* No generic HR adjectives

This text will be used for vector embeddings, so it must be information-dense and keyword-rich.

Now analyze the following resume:

{resume_text}

"""
            }]
        }
    )
    return response.json()["choices"][0]["message"]["content"]

def process_resume(user_id, pdf_path):
    raw_text = extract_text(pdf_path)
    cleaned = clean_text(raw_text)

    new_hash = compute_hash(cleaned)
    old_hash = get_profile_hash(user_id)

    if old_hash == new_hash:
        return "Resume unchanged"

    llm_output = call_llm_for_profile(cleaned)
    profile_json, embedding_text = split_llm_output(llm_output)
    embedding = generate_embedding(embedding_text)

    add_candidate(
        user_id=user_id,
        embedding=embedding,
        metadata={
            "embedding_text": embedding_text
        }
    )

    cache_profile_hash(user_id, new_hash)

    return "Profile processed"