"use strict";
const xlib = require("xlib");
exports.xlib = xlib;
const log = new xlib.logging.Logger(__filename);
exports.jquery = require("jquery");
/** setup jquery globals, if not already set */
if (xlib.environment.getGlobal()["$"] == null) {
    xlib.environment.getGlobal()["$"] = exports.jquery;
}
if (xlib.environment.getGlobal()["jQuery"] == null) {
    xlib.environment.getGlobal()["jQuery"] = exports.jquery;
}
exports.reactEco = require("./react-eco/_index");
exports.maps = require("./maps");
// import 'bootstrap/dist/css/bootstrap.css';
/** easy cookie query and manipulation.  https://www.npmjs.com/package/js-cookie */
exports.Cookie = require("js-cookie");
/**
 * if you have google analytics installed, this allows you to call it.  if ga isn't installed, any calls to this are nooped
 */
exports.googleAnalytics = function (...args) {
    if (typeof ga === "undefined") {
        return;
    }
    return ga.apply(ga, args);
};
/**
 * helper for SPA's to record a pagehit, using the pathname+hash as the page id.
 */
function ga_ezSpaPageHit() {
    //send page hit
    let spaId = document.location.pathname + xlib.stringHelper.removeAfter(document.location.hash, "?");
    exports.googleAnalytics("set", "page", spaId);
    exports.googleAnalytics("send", "pageview");
}
exports.ga_ezSpaPageHit = ga_ezSpaPageHit;
//# sourceMappingURL=_index.js.map