from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.api.controllers.create_qr_code import router as create_qr_code

app = FastAPI()

# Adicione o middleware CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

# Registre o controller
app.include_router(create_qr_code)