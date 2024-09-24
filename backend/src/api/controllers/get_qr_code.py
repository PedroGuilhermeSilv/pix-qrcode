from fastapi import APIRouter
from fastapi.responses import FileResponse

from src.core.get_qr_code import GetQrCode

router = APIRouter()

@router.get("/qrcode/{file_name}")
def read_item(file_name: str):
    service = GetQrCode(file_name=file_name)
    local_file_path = service.download_from_s3(file_name)
    
    return FileResponse(local_file_path, media_type='application/octet-stream', filename=f"{file_name}")