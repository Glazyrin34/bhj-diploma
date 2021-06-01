'use strict'

/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
function createRequest ( options = {}, callback ) {
    
    if ( !options.body && !( options.URL == '/user/logout' )) return;

    let URL = options.URL;

    if ( options.method == 'GET' && options.body ) {
        URL += encodeURL( options.body );
        delete options.body;
        delete options.URL;
    }

    fetch( URL, options )
    .then( response => response.json() )
    .then( data => callback( data ))
    .catch( error => console.log( error ));
}

function encodeURL ( data ) {
    return '?' + Object.entries( data )
    .map(([ key, value ]) => `${ key }=${ value }` )
    .join( '&' );
}