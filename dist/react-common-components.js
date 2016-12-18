"use strict";
const blib = require("./_index");
const xlib = require("xlib");
var _ = xlib.lodash;
var log = new xlib.logging.Logger(__filename);
var Promise = xlib.promise.bluebird;
var React = blib.React;
//import History = blib.History;
var ReactBootstrap = blib.ReactBootstrap;
class ReactRouterComponent extends React.Component {
}
exports.ReactRouterComponent = ReactRouterComponent;
/**
 * workaround for bug in typescript 1.7, disallowing use of generic type unions in components (cast components to this type)
 */
class _GenericJsxComponent extends React.Component {
}
exports._GenericJsxComponent = _GenericJsxComponent;
/**
 * a simple, preformatted modal.   use from the parent Component:  ```this.refs["NAME"].Show()``` where NAME is the value of the ref property
 */
class EzModal extends React.Component {
    constructor(props) {
        super(props);
        this._modalClosePromise = null;
        this.state = { isOpen: false, title: undefined, message: undefined, details: undefined, showOptions: {} };
    }
    //componentDidMount() {
    //    //look for querystrings
    //    log.info("EzModal props", this.props);
    //}
    render() {
        const Modal = ReactBootstrap.Modal;
        const Button = ReactBootstrap.Button;
        let buttonJsx;
        let onHideClick;
        if (this.state.showOptions == null) {
            throw log.error("showOptions null", { state: this.state });
        }
        if (this.state.showOptions.confirmButtonText == null) {
            buttonJsx = React.createElement(Button, { className: "btn-primary", onClick: this.CloseConfirm.bind(this) }, " Close ");
            onHideClick = this.CloseConfirm.bind(this);
        }
        else {
            buttonJsx = React.createElement("span", null,
                React.createElement(Button, { onClick: this.CloseCancel.bind(this) }, "Cancel "),
                React.createElement(Button, { className: "btn-primary", onClick: this.CloseConfirm.bind(this) },
                    " ",
                    this.state.showOptions.confirmButtonText,
                    " "));
            onHideClick = this.CloseCancel.bind(this);
        }
        //TODO:  how to pass args to function?
        return (React.createElement("div", null,
            React.createElement(Modal, { show: this.state.isOpen, onHide: onHideClick, backdrop: this.state.showOptions.nonModal === true ? true : "static" },
                React.createElement(Modal.Header, { closeButton: true },
                    React.createElement(Modal.Title, null,
                        this.state.title,
                        " ")),
                React.createElement(Modal.Body, null,
                    React.createElement("div", { className: "row" },
                        React.createElement("div", { className: "col-sm-12" },
                            " ",
                            this.state.message,
                            " "),
                        React.createElement("div", { className: "col-sm-12" },
                            " ",
                            React.createElement("pre", null,
                                this.state.details,
                                " ")))),
                React.createElement(Modal.Footer, null, buttonJsx))));
    }
    Show(title, message, details, options) {
        //log.assert(false);
        if (options == null) {
            options = {};
        }
        if (this._modalClosePromise == null) {
            this._modalClosePromise = xlib.promise._deprecated.CreateExposedPromise();
        }
        this.setState({ isOpen: true, title, message, details, showOptions: options });
        return this._modalClosePromise;
    }
    CloseConfirm() {
        //log.assert(false);
        this.setState({ isOpen: false });
        if (this._modalClosePromise != null) {
            let tempPromise = this._modalClosePromise;
            this._modalClosePromise = null;
            tempPromise.resolve(undefined);
        }
    }
    CloseCancel() {
        //log.assert(false);
        this.setState({ isOpen: false });
        if (this._modalClosePromise != null) {
            let tempPromise = this._modalClosePromise;
            this._modalClosePromise = null;
            tempPromise.reject(undefined);
        }
    }
}
exports.EzModal = EzModal;
var StripeCheckout;
(function (StripeCheckout_1) {
    var _defaultStripeCheckoutOptions = {
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
    class EzStripeCheckout extends React.Component {
        constructor() {
            super();
            this.state = { showOptions: _.clone(_defaultStripeCheckoutOptions) };
        }
        /**
         * shows the stripe checkout modal using your options.    returns the stripeToken via promise.
         * @param showOptions
         */
        showStripe(showOptions) {
            blib.googleAnalytics("send", "event", "stripeCheckout", "start");
            if (this._showPromise != null && this._showPromise.isResolved() !== true) {
                return Promise.reject(new Error("StripeCheckout.showStripe() already in progress"));
            }
            this._showPromise = xlib.promise._deprecated.CreateExposedPromise((resolve, reject) => {
                this.setState({ showOptions }, () => {
                    //callback
                    var stripeCheckout = this.refs["reactStripeCheckout"];
                    //log.assert(false, "inspect", stripeCheckout);
                    stripeCheckout.showStripeDialog();
                });
            });
            return this._showPromise;
        }
        render() {
            let showOptions = this.state.showOptions;
            return (React.createElement(StripeCheckout, { ref: "reactStripeCheckout", token: this._onToken.bind(this), stripeKey: this.props.configOptions.stripeKey, billingAddress: showOptions.billingAddressCheck, shippingAddress: showOptions.shippingAddressCheck, currency: "USD", email: showOptions.email, zipCode: showOptions.zipCodeCheck, alipay: showOptions.allowAlipay, alipayReusable: showOptions.allowAlipayReusable, bitcoin: showOptions.allowBitcoin, name: showOptions.name, description: showOptions.description, panelLabel: showOptions.payButtonLabel, image: showOptions.imageUrl, allowRememberMe: showOptions.allowRememberMe, reconfigureOnUpdates: true, reconfigureOnUpdate: true, amount: showOptions.amount, closed: this._checkoutClosed.bind(this) },
                " ",
                React.createElement("button", { style: { display: "none" } })));
        }
        /**
         *  called if manually closed by user, or after onToken() is called
         */
        _checkoutClosed() {
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
        _onToken(stripeToken) {
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
    StripeCheckout_1.EzStripeCheckout = EzStripeCheckout;
})(StripeCheckout = exports.StripeCheckout || (exports.StripeCheckout = {}));
/**
 * a <Button> component that will disable itself and show a loader spinner while the onClick callback is in-progress
 * great for async callback operations
 */
class SpinnerButton extends React.Component {
    constructor(props) {
        super(props);
        this._onClick = (event) => {
            event.preventDefault();
            let onClickPromise = this.props.onClick(event);
            this.setState({ onClickPromise });
            onClickPromise.finally(() => {
                if (this.state.isMounted === true) {
                    this.forceUpdate();
                }
            });
        };
        this.state = {
            onClickPromise: Promise.resolve(),
            isMounted: false,
        };
        // let state = this.state;
        // let partialState : Partial<typeof state> = {isMounted:false};
        blib.reactHelpers.componentLifecycle.bindComponentWillUnmount(this, () => { this.setState({ isMounted: false }); });
        blib.reactHelpers.componentLifecycle.bindComponentWillMount(this, () => { this.setState({ isMounted: true }); });
    }
    render() {
        return (React.createElement("button", { onClick: this._onClick, disabled: this.state.onClickPromise.isResolved() === false || this.props.isDisabled === true },
            React.createElement(blib.ReactLoader, { loaded: (this.state.onClickPromise.isResolved()) }),
            this.props.children));
    }
}
exports.SpinnerButton = SpinnerButton;
//# sourceMappingURL=react-common-components.js.map