
import reactEco = require( "./_index" );
import blib = require( "../_index" );

///////////////////  APP FOLLOWING PATTERNS FROM: http://localhost:8080/auth-with-shared-root/   (react-router example)






//import Cookie = blib.Cookie;

import xlib = require( "xlib" );
import _ = xlib.lodash;
import __ = xlib.lolo;
var log = new xlib.logging.Logger( __filename );
//xlib.logging.logPromiseUnhandledRejections();
import jsHelper = xlib.jsHelper;
import Promise = xlib.promise.bluebird;

import React = reactEco.React;
import ReactDom = reactEco.ReactDom;
import Redux = reactEco.Redux;
import ReactRedux = reactEco.ReactRedux;
import ReactRouter = reactEco.ReactRouter; //tested with 1.x, not sure if it works with 2.x
//import History = blib.History;
//import ReactBootstrap = blib.ReactBootstrap;
const ReactStrap = reactEco.ReactStrap;
import ReactRouterRedux = reactEco.ReactRouterRedux;



//import ioDatatypes = refs.ioDatatypes;
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

export interface RouterProps {
	history: any;
	location: {
		pathname: string;
		search: string;
		hash: string;
		state: any;
		action: string;
		key: string;
		query: { [ key: string ]: string; };
		$searchBase: { search: string; searchBase: string; };
	};
	params: any;
	route: {
		path: string;
		component: ( props: any, context: any ) => any;
	};
	routeParams: any;
	routes: any[];
	children: any;
}

export class ReactRouterComponent<P, S> extends React.Component<P & RouterProps, S>{ }

/**
 * workaround for bug in typescript 1.7, disallowing use of generic type unions in components (cast components to this type)
 */
export class _GenericJsxComponent extends React.Component<{}, {}>{ }

export interface IEzModalShowOptions {
	/** if set, allows clicking outside the modal to close.  this will cause the show promise to resolve as rejected if option.confirmButtonText is set, will resolve fullfilled otherwise */
	nonModal?: boolean;
	/** if null, only a "close" button is shown.   otherwise a confirm button with this text, and cancel button */
	confirmButtonText?: string;
}



/**
 * a simple, preformatted modal.   use from the parent Component:  ```this.refs["NAME"].Show()``` where NAME is the value of the ref property
 * OBSOLETE:  use EzPopup instead
 */
export class EzModal extends React.Component<{ ref: string }, {
	isOpen: boolean;
	title?: string | JSX.Element;
	message?: string | JSX.Element;
	details?: string | JSX.Element;
	showOptions?: IEzModalShowOptions
}>{

	constructor( props: any ) {
		super( props );
		this.state = { isOpen: false, title: undefined, message: undefined, details: undefined, showOptions: {} };
		log.deprecated( `${ xlib.reflection.getTypeName( this ) } is deprecated due to poor design.  use EzPopup instead` );
	}

	//componentDidMount() {
	//    //look for querystrings

	//    log.info("EzModal props", this.props);
	//}

	render() {

		//const Modal = ReactBootstrap.Modal;
		//const Button = ReactBootstrap.Button;
		let buttonJsx: JSX.Element;

		if ( this.state.showOptions == null ) {
			throw log.error( "showOptions null", { state: this.state } );
		}

		if ( this.state.showOptions.confirmButtonText == null ) {
			buttonJsx = <ReactStrap.Button className="btn-primary" onClick={ this.CloseConfirm }> Close </ReactStrap.Button>;
		} else {
			buttonJsx = <span>

				<ReactStrap.Button onClick={ this.CloseCancel }>Cancel </ReactStrap.Button>
				<ReactStrap.Button className="btn-primary" onClick={ this.CloseConfirm } > { this.state.showOptions.confirmButtonText } </ReactStrap.Button>
			</span>
				;

		}


		//TODO:  how to pass args to function?
		return (
			<div>
				<ReactStrap.Modal isOpen={ this.state.isOpen } toggle={ this.CloseConfirm } backdrop={ this.state.showOptions.nonModal === true ? true : "static" } >
					<ReactStrap.ModalHeader toggle={ this.CloseConfirm } >{ this.state.title }					</ReactStrap.ModalHeader>
					< ReactStrap.ModalBody >
						<div className="row" >
							<div className="col-sm-12" > { this.state.message } </div>
							< div className="col-sm-12" > <pre>{ this.state.details } </pre></div >
						</div>
					</ReactStrap.ModalBody>
					< ReactStrap.ModalFooter >
						{ buttonJsx }
					</ReactStrap.ModalFooter>
				</ReactStrap.Modal>
			</div>
		);
	}

	private _modalClosePromise: xlib.promise._deprecated.IExposedPromise<void> | null = null;

	public Show( title: string | JSX.Element, message: string | JSX.Element, details?: string | JSX.Element, options?: IEzModalShowOptions ) {
		//log.assert(false);
		if ( options == null ) {
			options = {};
		}

		if ( this._modalClosePromise == null ) {
			this._modalClosePromise = xlib.promise._deprecated.CreateExposedPromise<void>();
		}

		this.setState( { isOpen: true, title, message, details, showOptions: options } );

		return this._modalClosePromise as Promise<void>;

	}

	public CloseConfirm = () => {
		//log.assert(false);
		this.setState( { isOpen: false } );
		if ( this._modalClosePromise != null ) {
			let tempPromise = this._modalClosePromise;
			this._modalClosePromise = null;
			tempPromise.resolve( undefined );
		}
	}
	public CloseCancel = () => {
		//log.assert(false);
		this.setState( { isOpen: false } );
		if ( this._modalClosePromise != null ) {
			let tempPromise = this._modalClosePromise;
			this._modalClosePromise = null;
			tempPromise.reject( undefined );
		}
	}
}


