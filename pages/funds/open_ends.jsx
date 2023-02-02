// import PerfTypeButtons from '../../components/PerfTypeButtons'
import { responseToJson } from '../../hooks/fetcher'
import { getCookie } from 'cookies-next'
import { useEffect } from 'react'
import useSWRMutation from 'swr/mutation'
import Link from 'next/link'
import { parsePercentage } from '../../utilities'

const openEndTickers = {
	"GABUX":	"Gabelli Utilities @ AAA",
	"GAUAX":	"Gabelli Utilities Fund A",
	"GUXPX":	"Gabelli Utilities Fund C",
	"GAUCX":	"Gabelli Utilities Fund C1",
	"GAUIX":	"Gabelli Utilities Fund I",
	"GABAX":	"Gabelli Asset Fund @ AAA",
	"GATAX":	"Gabelli Asset Fund A",
	"GATCX":	"Gabelli Asset Fund C",
	"GABIX":	"Gabelli Asset Fund I",
	"GABEX":	"Gabelli Equity Income Fund @ AAA",
	"GCIEX":	"Gabelli Equity Income Fund I",
	"GCAEX":	"Gabelli Equity Income Fund A",
	"GCCEX":	"Gabelli Equity Income Fund C",
	"GABSX":	"Gabelli Small Cap Growth @ AAA",
	"GACIX":	"Gabelli Small Cap Growth I",
	"GCASX":	"Gabelli Small Cap Growth A",
	"GCCSX":	"Gabelli Small Cap Growth C",
	"GWSVX":	"Gabelli Focused Growth and Income Fund @ AAA",
	"GWSAX":	"Gabelli Focused Growth and Income Fund A",
	"GWSCX":	"Gabelli Focused Growth and Income Fund C",
	"GWSIX":	"Gabelli Focused Growth and Income Fund I",
	"GABTX":	"Gabelli Global Content & Connectivity @ AAA",
	"GTTIX":	"Gabelli Global Content & Connectivity I",
	"GTCAX":	"Gabelli Global Content & Connectivity A",
	"GTCCX":	"Gabelli Global Content & Connectivity C",
	"GABOX":	"Gabelli International Small Cap Fund @ AAA",
	"GLOIX":	"Gabelli International Small Cap Fund I",
	"GOCAX":	"Gabelli International Small Cap Fund A",
	"GGLCX":	"Gabelli International Small Cap Fund C",
	"GABGX":	"Gabelli Growth Fund @ AAA",
	"GGCAX":	"Gabelli Growth Fund A",
	"GGCCX":	"Gabelli Growth Fund C",
	"GGCIX":	"Gabelli Growth Fund I",
	"GICPX":	"Gabelli Global Growth Fund @ AAA",
	"GGGAX":	"Gabelli Global Growth Fund A",
	"GGGCX":	"Gabelli Global Growth Fund C",
	"GGGIX":	"Gabelli Global Growth Fund I",
	"GVCAX":	"Gabelli Value 25 Fund @ AAA",
	"GABVX":	"Gabelli Value 25 Fund A",
	"GVCCX":	"Gabelli Value 25 Fund C",
	"GVCIX":	"Gabelli Value 25 Fund I",
	"GIGRX":	"Gabelli Intl Growth Fund @ AAA",
	"GAIGX":	"Gabelli Intl Growth Fund A",
	"GCIGX":	"Gabelli Intl Growth Fund C",
	"GIIGX":	"Gabelli Intl Growth Fund I",
	"GABBX":	"Gabelli Dividend Growth @ AAA",
	"GBCAX":	"Gabelli Dividend Growth A",
	"GBCCX":	"Gabelli Dividend Growth C",
	"GBCIX":	"Gabelli Dividend Growth I",
	"GABCX":	"Gabelli ABC Fund @ AAA",
	"GADVX":	"Gabelli ABC Fund ADV",
	"GAGCX":	"Gabelli Gl Rising Inc & Div @ AAA",
	"GAGAX":	"Gabelli Gl Rising Inc & Div A",
	"GACCX":	"Gabelli Gl Rising Inc & Div C",
	"GAGIX":	"Gabelli Gl Rising Inc & Div I",
	// "ANNUITY":	"Gabelli Capital Asset Fund",
	"GOLDX":	"Gabelli Gold Fund @ AAA",
	"GLDAX":	"Gabelli Gold Fund A",
	"GLDCX":	"Gabelli Gold Fund C",
	"GLDIX":	"Gabelli Gold Fund I",
	"ESGGX":	"Gabelli ESG Fund @ AAA",
	"ESGHX":	"Gabelli ESG Fund A",
	"ESGJX":	"Gabelli ESG Fund C",
	"ESGKX":	"Gabelli ESG Fund I",
	"EAAAX":	"Gabelli Enterprise M&A @ AAA",
	"EMAAX":	"Gabelli Enterprise M&A A",
	"EMACX":	"Gabelli Enterprise M&A C",
	"EMAYX":	"Gabelli Enterprise M&A Y",
	"MLGLX":	"Gabelli Media Mogul Fund A",
	"MOGLX":	"Gabelli Media Mogul Fund I",
	"PETZX":	"Gabelli Pet Parents Fund A",
	"PETZX":	"Gabelli Pet Parents Fund I",
	"GAMNX":	"Gabelli Gl Mini Mites Fund @ AAA",
	"GMNAX":	"Gabelli Gl Mini Mites Fund A ",
	"GMNCX":	"Gabelli Gl Mini Mites Fund C",
	"GGMMX":	"Gabelli Gl Mini Mites Fund I",
	"GAFSX":	"Gabelli Gl Financial Services Fund @ AAA",
	"GGFSX":	"Gabelli Gl Financial Services Fund A",
	"GCFSX":	"Gabelli Gl Financial Services Fund C",
	"GFSIX":	"Gabelli Gl Financial Services Fund I",
	"COMVX":	"Comstock Cap Value Fund @ AAA",
	"DRCVX":	"Comstock Cap Value Fund A",
	"CPCCX":	"Comstock Cap Value Fund C",
	"CPCRX":	"Comstock Cap Value Fund I",
}

const OpenEnds = () => {

	const appid = getCookie( 'fasttrack-appid' ),
		token = getCookie( 'fasttrack-token' )

	// const [ perfType, setPerfType ] = useState( 'daily' )

	const { trigger, data, error } = useSWRMutation( 'https://ftl.fasttrack.net/v1/stats/xmulti?unadj=1', url => fetch( url, {
		method: 'POST',
		headers: { appid, token, 'Content-Type': 'application/json' },
		body: JSON.stringify( Object.keys( openEndTickers ) ),
	} ).then( responseToJson ) )
	
	useEffect( () => { trigger() }, [ trigger ] )
	
	return <>
	
		<h1>Open Ends</h1>
	
		{/* <PerfTypeButtons
			perfType={ perfType }
			setPerfType={ setPerfType }
		/> */}

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

export default OpenEnds
