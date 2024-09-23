from pydantic import BaseModel


class RequestGenerateQrCode(BaseModel):
    key: str
    value: float