export module StripeCheckout {

	export interface IStripeCheckoutOptions {
		amount: number;
		email?: string;
		zipCodeCheck: boolean;
		billingAddressCheck: boolean;
		shippingAddressCheck: boolean;
		allowAlipay: boolean;
		allowBitcoin: boolean;
		name?: string;
		description?: string;
		payButtonLabel?: string;
		imageUrl?: string;
		allowRememberMe: boolean;
		allowAlipayReusable: boolean;
	}
	var _defaultStripeCheckoutOptions: IStripeCheckoutOptions = {
		allowAlipay: false,
		allowAlipayReusable: false,
		allowBitcoin: false,
		allowRememberMe: false,
		amount: 0,
		billingAddressCheck: false,
		description: undefined,
		email: undefined,
		imageUrl: undefined,
		name: undefined,
		payButtonLabel: undefined,
		shippingAddressCheck: false,
		zipCodeCheck: false,
	};

	var StripeCheckout = reactEco.reactStripeCheckout;
	/**
	 * The Stripe Checkout modal, as an API.
	 * how to use:
	 *		//your Component:
	 *		render(){ return <EzStripeCheckout ref="ezCheckout"/>}
	 *		_btn_Click(){ let ezCheckout = this.refs["ezCheckout"] as EzStripeCheckout;  ezCheckout.showStripe(options).then((stripeToken)=>{ *use token* }); }
	 */
	export class EzStripeCheckout extends React.Component<{ configOptions: { stripeKey: string }, ref: string }, { showOptions: IStripeCheckoutOptions }>{

		constructor() {
			super();
			this.state = { showOptions: _.clone( _defaultStripeCheckoutOptions ) };
		}


		private _showPromise: xlib.promise._deprecated.IExposedPromise<{ stripeToken: xlib.definitions.stripe.IToken }>;

		/**
		 * shows the stripe checkout modal using your options.    returns the stripeToken via promise.
		 * @param showOptions
		 */
		public showStripe( showOptions: IStripeCheckoutOptions ): Promise<{ stripeToken: xlib.definitions.stripe.IToken }> {

			blib.googleAnalytics( "send", "event", "stripeCheckout", "start" );

			if ( this._showPromise != null && this._showPromise.isResolved() !== true ) {
				return Promise.reject( new Error( "StripeCheckout.showStripe() already in progress" ) );
			}

			this._showPromise = xlib.promise._deprecated.CreateExposedPromise<{ stripeToken: xlib.definitions.stripe.IToken }>(( resolve, reject ) => {

				this.setState( { showOptions }, () => {
					//callback
					var stripeCheckout = this.refs[ "reactStripeCheckout" ] as any;
					//log.assert(false, "inspect", stripeCheckout);
					stripeCheckout.showStripeDialog();
				} );
			} );

			return this._showPromise;

		}

