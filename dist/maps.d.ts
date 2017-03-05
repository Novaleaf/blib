/// <reference types="googlemaps" />
import * as xlib from "xlib";
import Promise = xlib.promise.bluebird;
export declare function initialize(/**
         *  find/generate a key in the google cloud console, we generated from this link actually:  https://developers.google.com/maps/documentation/javascript/get-api-key
         * see this stackoverflow question for more details: http://stackoverflow.com/questions/35700182/apinotactivatedmaperror-for-simple-html-page-using-google-places-api/41898012#41898012
         */ mapsApiKey: string): Promise<string>;
/**
 *  wraps the AutoCompleteService class, described here: https://developers.google.com/maps/documentation/javascript/reference#AutocompleteService
 * @param request
 */
export declare function getAutocompletePlacePredictions(requestOptions: google.maps.places.AutocompletionRequest, retryAttempt?: number): Promise<google.maps.places.AutocompletePrediction[]>;
/**
 *  https://developers.google.com/maps/documentation/javascript/places#place_details
 * @param request
 * @param retryAttempt
 */
export declare function getPlaceDetails(request: google.maps.places.PlaceDetailsRequest, retryAttempt?: number): Promise<google.maps.places.PlaceResult | null>;
/**
 *  https://developers.google.com/maps/documentation/javascript/directions
 * @param request
 * @param retryAttempt
 */
export declare function getDirections(request: google.maps.DirectionsRequest, retryAttempt?: number): Promise<google.maps.DirectionsResult | null>;
