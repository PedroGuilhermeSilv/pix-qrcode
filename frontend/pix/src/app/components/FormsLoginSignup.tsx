"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from 'sonner';
import { ResponseLogin, ResponseSignUp } from "../@types/login";
import { saveInLocalStorage } from "../lib/actions";
import { ApiService } from "../service/apiService";
import { ButtonLogin } from "./ButtonLogin";
import useAuthStore from "./hooks/useAuth";



export const FormsLogin = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLogin, setIsLogin] = useState(true);
    const apiService = new ApiService();
    const useAuth = useAuthStore();

    const handleToggleForm = () => {
        setIsLogin(!isLogin);
    };

    const handleSignUp = async () => {
        if (password !== confirmPassword) {
            toast.error("As senhas não conferem");
            return false;
        }
        if (password.length < 8) {
            toast.error("A senha deve ter no mínimo 8 caracteres");
            return false;
        }
        if (email === "") {
            toast.error("O email é obrigatório");
            return false;
        }
        return true;
    };


    const login = async () => {
        try {
            const response = await apiService.post<ResponseLogin>(`${process.env.NEXT_PUBLIC_API_HOST}/auth/`, {
                body: JSON.stringify({ email, password }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            toast.success("Login realizado com sucesso");
            saveInLocalStorage("token", response.data.token);
            useAuth.login(response.data.token);

            router.push("/");


        }
        catch (error) {
            toast.error("Dados inválidos");

        }

    }

    const signUp = async () => {
        if (await handleSignUp()) {
            try {
                const request = {
                    email: email,
                    password: password,
                };
                await apiService.post<ResponseSignUp>(`${process.env.NEXT_PUBLIC_API_HOST}/user/`, {
                    body: JSON.stringify(request),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                toast.success("Usuário criado com sucesso");
                setIsLogin(true);

            }
            catch (error) {
                toast.error("Erro ao criar usuário");
            }
        }
    }


    const FormLogin = (
        <section className="">
            <div className="flex flex-col items-center -mt-20 justify-center px-6 py-8 mx-auto md:p-0 lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            {
                                isLogin ? "Login" : "Cadastro"
                            }
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label htmlFor="email" className="block mb-2 text-xs font-medium text-gray-900 dark:text-white">Email</label>
                                <input type="email" onChange={(e) => setEmail(e.target.value)} name="email" id="email" className="text-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm text-gray-900 dark:text-white">Senha</label>
                                <input type="password" onChange={(e) => setPassword(e.target.value)} name="password" id="password" placeholder="••••••••" className=" text-sm  bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                            {
                                !isLogin && (
                                    <div>
                                        <label htmlFor="password" className="block mb-2 text-sm  text-gray-900 dark:text-white">Confirme sua senha</label>
                                        <input type="password" onChange={(e) => setConfirmPassword(e.target.value)} name="password" id="password" placeholder="••••••••" className="text-sm bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                    </div>
                                )

                            }

                            <ButtonLogin action={isLogin ? login : signUp} user={{ email: email, password: password }} children="Login" />
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Você não tem conta? <Link href="" onClick={handleToggleForm} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Criar</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>



        </section>
    );



    return (
        <div>
            {FormLogin}
        </div>
    );
};