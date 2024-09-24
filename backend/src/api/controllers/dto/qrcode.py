from pydantic import BaseModel


class RequestGenerateQrCode(BaseModel):
    key: str | None
    value: str | None


class ResponseGenerateQrCode(BaseModel):
    url: str
    payload: str