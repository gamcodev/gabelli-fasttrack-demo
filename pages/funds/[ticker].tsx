import { useRouter } from "next/router"
import { getCookie } from 'cookies-next'
import { useFasttrackPrice } from '../../hooks/FastTrackHooks'
import { useState } from "react";
// import styled from 'styled-components'

const ShowFund = () => {

	const router = useRouter();
	const { ticker } = router.query;

	const fasttrackAppid = getCookie( 'fasttrack-appid' ),
		fasttrackToken = getCookie( 'fasttrack-token' )
		
	const { daily, monthly, quarterly } = useFasttrackPrice( ticker, fasttrackAppid, fasttrackToken )

	const [ perfType, setPerfType ] = useState( 'daily' )

	return <>

		<h1>{ daily?.describe?.name } ({ ticker })</h1>
		<h4>as of { daily?.dteend?.strdate || '…' }</h4>
	
		<div style={ { display: 'flex', flexFlow: 'column wrap' } }>
			{/* { Object.keys( daily?.returns.annualized || {} ).map( period => <section key={ period }>
				<span>{ period }&nbsp;</span>
				<span>{ daily.returns.annualized[ period ] }</span>
			</section> ) } */}
			<span>YTD			&nbsp;	{ daily?.returns.total.ytd }</span>
			<span>3 mo.			&nbsp;	{ daily?.returns.total.threemonths }</span>
			<span>1 yr.			&nbsp;	{ daily?.returns.total.one }</span>
			<span>3 yr.			&nbsp;	{ daily?.returns.annualized.three }</span>
			<span>5 yr.			&nbsp;	{ daily?.returns.annualized.five }</span>
			<span>10 yr.		&nbsp;	{ daily?.returns.annualized.ten }</span>
			<span>Incept.		&nbsp;	{ daily?.returns.annualized.inception }</span>
		</div>

	</>

}

export default ShowFund
