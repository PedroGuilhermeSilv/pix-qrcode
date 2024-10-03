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