import { useRouter } from "next/router"
import { getCookie } from 'cookies-next'
import { useFasttrackPrice } from '../../hooks/FastTrackHooks'
import { useState } from "react";
import PerfTypeButtons from "../../components/PerfTypeButtons";
// import styled from 'styled-components'

const ShowFund = () => {

	const router = useRouter();
	const { ticker } = router.query;

	const fasttrackAppid = getCookie( 'fasttrack-appid' ),
		fasttrackToken = getCookie( 'fasttrack-token' )
		
	const fasttrackData = useFasttrackPrice( ticker, fasttrackAppid, fasttrackToken )
	const { daily, monthly, quarterly } = fasttrackData

	const [ perfType, setPerfType ] = useState( 'daily' )
	const tableToDisplay = perfType === 'monthly' ? monthly : perfType === 'quarterly' ? quarterly : daily

	return <>

		<h1>{ tableToDisplay?.describe?.name } ({ ticker })</h1>
		<h4>as of { tableToDisplay?.dteend?.strdate || '…' }</h4>
		
		<PerfTypeButtons
			perfType={ perfType }
			setPerfType={ setPerfType }
		/>
	
		<div style={ { display: 'flex', flexFlow: 'column wrap' } }>
			<span>52wk hi		&nbsp;	{ tableToDisplay?.describe.high_52 }</span>
			<span>52wk lo		&nbsp;	{ tableToDisplay?.describe.low_52 }</span>
			<span>Price			&nbsp;	{ tableToDisplay?.describe.price }</span>
			<span>Prior price	&nbsp;	{ tableToDisplay?.describe.price_previous }</span>
			<span>Mkt cap		&nbsp;	{ tableToDisplay?.describe.marketcap }</span>
			<span>Shares out	&nbsp;	{ tableToDisplay?.describe.sharesout }</span>
			<span>YTD			&nbsp;	{ tableToDisplay?.returns.total.ytd }</span>
			<span>3 mo.			&nbsp;	{ tableToDisplay?.returns.total.threemonths }</span>
			<span>1 yr.			&nbsp;	{ tableToDisplay?.returns.total.one }</span>
			<span>3 yr.			&nbsp;	{ tableToDisplay?.returns.annualized.three }</span>
			<span>5 yr.			&nbsp;	{ tableToDisplay?.returns.annualized.five }</span>
			<span>10 yr.		&nbsp;	{ tableToDisplay?.returns.annualized.ten }</span>
			<span>Incept.		&nbsp;	{ tableToDisplay?.returns.annualized.inception }</span>
		</div>
		<hr />
		<div style={ { display: 'flex', flexFlow: 'column wrap' } }>
			{ Object.keys( tableToDisplay?.risk || {} ).map( riskType => <section key={ riskType }>
				<span>{ riskType }&nbsp;</span>
				<span>{ tableToDisplay?.risk[ riskType ] }</span>
			</section> ) }
		</div>

	</>

}

export default ShowFund
