from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import google.generativeai as genai
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv(dotenv_path="../.env")

# Configure Gemini API
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY") or os.getenv("GEMINI_API_KEY")
if not GOOGLE_API_KEY:
    raise ValueError("GOOGLE_API_KEY or GEMINI_API_KEY environment variable not set")

genai.configure(api_key=GOOGLE_API_KEY)
model = genai.GenerativeModel("gemini-1.5-flash")

# FastAPI app
app = FastAPI()

# CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Request model for POST body
class Question(BaseModel):
    question: str


class CodeAnalysisRequest(BaseModel):
    code: str
    filename: str
    language: str
    test_framework: str = "jest"
    test_type: str = "unit"


@app.get("/")
async def root():
    return {
        "message": "Welcome to the AI Assistant API! Use the /ask endpoint to interact with the AI."
    }


@app.post("/analyze-code")
async def analyze_code(payload: CodeAnalysisRequest):
    """
    Enhanced endpoint specifically for code analysis and test generation
    """
    try:
        # Create a detailed prompt for comprehensive code analysis
        prompt = f"""
You are an expert software engineer and code analyst. Analyze the following code and provide comprehensive analysis including test generation.

**Code to analyze:**
```{payload.language}
{payload.code}
```

**File:** {payload.filename}
**Language:** {payload.language}
**Test Framework:** {payload.test_framework}
**Test Type:** {payload.test_type}

IMPORTANT: Respond ONLY with valid JSON. Do not include any markdown formatting, code blocks, or explanatory text outside the JSON.

Please provide a detailed JSON response with the following structure:
{{
  "tests": {{
    "code": "Complete, well-documented test code here",
    "framework": "{payload.test_framework}",
    "description": "Description of generated tests",
    "coverage_areas": ["List of areas covered by tests"]
  }},
  "analysis": {{
    "code_quality": {{
      "score": 85,
      "readability": 80,
      "maintainability": 85,
      "issues": ["Specific code quality issues"],
      "suggestions": ["Specific improvement suggestions"]
    }},
    "complexity": {{
      "cyclomatic_complexity": 5,
      "cognitive_complexity": 3,
      "lines_of_code": 50,
      "functions_count": 3,
      "complexity_rating": "low"
    }},
    "security": {{
      "vulnerability_score": 90,
      "vulnerabilities": ["Specific security issues if any"],
      "recommendations": ["Security best practices"]
    }},
    "performance": {{
      "performance_score": 80,
      "bottlenecks": ["Performance bottlenecks"],
      "optimizations": ["Specific optimization suggestions"]
    }},
    "best_practices": {{
      "score": 85,
      "followed": ["Good practices identified"],
      "violations": ["Best practice violations"],
      "recommendations": ["Specific recommendations"]
    }}
  }},
  "suggestions": [
    {{
      "type": "improvement",
      "title": "Short title",
      "description": "Detailed description",
      "code_example": "Example code if applicable",
      "priority": "medium",
      "line_numbers": [1, 2, 3]
    }}
  ],
  "metrics": {{
    "maintainability_index": 85,
    "technical_debt_ratio": 15,
    "duplication_percentage": 5
  }}
}}

Generate comprehensive tests that include:
1. Happy path scenarios with clear assertions
2. Edge cases and boundary conditions
3. Error handling and exception testing
4. Mock external dependencies appropriately
5. Async/await testing if applicable
6. Setup and teardown as needed

For analysis, focus on:
- Code structure and organization
- Naming conventions
- Error handling patterns
- Performance implications
- Security vulnerabilities
- Maintainability factors
- Documentation quality
- Test coverage opportunities

Provide actionable, specific recommendations with code examples where helpful.
"""

        response = model.generate_content(
            prompt,
            generation_config={
                "temperature": 0.3,  # Lower temperature for more consistent analysis
                "top_p": 0.8,
                "top_k": 40,
                "max_output_tokens": 4096,  # Allow longer responses for detailed analysis
            },
        )

        if not response.text:
            raise HTTPException(
                status_code=500, detail="No response generated from the model"
            )

        from datetime import datetime

        return {
            "filename": payload.filename,
            "language": payload.language,
            "analysis_result": response.text,
            "timestamp": datetime.now().isoformat() + "Z",
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Analysis failed: {str(e)}")


@app.post("/ask")
async def ask_question(payload: Question):
    try:
        # Call Gemini model
        response = model.generate_content(
            payload.question,
            generation_config={
                "temperature": 0.7,
                "top_p": 0.9,
                "top_k": 40,
                "max_output_tokens": 2048,
            },
        )

        if not response.text:
            raise HTTPException(
                status_code=500, detail="No response generated from the model"
            )

        return {"question": payload.question, "answer": response.text}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
