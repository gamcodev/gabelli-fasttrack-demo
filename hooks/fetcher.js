export const responseToJson = response => response.json();

export const fetchUrl = url => fetch( url, { credentials: 'include' } ).then( responseToJson );

// As many fetches at a time as you like - SWR doesn't care! But... Promise.all() kinda sucks...
// ...it collects promises into an array, NOT an object with useful keys
export const fetcher = ( ...urls ) => urls.length > 1 ? Promise.all( urls.map( fetchUrl ) ) : fetchUrl( urls );

// Maybe even a fetcher like this?

// export const fetcher = ( payload = null, ...urls ) => {
// 	const options = {
// 		method: payload ? 'POST' : 'GET',
// 		...( payload && { body: payload } ),
// 		headers: {
// 			'Access-Control-Allow-Origin': '*',
// 			'Accept': 'application/json',
// 			'Content-Type': 'application/json'
// 		}
// 	};
// 	return urls.length > 1 ? Promise.all( urls.map( url => fetch( url, options ).then( responseToJson ) ) ) : fetch( urls, options ).then( responseToJson );
// 	// return fetch( url, options ).then( responseToJson );
// };

export const headers = {
	'Access-Control-Allow-Origin': '*',
	'Accept': 'application/json',
	'Content-Type': 'application/json'
};