		render() {
			let showOptions = this.state.showOptions;
			return (
				<StripeCheckout
					ref="reactStripeCheckout"
					token={ this._onToken.bind( this ) }
					stripeKey={ this.props.configOptions.stripeKey }
					billingAddress={ showOptions.billingAddressCheck }
					shippingAddress={ showOptions.shippingAddressCheck }
					currency="USD"
					email={ showOptions.email }
					zipCode={ showOptions.zipCodeCheck }
					alipay={ showOptions.allowAlipay }
					alipayReusable={ showOptions.allowAlipayReusable }
					bitcoin={ showOptions.allowBitcoin }
					name={ showOptions.name }
					description={ showOptions.description }
					panelLabel={ showOptions.payButtonLabel }
					image={ showOptions.imageUrl }
					allowRememberMe={ showOptions.allowRememberMe }
					reconfigureOnUpdates={ true }
					reconfigureOnUpdate={ true }
					amount={ showOptions.amount }
					closed={ this._checkoutClosed.bind( this ) }
				> <button style={ { display: "none" } }></button>
				</StripeCheckout>
			);
		}
		/**
		 *  called if manually closed by user, or after onToken() is called
		 */
		private _checkoutClosed() {

			//log.debug("EzStrieCheckout._checkoutClosed()", { arguments });

			//need to put in timeout otherwise source-map-support barfs with xss security errors
			setTimeout(() => {
				//log.debug("EzStrieCheckout._checkoutClosed().timeout");
				if ( this._showPromise != null && this._showPromise.isResolved() !== true ) {
					this._showPromise.reject( new Error( "aborted by user" ) );
					blib.googleAnalytics( "send", "event", "stripeCheckout", "cancel" );
					return;
				}
			} );
		}


		private _onToken( stripeToken: xlib.definitions.stripe.IToken ) {
			//log.debug("EzStrieCheckout.onToken()", { stripeToken, arguments });

			//setTimeout(() => {
			//log.debug("EzStrieCheckout.onToken().timeout");
			if ( this._showPromise != null && this._showPromise.isResolved() !== true ) {
				this._showPromise.resolve( { stripeToken } );
				blib.googleAnalytics( "send", "event", "stripeCheckout", "finish" );
				return;
			}
			log.assert( false, "promise isn't ready, why?" );
			//});
			//this.componentDidMount
		}

	}
}


/**
 *  bootstrap "Card" component
 * @param props
 */
export function Card( props: { children?: React.ReactNode } ) {
	return (
		<div className="card">
			<div className="card-block">
				{ props.children }
			</div>
		</div>
	);
};



/**
 * a <Button> component that will disable itself and show a loader spinner while the onClick callback is in-progress
 * great for async callback operations
 * by default will show a dismissible popover when a rejected promise is returned.  this is configurable via props
 */
