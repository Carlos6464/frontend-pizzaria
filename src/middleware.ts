import { NextRequest, NextResponse } from "next/server";
import { api } from "@/services/api";

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;
    const token = req.cookies.get("tokenName")?.value; // Certifique-se de substituir "tokenName" pelo nome correto do cookie

    if (pathname.startsWith("/_next")) return NextResponse.next();

    // Impedir usuários logados de acessar a página de login ("/") e cadastro ("/signup")
    if (pathname === "/" || pathname === "/signup") {
        if (token) {
            const isValid = await validateToken(token);
            if (isValid) {
                return NextResponse.redirect(new URL("/dashboard", req.url));
            }
        }
        return NextResponse.next();
    }

    // Proteção da rota do dashboard
    if (pathname.startsWith("/dashboard")) {
        if (!token) return NextResponse.redirect(new URL("/", req.url));

        const isValid = await validateToken(token);
        if (!isValid) return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
}

async function validateToken(token: string) {
    if (!token) return false;

    try {
        await api.get("/user/detalhe", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return true;
    } catch (error) {
        console.log("Erro ao validar o token:", error);
        return false;
    }
}
