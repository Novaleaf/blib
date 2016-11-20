import * as React from "react";
export { React };
import * as ReactDom from "react-dom";
export { ReactDom };
import * as Redux from "redux";
export { Redux };
import * as ReactRedux from "react-redux";
export { ReactRedux };
import * as xlib from "xlib";
export { xlib };
import * as ReactRouter from "react-router";
export { ReactRouter };
import * as ReactRouterRedux from "react-router-redux";
export { ReactRouterRedux };
import * as ReduxLogger from "redux-logger";
export { ReduxLogger };
/**
 * the npm module "react-jsonschema-form"
 */
export declare module ReactJsf {
    /**
     *  helper will construct a Jsf Schema from a xlib DataSchema
     * @param dataSchema
     */
    function constructJsfSchemaFromDataSchema(dataSchema: xlib.designPatterns.dataSchema.ISchema): {
        jsfSchema: IObjectSchema;
        uiSchema: IUiSchema;
    };
    interface FormProps {
        schema: IObjectSchema | IArraySchema;
        uiSchema?: {};
        formData?: any;
        widgets?: {};
        fields?: {};
        validate?: (formData: any, errors: any) => any;
        onChange?: (e: IChangeEvent) => any;
        onError?: (e: any) => any;
        onSubmit?: (e: any) => any;
        liveValidate?: boolean;
        safeRenderCompletion?: boolean;
    }
    interface IChangeEvent {
        edit: boolean;
        formData: any;
        errors: any[];
        errorSchema: any;
        idSchema: any;
        status: string;
    }
    interface IUiSchema {
        [propName: string]: IUiSchemaField;
    }
    interface IUiSchemaField {
        "ui:widget": string;
        "ui:readonly"?: boolean;
        "ui:options"?: {
            backgroundColor?: string;
        };
        "ui:autofocus"?: boolean;
    }
    interface IUiSchemaField_String extends IUiSchemaField {
        "ui:widget": "textarea" | "password" | "color" | "text";
        format?: "email" | "uri" | "data-url" | "date" | "date-time";
    }
    interface IUiSchemaField_Boolean extends IUiSchemaField {
        "ui:widget": "radio" | "select" | "checkbox";
    }
    interface IObjectSchema {
        type: "object";
        title?: string;
        properties: {
            [name: string]: IObjectSchema | IPropSchema | IRefSchema | IArraySchema;
        };
        /** alt definitions used as reference types for embeded schema*/
        definitions?: {
            [name: string]: IObjectSchema;
        };
    }
    interface IArraySchema {
        type: "array";
        title?: string;
        items: IObjectSchema | IRefSchema;
    }
    /** optional references to definitions found under a "definitions" node */
    interface IRefSchema {
        title?: string;
        "$ref": string;
    }
    interface IPropSchema {
        type: "string" | "number" | "integer";
        title?: string;
        format?: string;
    }
    class _Form extends React.Component<FormProps, any> {
    }
    const Form: typeof _Form;
}
export declare let ReduxUndo: {
    undoable: <T>(reducerIn: Redux.Reducer<T>) => Redux.Reducer<T>;
};
export declare module reactHelpers {
    /**
     *  calculate the current route of the SPA by looking at window.location.hash
     */
    function currentSpaRoute(): string;
    /**
     *  helpers to easily bind to the React.Component lifecycle methods (in a  type strong way)
     * example use:  ```class MyComponent extends React.Component<any,any>{componentDidMount = componentLifecycleHelpers.bindComponentWillMount(this,()=>{console.log("mounted");});}```
     */
    module componentLifecycle {
        function bindComponentWillMount<Props, State>(target: React.Component<Props, State>, fcn: () => void): any;
        function bindComponentDidMount<Props, State>(target: React.Component<Props, State>, fcn: () => void): any;
        function bindComponentWillReceiveProps<Props, State>(target: React.Component<Props, State>, fcn: (nextProps: Props, nextContext: any) => void): any;
        function bindShouldComponentUpdate<Props, State>(target: React.Component<Props, State>, fcn: (nextProps: Props, nextState: State, nextContext: any) => boolean): any;
        function bindComponentWillUpdate<Props, State>(target: React.Component<Props, State>, fcn: (nextProps: Props, nextState: State, nextContext: any) => void): any;
        function bindComponentDidUpdate<Props, State>(target: React.Component<Props, State>, fcn: (prevProps: Props, prevState: State, prevContext: any) => void): any;
        function bindComponentWillUnmount<Props, State>(target: React.Component<Props, State>, fcn: () => void): any;
    }
}
export declare module reduxHelpers {
    /** the output of all redux actions should be in this form */
    interface IReduxActionResult<TValue> {
        type: string;
        value: TValue;
    }
    /** interface for our blib redux state pattern.  to simplify + modularize redux state management */
    interface IReduxStateModule {
        /** a "init helper" sub-module */
        _init: {
            initializeStart(
                /** collection of reducers that will be combined later.   add your state reducer here */
                reducers: Redux.ReducersMapObject): void;
            initializeFinish(
                /** in case you need it, such as creating bound actions */
                reduxStore: Redux.Store<any>): void;
        };
        /** all actions that your state exposes */
        actions: any;
        /** the key that this state is stored under in the reduxStateStore*/
        stateKey: string;
    }
    /**
     * handles all the bootstrapping (initialization) of react+redux+reactRouterRedux applications.   just make sure you pass in your redux-states in the "IReduxStateModule" format to the function parameters.
     * @param _ezStates
     */
    function initReactReduxRouterApplication(..._ezStates: IReduxStateModule[]): {
        reduxStore: Redux.Store<any>;
        history: any;
    };
    /**
     * Novaleaf's "best practice" for using redux:
     * for actions, the best way is not to use this, but to create a bound-action and reference those action functions directly in their declaring modules.
     * see the auth module for example code.
     */
    function reduxConnect<TComponentClass extends typeof React.Component>(ComponentClass: TComponentClass, states?: string[], actions?: {}[]): TComponentClass;
}
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