export class SpinnerButton extends React.Component<{
	/** if you want an external process to control the load state, you can force unloaded state by setting props.isLoaded=false */
	onClick: ( event: React.MouseEvent<HTMLButtonElement> ) => Promise<any>;
	/** set to true to force the button to be disabled, doesn't impact the Spinner "waiting" state. */
	disabled?: boolean;
	/** set this property to false to force the spinner to the "Loading" status, even if it's promise is resolved. */
	isLoaded?: boolean;
	/** set the class of the underlying button */
	className?: string;
	/** customize the error popover. if this is not set, we show the err.message by default.  return null or undefined to silently ignore the error */
	customError?: ( err: Error ) => { title: string | JSX.Element; content: string | JSX.Element };
}, {

		onClickPromise: Promise<any> & {
			/** internal helper used to track mounted state, to avoid firing additional callbacks if this component is no longer mounted*/
			isMounted: boolean
		},
		popoverOpen: boolean;
		buttonId: string;
		errDetails: { title: string | JSX.Element; content: string | JSX.Element };

	}>{

	constructor( props: any ) {
		super( props );

		let onClickPromise = this._instrumentMountInfo( Promise.resolve(), false );
		this.state = {
			onClickPromise,
			popoverOpen: false,
			buttonId: `spinner_${ xlib.security.randomAsciiStringCrypto( 10 ) }`,
			errDetails: { title: "", content: "" },
		};
	}

	/** inject the isMounted property onto the Promise */
	private _instrumentMountInfo( promise: Promise<any>, isMounted: boolean ) {
		//let promiseTypeProxy = this.state.onClickPromise;
		let toReturn = promise as Promise<any> & { /** internal helper used to track mounted state, to avoid firing additional callbacks if this component is no longer mounted*/ isMounted: boolean };
		toReturn.isMounted = isMounted;
		return toReturn;
	}

	public componentDidMount() {
		this.state.onClickPromise.isMounted = true;
	}

	public componentWillUnmount() {
		this.state.onClickPromise.isMounted = false;
	}

	private isMounted: boolean;

	render() {

		const { isLoaded, onClick, customError, ...otherProps } = this.props;

		return (

			<button
				id={ this.state.buttonId }
				onClick={ this._onClick }
				disabled={ this.state.onClickPromise.isResolved() === false || this.props.disabled === true || this.props.isLoaded === false }

				{...otherProps}
			>
				<reactEco.ReactLoader loaded={ ( this.state.onClickPromise.isResolved() && this.props.isLoaded !== false ) } />
				{ this.props.children }
				<ReactStrap.Popover placement="bottom" isOpen={ this.state.popoverOpen } toggle={ () => { this.setState( { popoverOpen: !this.state.popoverOpen } as any ) } } target={ this.state.buttonId } >
					<ReactStrap.PopoverTitle><span className="badge badge-danger">{ this.state.errDetails.title }</span></ReactStrap.PopoverTitle>
					<ReactStrap.PopoverContent><div className="alert alert-danger" role="alert">{ this.state.errDetails.content }}</div></ReactStrap.PopoverContent>
				</ReactStrap.Popover>
			</button>

		);

	}

	private _onClick = ( event: React.MouseEvent<HTMLButtonElement> ) => {
		event.preventDefault();

		let clickPromise = this.props.onClick( event )
			.catch(( err: Error ) => {
				//log.warn( "in on click catch", { currentTarget: event.currentTarget,  } );
				let errDetails = this.props.customError == null ? {
					title: ( <div>An Error Occured</div> ),
					content: ( <div>{ err.message }</div> )
				} : this.props.customError( err );
				
				if ( errDetails != null ) {					
					this.setState( { popoverOpen: !this.state.popoverOpen, errDetails } as any );
				}else{
					//silently eat the error.
				}
			} );
		let onClickPromise = this._instrumentMountInfo( clickPromise, this.state.onClickPromise.isMounted ); //re-store the current isMounted state

		this.setState( { onClickPromise } as any );

		onClickPromise.finally(() => {

			if ( this.state.onClickPromise.isMounted === true ) {
				//notify that our promise state has changed internally
				this.setState( { onClickPromise } as any );
			}
		} );
	};



}


const RLA = require( "react-loader-advanced" ).default;
/** IMPORTANT TODO:  need to import the css definitions to use this:  https://github.com/chenglou/react-spinner  
 * see this for info on how to inject the styles:   https://github.com/chenglou/react-spinner/issues/17 
*/
const Spinner = require( "react-spinner" );

export class Loader extends React.Component<{ isLoaded: boolean, message?: any, unmountChildrenWhenLoading?: boolean }, {}>{
	render() {
		return (
			<div>
				<Spinner />
				<RLA show={ this.props.isLoaded === false } message={ ( <div><Spinner /><br />{ this._getMessage() }</div> ) }>
					{ this._renderChildrenMaybe() }
				</RLA>
			</div>
		);
	}

	private _getMessage() {
		return this.props.message == null ? "Loading..." : this.props.message;

	}
	private _renderChildrenMaybe() {
		if ( this.props.isLoaded === false && this.props.unmountChildrenWhenLoading === true ) {
			return <div><br />{ this._getMessage() }<br /></div>;
		} else {
			return this.props.children;
		}
	}

}



//import ReactJsonTree = require("react-json-tree");


/**JSON viewer from npm react-json-tree */
import JSONTree from "react-json-tree";
/**JSON viewer from npm react-json-tree */
export const JsonTree = JSONTree;
//export {/**JSON viewer from npm react-json-tree */JSONTree};


