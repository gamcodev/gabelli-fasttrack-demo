import PerfTypeButtons from '../../components/PerfTypeButtons'
import { getCookie } from 'cookies-next'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { parseFastTrackReturns, parsePercentage } from '../../utilities'
import { useFasttrackPrices } from '../../hooks/FastTrackHooks'

const ETFs = () => {

	const appid = getCookie( 'fasttrack-appid' ),
		token = getCookie( 'fasttrack-token' )

	const [ perfType, setPerfType ] = useState( 'daily' )

	const {
		triggerDaily, triggerMonthly, triggerQuarterly,
		daily, monthly, quarterly,
		// error
	} = useFasttrackPrices( [ 'GCAD', 'GAST', 'GABF', 'LOPP', 'GGRW' ], perfType, appid, token )
	
	const tableToDisplay = perfType === 'monthly' ? monthly : perfType === 'quarterly' ? quarterly : daily

	useEffect( () => {
		triggerDaily()
		triggerMonthly()
		triggerQuarterly()
	}, [ triggerDaily, triggerMonthly, triggerQuarterly ] )
	
	return <>
	
		<h1>Gabelli ETFs</h1>
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
				<span style={ { flex: 1 } }>{ `$${ describe.price }` }</span>
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

export default ETFs;

