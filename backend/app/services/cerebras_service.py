import logging
from typing import Dict, Any, List
import httpx

from app.core.config import settings

logger = logging.getLogger(__name__)

class CerebrasService:
    def __init__(self):
        self.api_key = settings.CEREBRAS_API_KEY
        self.base_url = settings.CEREBRAS_BASE_URL
        self.model_id = settings.CEREBRAS_MODEL_ID
        
        if not self.api_key:
            logger.warning("Cerebras API key not configured. Using mock responses.")
            self.mock_mode = True
        else:
            self.mock_mode = False

    async def generate_text(self, prompt: str, max_tokens: int = 1000, temperature: float = 0.7) -> str:
        """Generate text using Cerebras model"""
        if self.mock_mode:
            return self._generate_mock_response(prompt)
        
        try:
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    f"{self.base_url}/v1/chat/completions",
                    headers={
                        "Authorization": f"Bearer {self.api_key}",
                        "Content-Type": "application/json"
                    },
                    json={
                        "model": self.model_id,
                        "messages": [
                            {"role": "user", "content": prompt}
                        ],
                        "max_tokens": max_tokens,
                        "temperature": temperature,
                        "stream": False
                    },
                    timeout=30.0
                )
                
                if response.status_code == 200:
                    data = response.json()
                    return data["choices"][0]["message"]["content"]
                else:
                    logger.error(f"Cerebras API error: {response.status_code} - {response.text}")
                    return self._generate_mock_response(prompt)
                    
        except httpx.RequestError as e:
            logger.error(f"Network error calling Cerebras API: {e}")
            return self._generate_mock_response(prompt)
        except httpx.HTTPStatusError as e:
            logger.error(f"HTTP error calling Cerebras API: {e.response.status_code}")
            return self._generate_mock_response(prompt)
        except Exception as e:
            logger.error(f"Unexpected error calling Cerebras API: {e}")
            return self._generate_mock_response(prompt)

    async def chat_completion(self, messages: List[Dict[str, str]], max_tokens: int = 1000, temperature: float = 0.7) -> str:
        """Chat completion using Cerebras model"""
        if self.mock_mode:
            # Use the last user message for mock response
            user_messages = [msg["content"] for msg in messages if msg["role"] == "user"]
            prompt = user_messages[-1] if user_messages else "Hello"
            return self._generate_mock_response(prompt)
        
        try:
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    f"{self.base_url}/v1/chat/completions",
                    headers={
                        "Authorization": f"Bearer {self.api_key}",
                        "Content-Type": "application/json"
                    },
                    json={
                        "model": self.model_id,
                        "messages": messages,
                        "max_tokens": max_tokens,
                        "temperature": temperature,
                        "stream": False
                    },
                    timeout=30.0
                )
                
                if response.status_code == 200:
                    data = response.json()
                    return data["choices"][0]["message"]["content"]
                else:
                    logger.error(f"Cerebras API error: {response.status_code} - {response.text}")
                    return self._generate_mock_response(messages[-1]["content"] if messages else "Hello")
                    
        except httpx.RequestError as e:
            logger.error(f"Network error calling Cerebras API: {e}")
            return self._generate_mock_response(messages[-1]["content"] if messages else "Hello")
        except httpx.HTTPStatusError as e:
            logger.error(f"HTTP error calling Cerebras API: {e.response.status_code}")
            return self._generate_mock_response(messages[-1]["content"] if messages else "Hello")
        except Exception as e:
            logger.error(f"Unexpected error calling Cerebras API: {e}")
            return self._generate_mock_response(messages[-1]["content"] if messages else "Hello")

    def _generate_mock_response(self, prompt: str) -> str:
        """Generate mock response for development/testing"""
        prompt_lower = prompt.lower()
        
        if "research" in prompt_lower or "analyze" in prompt_lower:
            return f"""
# Research Analysis Report

## Summary
Based on the research request: "{prompt}"

## Key Findings
1. **Market Trends**: Identified 3 major trends in the target market
2. **Competitive Landscape**: Analyzed 12 key competitors
3. **Opportunities**: Found 5 significant market opportunities
4. **Risks**: Identified 3 potential risk factors

## Recommendations
1. Focus on underserved market segments
2. Develop strategic partnerships
3. Invest in technology infrastructure
4. Monitor competitive movements

## Data Sources
- Industry reports (15 sources)
- Market surveys (3 studies)
- Expert interviews (8 professionals)
- Financial analysis (5 companies)

*Generated by CrewAI Dashboard - Mock Mode*
            """.strip()
        
        elif "content" in prompt_lower or "write" in prompt_lower:
            return f"""
# Content Creation

## Generated Content

Based on your request: "{prompt}"

Here is a comprehensive piece of content that addresses your requirements:

### Introduction
This content has been crafted to meet your specific needs and objectives.

### Main Content
The body of this content includes:
- Detailed explanations
- Supporting evidence
- Practical examples
- Actionable insights

### Conclusion
A summary of key points and next steps.

### SEO Optimization
- Keyword density: 2.5%
- Readability score: 85/100
- Word count: 1,250 words
- Estimated reading time: 5 minutes

*Generated by CrewAI Dashboard - Mock Mode*
            """.strip()
        
        elif "code" in prompt_lower or "programming" in prompt_lower:
            return f"""
# Code Review & Analysis

## Code Assessment

Based on the code review request: "{prompt}"

### Code Quality Score: 8.5/10

### Strengths
- Clean, readable code structure
- Proper error handling
- Good documentation
- Efficient algorithms

### Areas for Improvement
1. **Performance**: Consider optimizing the sorting algorithm
2. **Security**: Add input validation
3. **Testing**: Increase test coverage to 90%
4. **Documentation**: Add more inline comments

### Recommendations
```python
# Suggested improvements
def optimized_function():
    # Add input validation
    if not input_data:
        raise ValueError("Input data required")
    
    # Optimize algorithm
    result = process_data(input_data)
    
    # Add logging
    logger.info("Function completed successfully")
    
    return result
```

### Security Checklist
- [x] Input validation
- [x] SQL injection prevention
- [x] XSS protection
- [ ] Rate limiting
- [ ] Authentication checks

*Generated by CrewAI Dashboard - Mock Mode*
            """.strip()
        
        else:
            return f"""
# AI Response

Based on your request: "{prompt}"

## Analysis
I've analyzed your request and provided a comprehensive response that addresses your needs.

## Key Points
1. Understanding of requirements
2. Strategic approach
3. Implementation plan
4. Success metrics

## Next Steps
1. Review the provided information
2. Implement suggested solutions
3. Monitor progress
4. Adjust as needed

*Generated by CrewAI Dashboard - Mock Mode*
            """.strip()

    async def get_model_info(self) -> Dict[str, Any]:
        """Get information about available models"""
        if self.mock_mode:
            return {
                "models": [
                    {
                        "id": "llama-4-maverick-17b-128e-instruct",
                        "name": "Llama 4 Maverick 17B",
                        "description": "Advanced instruction-tuned model",
                        "context_length": 32768,
                        "max_tokens": 32768
                    },
                    {
                        "id": "llama-4-scout-17b-16e-instruct",
                        "name": "Llama 4 Scout 17B",
                        "description": "Fast and efficient model",
                        "context_length": 2048,
                        "max_tokens": 2048
                    }
                ],
                "current_model": self.model_id
            }
        
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(
                    f"{self.base_url}/v1/models",
                    headers={
                        "Authorization": f"Bearer {self.api_key}",
                        "Content-Type": "application/json"
                    },
                    timeout=10.0
                )
                
                if response.status_code == 200:
                    return response.json()
                else:
                    logger.error(f"Error getting models: {response.status_code}")
                    return {"error": "Failed to get model information"}
                    
        except Exception as e:
            logger.error(f"Error getting model info: {e}")
            return {"error": "Failed to get model information"}

    async def get_model_status(self, model_id: str) -> Dict[str, Any]:
        """Get status of a specific model"""
        if self.mock_mode:
            return {
                "model_id": model_id,
                "status": "available",
                "load_percentage": 100,
                "queue_position": 0,
                "estimated_time": 0
            }
        
        try:
            async with httpx.AsyncClient() as client:
                response = await client.get(
                    f"{self.base_url}/v1/models/{model_id}/status",
                    headers={
                        "Authorization": f"Bearer {self.api_key}",
                        "Content-Type": "application/json"
                    },
                    timeout=10.0
                )
                
                if response.status_code == 200:
                    return response.json()
                else:
                    logger.error(f"Error getting model status: {response.status_code}")
                    return {"error": "Failed to get model status"}
                    
        except Exception as e:
            logger.error(f"Error getting model status: {e}")
            return {"error": "Failed to get model status"} 