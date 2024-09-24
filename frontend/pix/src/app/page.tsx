import { FormsQrCode } from "@/app/components/Forms";
import { Header } from "./components/Header";

export default function Home() {
  return (
    <>
      <Header />
      <div className="grid grid-rows-[auto_1fr_auto] h-screen items-center -mt-16 justify-items-center p-0 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            Gere uma cobrança por <span className="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">QRCode</span>
          </h1>
          <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">Basta passar sua chave e o valor</p>
          <FormsQrCode />
        </main>
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        </footer>
      </div>
    </>
  );
}