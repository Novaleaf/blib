
import * as React from "react";
export { React };

import * as ReactDom from "react-dom";
export { ReactDom };

import * as Redux from "redux";
export { Redux };
import * as ReactRedux from "react-redux";
export { ReactRedux };

//import redux-promise middleware silently for use anywhere:  https://github.com/acdlite/redux-promise
const reduxPromise = require( "redux-promise" );

//import promiseMiddleware from "redux-promise-middleware";

import * as xlib from "xlib";
export { xlib };
import _ = xlib.lodash;


import * as ReactRouter from "react-router";
export { ReactRouter };
import * as ReactRouterRedux from "react-router-redux";
export { ReactRouterRedux };
import * as ReduxLogger from "redux-logger";
export { ReduxLogger };

// /** http://adazzle.github.io/react-data-grid/  */
// export import ReactDataGrid = require("react-data-grid");
// export import ReactDataGridPlugins = require("react-data-grid/addons");
export import fixedDataTable = require( "fixed-data-table" );
/** load the css, works with webpack css-loader plugin */
const _fdt_css = require("fixed-data-table/dist/fixed-data-table.min.css");


// import 'bootstrap/dist/css/bootstrap.css';
//export let ReduxLogger: {} = require("redux-logger");


const log = new xlib.logging.Logger( __filename );

//import ReactJsfForm from "react-jsonschema-form";
//export { ReactJsfForm };
/** unfortuantely due to stupid "defaults" settings, we can't easily export this for people to use.   need to put our own definitions in place */
//import __ReactJsf = require("react-jsonschema-form");
import __ReactJsf_Form from "react-jsonschema-form";



/**
 * the npm module "react-jsonschema-form"
 */
export module ReactJsf {

	/**
	 *  helper will construct a Jsf Schema from a xlib DataSchema
	 * @param dataSchema
	 */
	export function constructJsfSchemaFromDataSchema( dataSchema: xlib.designPatterns.dataSchema.ISchema ) {


		let jsfSchema: IObjectSchema = {
			type: "object",
			title: dataSchema.db.kind,
			properties: {},
		}

		let uiSchema: IUiSchema = {};

		//copy props
		xlib.lolo.forEach( dataSchema.properties, ( prop, key ) => {


			if ( prop.isHidden === true ) {
				//not for user input
				return;
			}


			//compute jsfSchema for prop
			let jsfType: string;
			switch ( prop.dbType ) {
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
					throw log.error( "DEV TODO: dbType of none is invalid, need to modify to include a seperate prop value to show not storing" );
				//break;
				default:
					throw log.error( "unhandled prop type:" + prop.dbType, { key, prop });

			}

			let jsfProp: IPropSchema = {
				type: jsfType as any,
				title: key,
				required: prop.isOptional !== true,
				//format: prop.inputFormat,
			}

			jsfSchema.properties[ key ] = jsfProp;

			//compute ui schema
			if ( prop.inputWidget != null ) {
				uiSchema[ key ] = {
					"ui:widget": prop.inputWidget,
				};
			}


		});





		return { jsfSchema, uiSchema };

	}


	export interface FormProps {
		schema: IObjectSchema | IArraySchema;
		uiSchema?: {};
		formData?: any;
		widgets?: {};
		fields?: {};
		validate?: ( formData: any, errors: any ) => any;
		onChange?: ( e: IChangeEvent ) => any;
		onError?: ( e: any ) => any;
		onSubmit?: ( e: any ) => any;
		liveValidate?: boolean;
		safeRenderCompletion?: boolean;
	}

	export interface IChangeEvent {
		edit: boolean;
		formData: any;
		errors: any[];
		errorSchema: any;
		idSchema: any;
		status: string;
	}

	export interface IUiSchema {
		[ propName: string ]: IUiSchemaField;
	}

	export interface IUiSchemaField {
		"ui:widget": string;
		"ui:readonly"?: boolean;
		"ui:options"?: { backgroundColor?: string }
		"ui:autofocus"?: boolean;
	}
	export interface IUiSchemaField_String extends IUiSchemaField {
		"ui:widget": "textarea" | "password" | "color" | "text";
		format?: "email" | "uri" | "data-url" | "date" | "date-time";
	}
	export interface IUiSchemaField_Boolean extends IUiSchemaField {
		"ui:widget": "radio" | "select" | "checkbox";

	}



	export interface IObjectSchema {

		type: "object";
		title?: string;
		properties: { [ name: string ]: IObjectSchema | IPropSchema | IRefSchema | IArraySchema };

