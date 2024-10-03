import { CarouselHome, ListProducts } from "../components/Carousel";
import { ApiService } from "../service/apiService";





export default async function Templates() {
    const request = new ApiService();
    const products = await request.get<ListProducts>(`${process.env.NEXT_PUBLIC_API_HOST}/stripe/products`, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    console.log(products);
    return (
        <>
            <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">Use um de nossos <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">templates !</span></h1>
            <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">Here at Flowbite we focus on markets where technology, innovation, and capital can unlock long-term value and drive economic growth.</p>
            <CarouselHome {...products} />

        </>
    );
}




