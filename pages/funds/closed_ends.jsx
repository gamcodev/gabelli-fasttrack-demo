import PerfTypeButtons from '../../components/PerfTypeButtons'
import { getCookie } from 'cookies-next'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { parsePercentage } from '../../utilities'
import { useFasttrackPrices } from '../../hooks/FastTrackHooks'

const closedEndTickers = [
	'BCV',
	'GDV',
	'ECF',
	'GLU',
	'GGZ',
	'GGT',
	'GRX',
	'GCV',
	'GAB',
	'GNT',
	'GGN',
	'GDL',
	'GUT',
	// 'GMP LN'
]

const ClosedEnds = () => {

	const appid = getCookie( 'fasttrack-appid' ),
		token = getCookie( 'fasttrack-token' )

	const [ perfType, setPerfType ] = useState( 'daily' )

	const {
		triggerDaily, triggerMonthly, triggerQuarterly,
		daily, monthly, quarterly,
		error
	} = useFasttrackPrices( closedEndTickers, perfType, appid, token )
	
	const tableToDisplay = perfType === 'monthly' ? monthly : perfType === 'quarterly' ? quarterly : daily

	useEffect( () => {
		triggerDaily()
		triggerMonthly()
		triggerQuarterly()
	}, [ triggerDaily, triggerMonthly, triggerQuarterly ] )
	
	return <>
	
		<h1>Closed Ends</h1>
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
				<span style={ { flex: 1 } }>{ returns.total.ytd }</span>
				<span style={ { flex: 1 } }>{ returns.total.threemonths }</span>
				<span style={ { flex: 1 } }>{ returns.total.one }</span>
				<span style={ { flex: 1 } }>{ returns.annualized.three }</span>
				<span style={ { flex: 1 } }>{ returns.annualized.five }</span>
				<span style={ { flex: 1 } }>{ returns.annualized.ten }</span>
				<span style={ { flex: 1 } }>{ returns.annualized.inception }</span>
			</div> ) }
		</div>

	</>

}

export default ClosedEnds
