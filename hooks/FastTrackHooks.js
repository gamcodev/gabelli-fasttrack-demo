import useSWR from 'swr';

const fetcher = url => fetch( url, { headers: { appid, token } } ).then( response => response.json() )

const trailingMonth = () => {
	let date = new Date()
	var lastDay = new Date( date.getFullYear(), date.getMonth(), 0 )
	return `${ lastDay.getFullYear() }-${ lastDay.getMonth() + 1 }-${ lastDay.getDate() }`
}

const trailingQuarter = () => {
	let end = new Date()
	var q = [ 11, 8, 5, 2 ]
	var qend = ''
	for ( let i = 0; i < q.length; i++ ) {
		if ( end.getMonth() > q[ i ] ) {
			qend = new Date( end.getFullYear(), q[ i ] + 1, 0 )
			break;
		}
	}
	if ( qend == '' ) qend = new Date( end.getFullYear() - 1, 11, 31 )
	return `${ qend.getFullYear() }-${ qend.getMonth() + 1 }-${ qend.getDate() }`
}

const fasttrackLogin = async () => {
	const fasttrackUrl = 'https://ftl.fasttrack.net/v1/auth/login'
		+ '?account=' + process.env.NEXT_PUBLIC_FASTTRACKACCOUNT
		+ '&pass=' + process.env.NEXT_PUBLIC_FASTTRACKPASSWORD
		+ '&appid=' + process.env.NEXT_PUBLIC_FASTTRACKAPPID
	const fasttrackRequest = await fetch( fasttrackUrl )
	const { appid, token } = await fasttrackRequest.json()
	return { appid, token };
}

export function useFasttrackLogin() {
	const fasttrackUrl = 'https://ftl.fasttrack.net/v1/auth/login'
		+ '?account=' + process.env.NEXT_PUBLIC_FASTTRACKACCOUNT
		+ '&pass=' + process.env.NEXT_PUBLIC_FASTTRACKPASSWORD
		+ '&appid=' + process.env.NEXT_PUBLIC_FASTTRACKAPPID
	const { data, error } = useSWR( fasttrackUrl, fetcher );
	return { data, loading: !data && !error, error };
}

export function useFasttrackPrice( ticker, appid, token ) {
	const { data: daily, error: dailyError } = useSWR( `https://ftl.fasttrack.net/v1/stats/${ ticker }`, url => fetch( url, { headers: { appid, token } } ).then( response => response.json() ) );
	const { data: monthly, error: monthlyError } = useSWR( `https://ftl.fasttrack.net/v1/stats/${ ticker }?end=${ trailingMonth() }`, url => fetch( url, { headers: { appid, token } } ).then( response => response.json() ) );
	const { data: quarterly, error: quarterlyError } = useSWR( `https://ftl.fasttrack.net/v1/stats/${ ticker }?end=${ trailingQuarter() }`, url => fetch( url, { headers: { appid, token } } ).then( response => response.json() ) );
	return {
		daily, monthly, quarterly,
		loading: !daily && !monthly && !quarterly && !dailyError && !monthlyError && !quarterlyError,
		error: dailyError && monthlyError && quarterlyError
	};
}
