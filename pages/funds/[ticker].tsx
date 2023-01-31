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
	const tableToDisplay = perfType === 'monthly' ? monthly : perfType === 'quarterly' ? quarterly : daily

	return <>

		<h1>{ tableToDisplay?.describe?.name } ({ ticker })</h1>
		<h4>as of { tableToDisplay?.dteend?.strdate || '…' }</h4>
		
		<div style={ { display: 'flex', flexFlow: 'row nowrap' } }>
			<button
				disabled={ perfType === 'daily' }
				onClick={ () => setPerfType( 'daily' ) }
			>
				Daily
			</button>
			<button
				disabled={ perfType === 'monthly' }
				onClick={ () => setPerfType( 'monthly' ) }
			>
				Monthly
			</button>
			<button
				disabled={ perfType === 'quarterly' }
				onClick={ () => setPerfType( 'quarterly' ) }
			>
				Quarterly
			</button>
		</div>
	
		<div style={ { display: 'flex', flexFlow: 'column wrap' } }>
			{/* { Object.keys( tableToDisplay?.returns.annualized || {} ).map( period => <section key={ period }>
				<span>{ period }&nbsp;</span>
				<span>{ daily.returns.annualized[ period ] }</span>
			</section> ) } */}
			<span>YTD			&nbsp;	{ tableToDisplay?.returns.total.ytd }</span>
			<span>3 mo.			&nbsp;	{ tableToDisplay?.returns.total.threemonths }</span>
			<span>1 yr.			&nbsp;	{ tableToDisplay?.returns.total.one }</span>
			<span>3 yr.			&nbsp;	{ tableToDisplay?.returns.annualized.three }</span>
			<span>5 yr.			&nbsp;	{ tableToDisplay?.returns.annualized.five }</span>
			<span>10 yr.		&nbsp;	{ tableToDisplay?.returns.annualized.ten }</span>
			<span>Incept.		&nbsp;	{ tableToDisplay?.returns.annualized.inception }</span>
		</div>

	</>

}

export default ShowFund
