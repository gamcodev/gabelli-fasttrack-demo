import PerfTypeButtons from '../../components/PerfTypeButtons'
import { getCookie } from 'cookies-next'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { parseFastTrackReturns, parsePercentage } from '../../utilities'
import { useFasttrackPrices } from '../../hooks/FastTrackHooks'

const sicavTickers = {
	'GUSIU': { symbol: '$' },	// GAMCO All Cap Value Class I USD
	'GUSIE': { symbol: '€' },	// GAMCO All Cap Value Class I EUR
	'GUSIC': { symbol: 'CHF' },	// GAMCO All Cap Value Class I CHF
	'GUIGH': { symbol: '£' },	// GAMCO All Cap Value Class I GBP
	'GUSAU': { symbol: '$' },	// GAMCO All Cap Value Class A USD
	'GUSAE': { symbol: '€' },	// GAMCO All Cap Value Class A EUR
	'GUSAC': { symbol: 'CHF' },	// GAMCO All Cap Value Class A CHF
	'GUSFU': { symbol: '$' },	// GAMCO All Cap Value Class F USD
	'GUSXU': { symbol: '$' },	// GAMCO All Cap Value Class X USD
	'GUSRU': { symbol: '$' },	// GAMCO All Cap Value Class R USD
	'GUREH': { symbol: '€' },	// GAMCO All Cap Value Class R EUR
	'GURGH': { symbol: '£' },	// GAMCO All Cap Value Class R GBP
	'GMAIU': { symbol: '$' },	// GAMCO Merger Arbitrage Class I USD
	'GMAIE': { symbol: '€' },	// GAMCO Merger Arbitrage Class I EUR
	'GMAIC': { symbol: 'CHF' },	// GAMCO Merger Arbitrage Class I CHF
	'GMAIS': { symbol: 'kr' },	// GAMCO Merger Arbitrage Class I SEK
	'GMIGH': { symbol: '£' },	// GAMCO Merger Arbitrage Class I GBP
	'GMIGA': { symbol: '£' },	// GAMCO Merger Arbitrage Class I GBP (unhedged)
	'GMAAU': { symbol: '$' },	// GAMCO Merger Arbitrage Class A USD
	'GMAAE': { symbol: '€' },	// GAMCO Merger Arbitrage Class A EUR
	'GMAAC': { symbol: 'CHF' },	// GAMCO Merger Arbitrage Class A CHF
	'GMAAS': { symbol: 'kr' },	// GAMCO Merger Arbitrage Class A SEK
	'GMARU': { symbol: '$' },	// GAMCO Merger Arbitrage Class R USD
	'GMREH': { symbol: '€' },	// GAMCO Merger Arbitrage Class R EUR
	'GMRGH': { symbol: '£' },	// GAMCO Merger Arbitrage Class R GBP
	'GMASU': { symbol: '$' },	// GAMCO Merger Arbitrage Class S USD
	'GMASE': { symbol: '€' },	// GAMCO Merger Arbitrage Class S EUR
	'GMACI': { symbol: '$' },	// GAMCO Merger Arbitrage Class C USD
	'GMANI': { symbol: '$' },	// GAMCO Merger Arbitrage Class N USD
	'GCSAU': { symbol: '$' },	// GAMCO Convertible Securities Class A USD
	'GCSAE': { symbol: '€' },	// GAMCO Convertible Securities Class A EUR
	'GCSAF': { symbol: 'CHF' },	// GAMCO Convertible Securities Class A CHF
	'GCSIU': { symbol: '$' },	// GAMCO Convertible Securities Class I USD Acc
	'GCSIE': { symbol: '€' },	// GAMCO Convertible Securities Class I EUR
	'GCSIF': { symbol: 'CHF' },	// GAMCO Convertible Securities Class I CHF
	'GCSRR': { symbol: '€' },	// GAMCO Convertible Securities Class R EUR
	'GCSRU': { symbol: '$' },	// GAMCO Convertible Securities Class R USD
	'GCSXU': { symbol: '$' },	// GAMCO Convertible Securities Class X USD
	'GCSFU': { symbol: '$' },	// GAMCO Convertible Securities Class F USD
	'GCSFF': { symbol: '€' },	// GAMCO Convertible Securities Class F EUR
	'GCSID': { symbol: '$' },	// GAMCO Convertible Securities Class I USD Dis
};

