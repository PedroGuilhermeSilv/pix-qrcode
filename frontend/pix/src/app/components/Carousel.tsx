"use client";
import { loadStripe } from "@stripe/stripe-js";
import { ListProducts, Product } from "../@types/products";
import { ApiService } from "../service/apiService";
import { ButtonPayment } from "./ButtonPayment";
import { Card, CardContent } from "./ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "./ui/carousel";



export type SessionCheckout = {
    session_id: string;
};

export const CarouselHome = ({ data }: ListProducts) => {
    const formatPrice = (priceInCents: number, currency: string = 'BRL'): string => {
        const price = priceInCents / 100;
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: currency,
        }).format(price);
    };
    const handleTemplateClick = async (template: Product) => {
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
                },
            });

            if (response && response.session_id) {
                const result = await stripe?.redirectToCheckout({
                    sessionId: response.session_id,
                });

                if (result?.error) {
                    console.error(result.error.message);
                }
            }
        } catch (error) {
            console.error("Error creating session:", error);
        }
    };

    return (
        <div className="w-full max-w-[1200px] mx-auto">
            <Carousel
                opts={{
                    align: "start",
                }}
                className="w-full max-w-[1200px]"
            >
                <CarouselContent>
                    {data.map((template) => (
                        <CarouselItem key={template.id} className="md:basis-1/2 lg:basis-1/3">
                            <div className="p-1">
                                <Card className="flex flex-col ">
                                    <CardContent className="flex aspect-square items-center justify-center p-6">

                                        <img src={template.images[0]} alt="" />

                                    </CardContent>
                                    <div className="flex items-center justify-between pr-6 pl-6 pb-3">
                                        <span className="text-3xl font-bold text-gray-900 dark:text-white">{formatPrice(template.unit_amount!)}</span>
                                        <ButtonPayment
                                            action={() => handleTemplateClick(template)}
                                            children="Comprar"
                                            template={template}

                                        />
                                    </div>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    );
};