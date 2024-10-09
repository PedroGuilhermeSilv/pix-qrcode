"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export const Header = () => {
    const pathName = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const style = "block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent";
    const styledFocus = "block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500";

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900 p-0 w-full relative">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-3 pt-4">
                <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Pix QrCode</span>
                </a>
                <button
                    onClick={toggleMenu}
                    type="button"
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    aria-controls="navbar-default"
                    aria-expanded={isMenuOpen}
                >
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                </button>
                <div className={`${isMenuOpen ? 'absolute top-full left-0 right-0' : ' hidden transition-all delay-100'} w-full md:block md:w-auto md:relative`} id="navbar-default">
                    <ul className="font-medium flex flex-col mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <Link onClick={() => setIsMenuOpen(false)} href="/" className={pathName == "/" ? styledFocus : style} aria-current="page">Home</Link>
                        </li>
                        <li>
                            <Link onClick={() => setIsMenuOpen(false)} href="/templates" className={pathName == "/templates" ? styledFocus : style}>Templates</Link>
                        </li>
                        <li>
                            <Link onClick={() => setIsMenuOpen(false)} href="/login" className={pathName == "/login" ? styledFocus : style}>Login</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};