		/** alt definitions used as reference types for embeded schema*/
		definitions?: { [ name: string ]: IObjectSchema };
	}

	export interface IArraySchema {
		type: "array";
		title?: string;
		items: IObjectSchema | IRefSchema
	}

	/** optional references to definitions found under a "definitions" node */
	export interface IRefSchema {
		title?: string;
		"$ref": string;
	}

	export interface IPropSchema {
		type: string;// "string" | "number" | "integer" | "boolean";
		title?: string;
		format?: string;
		required?: boolean;
		readonly?: boolean;
		displayLabel?: boolean;
	}


	export declare class _Form extends React.Component<FormProps, any> { }



	export const Form: typeof _Form = __ReactJsf_Form as any;
}



export let ReduxUndo: {
	undoable: <T>( reducerIn: Redux.Reducer<T> ) => Redux.Reducer<T>;

} = require( "redux-undo" );


import Promise = xlib.promise.bluebird;

import __ = xlib.lolo;



export module reactHelpers {


	/**
	 * helper to properly attach (and handle existing ) promises on React.Component.State objects.
	 * this is tricky because it needs to be done atomically, so that the promise chain doesn't branch nor become detached.
	 * this method handles all that, provided that for you, and automatically updates the componenet when done.
	 * @param component
	 * @param stateKey
	 * @param promiseToEnqueue
	 * @returns Promise that resolves once the final component update is finished.
	 */
	export function enqueueStatePromise<TState, TStateKey extends keyof TState>( component: React.Component<any, TState>, stateKey: TStateKey, promiseToEnqueue: Promise<any> & TState[ TStateKey ] ): Promise<void> {

		return new Promise<void>(( resolve, reject ) => {
			//call setState atomically
			component.setState(( prevState, props ) => {
				//this function is called atomically inside of setState


				let newWaitForPromise = ( prevState[ stateKey ] as any as Promise<any> );
				if ( newWaitForPromise == null ) {
					newWaitForPromise = Promise.resolve();
				}

				//attach our promiseToEnqueue to the end
				newWaitForPromise = newWaitForPromise.then(( {...args}) => {
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
				let toReturn: Partial<TState> = {} as any;
				toReturn[ stateKey ] = newWaitForPromise as any;
				return toReturn as TState;

			});
		});

	}

	/**
	 *  calculate the current route of the SPA by looking at window.location.hash
	 */
	export function currentSpaRoute() {
		let _currentRoute = xlib.stringHelper.removeBefore( window.location.hash, "#" ).toLowerCase();
		_currentRoute = xlib.stringHelper.removeAfter( _currentRoute, "?" );
		return _currentRoute;
	}


	/**
	 *  helpers to easily bind to the React.Component lifecycle methods (in a  type strong way)
	 * example use:  ```class MyComponent extends React.Component<any,any>{componentDidMount = componentLifecycleHelpers.bindComponentWillMount(this,()=>{console.log("mounted");});}```
	 */
	export module componentLifecycle {
		export function bindComponentWillMount<Props, State>( target: React.Component<Props, State>, fcn: () => void ) {
			let boundFcn = __.bind( fcn, target );
			( target as any ).componentWillMount = boundFcn;
			return boundFcn;
		}
		export function bindComponentDidMount<Props, State>( target: React.Component<Props, State>, fcn: () => void ) {
			let boundFcn = __.bind( fcn, target );
			( target as any ).componentDidMount = boundFcn;
			return boundFcn;
		}
		export function bindComponentWillReceiveProps<Props, State>( target: React.Component<Props, State>, fcn: ( nextProps: Props,/** If contextTypes is defined within a component,will receive an additional parameter, the context object */ nextContext?: any ) => void ) {
			let boundFcn = __.bind( fcn, target );
			( target as any ).componentWillReceiveProps = boundFcn;
			return boundFcn;
		}
		export function bindShouldComponentUpdate<Props, State>( target: React.Component<Props, State>, fcn: ( nextProps: Props, nextState: State,/** If contextTypes is defined within a component,will receive an additional parameter, the context object */ nextContext?: any ) => boolean ) {
			let boundFcn = __.bind( fcn, target );
			( target as any ).shouldComponentUpdate = boundFcn;
			return boundFcn;
		}
		export function bindComponentWillUpdate<Props, State>( target: React.Component<Props, State>, fcn: ( nextProps: Props, nextState: State,/** If contextTypes is defined within a component,will receive an additional parameter, the context object */ nextContext?: any ) => void ) {
			let boundFcn = __.bind( fcn, target );
			( target as any ).componentWillUpdate = boundFcn;
			return boundFcn;
		}
		export function bindComponentDidUpdate<Props, State>( target: React.Component<Props, State>, fcn: ( prevProps: Props, prevState: State,/** If contextTypes is defined within a component,will receive an additional parameter, the context object */ prevContext?: any ) => void ) {
			let boundFcn = __.bind( fcn, target );
			( target as any ).componentDidUpdate = boundFcn;
			return boundFcn;
		}

		export function bindComponentWillUnmount<Props, State>( target: React.Component<Props, State>, fcn: () => void ) {
			let boundFcn = __.bind( fcn, target );
			( target as any ).componentWillUnmount = boundFcn;
			return boundFcn;
		}
	}
}
export module reduxHelpers {

	/** the output of all redux actions should be in this form */
	export interface IReduxActionResult<TValue> {
		/** required by redux, informs what reducer should get this 'action' to process*/
		type: string;
		/** our opinionated encapsulation of state changes*/
		value: TValue;
	}

	/** the output of all redux actions should be in this form */
	export interface IReduxActionResultPromise<TValue> {
		/** required by redux, informs what reducer should get this 'action' to process*/
		type: string;
		/** use the "redux-promise-middleware" to allow passing promises */
		payload?: Promise<TValue>;
	}



	/** interface for our blib redux state pattern.  to simplify + modularize redux state management */
	export interface IReduxStateModule {
		/** a "init helper" sub-module */
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
		/** all actions that your state exposes */
		actions: any;
		/** the key that this state is stored under in the reduxStateStore*/
		stateKey: string;
	}
	//export interface IReduxStateModuleInitalizeFinish {
	//    (reduxStore: Redux.Store<any>): Promise<void>;
	//}

	/**
	 * handles all the bootstrapping (initialization) of react+redux+reactRouterRedux applications.   just make sure you pass in your redux-states in the "IReduxStateModule" format to the function parameters.
	 * @param _ezStates
	 */
	export function initReactReduxRouterApplication( ..._ezStates: IReduxStateModule[] ) {


		//let _ezStates: blib.reduxHelpers.IReduxStateModule[] = [];

		//import * as counter from "./state/count";
		//_ezStates.push(counter);
		/** redux state / actions for authentication */
		//_ezStates.push(authJwt.states.authState);


		//log.info("here");
		//console.log("here");



		//const history = ReactRouter.createMemoryHistory(); //this works, at least in chrome, but no hashtag for location hints.
		const history = ReactRouter.hashHistory;//works, creates hash fragments to store location
		/////////////// apply middleware
		const middleware = Redux.applyMiddleware(

			/** need to apply this to use the push method,  see: https://github.com/reactjs/react-router-redux#what-if-i-want-to-issue-navigation-events-via-redux-actions or https://github.com/reactjs/react-router-redux/issues/366 */
			ReactRouterRedux.routerMiddleware( history ),
			ReduxLogger( {
				collapsed: true,
				diff: true,
				////experimenting to see if we can remove diff if no diff occurs.   guess not.
				//diffPredicate: (getState, action) => {
				//    let diffResult = getState();
				//    console.info("dir");
				//    console.dir({ diffResult, action });
				//    return true;
				//},
			}),
			reduxPromise,
			//promiseMiddleware(),
			//redux-thunk goes here too

		);


		///////////////  apply redux-devtools chrome extension if present
		//see: https://github.com/gaearon/redux-devtools/blob/master/docs/Walkthrough.md
		// get the extension from here:  https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd

		//procedurally inject the redux devtools extension if it's present
		const composeEnhancers = ( window as any )[ "__REDUX_DEVTOOLS_EXTENSION_COMPOSE__" ] || Redux.compose;



		//import our redux state objects and bind them
		let _rawReducers: Redux.ReducersMapObject = {};

		/** start final redux state module initializations */
		__.forEach( _ezStates, ( state ) => {
			state._init.initializeStart( _rawReducers );
		});
		_rawReducers[ "routing" ] = ReactRouterRedux.routerReducer; //include our routing module
		/**
		 *  //create a single reducer function from our components
		 */
		const reducer = Redux.combineReducers( _rawReducers );

		/**
		 * the whole state tree of the app  use actions to manipulate 
		 */
		const reduxStore = Redux.createStore( reducer,
			composeEnhancers( middleware )
		);
		ReactRouterRedux.syncHistoryWithStore( history, reduxStore );

		/** finish final redux state module initializations */
		__.forEach( _ezStates, ( state ) => {
			state._init.initializeFinish( reduxStore );
		});


		return { reduxStore, history: history as any };
	}

	/**
	 * Novaleaf's "best practice" for using redux:  
	 * for actions, the best way is not to use this, but to create a bound-action and reference those action functions directly in their declaring modules.
	 * see the auth module for example code.
	 */
	export function reduxConnect<TComponentClass extends typeof React.Component>(
		/** the component that you want bound to redux */
		ComponentClass: TComponentClass,
		/** an array of the redux states you want sent to your component as a prop.   example:  "auth" via the auth modules auth.reduxState.authKey property */
		states: string[] = [],
		actions: {}[] = [],
	) {

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
		let mapDispatchToProps: any;
		if ( actions == null || actions.length == 0 ) {
			mapDispatchToProps = {};
		} else {
			mapDispatchToProps = {};
			__.forEach( actions, ( value, index ) => {
				_.merge( mapDispatchToProps, value );
			});
		}
		//////////////////////////
		/// construct "mapStatesToProps"" state map fcn, if any
		/// this will be called for every mounted reduxConnected component every time any redux state is changed, sending the component the latest redux store state.
		/// it is critical that you don't clone the state like I did previously (see commented _clone() line below) 
		/// otherwise each component will detect that it's redux state-->prop has changed and force an update+redraw
		let mapStatesToProps: any;
		if ( states == null || states.length == 0 ) {
			mapStatesToProps = null;
		} else {
			mapStatesToProps = (
				/** the redux store. a key-value pojo store  */
				reduxStoreState: any,
				/** not sure what arg2 is supposed to be, but it seems to be other props sent to the component */
				arg2: any
			) => {
				//grab all the states that this component is interested in, and return them
				let targetStates: any = {};
				__.forEach( states, ( stateKey ) => {
					targetStates[ stateKey ] = reduxStoreState[ stateKey ];// _.clone(reduxStoreState[stateKey]);
				});
				return targetStates;
			};
		}

		//do redux Connect

		return ReactRedux.connect( mapStatesToProps, mapDispatchToProps )( ComponentClass ) as TComponentClass;



	}

}

/** easy cookie query and manipulation.  https://www.npmjs.com/package/js-cookie */
export import Cookie = require( "js-cookie" );

declare const ga: any;
/**
 * if you have google analytics installed, this allows you to call it.  if ga isn't installed, any calls to this are nooped
 */
export var googleAnalytics: any = <any>function ( ...args: any[] ) {
	if ( typeof ga === "undefined" ) {
		return;
	}
	return ga.apply( ga, args );
}

/**
 * helper for SPA's to record a pagehit, using the pathname+hash as the page id.
 */
export function ga_ezSpaPageHit() {
	//send page hit
	let spaId = document.location.pathname + xlib.stringHelper.removeAfter( document.location.hash, "?" );
	googleAnalytics( "set", "page", spaId );
	googleAnalytics( "send", "pageview" );
}

/** works with v4 too  https://www.npmjs.com/package/react-bootstrap */
//export import ReactBootstrap = require( "react-bootstrap" );
import _reactstrap = require("./_dts/reactstrap");
export const ReactStrap = _reactstrap.ReactStrap;
/** shim ReactStrap into ReactBootstrap */
export const ReactBootstrap = ReactStrap;
//export const rs: typeof ReactBootstrap = require("reactstrap");

/**
 *  npm react-stripe-checkout
 */
export var reactStripeCheckout = require( "react-stripe-checkout" );


/**
 *  React-Loader, docs here: https://github.com/quickleft/react-loader
easiest way to use example:  <ReactLoader loaded={this.isLoaded}>Finished Loading! put the content you wait on here.</ReactLoader>
 */
export var ReactLoader: React.ComponentClass<{ loaded: boolean }> = require( "react-loader" );

export import _ReactBootstrapTypeahead_Definitions = require("./_dts/react-bootstrap-typeahead");
export const ReactBootstrapTypeahead = _ReactBootstrapTypeahead_Definitions.ReactBootstrapTypeahead;
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
export let ReactRecaptcha: React.ComponentClass<{
	/** 	The API client key*/
	sitekey: string;
	/**The function to be called when the user completes successfully the captcha*/
	onChange: ( captchaResponse: string ) => void;
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
}> = require( "react-google-recaptcha" );

/** common react components */
export import reactCommonComponents = require( "./react-common-components" );