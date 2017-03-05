//need the following ///reference line so that ambient @types .d.ts declarations get loaded.
/// <reference types="googlemaps" /> 
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const xlib = require("xlib");
const log = new xlib.logging.Logger(__filename);
var Promise = xlib.promise.bluebird;
var __ = xlib.lolo;
const jquery = require("jquery");
let _initializeCompletePromise;
function initialize(/**
         *  find/generate a key in the google cloud console, we generated from this link actually:  https://developers.google.com/maps/documentation/javascript/get-api-key
         * see this stackoverflow question for more details: http://stackoverflow.com/questions/35700182/apinotactivatedmaperror-for-simple-html-page-using-google-places-api/41898012#41898012
         */ mapsApiKey) {
    //log.warn("blib.maps.initialize()");
    if (_initializeCompletePromise != null) {
        //init already started, so no op;
        //log.warn("blib.maps.initialize() init already started, so no op;");
        return _initializeCompletePromise;
    }
    _initializeCompletePromise = new Promise((resolve, reject) => {
        const finalUrl = `https://maps.googleapis.com/maps/api/js?key=${mapsApiKey}&libraries=places`;
        jquery.getScript(finalUrl, (script, textStatus, jqXHR) => {
            //log.warn( "done loading maps script", { script, textStatus, jqXHR } );
            //_directionsService = new google.maps.DirectionsService();
            // _directionsService.route({
            //     origin: "chicago, il", //chicago //document.getElementById('start').value,
            //     destination: "oklahoma city, ok", //oklahoma city //document.getElementById('end').value,
            //     travelMode: 'DRIVING' as any
            // }, function (response, status) {
            // 	console.error("whut whut");
            //     if (status === google.maps.DirectionsStatus.OK) {
            //         console.log("directionsService call complete", { response, status });
            //     } else {
            //         window.alert('Directions request failed due to ' + status);
            //     }
            // });
            resolve(textStatus);
        });
        // jquery.ajax( {
        // 	url: finalUrl,
        // 	type: "GET",
        // 	dataType: "jsonp",
        // 	cache: false,
        // 	success: ( response ) => {
        // 		//log.warn("done loading maps script",response); 
        // 		resolve( response );
        // 	}
        // } );
        //resolve(undefined);
    });
    if (__.isDevCodeEnabled === true) {
        _initializeCompletePromise = _initializeCompletePromise.timeout(10 * 1000, new Error("mapsApi:  maps api script load timeout"));
    }
    return _initializeCompletePromise;
}
exports.initialize = initialize;
let _autocompleteService;
/**
 *  wraps the AutoCompleteService class, described here: https://developers.google.com/maps/documentation/javascript/reference#AutocompleteService
 * @param request
 */
function getAutocompletePlacePredictions(requestOptions, retryAttempt = 0) {
    log.errorAndThrowIfFalse(_initializeCompletePromise != null, "need to call maps.initialize() first");
    if (xlib.stringHelper.isNullOrEmpty(requestOptions.input) === true) {
        //no input, so no op
        return Promise.resolve([]);
    }
    return new Promise((resolve, reject) => {
        if (_initializeCompletePromise.isRejected() !== false) {
            log.assert(false, "script load failed!  investigate", { error: _initializeCompletePromise.reason() });
        }
        //make sure our scripts api is loaded first
        return _initializeCompletePromise.then(() => {
            let _callback = function (predictions, status) {
                //switch PlacesServiceStatus  from https://developers.google.com/maps/documentation/javascript/reference#AutocompleteService
                switch (status) {
                    case google.maps.places.PlacesServiceStatus.OK:
                        return resolve(predictions);
                    case google.maps.places.PlacesServiceStatus.ZERO_RESULTS:
                        return resolve([]);
                    case google.maps.places.PlacesServiceStatus.UNKNOWN_ERROR:
                        //try again
                        if (retryAttempt > 2) {
                            return reject(new Error(`${status}:The PlacesService request could not be processed due to a server error.  We retried 3 times and now give up.`));
                        }
                        else {
                            return Promise.delay(retryAttempt * 1000).then(() => { return getAutocompletePlacePredictions(requestOptions, retryAttempt + 1); });
                        }
                    case google.maps.places.PlacesServiceStatus.OVER_QUERY_LIMIT:
                        return reject(new Error(`${status}:The application has gone over its request quota.`));
                    case google.maps.places.PlacesServiceStatus.REQUEST_DENIED:
                        return reject(new Error(`${status}:The application is not allowed to use the PlacesService.`));
                    case google.maps.places.PlacesServiceStatus.INVALID_REQUEST:
                        return reject(new Error(`${status}:This request was invalid.`));
                    default:
                        return reject(new Error(`${status}:Unhandled status type.  please contact devs to investigate blib.mapsApi.getAutocompletePlacePredictions() and provide them this error message.`));
                }
            };
            if (_autocompleteService == null) {
                _autocompleteService = new google.maps.places.AutocompleteService();
            }
            _autocompleteService.getPlacePredictions(requestOptions, _callback);
            //_autocompleteService.getQueryPredictions(requestOptions, _callback);
        });
    }).catch((err) => {
        throw log.error("error in mapsApi.getAutocompletePlacePredictions()", { err, requestOptions, retryAttempt });
    });
}
exports.getAutocompletePlacePredictions = getAutocompletePlacePredictions;
let _placesService;
let _mapDiv;
/**
 *  https://developers.google.com/maps/documentation/javascript/places#place_details
 * @param request
 * @param retryAttempt
 */
