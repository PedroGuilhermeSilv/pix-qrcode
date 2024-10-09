import { FormsQrCode } from "./components/FormsQrCode";



export default function Home() {

  return (
    < div className="p-3">
      <h1 className="mb-4 p-0 text-2xl font-extrabold leading-none tracking-tight -mt-20 text-gray-900 md:text-5xl lg:text-6xl dark:text-white sm:text2">
        Gere uma cobrança por <span className="underline underline-offset-3 decoration-8 decoration-blue-400 dark:decoration-blue-600">QRCode</span>
      </h1>
      <FormsQrCode />
    </div>
  );
}