"use client";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { toast } from "sonner";
import { ListProducts, Product } from "../@types/products";
import { isAutenticated, saveSessionId } from "../lib/actions";
import { formatPrice } from "../lib/utils";
import { ApiService } from "../service/apiService";
import { ButtonPayment } from "./ButtonPayment";
import { Card, CardContent } from "./ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious
} from "./ui/carousel";
export type SessionCheckout = {
    session_id: string;
};

const ProductCard = ({ template, onBuyClick }: { template: Product; onBuyClick: (template: Product) => Promise<void> }) => (
    <Card className="flex flex-col">
        <CardContent className="flex aspect-square items-center justify-center p-6">
            <img className="w-full border-2 border-gray-300 rounded-xl" src={template.images[0]} alt={template.name} />
        </CardContent>
        <div className="flex flex-col gap-2 pl-4 pr-4 ">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">{formatPrice(template.unit_amount!)}</span>
            <ButtonPayment
                action={() => onBuyClick(template)}
                children="Comprar"
                template={template}
            />
        </div>
    </Card>
);

export const CarouselHome = ({ data }: ListProducts) => {
    const router = useRouter();

    const handleTemplateClick = useCallback(async (template: Product) => {
        const loged = await isAutenticated();
        if (!loged) {
            router.push("/login");
            return;
        }

        try {
            const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);
            const request = new ApiService();
            const response = await request.post<SessionCheckout>(`${process.env.NEXT_PUBLIC_API_HOST}/stripe/session`, {
                body: JSON.stringify({
                    data: [{
                        price: template.default_price,
                        quantity: 1,
                    }]
                }),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (response && response.data.session_id) {
                saveSessionId(response.data.session_id);
                const result = await stripe?.redirectToCheckout({
                    sessionId: response.data.session_id,
                });

                if (result?.error) {
                    toast.error("Erro ao criar sessão");
                }
            }
        } catch (error) {
            toast.error("Erro ao criar sessão");
        }
    }, [router]);

    return (
        <div className="w-full max-w-[1200px] p-3.5 relative">
            <Carousel
                opts={{
                    align: "start",
                    loop: true,
                }}
                className=""
            >
                <CarouselContent>
                    {data.map((template) => (
                        <CarouselItem key={template.id} className="md:basis-1/2 lg:basis-1/3">
                            <ProductCard template={template} onBuyClick={handleTemplateClick} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselNext className="absolute -right-4 top-1/2 transform -translate-y-1/2" />
                <CarouselPrevious className="absolute -left-4 md:-left-9 top-1/2 transform -translate-y-1/2" />
            </Carousel>
        </div>
    );
};