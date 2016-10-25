
import * as React from "react";
export {React};

import * as ReactDom from "react-dom";
export {ReactDom};

import * as Redux from "redux";
export {Redux};
import * as ReactRedux from "react-redux";
export {ReactRedux};

import * as xlib from "xlib";
export {xlib};


import * as ReactRouter from "react-router";
export {ReactRouter};
import * as ReactRouterRedux from "react-router-redux";
export {ReactRouterRedux};
import * as ReduxLogger from "redux-logger";
export { ReduxLogger };

import Promise = xlib.promise.bluebird;


export let ReduxUndo: {
    undoable: <T>(reducerIn: Redux.Reducer<T>) => Redux.Reducer<T>;

} = require("redux-undo");

export module reduxHelpers {

    /** the output of all redux actions should be in this form */
    export interface IReduxActionResult<TValue> {
        type: string;  //required by redux
        value: TValue; // our opinionated encapsulation of state changes
    }
    /** interface for our blib redux state pattern.  to simplify + modularize redux state management */
    export interface IReduxStateModule {
        _init: {
            initializeStart(
                /** collection of reducers that will be combined later.   add your state reducer here */
                reducers: Redux.ReducersMapObject
            ): void;
            initializeFinish(
                /** in case you need it, such as creating bound actions */
                reduxStore: Redux.Store<any>,
            ): void;
        }
        actions: any;
    }
    //export interface IReduxStateModuleInitalizeFinish {
    //    (reduxStore: Redux.Store<any>): Promise<void>;
    //}
}

/** easy cookie query and manipulation.  https://www.npmjs.com/package/js-cookie */
export import Cookie = require("js-cookie");


/**
 * if you have google analytics installed, this allows you to call it.  if ga isn't installed, any calls to this are nooped
 */
export var googleAnalytics: typeof ga = <any>function (...args: any[]) {
    if (typeof ga === "undefined") {
        return;
    }
    return ga.apply(ga, args);
}

/**
 * helper for SPA's to record a pagehit, using the pathname+hash as the page id.
 */
export function ga_ezSpaPageHit() {
    //send page hit
    let spaId = document.location.pathname + xlib.stringHelper.removeAfter(document.location.hash, "?");
    googleAnalytics("set", "page", spaId);
    googleAnalytics("send", "pageview");
}

/** works with v4 too  https://www.npmjs.com/package/react-bootstrap */
export import ReactBootstrap = require("react-bootstrap");

/**
 *  npm react-stripe-checkout
 */
export var reactStripeCheckout = require("react-stripe-checkout");


/**
 *  React-Loader, docs here: https://github.com/quickleft/react-loader
easiest way to use example:  <ReactLoader loaded={this.isLoaded}>Finished Loading! put the content you wait on here.</ReactLoader>
 */
export var ReactLoader: React.ComponentClass<{ loaded: boolean }> = require("react-loader");




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
export let ReactRecaptcha: React.ComponentClass<{
    /** 	The API client key*/
    sitekey: string;
    /**The function to be called when the user completes successfully the captcha*/
    onChange: (captchaResponse: string) => void;
    /**optional "light" or "dark" The them of the widget (defaults: light)*/
    theme?: string;//"light" | "dark";
    /** optional "image" or "audio" The type of initial captcha (defaults: image)*/
    type?: string;//"image" | "audio";
    /**optional The tabindex on the element (default: 0)*/
    tabindex?: number;
    /** optional callback when the challenge is expired and has to be redone by user. By default it will call the onChange with null to signify expired callback.*/
    onExpired?: () => void;
    /**optional set the stoken parameter, which allows the captcha to be used from different domains, see reCAPTCHA secure-token*/
    stoken?: string;
}> = require("react-google-recaptcha");
