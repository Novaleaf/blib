"use strict";
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
;
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