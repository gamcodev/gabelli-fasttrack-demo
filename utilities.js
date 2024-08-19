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
