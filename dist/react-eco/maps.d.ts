import * as xlib from "xlib";
import Promise = xlib.promise.bluebird;
export declare function initialize(/**
         *  find/generate a key in the google cloud console, we generated from this link actually:  https://developers.google.com/maps/documentation/javascript/get-api-key
         * see this stackoverflow question for more details: http://stackoverflow.com/questions/35700182/apinotactivatedmaperror-for-simple-html-page-using-google-places-api/41898012#41898012
         */ mapsApiKey: string): Promise<string>;
/**
 *  google api's
 */
export declare namespace google {
    namespace maps {
        class Map {
            constructor(map: HTMLElement, options?: {
                center?: {
                    lat: number;
                    lng: number;
                };
                zoom?: number;
            });
        }
        class InfoWindow {
        }
        namespace places {
            const PlacesServiceStatus: {
                OK: string;
                ZERO_RESULTS: string;
                UNKNOWN_ERROR: string;
                OVER_QUERY_LIMIT: string;
                REQUEST_DENIED: string;
                INVALID_REQUEST: string;
            };
            interface IPredictionResult {
                description: string;
                id: string;
                matched_substrings: {
                    length: number;
                    offset: number;
                }[];
                place_id: string;
                terms: {
                    offset: number;
                    value: string;
                }[];
            }
            interface IPlacePredictionRequestOptions {
                input: string;
                componentRestrictions?: {
                    /**Restricts predictions to the specified country (ISO 3166-1 Alpha-2 country code, case insensitive).
                    E.g., us, br, au.  can see listing here: https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2 */
                    country?: string;
                };
                /** The types of predictions to be returned. Four types are supported: 'establishment' for businesses,
                'geocode' for addresses, '(regions)' for administrative regions and '(cities)' for localities. If nothing is specified, all types are returned.*/
                types?: string[];
            }
            class AutocompleteService {
                getPlacePredictions(requestOptions: IPlacePredictionRequestOptions, callback: (predictions: IPredictionResult[], status: string) => void): void;
            }
            /** examples:
                        "address_components" : [
        {
           "long_name" : "1600",
           "short_name" : "1600",
           "types" : [ "street_number" ]
        },
        {
           "long_name" : "Amphitheatre Pkwy",
           "short_name" : "Amphitheatre Pkwy",
           "types" : [ "route" ]
        },
        {
           "long_name" : "Mountain View",
           "short_name" : "Mountain View",
           "types" : [ "locality", "political" ]
        },
        {
           "long_name" : "Santa Clara County",
           "short_name" : "Santa Clara County",
           "types" : [ "administrative_area_level_2", "political" ]
        },
        {
           "long_name" : "California",
           "short_name" : "CA",
           "types" : [ "administrative_area_level_1", "political" ]
        },
        {
           "long_name" : "United States",
           "short_name" : "US",
           "types" : [ "country", "political" ]
        },
        {
           "long_name" : "94043",
           "short_name" : "94043",
           "types" : [ "postal_code" ]
        }*/
            interface IGeocoderAddressComponent {
                /**
                Type: string
The full text of the address component*/
                long_name: string;
                /**
            Type: string
            The abbreviated, short text of the given address component*/ short_name: string;
                /**
                Type: Array < string >
                    An array of strings denoting the type of this address component.A list of valid types can be found here: https://developers.google.com/maps/documentation/geocoding/start#Types
            
                */
                types: string[];
            }
            interface IPlaceAspectRating {
            }
            interface IPlaceGeometry {
            }
            interface IPlacePhoto {
            }
            interface IPlaceReview {
            }
            interface IPlace {
                /**
Type:  Array<GeocoderAddressComponent>
The collection of address components for this Place's location.*/
                address_components: IGeocoderAddressComponent[];
                /**
Type:  Array<PlaceAspectRating>
The rated aspects of this Place, based on Google and Zagat user reviews. The ratings are on a scale of 0 to 30.*/
                aspects: IPlaceAspectRating[];
                /**
Type:  string
The Place's full address.*/
                formatted_address: string;
                /**
Type:  string
The Place's phone number, formatted according to the number's regional convention.*/
                formatted_phone_number: string;
                /**
Type:  PlaceGeometry
The Place's geometry-related information.*/
                geometry: IPlaceGeometry;
                /**
Type:  Array<string>
Attribution text to be displayed for this Place result.*/
                html_attributions: string[];
                /**
Type:  string
URL to an image resource that can be used to represent this Place's category.*/
                icon: string;
                /**
Type:  string
The Place's phone number in international format. International format includes the country code, and is prefixed with the plus (+) sign.*/
                international_phone_number: string;
                /**
Type:  string
The Place's name. Note: In the case of user entered Places, this is the raw text, as typed by the user. Please exercise caution when using this data, as malicious users may try to use it as a vector for code injection attacks (See http://en.wikipedia.org/wiki/Code_injection).*/
                name: string;
                /**
Type:  boolean
A flag indicating whether the Place is permanently closed. If the place is not permanently closed, the flag is not present in search or details responses.*/
                permanently_closed: boolean;
                /**
Type:  Array<PlacePhoto>
Photos of this Place. The collection will contain up to ten PlacePhoto objects.*/
                photos: IPlacePhoto[];
                /**
Type:  string
A unique identifier for a place.*/
                place_id: string;
                /**
Type:  number
The price level of the Place, on a scale of 0 to 4. Price levels are interpreted as follows:
0: Free
1: Inexpensive
2: Moderate
3: Expensive
4: Very Expensive*/
                price_level: number;
                /**
Type:  number
A rating, between 1.0 to 5.0, based on user reviews of this Place.*/
                rating: number;
                /**
Type:  Array<PlaceReview>
A list of reviews of this Place.*/
                reviews: IPlaceReview[];
                /**
Type:  Array<string>
An array of types for this Place (e.g., ["political", "locality"] or ["restaurant", "establishment"]).*/
                types: string[];
                /**
Type:  string
URL of the official Google page for this place. This is the Google-owned page that contains the best available information about the place.*/
                url: string;
                /**
Type:  number
The offset from UTC of the Place's current timezone, in minutes. For example, Sydney, Australia in daylight savings is 11 hours ahead of UTC, so the utc_offset will be 660. For timezones behind UTC, the offset is negative. For example, utc_offest is -60 for Cape Verde.*/
                utc_offset: number;
                /**
Type:  string
A fragment of the Place's address for disambiguation (usually street name and locality).*/
                vicinity: string;
                /**
Type:  string
The authoritative website for this Place, such as a business' homepage.*/
                website: string;
            }
            /**
             *  https://developers.google.com/maps/documentation/javascript/places#place_details
             */
            class PlacesService {
                constructor(map: HTMLElement);
                getDetails(request: {
                    placeId: string;
                }, callback: (place: IPlace, status: string) => void): void;
            }
        }
    }
}
/**
 *  wraps the AutoCompleteService class, described here: https://developers.google.com/maps/documentation/javascript/reference#AutocompleteService
 * @param request
 */
export declare function getAutocompletePlacePredictions(requestOptions: google.maps.places.IPlacePredictionRequestOptions, retryAttempt?: number): Promise<google.maps.places.IPredictionResult[]>;
/**
 *  https://developers.google.com/maps/documentation/javascript/places#place_details
 * @param request
 * @param retryAttempt
 */
export declare function getPlaceDetails(request: {
    placeId: string;
}, retryAttempt?: number): Promise<google.maps.places.IPlace | null>;
