"use client";
import { loadStripe } from "@stripe/stripe-js";
import { ApiService } from "../service/apiService";
import { Card, CardContent } from "./ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "./ui/carousel";

export type Product = {
    id: string;
    object: string;
    active: boolean;
    created: number;
    default_price: string;
    description: string;
    images: string[];
    marketing_features: string[];
    livemode: boolean;
    metadata: Record<string, any>;
    name: string;
    package_dimensions?: Record<string, any>;
    shippable?: string;
    statement_descriptor?: string;
    tax_code?: string;
    unit_label?: string;
    updated: number;
    url?: string;
    unit_amount?: number;
};

export type ListProducts = {
    object: string;
    url: string;
    has_more: boolean;
    data: Product[];
};

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
                                        <a
                                            onClick={(event) => {
                                                event.preventDefault();
                                                handleTemplateClick(template);
                                            }}
                                            href=""
                                        >
                                            <img src={template.images[0]} alt="" />
                                        </a>
                                    </CardContent>
                                    <h1 className="text-center">{formatPrice(template.unit_amount!)}</h1>
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