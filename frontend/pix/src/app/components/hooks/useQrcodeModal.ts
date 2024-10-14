import { Product } from "@/app/@types/products";
import { RequestQrCode } from "@/app/@types/qrcode";
import { saveSessionId } from "@/app/lib/actions";
import { ApiService } from "@/app/service/apiService";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "sonner";
import { create } from "zustand";



export type SessionCheckout = {
    session_id: string;
};

interface QrcodeModalStore {
  isOpen: boolean;
  template?: Product | null;
  open: () => void;
  close: () => void;
  onBuyClick: (request: RequestQrCode) => void;
}

const useQrcodeModal = create<QrcodeModalStore>((set,get) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  template: null,
  onBuyClick: async (request: RequestQrCode) => {
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);
    const service = new ApiService();
    const {template} = get();
    const response = await service.post<SessionCheckout>(`${process.env.NEXT_PUBLIC_API_HOST}/stripe/session`, {
        body: JSON.stringify({
            data: [{
                price: template!.default_price,
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
  }
    
}));

export default useQrcodeModal;


