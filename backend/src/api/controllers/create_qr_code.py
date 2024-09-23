
from fastapi import APIRouter

from src.api.controllers.dto.qrcode import RequestGenerateQrCode
from src.core.generator import GenerateQRCode

router = APIRouter()

@router.post("/qrcode")
def read_item(pix: RequestGenerateQrCode):
    print(pix)
    service = GenerateQRCode(key=pix.key, value=pix.value)
    url = service.get_qr_code()
    return {"url": url} 