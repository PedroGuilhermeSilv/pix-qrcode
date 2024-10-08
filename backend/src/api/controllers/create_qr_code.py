
from fastapi import APIRouter
from fastapi.requests import Request

from src.api.controllers.dto.qrcode import RequestGenerateQrCode, ResponseGenerateQrCode
from src.core.generator import GenerateQRCode

router = APIRouter()

@router.post("/qrcode", response_model=ResponseGenerateQrCode)
def read_item(pix: RequestGenerateQrCode, request: Request):
    print(request.body)
    service = GenerateQRCode(key=pix.key, value=pix.value)
    response = service.gerar_qrcode_pix()
    return ResponseGenerateQrCode(url=response.url, payload=response.payload) 