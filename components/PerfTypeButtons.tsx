const PerfTypeButtons = ( { perfType, setPerfType } ) => <div style={ { display: 'flex', flexFlow: 'row nowrap' } }>
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

export default PerfTypeButtons
