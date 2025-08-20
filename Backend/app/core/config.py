import os
from dotenv import load_dotenv

# Load variables from .env file
load_dotenv()

# Read API key from environment variable
CEREBRAS_API_KEY = os.getenv("CEREBRAS_API_KEY")
