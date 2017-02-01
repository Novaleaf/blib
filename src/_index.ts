


import * as xlib from "xlib";
export { xlib };
import _ = xlib.lodash;

const log = new xlib.logging.Logger( __filename );


import Promise = xlib.promise.bluebird;

import __ = xlib.lolo;

export import jquery = require( "jquery" );
/** setup jquery globals, if not already set */
if ( xlib.environment.getGlobal()[ "$" ] == null ) {
	xlib.environment.getGlobal()[ "$" ] = jquery;
}
if ( xlib.environment.getGlobal()[ "jQuery" ] == null ) {
	xlib.environment.getGlobal()[ "jQuery" ] = jquery;
}



export import reactEco = require("./react-eco/_index");

export import maps = require("./maps");


// import 'bootstrap/dist/css/bootstrap.css';



/** easy cookie query and manipulation.  https://www.npmjs.com/package/js-cookie */
export import Cookie = require( "js-cookie" );

declare const ga: any;
/**
 * if you have google analytics installed, this allows you to call it.  if ga isn't installed, any calls to this are nooped
 */
export var googleAnalytics: any = <any>function ( ...args: any[] ) {
	if ( typeof ga === "undefined" ) {
		return;
	}
	return ga.apply( ga, args );
}

/**
 * helper for SPA's to record a pagehit, using the pathname+hash as the page id.
 */
export function ga_ezSpaPageHit() {
	//send page hit
	let spaId = document.location.pathname + xlib.stringHelper.removeAfter( document.location.hash, "?" );
	googleAnalytics( "set", "page", spaId );
	googleAnalytics( "send", "pageview" );
}


