import useSWR from 'swr';
import { fetcher } from './fetcher';

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
	const { data, error } = useSWR( `https://ftl.fasttrack.net/v1/stats/${ ticker }`, url => fetch( url, { headers: { appid, token } } ).then( response => response.json() ) );
	return { data, loading: !data && !error, error };
}
