import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {

  const origin = request.headers.get("origin") || ""
    // retrieve the current response
    console.log("IN MIDDLEWARE, origin:", origin)
    const res = NextResponse.next()

    // // add the CORS headers to the response
    // res.headers.append('Access-Control-Allow-Credentials', "true")
    // res.headers.append('Access-Control-Allow-Origin', origin) // replace this your actual origin
    // res.headers.append('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT')
    // res.headers.append(
    //     'Access-Control-Allow-Headers',
    //     'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    // )
    // console.log("RES HEADERS:", res.headers)
    return res
}

// specify the path regex to apply the middleware to
export const config = {
    matcher: '/api/:path*',
}