/// <reference types="google.analytics" />
/// <reference types="react" />
import * as React from "react";
export { React };
import * as ReactDom from "react-dom";
export { ReactDom };
import * as Redux from "redux";
export { Redux };
import * as ReactRedux from "react-redux";
export { ReactRedux };
import * as ReactRouter from "react-router";
export { ReactRouter };
import * as ReactRouterRedux from "react-router-redux";
export { ReactRouterRedux };
import * as ReduxLogger from "redux-logger";
export { ReduxLogger };
export declare let ReduxUndo: {
    undoable: <T>(reducerIn: Redux.Reducer<T>) => Redux.Reducer<T>;
};
export declare module reduxHelpers {
    /** the output of all redux actions should be in this form */
    interface IReduxActionResult<TValue> {
        type: string;
        value: TValue;
    }
    /** interface for our blib redux state pattern.  to simplify + modularize redux state management */
    interface IReduxStateModule {
        _init: {
            initializeStart(
                /** collection of reducers that will be combined later.   add your state reducer here */
                reducers: Redux.ReducersMapObject): void;
            initializeFinish(
                /** in case you need it, such as creating bound actions */
                reduxStore: Redux.Store<any>): void;
        };
        actions: any;
    }
}
/** easy cookie query and manipulation.  https://www.npmjs.com/package/js-cookie */
export import Cookie = require("js-cookie");
/**
 * if you have google analytics installed, this allows you to call it.  if ga isn't installed, any calls to this are nooped
 */
export declare var googleAnalytics: typeof ga;
/**
 * helper for SPA's to record a pagehit, using the pathname+hash as the page id.
 */
export declare function ga_ezSpaPageHit(): void;
/** works with v4 too  https://www.npmjs.com/package/react-bootstrap */
export import ReactBootstrap = require("react-bootstrap");
/**
 *  npm react-stripe-checkout
 */
export declare var reactStripeCheckout: any;
/**
 *  React-Loader, docs here: https://github.com/quickleft/react-loader
easiest way to use example:  <ReactLoader loaded={this.isLoaded}>Finished Loading! put the content you wait on here.</ReactLoader>
 */
export declare var ReactLoader: React.ComponentClass<{
    loaded: boolean;
}>;
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
export declare let ReactRecaptcha: React.ComponentClass<{
    /** 	The API client key*/
    sitekey: string;
    /**The function to be called when the user completes successfully the captcha*/
    onChange: (captchaResponse: string) => void;
    /**optional "light" or "dark" The them of the widget (defaults: light)*/
    theme?: string;
    /** optional "image" or "audio" The type of initial captcha (defaults: image)*/
    type?: string;
    /**optional The tabindex on the element (default: 0)*/
    tabindex?: number;
    /** optional callback when the challenge is expired and has to be redone by user. By default it will call the onChange with null to signify expired callback.*/
    onExpired?: () => void;
    /**optional set the stoken parameter, which allows the captcha to be used from different domains, see reCAPTCHA secure-token*/
    stoken?: string;
}>;
/** common react components */
export import reactCommonComponents = require("./react-common-components");
