"use client";
import { useState } from "react";
import { FormsQrCode } from "./Forms";
import { Card, CardContent } from "./ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "./ui/carousel";


export type Template = {
    imageUrl: string
    id: string
}


interface CarouselHomeProps {
    templates: Template[]
}

// criando objeto para testar 



export const CarouselHome = ({ templates }: CarouselHomeProps) => {
    const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

    const handleTemplateClick = (template: Template) => {
        setSelectedTemplate(template);
    };
    return (
        <div className="w-full max-w-[1200px] mx-auto">
            {selectedTemplate ? (
                <div className="md:flex md:flex-row  md:items-center md:gap-5">
                    <div className="-ml-5 pb-3 x">
                        <Carousel>
                            <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                                <div className="p-1">
                                    <Card>
                                        <CardContent className="flex aspect-square items-center justify-center p-6">
                                            <img className="max-h-[500px]" src={selectedTemplate.imageUrl} alt="" />
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>

                        </Carousel>
                    </div>
                    <div className="">
                        <FormsQrCode />
                    </div>
                </div>
            ) : (

                <Carousel
                    opts={{
                        align: "start",
                    }}
                    className="w-full max-w-[1200px"
                >
                    <CarouselContent>
                        {
                            templates.map((template) => (
                                <CarouselItem key={template.id} className="md:basis-1/2 lg:basis-1/3">
                                    <div className="p-1">
                                        <Card>
                                            <CardContent className="flex aspect-square items-center justify-center p-6">
                                                <a onClick={(event) => { event.preventDefault(); handleTemplateClick(template); }} href="">
                                                    <img src={template.imageUrl} alt="" />
                                                </a>                                            </CardContent>
                                        </Card>
                                    </div>
                                </CarouselItem>
                            ))
                        }
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            )}
        </div>
    )
}
