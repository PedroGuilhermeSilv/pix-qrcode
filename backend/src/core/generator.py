from dataclasses import dataclass

import requests
from requests import Response


@dataclass
class GenerateQRCode():
    key: str
    value: float

    def get_qr_code(self) -> str:
        response = self.request_qr_code()
        url = self.get_url_immage(response)
        return url

    def request_qr_code(self) -> Response:
        response = requests.get(f'https://pix.ae/{self.key}/{self.value}')
        return response
    def get_url_immage(self, content: str) -> str:
        html = content.content
        string = html.decode('utf-8')
        caminhos = string.split("<")
        for caminho in caminhos:
            if "img src" in caminho:
                url = caminho.split('"')[1]
                return url
        return None
    

