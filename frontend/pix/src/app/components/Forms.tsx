"use client";
import React, { useState } from "react";
import { ApiService } from "../service/apiService";
import { Button } from "./Button";
import TextInput from "./TextInput";

export type ResponseQrCode = {
    url: string;
    payload: string;
};

interface FormsQrCodeProps {
    qrCodeisGenerated: boolean;
}

export const FormsQrCode: React.FC<FormsQrCodeProps> = ({ qrCodeisGenerated }) => {
    const [key, setKey] = useState("");
    const [value, setValue] = useState("");
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const apiService = new ApiService();


    const generateQrCode = async () => {
        const formattedValue = value.replace(",", ".").replace("R$", "").trim()
        setLoading(true);
        const request = {
            key: "nome",
            value: "2.00",
        };
        const response = await apiService.post<ResponseQrCode>(`${process.env.NEXT_PUBLIC_API_HOST}/qrcode`, {
            body: JSON.stringify(request),
        });
        setKey("");
        setValue("");
        console.log(response);
        if (response.url) {
            setUrl(response.url)

        } else {
            alert("Erro ao gerar o QRCode");
        }
    };

    const downloadQrCode = async () => {
        setLoading(true);
        let fileName = url.replace("https://pix.s3.tebi.io/", "");
        const response = await apiService.get(`/qrcode/${fileName}`, {
            headers: {
                "Content-Type": "image/png",
            },
        });

        console.log(response);
    }

    const Form = (
        <div className={`${qrCodeisGenerated ? "grid grid-rows-1 grid-flow-cols gap-1 md:grid-flow-col md:grid-rows- md:gap-4 md:items-center" : ""}`}>
            <form className="md:row-span-2 md:-row-start-3 ">
                <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">Basta passar sua chave e o valor</p>
                <div className="flex flex-row w-100 gap-3 pb-3">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Chave</label>
                        <div className="flex">
                            <div className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 text-gray-500 dark:text-gray-400">
                                    <path d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
                                </svg>
                            </div>
                            <TextInput onChange={(e) => setKey(e.target.value)} type="text" id="input-group-1" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="key" />
                        </div>
                    </div>
                    <div >
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Valor (Opicional)</label>
                        <div className="flex">
                            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                                </svg>
                            </span>
                            <TextInput maskType="money" onChange={(e) => setValue(e.target.value)} type="text" id="website-admin" className="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="0,00" />
                        </div>
                    </div>
                </div>
                <Button isLoad={loading} children="Gerar qrcode" action={generateQrCode} />
            </form>
            {
                qrCodeisGenerated && (
                    <div id="qrCode" className="md:row-span-2 flex justify-center w-max-450">
                        <div className="grow card bg-base-100 md:w-max-450 shadow-xl ">
                            <figure className="px-0 md:p-0">
                                <img
                                    src={url ? url : "https://s3.tebi.io/pix/pedromoura%40hotmail.com.png"}
                                    alt="qrcode"
                                    className="rounded-t-xl w-max-450" />
                            </figure>
                            <div className="card-body pb-2.5 items-center text-center">
                                <h2 className="card-title">Pronto, basta clicar para baixar!</h2>
                                <div className="card-actions">
                                    <Button isLoad={loading} children="Download" action={downloadQrCode} />
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );

    return Form;
};