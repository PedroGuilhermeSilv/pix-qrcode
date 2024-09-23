from pydantic import BaseModel


class ResponseGeneratePix(BaseModel):
    url: str
    payload: str