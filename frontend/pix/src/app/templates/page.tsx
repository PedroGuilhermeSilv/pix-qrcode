import TitlebarImageList from "@/app/components/ListImages";
import { Header } from "../components/Header";

export default function Templates() {
    return (<>
        <Header />
        <div className="grid grid-rows-[20px_1fr_20px]  -mt-16 items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">

                <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">Use um de nossos <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">templates !</span></h1>
                <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">Here at Flowbite we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</p>

                <TitlebarImageList />
            </main>
            <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
            </footer>
        </div>

    </>
    );
}



