import logging

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.requests import Request
from fastapi.responses import JSONResponse

from src.api.controllers.create_qr_code import router as create_qr_code
from src.api.controllers.get_qr_code import router as get_qr_code

app = FastAPI()

# Adicione o middleware CORS
logging.basicConfig(level=logging.INFO)
@app.middleware("http")
async def log_request(request: Request, call_next):
    body = await request.body()
    logging.info(f"Request: {request.method} {request.url} Body: {body.decode('utf-8')}")
    try:
        response = await call_next(request)
    except Exception as e:
        logging.error(f"Error: {e}")
        return JSONResponse(status_code=500, content={"message": "Internal Server Error"})
    return response
    


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)
app.middleware("http")(log_request)


# Registre o controller
app.include_router(create_qr_code)
app.include_router(get_qr_code)
