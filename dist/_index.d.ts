import * as xlib from "xlib";
export { xlib };
export import jquery = require("jquery");
export import reactEco = require("./react-eco/_index");
export import maps = require("./maps");
/** easy cookie query and manipulation.  https://www.npmjs.com/package/js-cookie */
export import Cookie = require("js-cookie");
/**
 * if you have google analytics installed, this allows you to call it.  if ga isn't installed, any calls to this are nooped
 */
export declare var googleAnalytics: any;
/**
 * helper for SPA's to record a pagehit, using the pathname+hash as the page id.
 */
export declare function ga_ezSpaPageHit(): void;
