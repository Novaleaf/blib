"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
const xlib = require("xlib");
var _ = xlib.lodash;
const log = new xlib.logging.Logger(__filename);
var Promise = xlib.promise.bluebird;
var __ = xlib.lolo;
const React = require("react");
exports.React = React;
const ReactDom = require("react-dom");
exports.ReactDom = ReactDom;
const Redux = require("redux");
exports.Redux = Redux;
const ReactRedux = require("react-redux");
exports.ReactRedux = ReactRedux;
//import redux-promise middleware silently for use anywhere:  https://github.com/acdlite/redux-promise
const reduxPromise = require("redux-promise");
//import promiseMiddleware from "redux-promise-middleware";
const ReactRouter = require("react-router");
exports.ReactRouter = ReactRouter;
const ReactRouterRedux = require("react-router-redux");
exports.ReactRouterRedux = ReactRouterRedux;
const ReduxLogger = require("redux-logger");
exports.ReduxLogger = ReduxLogger;
// /** http://adazzle.github.io/react-data-grid/  */
// export import ReactDataGrid = require("react-data-grid");
// export import ReactDataGridPlugins = require("react-data-grid/addons")
/** uses updated version of fixed-data-table:  https://github.com/schrodinger/fixed-data-table-2  */
exports.fixedDataTable = require("../_dts/fixed-data-table-2");
/** load the css, works with webpack css-loader plugin */
const _fdt_css = require("fixed-data-table-2/dist/fixed-data-table.min.css");
//import ReactJsfForm from "react-jsonschema-form";
//export { ReactJsfForm };
/** unfortuantely due to stupid "defaults" settings, we can't easily export this for people to use.   need to put our own definitions in place */
//import __ReactJsf = require("react-jsonschema-form");
const react_jsonschema_form_1 = require("react-jsonschema-form");
/**
 * the npm module "react-jsonschema-form"
 */
