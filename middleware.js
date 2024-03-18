import { useSession } from "next-auth/react";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request) {
    // const currentUser = request.cookies.get('next-auth.session-token')?.value;
    // console.log(currentUser.token)
    // return NextResponse.redirect(new URL("http://localhost:3000/", request.URL))
}

export const config={
    // matcher: "/home"
};