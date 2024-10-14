import { FormsQrCode } from "./components/FormsQrCode";



export default function Home() {



  return (
    < div className="p-3">
      <h1 className="mb-4 p-0 text-2xl font-extrabold leading-none tracking-tight -mt-20 text-gray-900 md:text-5xl lg:text-6xl dark:text-white sm:text2">
        Gere uma cobrança por <span className="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">QRCode</span>
      </h1>
      <FormsQrCode styledButton="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" childrenButton="Gerar Qrcode" />
    </div>
  );
}