var ReactJsf;
(function (ReactJsf) {
    /**
     *  helper will construct a Jsf Schema from a xlib DataSchema
     * @param dataSchema
     */
    function constructJsfSchemaFromDataSchema(dataSchema) {
        let jsfSchema = {
            type: "object",
            title: dataSchema.db.kind,
            properties: {},
        };
        let uiSchema = {};
        //copy props
        xlib.lolo.forEach(dataSchema.properties, (prop, key) => {
            if (prop.isHidden === true) {
                //not for user input
                return;
            }
            //compute jsfSchema for prop
            let jsfType;
            switch (prop.dbType) {
                case "double":
                    jsfType = "number";
                    break;
                case "integer":
                    jsfType = "integer";
                    break;
                case "string":
                    jsfType = "string";
                    break;
                case "boolean":
                    jsfType = "boolean";
                    break;
                case "none":
                    throw log.error("DEV TODO: dbType of none is invalid, need to modify to include a seperate prop value to show not storing");
                //break;
                default:
                    throw log.error("unhandled prop type:" + prop.dbType, { key, prop });
            }
            let jsfProp = {
                type: jsfType,
                title: key,
                required: prop.isOptional !== true,
            };
            jsfSchema.properties[key] = jsfProp;
            //compute ui schema
            if (prop.inputWidget != null) {
                uiSchema[key] = {
                    "ui:widget": prop.inputWidget,
                };
            }
        });
        return { jsfSchema, uiSchema };
    }
    ReactJsf.constructJsfSchemaFromDataSchema = constructJsfSchemaFromDataSchema;
    ReactJsf.Form = react_jsonschema_form_1.default;
})(ReactJsf = exports.ReactJsf || (exports.ReactJsf = {}));
exports.ReduxUndo = require("redux-undo");
var reactHelpers;
(function (reactHelpers) {
    /**
     * helper to properly attach (and handle existing ) promises on React.Component.State objects.
     * this is tricky because it needs to be done atomically, so that the promise chain doesn't branch nor become detached.
     * this method handles all that, provided that for you, and automatically updates the componenet when done.
     * @param component
     * @param stateKey
     * @param promiseToEnqueue
     * @returns Promise that resolves once the final component update is finished.
     */
    function enqueueStatePromise(component, stateKey, promiseToEnqueue) {
        return new Promise((resolve, reject) => {
            //call setState atomically
            component.setState((prevState, props) => {
                //this function is called atomically inside of setState
                let newWaitForPromise = prevState[stateKey];
                if (newWaitForPromise == null) {
                    newWaitForPromise = Promise.resolve();
                }
                //attach our promiseToEnqueue to the end
                newWaitForPromise = newWaitForPromise.then((_a) => {
                    var args = __rest(_a, []);
                    return promiseToEnqueue;
                });
                //when the promise finishes, force update
                newWaitForPromise.then(() => {
                    component.forceUpdate(() => {
                        //after the forceUpdate has completed, notify our caller via their returned promise.
                        resolve();
                    });
                });
                //the returned value is applied on the actual state object
                let toReturn = {};
                toReturn[stateKey] = newWaitForPromise;
                return toReturn;
            });
        });
    }
    reactHelpers.enqueueStatePromise = enqueueStatePromise;
    /**
     *  calculate the current route of the SPA by looking at window.location.hash
     */
    function currentSpaRoute() {
        let _currentRoute = xlib.stringHelper.removeBefore(window.location.hash, "#").toLowerCase();
        _currentRoute = xlib.stringHelper.removeAfter(_currentRoute, "?");
        return _currentRoute;
    }
    reactHelpers.currentSpaRoute = currentSpaRoute;
    /**
     *  helpers to easily bind to the React.Component lifecycle methods (in a  type strong way)
     * example use:  ```class MyComponent extends React.Component<any,any>{componentDidMount = componentLifecycleHelpers.bindComponentWillMount(this,()=>{console.log("mounted");});}```
     */
    var componentLifecycle;
    (function (componentLifecycle) {
        function bindComponentWillMount(target, fcn) {
            let boundFcn = __.bind(fcn, target);
            target.componentWillMount = boundFcn;
            return boundFcn;
        }
        componentLifecycle.bindComponentWillMount = bindComponentWillMount;
        function bindComponentDidMount(target, fcn) {
            let boundFcn = __.bind(fcn, target);
            target.componentDidMount = boundFcn;
            return boundFcn;
        }
        componentLifecycle.bindComponentDidMount = bindComponentDidMount;
        function bindComponentWillReceiveProps(target, fcn) {
            let boundFcn = __.bind(fcn, target);
            target.componentWillReceiveProps = boundFcn;
            return boundFcn;
        }
        componentLifecycle.bindComponentWillReceiveProps = bindComponentWillReceiveProps;
        function bindShouldComponentUpdate(target, fcn) {
            let boundFcn = __.bind(fcn, target);
            target.shouldComponentUpdate = boundFcn;
            return boundFcn;
        }
        componentLifecycle.bindShouldComponentUpdate = bindShouldComponentUpdate;
        function bindComponentWillUpdate(target, fcn) {
            let boundFcn = __.bind(fcn, target);
            target.componentWillUpdate = boundFcn;
            return boundFcn;
        }
        componentLifecycle.bindComponentWillUpdate = bindComponentWillUpdate;
        function bindComponentDidUpdate(target, fcn) {
            let boundFcn = __.bind(fcn, target);
            target.componentDidUpdate = boundFcn;
            return boundFcn;
        }
        componentLifecycle.bindComponentDidUpdate = bindComponentDidUpdate;
        function bindComponentWillUnmount(target, fcn) {
            let boundFcn = __.bind(fcn, target);
            target.componentWillUnmount = boundFcn;
            return boundFcn;
        }
        componentLifecycle.bindComponentWillUnmount = bindComponentWillUnmount;
    })(componentLifecycle = reactHelpers.componentLifecycle || (reactHelpers.componentLifecycle = {}));
})(reactHelpers = exports.reactHelpers || (exports.reactHelpers = {}));
var reduxHelpers;
(function (reduxHelpers) {
    //export interface IReduxStateModuleInitalizeFinish {
    //    (reduxStore: Redux.Store<any>): Promise<void>;
    //}
    /**
     * handles all the bootstrapping (initialization) of react+redux+reactRouterRedux applications.   just make sure you pass in your redux-states in the "IReduxStateModule" format to the function parameters.
     * @param _ezStates
     */
    function initReactReduxRouterApplication(..._ezStates) {
        //let _ezStates: blib.reduxHelpers.IReduxStateModule[] = [];
        //import * as counter from "./state/count";
        //_ezStates.push(counter);
        /** redux state / actions for authentication */
        //_ezStates.push(authJwt.states.authState);
        //log.info("here");
        //console.log("here");
        //const history = ReactRouter.createMemoryHistory(); //this works, at least in chrome, but no hashtag for location hints.
        const history = ReactRouter.hashHistory; //works, creates hash fragments to store location
        /////////////// apply middleware
        const middleware = Redux.applyMiddleware(
        /** need to apply this to use the push method,  see: https://github.com/reactjs/react-router-redux#what-if-i-want-to-issue-navigation-events-via-redux-actions or https://github.com/reactjs/react-router-redux/issues/366 */
        ReactRouterRedux.routerMiddleware(history), ReduxLogger({
            collapsed: true,
            diff: true,
        }), reduxPromise);
        ///////////////  apply redux-devtools chrome extension if present
        //see: https://github.com/gaearon/redux-devtools/blob/master/docs/Walkthrough.md
        // get the extension from here:  https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd
        //procedurally inject the redux devtools extension if it's present
        const composeEnhancers = window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] || Redux.compose;
        //import our redux state objects and bind them
        let _rawReducers = {};
        /** start final redux state module initializations */
        __.forEach(_ezStates, (state) => {
            state._init.initializeStart(_rawReducers);
        });
        _rawReducers["routing"] = ReactRouterRedux.routerReducer; //include our routing module
        /**
         *  //create a single reducer function from our components
         */
        const reducer = Redux.combineReducers(_rawReducers);
        /**
         * the whole state tree of the app  use actions to manipulate
         */
        const reduxStore = Redux.createStore(reducer, composeEnhancers(middleware));
        ReactRouterRedux.syncHistoryWithStore(history, reduxStore);
        /** finish final redux state module initializations */
        __.forEach(_ezStates, (state) => {
            state._init.initializeFinish(reduxStore);
        });
        return { reduxStore, history: history };
    }
    reduxHelpers.initReactReduxRouterApplication = initReactReduxRouterApplication;
    /**
     * Novaleaf's "best practice" for using redux:
     * for actions, the best way is not to use this, but to create a bound-action and reference those action functions directly in their declaring modules.
     * see the auth module for example code.
     */
    function reduxConnect(
        /** the component that you want bound to redux */
        ComponentClass, 
        /** an array of the redux states you want sent to your component as a prop.   example:  "auth" via the auth modules auth.reduxState.authKey property */
        states = [], actions = []) {
        //	//oriignal reference implementation		
        //return ReactRedux.connect(
        //	null,
        //	_.merge(
        //		{},
        //		reduxState.actions,
        //		{ push: ReactRouterRedux.push }
        //	) //redux-binds, then includes the push() method for use in our _App Component
        //)(ComponentClass) as any as TComponentClass;
        //////////////////////////
        ///   merge actions into 1 pojo
        let mapDispatchToProps;
        if (actions == null || actions.length == 0) {
            mapDispatchToProps = {};
        }
        else {
            mapDispatchToProps = {};
            __.forEach(actions, (value, index) => {
                _.merge(mapDispatchToProps, value);
            });
        }
        //////////////////////////
        /// construct "mapStatesToProps"" state map fcn, if any
        /// this will be called for every mounted reduxConnected component every time any redux state is changed, sending the component the latest redux store state.
        /// it is critical that you don't clone the state like I did previously (see commented _clone() line below) 
        /// otherwise each component will detect that it's redux state-->prop has changed and force an update+redraw
        let mapStatesToProps;
        if (states == null || states.length == 0) {
            mapStatesToProps = null;
        }
        else {
            mapStatesToProps = (
                /** the redux store. a key-value pojo store  */
                reduxStoreState, 
                /** not sure what arg2 is supposed to be, but it seems to be other props sent to the component */
                arg2) => {
                //grab all the states that this component is interested in, and return them
                let targetStates = {};
                __.forEach(states, (stateKey) => {
                    targetStates[stateKey] = reduxStoreState[stateKey]; // _.clone(reduxStoreState[stateKey]);
                });
                return targetStates;
            };
        }
        //do redux Connect
        return ReactRedux.connect(mapStatesToProps, mapDispatchToProps)(ComponentClass);
    }
    reduxHelpers.reduxConnect = reduxConnect;
})(reduxHelpers = exports.reduxHelpers || (exports.reduxHelpers = {}));
//export let ReduxLogger: {} = require("redux-logger");
/** works with v4 too  https://www.npmjs.com/package/react-bootstrap */
//export import ReactBootstrap = require( "react-bootstrap" );
const _reactstrap = require("../_dts/reactstrap");
exports.ReactStrap = _reactstrap.ReactStrap;
/** shim ReactStrap into ReactBootstrap */
exports.ReactBootstrap = exports.ReactStrap;
//export const rs: typeof ReactBootstrap = require("reactstrap");
/**
 *  npm react-stripe-checkout
 */
exports.reactStripeCheckout = require("react-stripe-checkout");
/**
 *  React-Loader, docs here: https://github.com/quickleft/react-loader
easiest way to use example:  <ReactLoader loaded={this.isLoaded}>Finished Loading! put the content you wait on here.</ReactLoader>
 */
exports.ReactLoader = require("react-loader");
exports._ReactBootstrapTypeahead_Definitions = require("../_dts/react-bootstrap-typeahead");
exports.ReactBootstrapTypeahead = exports._ReactBootstrapTypeahead_Definitions.ReactBootstrapTypeahead;
//export const ReactBootstrapTypeahead_Definitions = _reactBootstrapTypeahead.react_bootstrap_typeahead;
/** load the css, works with webpack css-loader plugin */
const _rbt_token_css = require("react-bootstrap-typeahead/css/Token.css");
const _rbt_typeahead_css = require("react-bootstrap-typeahead/css/Typeahead.css");
const _rbt_loader_css = require("react-bootstrap-typeahead/css/Loader.css");
const _rbt_clearbutton_css = require("react-bootstrap-typeahead/css/ClearButton.css");
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