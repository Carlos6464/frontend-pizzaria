import { Header } from "./components/header/page"
import { OrderProvider } from "@/providers/order"
export default function DashboardLayout({children}: {children: React.ReactNode}){
    return(
        <>
            <Header/>
            <OrderProvider>
                {children}
            </OrderProvider>
        </>
    )
}