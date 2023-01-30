import { NextRequest, NextResponse } from "next/server";

export async function middleware( req: NextRequest ) {
	const getFasttrackTokenFromCookies = req.cookies.get( 'fasttrack-token' )
	const nextResponse = NextResponse.next()
	if ( !getFasttrackTokenFromCookies ) {
		const fasttrackUrl = 'https://ftl.fasttrack.net/v1/auth/login'
			+ '?account=' + process.env.NEXT_PUBLIC_FASTTRACKACCOUNT
			+ '&pass=' + process.env.NEXT_PUBLIC_FASTTRACKPASSWORD
			+ '&appid=' + process.env.NEXT_PUBLIC_FASTTRACKAPPID
		const fasttrackRequest = await fetch( fasttrackUrl )
		const fasttrackResponse = await fasttrackRequest.json()
		nextResponse.cookies.set( "fasttrack-appid", fasttrackResponse.appid, {} )
		nextResponse.cookies.set( "fasttrack-token", fasttrackResponse.token, {} )
	}
	return nextResponse;
}