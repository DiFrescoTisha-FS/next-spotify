import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";
// import useSpotify from "./hooks/useSpotify"


export async function middleware(req) {

    const token = await getToken({ req, secret: process.env.JWT_SECRET });

    // const { pathname } = req.nextUrl
    const url = req.nextUrl.clone();
    
    url.pathname = '/login';

    if (url.pathname.includes('/api/auth') || token) {
        return NextResponse.next();
    }

    if (!token && url.pathname !== '/login') {
        return NextResponse.redirect('/login')
    }
} 
