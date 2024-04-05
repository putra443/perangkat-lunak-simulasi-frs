import { useSession } from "next-auth/react";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request) {
    // const currentUser = request
    // console.log(currentUser)
    // return NextResponse.redirect(new URL("http://localhost:3000/", request.URL))
}

export const config={
    // matcher: "/home"
};