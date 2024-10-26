import { Orders } from "./components/orders/Orders";
import { api } from "@/services/api";
import { getCookieServer} from "@/lib/cookieServer"
import { OrderProps} from "@/lib/order.type";

const getOrders = async (): Promise<OrderProps[] | []> => {
    try {
       const token = getCookieServer()
       const response = await api.get("/order",{
        headers: {
            Authorization: `Bearer ${token}`
        }
       })

       return response.data || [];
    } catch (error) {
        console.log(error);
        return [];
    }
}
export const dynamic = 'force-dynamic';

export default async function Dashboard(){
    const orders = await getOrders();
    
    return (
        <>
            <Orders orders={orders}/>
        </>
    )
}