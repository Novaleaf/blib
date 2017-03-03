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
    if (_initializeCompletePromise != null) {
        //init already started, so no op;
        return _initializeCompletePromise;
    }
    _initializeCompletePromise = new Promise((resolve, reject) => {
        jquery.getScript(`https://maps.googleapis.com/maps/api/js?key=${mapsApiKey}&libraries=places`, (script, textStatus, jqXHR) => {
            //log.warn("done loading maps script", { script, textStatus, jqXHR });
            resolve(textStatus);
        });
    });
    if (__.isDevCodeEnabled === true) {
        _initializeCompletePromise = _initializeCompletePromise.timeout(10 * 1000, new Error("mapsApi:  maps api script load timeout"));
    }
    return _initializeCompletePromise;
}
exports.initialize = initialize;
//&callback=initService
// // // // // /**
// // // // //  *  google api's
// // // // //  */
// // // // // export declare namespace google {
// // // // // 	export namespace maps {
// // // // // 		export class Map {
// // // // // 			constructor( map: HTMLElement, options?: { center?: { lat: number, lng: number }; zoom?: number; });
// // // // // 		}
// // // // // 		export class InfoWindow { }
// // // // // 		export namespace places {
// // // // // 			export const PlacesServiceStatus: {
// // // // // 				OK: string
// // // // // 				ZERO_RESULTS: string;
// // // // // 				UNKNOWN_ERROR: string;
// // // // // 				OVER_QUERY_LIMIT: string;
// // // // // 				REQUEST_DENIED: string;
// // // // // 				INVALID_REQUEST: string;
// // // // // 			};
// // // // // 			export interface IPredictionResult {
// // // // // 				description: string;
// // // // // 				id: string;
// // // // // 				matched_substrings: { length: number; offset: number; }[];
// // // // // 				place_id: string;
// // // // // 				terms: { offset: number; value: string; }[];
// // // // // 			}
// // // // // 			export interface IPlacePredictionRequestOptions {
// // // // // 				input: string;
// // // // // 				componentRestrictions?: {
// // // // // 					/**Restricts predictions to the specified country (ISO 3166-1 Alpha-2 country code, case insensitive). 
// // // // // 					E.g., us, br, au.  can see listing here: https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2 */
// // // // // 					country?: string
// // // // // 				};
// // // // // 				/** The types of predictions to be returned. Four types are supported: 'establishment' for businesses, 
// // // // // 				'geocode' for addresses, '(regions)' for administrative regions and '(cities)' for localities. If nothing is specified, all types are returned.*/
// // // // // 				types?: string[];
// // // // // 			}
// // // // // 			export class AutocompleteService {
// // // // // 				public getPlacePredictions( requestOptions: IPlacePredictionRequestOptions, callback: ( predictions: IPredictionResult[], status: string ) => void ): void;
// // // // // 			}
// // // // // 			/** examples: 
// // // // // 						"address_components" : [
// // // // // 		{
// // // // // 		   "long_name" : "1600",
// // // // // 		   "short_name" : "1600",
// // // // // 		   "types" : [ "street_number" ]
// // // // // 		},
// // // // // 		{
// // // // // 		   "long_name" : "Amphitheatre Pkwy",
// // // // // 		   "short_name" : "Amphitheatre Pkwy",
// // // // // 		   "types" : [ "route" ]
// // // // // 		},
// // // // // 		{
// // // // // 		   "long_name" : "Mountain View",
// // // // // 		   "short_name" : "Mountain View",
// // // // // 		   "types" : [ "locality", "political" ]
// // // // // 		},
// // // // // 		{
// // // // // 		   "long_name" : "Santa Clara County",
// // // // // 		   "short_name" : "Santa Clara County",
// // // // // 		   "types" : [ "administrative_area_level_2", "political" ]
// // // // // 		},
// // // // // 		{
// // // // // 		   "long_name" : "California",
// // // // // 		   "short_name" : "CA",
// // // // // 		   "types" : [ "administrative_area_level_1", "political" ]
// // // // // 		},
// // // // // 		{
// // // // // 		   "long_name" : "United States",
// // // // // 		   "short_name" : "US",
// // // // // 		   "types" : [ "country", "political" ]
// // // // // 		},
// // // // // 		{
// // // // // 		   "long_name" : "94043",
// // // // // 		   "short_name" : "94043",
// // // // // 		   "types" : [ "postal_code" ]
// // // // // 		}*/
// // // // // 			export interface IGeocoderAddressComponent {
// // // // // 				/**
// // // // // 				Type: string
// // // // // The full text of the address component*/
// // // // // 				long_name: string;
// // // // // 					/**
// // // // // 				Type: string
// // // // // 				The abbreviated, short text of the given address component*/short_name: string;
// // // // // 				/**
// // // // // 				Type: Array < string >
// // // // // 					An array of strings denoting the type of this address component.A list of valid types can be found here: https://developers.google.com/maps/documentation/geocoding/start#Types
// // // // // 				*/
// // // // // 				types: string[];
// // // // // 			}
// // // // // 			export interface IPlaceAspectRating { }
// // // // // 			export interface IPlaceGeometry { }
// // // // // 			export interface IPlacePhoto { }
// // // // // 			export interface IPlaceReview { }
// // // // // 			export interface IPlace {
// // // // // 				/**
// // // // // Type:  Array<GeocoderAddressComponent>
// // // // // The collection of address components for this Place's location.*/
// // // // // 				address_components: IGeocoderAddressComponent[];
// // // // // 				/**
// // // // // Type:  Array<PlaceAspectRating>
// // // // // The rated aspects of this Place, based on Google and Zagat user reviews. The ratings are on a scale of 0 to 30.*/
// // // // // 				aspects: IPlaceAspectRating[];
// // // // // 				/**
// // // // // Type:  string
// // // // // The Place's full address.*/
// // // // // 				formatted_address: string;
// // // // // 				/**
// // // // // Type:  string
// // // // // The Place's phone number, formatted according to the number's regional convention.*/
// // // // // 				formatted_phone_number: string;
// // // // // 				/**
// // // // // Type:  PlaceGeometry
// // // // // The Place's geometry-related information.*/
// // // // // 				geometry: IPlaceGeometry;
// // // // // 				/**
// // // // // Type:  Array<string>
// // // // // Attribution text to be displayed for this Place result.*/
// // // // // 				html_attributions: string[];
// // // // // 				/**
// // // // // Type:  string
// // // // // URL to an image resource that can be used to represent this Place's category.*/
// // // // // 				icon: string;
// // // // // 				/**
// // // // // Type:  string
// // // // // The Place's phone number in international format. International format includes the country code, and is prefixed with the plus (+) sign.*/
// // // // // 				international_phone_number: string;
// // // // // 				/**
// // // // // Type:  string
// // // // // The Place's name. Note: In the case of user entered Places, this is the raw text, as typed by the user. Please exercise caution when using this data, as malicious users may try to use it as a vector for code injection attacks (See http://en.wikipedia.org/wiki/Code_injection).*/
// // // // // 				name: string;
// // // // // 				/**
// // // // // Type:  boolean
// // // // // A flag indicating whether the Place is permanently closed. If the place is not permanently closed, the flag is not present in search or details responses.*/
// // // // // 				permanently_closed: boolean;
// // // // // 				/**
// // // // // Type:  Array<PlacePhoto>
// // // // // Photos of this Place. The collection will contain up to ten PlacePhoto objects.*/
// // // // // 				photos: IPlacePhoto[];
// // // // // 				/**
// // // // // Type:  string
// // // // // A unique identifier for a place.*/
// // // // // 				place_id: string;
// // // // // 				/**
// // // // // Type:  number
// // // // // The price level of the Place, on a scale of 0 to 4. Price levels are interpreted as follows:
// // // // // 0: Free
// // // // // 1: Inexpensive
// // // // // 2: Moderate
// // // // // 3: Expensive
// // // // // 4: Very Expensive*/
// // // // // 				price_level: number;
// // // // // 				/**
// // // // // Type:  number
// // // // // A rating, between 1.0 to 5.0, based on user reviews of this Place.*/
// // // // // 				rating: number;
// // // // // 				/**
// // // // // Type:  Array<PlaceReview>
// // // // // A list of reviews of this Place.*/
// // // // // 				reviews: IPlaceReview[];
// // // // // 				/**
// // // // // Type:  Array<string>
// // // // // An array of types for this Place (e.g., ["political", "locality"] or ["restaurant", "establishment"]).*/
// // // // // 				types: string[];
// // // // // 				/**
// // // // // Type:  string
// // // // // URL of the official Google page for this place. This is the Google-owned page that contains the best available information about the place.*/
// // // // // 				url: string;
// // // // // 				/**
// // // // // Type:  number
// // // // // The offset from UTC of the Place's current timezone, in minutes. For example, Sydney, Australia in daylight savings is 11 hours ahead of UTC, so the utc_offset will be 660. For timezones behind UTC, the offset is negative. For example, utc_offest is -60 for Cape Verde.*/
// // // // // 				utc_offset: number;
// // // // // 				/**
// // // // // Type:  string
// // // // // A fragment of the Place's address for disambiguation (usually street name and locality).*/
// // // // // 				vicinity: string;
// // // // // 				/**
// // // // // Type:  string
// // // // // The authoritative website for this Place, such as a business' homepage.*/
// // // // // 				website: string;
// // // // // 			}
// // // // // 			/**
// // // // // 			 *  https://developers.google.com/maps/documentation/javascript/places#place_details
// // // // // 			 */
// // // // // 			export class PlacesService {
// // // // // 				constructor( map: HTMLElement );
// // // // // 				public getDetails( request: { placeId: string }, callback: ( place: IPlace, status: string ) => void ): void;
// // // // // 			}
// // // // // 		}
// // // // // 	}
// // // // // };
let _autocompleteService;
let _placesService;
let _mapDiv;
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
//# sourceMappingURL=maps.js.map