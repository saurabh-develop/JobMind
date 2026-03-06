import re
import hashlib

def clean_text(text: str) -> str:
    # remove multiple newlines
    text = re.sub(r'\n+', '\n', text)

    # remove multiple spaces
    text = re.sub(r'\s+', ' ', text)

    # remove emails duplication
    text = re.sub(r'\S+@\S+', '', text)

    # remove phone numbers
    text = re.sub(r'\+?\d[\d -]{8,12}\d', '', text)

    return text.strip()

def compute_hash(text):
    return hashlib.md5(text.encode()).hexdigest()