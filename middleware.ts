import { /* NextRequest, */ NextResponse } from "next/server";

export async function middleware( /* req: NextRequest */ ) {
	// const { value: expirationDate } = req.cookies.get( 'fasttrack-expiration' )
	// const expired = expirationDate ? Date.now() > new Date( expirationDate ) - 432_000: true;					// 518,400 ms in six days
	const nextResponse = NextResponse.next()
	// if ( expired ) {
		const fasttrackUrl = 'https://ftl.fasttrack.net/v1/auth/login'
			+ '?account=' + process.env.NEXT_PUBLIC_FASTTRACKACCOUNT
			+ '&pass=' + process.env.NEXT_PUBLIC_FASTTRACKPASSWORD
			+ '&appid=' + process.env.NEXT_PUBLIC_FASTTRACKAPPID
		const fasttrackRequest = await fetch( fasttrackUrl )
		const fasttrackResponse = await fasttrackRequest.json()
		nextResponse.cookies.set( "fasttrack-appid", fasttrackResponse.appid, {} )
		nextResponse.cookies.set( "fasttrack-token", fasttrackResponse.token, {} )
		nextResponse.cookies.set( "fasttrack-expiration", fasttrackResponse.expiration, {} )
	// }
	return nextResponse;
}