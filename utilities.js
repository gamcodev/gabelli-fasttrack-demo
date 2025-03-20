export const parsePercentage = figure => ( parseFloat( figure ) * 100 ).toFixed( 2 ) + '%'

export const parseFastTrackReturns = returns => { 
	return {
		ytd: returns?.total?.ytd < -101 ? '—' : returns?.total?.ytd,
		threemonths: returns?.total?.threemonths < -101 ? '—' : returns?.total?.threemonths,
		one: returns?.total?.one < -101 ? '—' : returns?.total?.one,
		three: returns?.annualized?.three < -101 ? '—' : returns?.annualized?.three,
		five: returns?.annualized?.five < -101 ? '—' : returns?.annualized?.five,
		ten: returns?.annualized?.ten < -101 ? '—' : returns?.annualized?.ten,
		inception: returns?.annualized?.inception < -101 ? '—' : returns?.annualized?.inception,
	};
};

export const toCsv = ( arrayOfRows, columnsToInclude = Object.keys( arrayOfRows[ 0 ] ) ) => {
	return [ columnsToInclude.join(), ...arrayOfRows.map( row => columnsToInclude.map( column => row[ column ] ? `"${ row[ column ] }"` : '' ).join() ) ].join( '\n' );
};

export const downloadAsCsv = ( arrayOfRowsToConvert, columnsToInclude ) => {
	const element = document.createElement( 'a' );
	element.setAttribute( 'href', 'data:text/csv;charset=UTF-8,' + encodeURIComponent( toCsv( arrayOfRowsToConvert, columnsToInclude ) ) );
	element.setAttribute( 'download', `gabellifasttrackdemo-perfs-${ new Date().toISOString().split( 'T' )[ 0 ] }.csv` );
	element.style.display = 'none';
	document.body.appendChild( element );
	element.click();
	document.body.removeChild( element );
};