const SICAVs = () => {

	const appid = getCookie( 'fasttrack-appid' ),
		token = getCookie( 'fasttrack-token' )

	const [ perfType, setPerfType ] = useState( 'daily' )

	const {
		triggerDaily, triggerMonthly, triggerQuarterly,
		daily, monthly, quarterly,
		// error
	} = useFasttrackPrices( Object.keys( sicavTickers ), perfType, appid, token );
	
	const tableToDisplay = perfType === 'monthly' ? monthly : perfType === 'quarterly' ? quarterly : daily

	useEffect( () => {
		triggerDaily()
		triggerMonthly()
		triggerQuarterly()
	}, [ triggerDaily, triggerMonthly, triggerQuarterly ] )
	
	return <>
	
		<h1>Gabelli SICAVs</h1>
		<h4>as of { tableToDisplay?.statslist[ 0 ].dteend?.strdate || '…' }</h4>

		<PerfTypeButtons
			perfType={ perfType }
			setPerfType={ setPerfType }
		/>

		<div style={ { display: 'flex', flexFlow: 'column wrap', gap: '10px', textAlign: 'center' } }>
			<div style={ { display: 'flex' } }>
				<span style={ { flex: 1 } }>Ticker</span>
				<span style={ { flex: 1 } }>Price</span>
				<span style={ { flex: 1 } }>Change</span>
				<span style={ { flex: 1 } }>YTD</span>
				<span style={ { flex: 1 } }>3 MO</span>
				<span style={ { flex: 1 } }>1 YR</span>
				<span style={ { flex: 1 } }>3 YR</span>
				<span style={ { flex: 1 } }>5 YR</span>
				<span style={ { flex: 1 } }>10 YR</span>
				<span style={ { flex: 1 } }>Life</span>
			</div>
			{ tableToDisplay?.statslist.map( ( {
				ticker,
				describe,
				returns,
				// aux,
				// dteend,
				// dtestart,
				// risk,
				err
			} ) => err ? <div style={ { display: 'flex' } } key={ ticker }>
				<span style={ { flex: 1 } }>{ ticker }</span>
				<span style={ { flex: 9 } }>Error!</span>
			</div> : <div style={ { display: 'flex' } } key={ ticker }>
				<span style={ { flex: 1 } }>
					<Link href={ `/funds/${ ticker }` }>{ ticker }</Link>
					<div style={ { fontSize: '8pt' } }>{ describe.name }</div>
				</span>
				<span style={ { flex: 1 } }>{ `${ sicavTickers[ ticker ].symbol }${ describe.price }` }</span>
				<span style={ { flex: 1 } }>{ parsePercentage( ( describe.price - describe.price_previous ) / describe.price_previous ) }</span>
				<span style={ { flex: 1 } }>{ parseFastTrackReturns( returns ).ytd }</span>
				<span style={ { flex: 1 } }>{ parseFastTrackReturns( returns ).threemonths }</span>
				<span style={ { flex: 1 } }>{ parseFastTrackReturns( returns ).one }</span>
				<span style={ { flex: 1 } }>{ parseFastTrackReturns( returns ).three }</span>
				<span style={ { flex: 1 } }>{ parseFastTrackReturns( returns ).five }</span>
				<span style={ { flex: 1 } }>{ parseFastTrackReturns( returns ).ten }</span>
				<span style={ { flex: 1 } }>{ parseFastTrackReturns( returns ).inception }</span>
			</div> ) }
		</div>

	</>

}

export default SICAVs;

