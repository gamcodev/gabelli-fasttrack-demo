import { useRouter } from "next/router"
import { getCookie } from 'cookies-next'
import { useFasttrackPrice } from '../../hooks/FastTrackHooks'
import { useState } from "react";
import PerfTypeButtons from "../../components/PerfTypeButtons";
import { parseFastTrackReturns } from "../../utilities";
import styled from 'styled-components'

const ShowFund = () => {

	const router = useRouter();
	const { ticker } = router.query;

	const fasttrackAppid = getCookie( 'fasttrack-appid' ),
		fasttrackToken = getCookie( 'fasttrack-token' )
		
	const fasttrackData = useFasttrackPrice( ticker, fasttrackAppid, fasttrackToken )
	const { daily, monthly, quarterly, dividends } = fasttrackData

	const [ perfType, setPerfType ] = useState( 'daily' )
	const tableToDisplay = perfType === 'monthly' ? monthly : perfType === 'quarterly' ? quarterly : daily

	return <>

		<h1>{ tableToDisplay?.describe?.name } ({ ticker })</h1>
		<h4>as of { tableToDisplay?.dteend?.strdate || '…' }</h4>
		
		<PerfTypeButtons
			perfType={ perfType }
			setPerfType={ setPerfType }
		/>
	
		<div style={ flexColumnStyle }>
			<span>52wk hi		&nbsp;	{ tableToDisplay?.describe?.high_52 }</span>
			<span>52wk lo		&nbsp;	{ tableToDisplay?.describe?.low_52 }</span>
			<span>Price			&nbsp;	{ tableToDisplay?.describe?.price }</span>
			<span>Prior price	&nbsp;	{ tableToDisplay?.describe?.price_previous }</span>
			<span>Mkt cap		&nbsp;	{ tableToDisplay?.describe?.marketcap }</span>
			<span>Shares out	&nbsp;	{ tableToDisplay?.describe?.sharesout }</span>
			<span>YTD			&nbsp;	{ parseFastTrackReturns( tableToDisplay?.returns ).ytd }</span>
			<span>3 mo.			&nbsp;	{ parseFastTrackReturns( tableToDisplay?.returns ).threemonths }</span>
			<span>1 yr.			&nbsp;	{ parseFastTrackReturns( tableToDisplay?.returns ).one }</span>
			<span>3 yr.			&nbsp;	{ parseFastTrackReturns( tableToDisplay?.returns ).three }</span>
			<span>5 yr.			&nbsp;	{ parseFastTrackReturns( tableToDisplay?.returns ).five }</span>
			<span>10 yr.		&nbsp;	{ parseFastTrackReturns( tableToDisplay?.returns ).ten }</span>
			<span>Incept.		&nbsp;	{ parseFastTrackReturns( tableToDisplay?.returns ).inception }</span>
		</div>
		<hr />

		<div style={ flexColumnStyle }>
			{ Object.keys( tableToDisplay?.risk || {} ).map( riskType => <section key={ riskType }>
				<span>{ riskType }&nbsp;</span>
				<span>{ tableToDisplay?.risk[ riskType ] }</span>
			</section> ) }
		</div>
		<hr />

		<div style={ {
			height: '10rem',
			overflowY: 'scroll',
			display: 'flex',
			flexFlow: 'column nowrap',
		} }>
			<section style={ flexRowStyle }>
				<span style={ { flex: 1, fontWeight: '800', } }>Date</span>
				<span style={ { flex: 1, fontWeight: '800', } }>Price</span>
				<span style={ { flex: 4, fontWeight: '800', } }>Divs</span>
			</section>
			{ dividends?.datarange?.map( ( { date, divs, price } ) => <StyledDivTable key={ date.marketdate }>
				<span style={ { flex: 1 } }>{ date.strdate }</span>
				<span style={ { flex: 1 } }>{ price }</span>
				<div style={ { flex: 4, ...flexColumnStyle } }>
					{ divs.map( ( { type, type_code, value }, index ) => <section key={ index } style={ flexRowStyle }>
						<span>{ `${ type } (${ type_code }) - $${ value }` }</span>
					</section> ) }
				</div>
			</StyledDivTable> ) }
		</div>

	</>

}

export default ShowFund;

const flexColumnStyle = { display: 'flex', flexFlow: 'column wrap', };
const flexRowStyle = { display: 'flex', flexFlow: 'row nowrap', };

const StyledDivTable = styled.section`
	display: flex;
	flex-flow: row nowrap;
	& span, & div { min-height: 40px; }
	&:nth-child( even ) {
		background-color: #ddd;
	}
`;
