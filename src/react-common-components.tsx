
import blib = require("./_index");

///////////////////  APP FOLLOWING PATTERNS FROM: http://localhost:8080/auth-with-shared-root/   (react-router example)





import Cookie = blib.Cookie;

import xlib = require("xlib");
import _ = xlib.lodash;
import __ = xlib.lolo;
var log = new xlib.logging.Logger(__filename);
//xlib.logging.logPromiseUnhandledRejections();
import jsHelper = xlib.jsHelper;
import Promise = xlib.promise.bluebird;

import React = blib.React;
import ReactDom = blib.ReactDom;
import Redux = blib.Redux;
import ReactRedux = blib.ReactRedux;
import ReactRouter = blib.ReactRouter; //tested with 1.x, not sure if it works with 2.x
//import History = blib.History;
import ReactBootstrap = blib.ReactBootstrap;
import ReactRouterRedux = blib.ReactRouterRedux;

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
        query: { [key: string]: string; };
        $searchBase: { search: string; searchBase: string; };
    };
    params: any;
    route: {
        path: string;
        component: (props:any, context:any) => any;
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
 */
export class EzModal extends React.Component<{ ref: string }, {
    isOpen: boolean;
    title?: string | JSX.Element;
    message?: string | JSX.Element;
    details?: string | JSX.Element;
    showOptions?: IEzModalShowOptions
}>{

    constructor(props:any) {
        super(props);
        this.state = { isOpen: false, title: undefined, message: undefined, details: undefined, showOptions: {} };
    }

    //componentDidMount() {
    //    //look for querystrings

    //    log.info("EzModal props", this.props);
    //}

    render() {

        const Modal = ReactBootstrap.Modal;
        const Button = ReactBootstrap.Button;
        let buttonJsx: JSX.Element;
        let onHideClick: Function;

        if (this.state.showOptions == null) {
            throw log.error("showOptions null", { state:this.state });
        }
        
        if (this.state.showOptions.confirmButtonText == null) {
            buttonJsx = <Button className="btn-primary" onClick= { this.CloseConfirm.bind(this) }> Close </Button>;
            onHideClick = this.CloseConfirm.bind(this);
        } else {
            buttonJsx = <span>
                <Button onClick={ this.CloseCancel.bind(this) }>Cancel </Button>
                    <Button className= "btn-primary" onClick= { this.CloseConfirm.bind(this) } > { this.state.showOptions.confirmButtonText } </Button>
                        </span>
                ;

            onHideClick = this.CloseCancel.bind(this);
        }


        //TODO:  how to pass args to function?
        return (
            <div>
            <Modal show={ this.state.isOpen } onHide= { onHideClick } backdrop= { this.state.showOptions.nonModal === true ? true : "static" } >

                <Modal.Header closeButton>
                <Modal.Title>{ this.state.title } </Modal.Title>
                </Modal.Header>
                < Modal.Body >
                <div className="row" >
                    <div className="col-sm-12" > { this.state.message } </div>
                        < div className= "col-sm-12" > <pre>{ this.state.details } </pre></div >
                            </div>
                            </Modal.Body>
                            < Modal.Footer >
                            { buttonJsx }
                            </Modal.Footer>
                            </Modal>
                            </div>
        );
    }

    private _modalClosePromise: xlib.promise._deprecated.IExposedPromise<void>|null=null;

    public Show(title: string | JSX.Element, message: string | JSX.Element, details?: string | JSX.Element, options?: IEzModalShowOptions) {
        //log.assert(false);
        if (options == null) {
            options = {};
        }

        if (this._modalClosePromise == null) {
            this._modalClosePromise = xlib.promise._deprecated.CreateExposedPromise<void>();
        }

        this.setState({ isOpen: true, title, message, details, showOptions: options });

        return this._modalClosePromise as Promise<void>;

    }

    public CloseConfirm() {
        //log.assert(false);
        this.setState({ isOpen: false });
        if (this._modalClosePromise != null) {
            let tempPromise = this._modalClosePromise;
            this._modalClosePromise = null;
            tempPromise.resolve(undefined);
        }
    }
    public CloseCancel() {
        //log.assert(false);
        this.setState({ isOpen: false });
        if (this._modalClosePromise != null) {
            let tempPromise = this._modalClosePromise;
            this._modalClosePromise = null;
            tempPromise.reject(undefined);
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

    var StripeCheckout = blib.reactStripeCheckout;
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
            this.state = { showOptions: _.clone(_defaultStripeCheckoutOptions) };
        }


        private _showPromise: xlib.promise._deprecated.IExposedPromise<{ stripeToken: xlib.definitions.stripe.IToken }>;

        /**
         * shows the stripe checkout modal using your options.    returns the stripeToken via promise.
         * @param showOptions
         */
        public showStripe(showOptions: IStripeCheckoutOptions): Promise<{ stripeToken: xlib.definitions.stripe.IToken }> {

            blib.googleAnalytics("send", "event", "stripeCheckout", "start");

            if (this._showPromise != null && this._showPromise.isResolved() !== true) {
                return Promise.reject(new Error("StripeCheckout.showStripe() already in progress"));
            }

            this._showPromise = xlib.promise._deprecated.CreateExposedPromise<{ stripeToken: xlib.definitions.stripe.IToken }>((resolve, reject) => {

                this.setState({ showOptions }, () => {
                    //callback
                    var stripeCheckout = this.refs["reactStripeCheckout"] as any;
                    //log.assert(false, "inspect", stripeCheckout);
                    stripeCheckout.showStripeDialog();
                });
            });

            return this._showPromise;

        }

        render() {
            let showOptions = this.state.showOptions;
            return (
                <StripeCheckout
                    ref="reactStripeCheckout"
            token = { this._onToken.bind(this) }
            stripeKey = { this.props.configOptions.stripeKey }
            billingAddress = { showOptions.billingAddressCheck }
            shippingAddress = { showOptions.shippingAddressCheck }
            currency = "USD"
            email = { showOptions.email }
            zipCode = { showOptions.zipCodeCheck }
            alipay = { showOptions.allowAlipay }
            alipayReusable = { showOptions.allowAlipayReusable }
            bitcoin = { showOptions.allowBitcoin }
            name = { showOptions.name }
            description = { showOptions.description }
            panelLabel = { showOptions.payButtonLabel }
            image = { showOptions.imageUrl }
            allowRememberMe = { showOptions.allowRememberMe }
            reconfigureOnUpdates = { true}
            reconfigureOnUpdate = { true}
            amount = { showOptions.amount }
            closed = { this._checkoutClosed.bind(this) }
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
                if (this._showPromise != null && this._showPromise.isResolved() !== true) {
                    this._showPromise.reject(new Error("aborted by user"));
                    blib.googleAnalytics("send", "event", "stripeCheckout", "cancel");
                    return;
                }
            });
        }


        private _onToken(stripeToken: xlib.definitions.stripe.IToken) {
            //log.debug("EzStrieCheckout.onToken()", { stripeToken, arguments });

            //setTimeout(() => {
            //log.debug("EzStrieCheckout.onToken().timeout");
            if (this._showPromise != null && this._showPromise.isResolved() !== true) {
                this._showPromise.resolve({ stripeToken });
                blib.googleAnalytics("send", "event", "stripeCheckout", "finish");
                return;
            }
            log.assert(false, "promise isn't ready, why?");
            //});
            //this.componentDidMount
        }

    }
}