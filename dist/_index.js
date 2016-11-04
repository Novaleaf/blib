"use strict";
const React = require("react");
exports.React = React;
const ReactDom = require("react-dom");
exports.ReactDom = ReactDom;
const Redux = require("redux");
exports.Redux = Redux;
const ReactRedux = require("react-redux");
exports.ReactRedux = ReactRedux;
const xlib = require("xlib");
exports.xlib = xlib;
const ReactRouter = require("react-router");
exports.ReactRouter = ReactRouter;
const ReactRouterRedux = require("react-router-redux");
exports.ReactRouterRedux = ReactRouterRedux;
const ReduxLogger = require("redux-logger");
exports.ReduxLogger = ReduxLogger;
//export let ReduxLogger: {} = require("redux-logger");
//import ReactJsf = require("react-jsonschema-form");
//export let ReactJsfForm = ReactJsf.default;
//let Form = ReactJsf.Form;
const react_jsonschema_form_1 = require("react-jsonschema-form");
exports.ReactJsfForm = react_jsonschema_form_1.default;
exports.ReduxUndo = require("redux-undo");
var __ = xlib.lolo;
var reactHelpers;
(function (reactHelpers) {
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
            let boundFcn = fcn.bind(target);
            //(target as any).componentWillMount = boundFcn;
            return boundFcn;
        }
        componentLifecycle.bindComponentWillMount = bindComponentWillMount;
        function bindComponentDidMount(target, fcn) {
            let boundFcn = fcn.bind(target);
            //(target as any).componentDidMount = boundFcn;
            return boundFcn;
        }
        componentLifecycle.bindComponentDidMount = bindComponentDidMount;
        function bindComponentWillReceiveProps(target, fcn) {
            let boundFcn = fcn.bind(target);
            //(target as any).componentWillReceiveProps = boundFcn;
            return boundFcn;
        }
        componentLifecycle.bindComponentWillReceiveProps = bindComponentWillReceiveProps;
        function bindShouldComponentUpdate(target, fcn) {
            let boundFcn = fcn.bind(target);
            //(target as any).shouldComponentUpdate = boundFcn;
            return boundFcn;
        }
        componentLifecycle.bindShouldComponentUpdate = bindShouldComponentUpdate;
        function bindComponentWillUpdate(target, fcn) {
            let boundFcn = fcn.bind(target);
            //(target as any).componentWillUpdate = boundFcn;
            return boundFcn;
        }
        componentLifecycle.bindComponentWillUpdate = bindComponentWillUpdate;
        function bindComponentDidUpdate(target, fcn) {
            let boundFcn = fcn.bind(target);
            //(target as any).componentDidUpdate = boundFcn;
            return boundFcn;
        }
        componentLifecycle.bindComponentDidUpdate = bindComponentDidUpdate;
        function bindComponentWillUnmount(target, fcn) {
            let boundFcn = fcn.bind(target);
            //(target as any).componentWillUnmount = boundFcn;
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
        }));
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
    function reduxConnect(ComponentClass, states = [], actions = []) {
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
        /// construct state map fcn, if any
        let mapStatesToProps;
        if (states == null || states.length == 0) {
            mapStatesToProps = null;
        }
        else {
            mapStatesToProps = (reduxStoreState) => {
                let targetStates = {};
                __.forEach(states, (stateKey) => {
                    targetStates[stateKey] = _.clone(reduxStoreState[stateKey]);
                });
                return targetStates;
            };
        }
        //do redux Connect
        return ReactRedux.connect(mapStatesToProps, mapDispatchToProps)(ComponentClass);
    }
    reduxHelpers.reduxConnect = reduxConnect;
})(reduxHelpers = exports.reduxHelpers || (exports.reduxHelpers = {}));
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