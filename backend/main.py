from analyzers import Analyzers
from evaluation import seg_test, test_value
from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.responses import RedirectResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, List, Literal
import uuid
import uvicorn
import time
import os

print("==== 当前目录内容 ====")
print(os.listdir('.'))
print("==== models 目录内容 ====")
if os.path.exists('models'):
    print(os.listdir('models'))
else:
    print("models 文件夹不存在")
#Initialize FastAPI
app = FastAPI()


#CORS setting
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)


# Initialize analyzers
analyzers = Analyzers()

# for temporary 
analysis_store: Dict[str, dict] = {}

class AnalyzeRequest(BaseModel):
    text: str
    analyzer: str

class SaveRequest(BaseModel):
    text: str
    analyzer: str
    result: list

class EvaluateRequest(BaseModel):
    test_set: Literal["msr", "pku", "other"]
    analyzers: List[str]

# @app.get("/")
# def read_root():
#     return {"message": "API is running"}

@app.post("/api/segment")
async def segment(req: AnalyzeRequest):
   
    try:
        result = analyzers.segment(req.text, req.analyzer)
        return {"result": result}
    except Exception as e:
        import traceback
        print("发生异常！", e)
        print(traceback.format_exc())
        raise HTTPException(500, str(e))

@app.post("/api/evaluate")
async def evaluate(req: EvaluateRequest):
    results = []
    for tool in req.analyzers:
        try:
            duration = seg_test(analyzers, tool, req.test_set)
            P, R, F1 = test_value(tool, req.test_set)
            results.append({
                "tool": tool,
                "precision": P,
                "recall": R,
                "f1": F1,
                "time": round(duration, 3)
            })
        except Exception as e:
            results.append({
                "tool": tool,
                "error": str(e)
            })
    return results


app.mount("/", StaticFiles(directory="static", html=True), name="static")

@app.get("/")
async def root():
    return RedirectResponse("/static/index.html")

