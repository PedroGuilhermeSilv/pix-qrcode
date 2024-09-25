from pydantic import BaseModel


class RequestGenerateQrCode(BaseModel):
    key: str 
    value: str 


class ResponseGenerateQrCode(BaseModel):
    url: str
    payload: str