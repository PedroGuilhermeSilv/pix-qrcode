
"use client";
import { useGetSessionId } from "../../lib/actions";

export default function PaymentSucess() {
    const sessionId = useGetSessionId();
    return (
        <>
            pagamento bem sucedido {sessionId}
        </>
    );
}