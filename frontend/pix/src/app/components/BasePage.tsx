import React from "react";
import { Header } from "./Header";



interface BasePageProps {
    content: any;

}

export const BasePase: React.FC<BasePageProps> = ({ content }) => {
    return (
        <div className="">
            <div className="grid grid-rows-[auto_1fr_auto] h-screen items-center justify-items-center pb-15 xl:p-0 sm:p-0 font-[family-name:var(--font-geist-sans)]" >
                <Header />
                <main className="flex px-2 flex-col gap-8 row-start-2 items-center sm:items-start ">
                    {content}
                </main>
                <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
                </footer>
            </div>
        </div>
    );
}