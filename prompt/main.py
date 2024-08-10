import os
from dotenv import load_dotenv

load_dotenv()

from fastapi import FastAPI, Request, Form
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel
from typing import List
from unified import UnifiedApis
import uvicorn

app = FastAPI()
templates = Jinja2Templates(directory="templates")

class HTMLComponent(BaseModel):
    html: str
    explanation: str

class AIResponse(BaseModel):
    components: List[HTMLComponent]

unified_client = UnifiedApis(provider="openai", model="gpt-4o-2024-08-06")

@app.get("/")
async def read_root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.post("/generate")
def generate_components(request: Request, user_input: str = Form(...)):
    system_message = """You are an AI assistant that generates HTML components using DaisyUI classes.
    The user will provide instructions, and you should respond with appropriate HTML components.
    Only use DaisyUI classes for styling. Do not use any custom CSS or other CSS frameworks.
    Provide a the exact html and explanation for each component you generate. return your response in json format"""
    
    unified_client.set_system_message(system_message)
    
    response = unified_client.chat(user_input, response_model=AIResponse)
    print(response)
    
    return templates.TemplateResponse("index.html", {
        "request": request,
        "components": response.components,
        "user_input": user_input
    })

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)