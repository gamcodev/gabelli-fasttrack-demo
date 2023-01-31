import PerfTypeButtons from '@/components/PerfTypeButtons'
import { responseToJson } from '@/hooks/fetcher'
import { getCookie } from 'cookies-next'
import { useEffect, useState } from 'react'
import useSWRMutation from 'swr/mutation'
// import { useFasttrackClosedEndPrices } from '../../hooks/FastTrackHooks'

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

	const { trigger, data, error } = useSWRMutation( 'https://ftl.fasttrack.net/v1/stats/xmulti', url => fetch( url, {
		method: 'POST',
		headers: { appid, token, 'Content-Type': 'application/json' },
		body: JSON.stringify( closedEndTickers ),
	} ).then( responseToJson ) )
	
	useEffect( () => { trigger() }, [ trigger ] )

	console.log(data);
	
	return <>
	
		<h1>Closed Ends</h1>
	
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
			{ data?.statslist.map( ( {
				ticker,
				describe,
				returns,
				// aux,
				// dteend,
				// dtestart,
				// risk,
				// err
			} ) => <div style={ { display: 'flex' } } key={ ticker }>
				<span style={ { flex: 1 } }>{ ticker }</span>
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

const parsePercentage = figure => ( parseFloat( figure ) * 100 ).toFixed( 2 ) + '%'
