"use client";
import apiService from "@/app/service/apiService";
import { useState } from "react";
import { Button } from "./Button";

export type ResponseQrCode = {
    url: string;
    payload: string;
};

export const FormsQrCode = () => {
    const [key, setKey] = useState("");
    const [rawValue, setRawValue] = useState("");
    const [formattedValue, setFormattedValue] = useState("");
    const [loading, setLoading] = useState(false);

    const formatValue = (val: string) => {
        val = val.replace(/[^0-9]/g, '');
        const num = parseInt(val, 10) / 100;
        const formattedValue = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(num);
        return formattedValue;
    };

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value.replace(/[^0-9]/g, '');
        setRawValue(rawValue);
        const formattedValue = formatValue(rawValue);
        setFormattedValue(formattedValue);
    };

    const generateQrCode = async () => {
        setLoading(true);
        const request = {
            key: key,
            value: Number.isNaN(parseFloat(rawValue)) ? 0.00 : parseFloat(rawValue),
        };
        const response = await apiService.post<ResponseQrCode>("/qrcode", JSON.stringify(request), "application/json",
            "application/json");
        console.log("estou sendo cahamdo");
        console.log(response);
        if (response.url) {
            setLoading(false);
        } else {
            setLoading(false);
        }
    };

    const Form = (
        <form>
            <div className="flex flex-row w-100 gap-3 pb-3">
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Chave</label>
                    <div className="flex">
                        <div className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4 text-gray-500 dark:text-gray-400">
                                <path d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
                            </svg>
                        </div>
                        <input onChange={(e) => setKey(e.target.value)} type="text" id="input-group-1" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 pl-12 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="key" />
                    </div>
                </div>
                <div >
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Valor</label>
                    <div className="flex">
                        <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 border-e-0 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                            </svg>
                        </span>
                        <input onChange={handleValueChange} value={formattedValue} type="text" id="website-admin" className="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="R$ 0,01" />
                    </div>
                </div>
            </div>
            <Button isLoad={loading} children="Gerar qrcode" generateQrCode={generateQrCode} />
        </form>
    );

    return Form;
};