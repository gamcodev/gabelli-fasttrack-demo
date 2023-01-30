import { useRouter } from "next/router"
import { getCookie } from 'cookies-next'
import { useFasttrackPrice } from '../../hooks/FastTrackHooks'
// import styled from 'styled-components'

const ShowFund = () => {

	const router = useRouter();
	const { ticker } = router.query;

	const fasttrackAppid = getCookie( 'fasttrack-appid' ),
		fasttrackToken = getCookie( 'fasttrack-token' )
		
	const { data } = useFasttrackPrice( ticker, fasttrackAppid, fasttrackToken )
	console.log('%c 🌯 data: ', 'font-size:20px;background-color: #ED9EC7;color:#fff;', data);

	return <>

		<h1>{ data?.describe?.name } ({ ticker })</h1>
		<h4>as of { data?.dteend?.strdate || '…' }</h4>
	
		<div style={ { display: 'flex', flexFlow: 'column wrap' } }>
			{ Object.keys( data?.returns.annualized || {} ).map( period => <section key={ period }>
				<span>{ period }&nbsp;</span>
				<span>{ data.returns.annualized[ period ] }</span>
			</section> ) }
		</div>

	</>

}

export default ShowFund
