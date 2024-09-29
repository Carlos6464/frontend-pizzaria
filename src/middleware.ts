import { NextRequest, NextResponse } from "next/server";
import { getCookieServer } from "@/lib/cookieServer";
import { api } from "@/services/api";

export async function middleware(req: NextRequest){

    const { pathname} = req.nextUrl;
    const token = getCookieServer();

    if(pathname.startsWith("/_next") ) return NextResponse.next();
    

    // Impedir usuários logados de acessar a página de login (rota "/") e a página de cadastro ("/signup")
    if (pathname === "/" || pathname === "/signup") {
        if (token) {
            const isValid = await validateToken(token);
            if (isValid) {
                // Redirecionar para o dashboard se o usuário já estiver logado
                return NextResponse.redirect(new URL("/dashboard", req.url));
            }
        }
        return NextResponse.next();
    }
    

   
    if(pathname.startsWith("/dashboard")){
        if(!token) return NextResponse.redirect(new URL("/", req.url))

        const isValid = await validateToken(token)
        if(!isValid) return NextResponse.redirect(new URL("/", req.url))
    } 

    return NextResponse.next();
} 

async function validateToken(token: string){
    if(!token) return false;

    try {
       await api.get("/user/detalhe",{
        headers:{
            Authorization: `Bearer ${token}`
        }
       }) 

       return true
    } catch (error) {
        console.log(error);
        return false;
    }
}