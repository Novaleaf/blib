"use strict";
var React = require("react");
exports.React = React;
var ReactDom = require("react-dom");
exports.ReactDom = ReactDom;
var Redux = require("redux");
exports.Redux = Redux;
var ReactRedux = require("react-redux");
exports.ReactRedux = ReactRedux;
var xlib = require("xlib");
//export {xlib};
var ReactRouter = require("react-router");
exports.ReactRouter = ReactRouter;
var ReactRouterRedux = require("react-router-redux");
exports.ReactRouterRedux = ReactRouterRedux;
var ReduxLogger = require("redux-logger");
exports.ReduxLogger = ReduxLogger;
exports.ReduxUndo = require("redux-undo");
/** easy cookie query and manipulation.  https://www.npmjs.com/package/js-cookie */
exports.Cookie = require("js-cookie");
/**
 * if you have google analytics installed, this allows you to call it.  if ga isn't installed, any calls to this are nooped
 */
exports.googleAnalytics = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
    }
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
    var spaId = document.location.pathname + xlib.stringHelper.removeAfter(document.location.hash, "?");
    exports.googleAnalytics("set", "page", spaId);
    exports.googleAnalytics("send", "pageview");
}
exports.ga_ezSpaPageHit = ga_ezSpaPageHit;
/** works with v4 too  https://www.npmjs.com/package/react-bootstrap */
exports.ReactBootstrap = require("react-bootstrap");
/**
 *  npm react-stripe-checkout
 */
exports.reactStripeCheckout = require("react-stripe-checkout");
/**
 *  React-Loader, docs here: https://github.com/quickleft/react-loader
easiest way to use example:  <ReactLoader loaded={this.isLoaded}>Finished Loading! put the content you wait on here.</ReactLoader>
 */
exports.ReactLoader = require("react-loader");
/**
 *  npm react-google-recaptcha
https://github.com/dozoisch/react-google-recaptcha

example usage:
```
var React = require("react");
var render = require("react-dom").render
var ReCAPTCHA = require("react-google-recaptcha");

function onChange(value) {
  console.log("Captcha value:", value);
}

render(
    <ReCAPTCHA
      ref="recaptcha"
      sitekey="Your client site key"
      onChange={onChange}
    />,
    document.body
);
```
 */
exports.ReactRecaptcha = require("react-google-recaptcha");
/** common react components */
exports.reactCommonComponents = require("./react-common-components");
//# sourceMappingURL=_index.js.map