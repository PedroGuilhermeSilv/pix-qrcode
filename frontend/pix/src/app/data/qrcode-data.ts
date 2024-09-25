import { ApiService } from "../service/apiService";

interface ContentProps {
    value: string;
    key: string;

}
export type ResponseAPi = {
    url: string;
    payload: string;
};

export type ResponseQrCode = {
    url: string;
};


export async function generateQrCode<ResponseQrCode>({ value, key }: ContentProps){
    const apiService = new ApiService();
    const request = {
        key: "nome",
        value: "2.00",
    };
    const response = await apiService.post<ResponseAPi>(`${process.env.NEXT_PUBLIC_API_HOST}/qrcode`, {
        body: JSON.stringify(request),
        headers: {
            "Content-Type": "application/json",
        },
    });
    console.log(response);
    if (response.url) {
        return  {
            url: response.url,
        };
    } else {
        alert("Erro ao gerar o QRCode");
    }
};