function getPlaceDetails(request, retryAttempt = 0) {
    log.errorAndThrowIfFalse(_initializeCompletePromise != null, "need to call maps.initialize() first");
    if (xlib.stringHelper.isNullOrEmpty(request.placeId) === true) {
        //no input, so reject
        return Promise.reject(log.error("request.placeId not found", { request }));
    }
    return new Promise((resolve, reject) => {
        if (_initializeCompletePromise.isRejected() !== false) {
            log.assert(false, "script load failed!  investigate", { error: _initializeCompletePromise.reason() });
        }
        //make sure our scripts api is loaded first
        return _initializeCompletePromise.then(() => {
            let _callback = function (place, status) {
                //switch PlacesServiceStatus  from https://developers.google.com/maps/documentation/javascript/reference#AutocompleteService
                switch (status) {
                    case google.maps.places.PlacesServiceStatus.OK:
                        return resolve(place);
                    case google.maps.places.PlacesServiceStatus.ZERO_RESULTS:
                        return resolve(null);
                    case google.maps.places.PlacesServiceStatus.UNKNOWN_ERROR:
                        //try again
                        if (retryAttempt > 2) {
                            return reject(new Error(`${status}:The PlacesService request could not be processed due to a server error.  We retried 3 times and now give up.`));
                        }
                        else {
                            //retry with backoff
                            return Promise.delay(retryAttempt * 1000).then(() => { return getPlaceDetails(request, retryAttempt + 1); });
                        }
                    case google.maps.places.PlacesServiceStatus.OVER_QUERY_LIMIT:
                        return reject(new Error(`${status}:The application has gone over its request quota.`));
                    case google.maps.places.PlacesServiceStatus.REQUEST_DENIED:
                        return reject(new Error(`${status}:The application is not allowed to use the PlacesService.`));
                    case google.maps.places.PlacesServiceStatus.INVALID_REQUEST:
                        return reject(new Error(`${status}:This request was invalid.`));
                    default:
                        return reject(new Error(`${status}:Unhandled status type.  please contact devs to investigate blib.mapsApi.getPlaceDetails() and provide them this error message.`));
                }
            };
            if (_mapDiv == null) {
                _mapDiv = document.createElement("div");
                _mapDiv.id = "map";
                document.body.appendChild(_mapDiv);
                //var map = new google.maps.Map(_mapDiv, {
                //	center: { lat: -33.866, lng: 151.196 },
                //	zoom: 15
                //});
                //var infowindow = new google.maps.InfoWindow();
            }
            if (_placesService == null) {
                _placesService = new google.maps.places.PlacesService(_mapDiv);
            }
            _placesService.getDetails(request, _callback);
            //_autocompleteService.getQueryPredictions(requestOptions, _callback);
        });
    });
}
exports.getPlaceDetails = getPlaceDetails;
let _directionsService;
let _directionsDisplay;
/**
 *  https://developers.google.com/maps/documentation/javascript/directions
 * @param request
 * @param retryAttempt
 */
