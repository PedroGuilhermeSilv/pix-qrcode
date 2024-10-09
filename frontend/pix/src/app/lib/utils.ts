import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const formatPrice = (priceInCents: number, currency: string = 'BRL'): string => {
  const price = priceInCents / 100;
  return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: currency,
  }).format(price);
};
