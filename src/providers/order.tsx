"use client"

import { createContext, ReactNode, useState} from "react"
import { api } from "@/services/api";
import { getCookieClient } from "@/lib/cookieClient";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export interface OrderItemProps {
    id:string;
    amount: number;
    created_at: string;
    updated_at: string;
    order_id: string;
    product_id: string;
    product: {
        id: string;
        name: string;
        price: string;
        description: string;
        banner: string;
        created_at: string;
        updated_at: string;
        category_id: string;
    };
    order: {
        id: string;
        table: number;
        status: boolean;
        draft: boolean;
        name: string | null;
        created_at: string;
        updated_at: string;
    }
}

type OrderContextData = {
    isOpen: boolean;
    onRequestOpen: (order_id: string) => Promise<void>;
    onRequestClose: () => void;
    order: OrderItemProps[];
    finishOrder: (order_id: string) => Promise<void>;
}

type OrderProviderProps = {
    children: ReactNode;
}


export const OrderContext = createContext({} as OrderContextData)

export function OrderProvider({children}: OrderProviderProps){
    const [isOpen, setIsOpen] = useState(false)
    const [order, setOrder] = useState<OrderItemProps[]>([])
    const router = useRouter();

    const onRequestOpen = async (order_id: string) => {
        try { 
            const token = getCookieClient()
            const response = await api.get(`/order/detail/${order_id}`, {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            setOrder(response.data);
            setIsOpen(true)
        } catch (error) {
           console.log(error); 
        }
        
        
    }

    const onRequestClose = () => setIsOpen(false)

    const finishOrder = async (order_id: string) => {
       const token = getCookieClient();
        try {
            await api.put(`/order/finish/${order_id}`, {},{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
        } catch (error) {
            console.log(error);
            toast.error("Falha ao finalizar este pedido!")
            return;
        }

        router.refresh()
        setIsOpen(false)
        toast.success("Pedido finalizado com suceso!")
    }

    return(
        <OrderContext.Provider 
            value={{
                isOpen,
                onRequestOpen,
                onRequestClose,
                finishOrder,
                order
            }}
        >
            {children}
        </OrderContext.Provider>
    )
}