function getDirections(request, retryAttempt = 0) {
    log.errorAndThrowIfFalse(_initializeCompletePromise != null, "need to call maps.initialize() first");
    if (request == null || request.origin == null || request.origin == "" || request.destination == null || request.destination == "") {
        //no input, so reject
        return Promise.reject(log.error("request is missing origin and/or destination", { request }));
    }
    return new Promise((resolve, reject) => {
        if (_initializeCompletePromise.isRejected() !== false) {
            log.assert(false, "script load failed!  investigate", { error: _initializeCompletePromise.reason() });
        }
        //make sure our scripts api is loaded first
        return _initializeCompletePromise.then(() => {
            ////////////////////////  EXAMPLE, WORKS
            // _directionsService = new google.maps.DirectionsService();
            // _directionsService.route( {
            // 	origin: "chicago, il", //chicago //document.getElementById('start').value,
            // 	destination: "oklahoma city, ok", //oklahoma city //document.getElementById('end').value,
            // 	travelMode: 'DRIVING' as any
            // }, function ( response, status ) {
            // 	console.error( "whut whut" );
            // 	if ( status === google.maps.DirectionsStatus.OK ) {
            // 		console.log( "directionsService call complete", { response, status } );
            // 	} else {
            // 		window.alert( 'Directions request failed due to ' + status );
            // 	}
            // 	resolve( response );
            // } );
            //////////////  BETWEEN SCRATCH
            // request = {
            // 	origin: "chicago, il", //chicago //document.getElementById('start').value,
            // 	destination: "oklahoma city, ok", //oklahoma city //document.getElementById('end').value,
            // 	travelMode: 'DRIVING' as any
            // };
            let _callback = function (result, status) {
                //switch PlacesServiceStatus  from https://developers.google.com/maps/documentation/javascript/reference#AutocompleteService
                switch (status) {
                    case google.maps.DirectionsStatus.OK:
                        return resolve({ result, status });
                    case google.maps.DirectionsStatus.ZERO_RESULTS:
                    case google.maps.DirectionsStatus.NOT_FOUND:
                        return resolve({ result, status });
                    case google.maps.DirectionsStatus.UNKNOWN_ERROR:
                        //try again
                        if (retryAttempt > 2) {
                            return reject(new Error(`${status}:The maps DirectionsService request could not be processed due to a server error.  We retried 3 times and now give up.`));
                        }
                        else {
                            //retry with backoff
                            return Promise.delay(retryAttempt * 1000).then(() => { return getDirections(request, retryAttempt + 1); });
                        }
                    case google.maps.DirectionsStatus.OVER_QUERY_LIMIT:
                        return reject(new Error(`${status}:The application has gone over its request quota.`));
                    case google.maps.DirectionsStatus.REQUEST_DENIED:
                        return reject(new Error(`${status}:The application is not allowed to use the DirectionsService.`));
                    case google.maps.DirectionsStatus.INVALID_REQUEST:
                        return reject(new Error(`${status}:This request was invalid.`));
                    default:
                        return reject(new Error(`${status}:Unhandled status type.  please contact devs to investigate blib.mapsApi.getDirections() and provide them this error message.`));
                }
                // console.error( "whut whut" );
                // if ( status === google.maps.DirectionsStatus.OK ) {
                // 	console.log( "directionsService call complete", { result, status } );
                // } else {
                // 	window.alert( 'Directions request failed due to ' + status );
                // }
                // resolve( result );
            };
            if (_directionsService == null) {
                _directionsService = new google.maps.DirectionsService();
            }
            _directionsService.route(request, _callback);
            // // // let _callback = function ( result: google.maps.DirectionsResult, status: google.maps.DirectionsStatus ) {
            // // // 	//switch PlacesServiceStatus  from https://developers.google.com/maps/documentation/javascript/reference#AutocompleteService
            // // // 	switch ( status ) {
            // // // 		case google.maps.DirectionsStatus.OK:
            // // // 			return resolve( result );
            // // // 		// case google.maps.DirectionsStatus.ZERO_RESULTS:
            // // // 		// 	return resolve( null );
            // // // 		// case google.maps.places.PlacesServiceStatus.UNKNOWN_ERROR:
            // // // 		// 	//try again
            // // // 		// 	if ( retryAttempt > 2 ) {
            // // // 		// 		return reject( new Error( `${ status }:The PlacesService request could not be processed due to a server error.  We retried 3 times and now give up.` ) );
            // // // 		// 	} else {
            // // // 		// 		//retry with backoff
            // // // 		// 		return Promise.delay( retryAttempt * 1000 ).then(() => { return getPlaceDetails( request, retryAttempt + 1 ); });
            // // // 		// 	}
            // // // 		// case google.maps.places.PlacesServiceStatus.OVER_QUERY_LIMIT:
            // // // 		// 	return reject( new Error( `${ status }:The application has gone over its request quota.` ) );
            // // // 		// case google.maps.places.PlacesServiceStatus.REQUEST_DENIED:
            // // // 		// 	return reject( new Error( `${ status }:The application is not allowed to use the PlacesService.` ) );
            // // // 		// case google.maps.places.PlacesServiceStatus.INVALID_REQUEST:
            // // // 		// 	return reject( new Error( `${ status }:This request was invalid.` ) );
            // // // 		default:
            // // // 			return reject( new Error( `${ status }:Unhandled status type.  please contact devs to investigate blib.mapsApi.getDirections() and provide them this error message.` ) );
            // // // 	}
            // // // }
            // // // // if ( _mapDiv == null ) {
            // // // // 	_mapDiv = document.createElement( "div" );
            // // // // 	_mapDiv.id = "map";
            // // // // 	document.body.appendChild( _mapDiv );
            // // // // 	//var map = new google.maps.Map(_mapDiv, {
            // // // // 	//	center: { lat: -33.866, lng: 151.196 },
            // // // // 	//	zoom: 15
            // // // // 	//});
            // // // // 	//var infowindow = new google.maps.InfoWindow();
            // // // // }
            // // // // if ( _directionsDisplay == null ) {
            // // // // 	_directionsDisplay = new google.maps.DirectionsRenderer();
            // // // // }
            /////////////////////////////////////////////////////////////////////////////////////////////////
            ////////////  CODE, DOES NOT WORK
            // // // let _callback = function ( result: google.maps.DirectionsResult, status: google.maps.DirectionsStatus ) {
            // // // 	//switch PlacesServiceStatus  from https://developers.google.com/maps/documentation/javascript/reference#AutocompleteService
            // // // 	switch ( status ) {
            // // // 		case google.maps.DirectionsStatus.OK:
            // // // 			return resolve( result );
            // // // 		// case google.maps.DirectionsStatus.ZERO_RESULTS:
            // // // 		// 	return resolve( null );
            // // // 		// case google.maps.places.PlacesServiceStatus.UNKNOWN_ERROR:
            // // // 		// 	//try again
            // // // 		// 	if ( retryAttempt > 2 ) {
            // // // 		// 		return reject( new Error( `${ status }:The PlacesService request could not be processed due to a server error.  We retried 3 times and now give up.` ) );
            // // // 		// 	} else {
            // // // 		// 		//retry with backoff
            // // // 		// 		return Promise.delay( retryAttempt * 1000 ).then(() => { return getPlaceDetails( request, retryAttempt + 1 ); });
            // // // 		// 	}
            // // // 		// case google.maps.places.PlacesServiceStatus.OVER_QUERY_LIMIT:
            // // // 		// 	return reject( new Error( `${ status }:The application has gone over its request quota.` ) );
            // // // 		// case google.maps.places.PlacesServiceStatus.REQUEST_DENIED:
            // // // 		// 	return reject( new Error( `${ status }:The application is not allowed to use the PlacesService.` ) );
            // // // 		// case google.maps.places.PlacesServiceStatus.INVALID_REQUEST:
            // // // 		// 	return reject( new Error( `${ status }:This request was invalid.` ) );
            // // // 		default:
            // // // 			return reject( new Error( `${ status }:Unhandled status type.  please contact devs to investigate blib.mapsApi.getDirections() and provide them this error message.` ) );
            // // // 	}
            // // // }
            // // // // if ( _mapDiv == null ) {
            // // // // 	_mapDiv = document.createElement( "div" );
            // // // // 	_mapDiv.id = "map";
            // // // // 	document.body.appendChild( _mapDiv );
            // // // // 	//var map = new google.maps.Map(_mapDiv, {
            // // // // 	//	center: { lat: -33.866, lng: 151.196 },
            // // // // 	//	zoom: 15
            // // // // 	//});
            // // // // 	//var infowindow = new google.maps.InfoWindow();
            // // // // }
            // // // if ( _directionsService == null ) {
            // // // 	_directionsService = new google.maps.DirectionsService();
            // // // }
            // // // // if ( _directionsDisplay == null ) {
            // // // // 	_directionsDisplay = new google.maps.DirectionsRenderer();
            // // // // }
            // // // _directionsService.route( request, _callback );
            // // // //_autocompleteService.getQueryPredictions(requestOptions, _callback);
        });
    });
}
exports.getDirections = getDirections;
//# sourceMappingURL=maps.js.map