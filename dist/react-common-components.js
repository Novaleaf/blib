"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
const blib = require("./_index");
const xlib = require("xlib");
var _ = xlib.lodash;
var log = new xlib.logging.Logger(__filename);
var Promise = xlib.promise.bluebird;
var React = blib.React;
//import History = blib.History;
//import ReactBootstrap = blib.ReactBootstrap;
const ReactStrap = blib.ReactStrap;
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
 * OBSOLETE:  use EzPopup instead
 */
class EzModal extends React.Component {
    constructor(props) {
        super(props);
        this._modalClosePromise = null;
        this.CloseConfirm = () => {
            //log.assert(false);
            this.setState({ isOpen: false });
            if (this._modalClosePromise != null) {
                let tempPromise = this._modalClosePromise;
                this._modalClosePromise = null;
                tempPromise.resolve(undefined);
            }
        };
        this.CloseCancel = () => {
            //log.assert(false);
            this.setState({ isOpen: false });
            if (this._modalClosePromise != null) {
                let tempPromise = this._modalClosePromise;
                this._modalClosePromise = null;
                tempPromise.reject(undefined);
            }
        };
        this.state = { isOpen: false, title: undefined, message: undefined, details: undefined, showOptions: {} };
        log.deprecated(`${xlib.reflection.getTypeName(this)} is deprecated due to poor design.  use EzPopup instead`);
    }
    //componentDidMount() {
    //    //look for querystrings
    //    log.info("EzModal props", this.props);
    //}
    render() {
        //const Modal = ReactBootstrap.Modal;
        //const Button = ReactBootstrap.Button;
        let buttonJsx;
        if (this.state.showOptions == null) {
            throw log.error("showOptions null", { state: this.state });
        }
        if (this.state.showOptions.confirmButtonText == null) {
            buttonJsx = React.createElement(ReactStrap.Button, { className: "btn-primary", onClick: this.CloseConfirm }, " Close ");
        }
        else {
            buttonJsx = React.createElement("span", null,
                React.createElement(ReactStrap.Button, { onClick: this.CloseCancel }, "Cancel "),
                React.createElement(ReactStrap.Button, { className: "btn-primary", onClick: this.CloseConfirm },
                    " ",
                    this.state.showOptions.confirmButtonText,
                    " "));
        }
        //TODO:  how to pass args to function?
        return (React.createElement("div", null,
            React.createElement(ReactStrap.Modal, { isOpen: this.state.isOpen, toggle: this.CloseConfirm, backdrop: this.state.showOptions.nonModal === true ? true : "static" },
                React.createElement(ReactStrap.ModalHeader, { toggle: this.CloseConfirm },
                    this.state.title,
                    "\t\t\t\t\t"),
                React.createElement(ReactStrap.ModalBody, null,
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
                React.createElement(ReactStrap.ModalFooter, null, buttonJsx))));
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
 *  bootstrap "Card" component
 * @param props
 */
function Card(props) {
    return (React.createElement("div", { className: "card" },
        React.createElement("div", { className: "card-block" }, props.children)));
}
exports.Card = Card;
;
/**
 * a <Button> component that will disable itself and show a loader spinner while the onClick callback is in-progress
 * great for async callback operations
 */
class SpinnerButton extends React.Component {
    constructor(props) {
        super(props);
        this._onClick = (event) => {
            event.preventDefault();
            let clickPromise = this.props.onClick(event);
            let onClickPromise = this._instrumentMountInfo(clickPromise, this.state.onClickPromise.isMounted); //re-store the current isMounted state
            this.setState({ onClickPromise });
            onClickPromise.finally(() => {
                if (this.state.onClickPromise.isMounted === true) {
                    //notify that our promise state has changed internally
                    this.setState({ onClickPromise });
                }
            });
        };
        let onClickPromise = this._instrumentMountInfo(Promise.resolve(), false);
        this.state = {
            onClickPromise,
        };
    }
    _instrumentMountInfo(promise, isMounted) {
        //let promiseTypeProxy = this.state.onClickPromise;
        let toReturn = promise;
        toReturn.isMounted = isMounted;
        return toReturn;
    }
    componentDidMount() {
        this.state.onClickPromise.isMounted = true;
    }
    componentWillUnmount() {
        this.state.onClickPromise.isMounted = false;
    }
    render() {
        const _a = this.props, { isLoaded, onClick } = _a, otherProps = __rest(_a, ["isLoaded", "onClick"]);
        return (React.createElement("button", __assign({ onClick: this._onClick, disabled: this.state.onClickPromise.isResolved() === false || this.props.disabled === true || this.props.isLoaded === false }, otherProps),
            React.createElement(blib.ReactLoader, { loaded: (this.state.onClickPromise.isResolved() && this.props.isLoaded !== false) }),
            this.props.children));
    }
}
exports.SpinnerButton = SpinnerButton;
const RLA = require("react-loader-advanced").default;
/** IMPORTANT TODO:  need to import the css definitions to use this:  https://github.com/chenglou/react-spinner
 * see this for info on how to inject the styles:   https://github.com/chenglou/react-spinner/issues/17
*/
const Spinner = require("react-spinner");
class Loader extends React.Component {
    render() {
        return (React.createElement("div", null,
            React.createElement(Spinner, null),
            React.createElement(RLA, { show: this.props.isLoaded === false, message: (React.createElement("div", null,
                    React.createElement(Spinner, null),
                    React.createElement("br", null),
                    this._getMessage())) }, this._renderChildrenMaybe())));
    }
    _getMessage() {
        return this.props.message == null ? "Loading..." : this.props.message;
    }
    _renderChildrenMaybe() {
        if (this.props.isLoaded === false && this.props.unmountChildrenWhenLoading === true) {
            return React.createElement("div", null,
                React.createElement("br", null),
                this._getMessage(),
                React.createElement("br", null));
        }
        else {
            return this.props.children;
        }
    }
}
exports.Loader = Loader;
//import ReactJsonTree = require("react-json-tree");
/**JSON viewer from npm react-json-tree */
const react_json_tree_1 = require("react-json-tree");
/**JSON viewer from npm react-json-tree */
exports.JsonTree = react_json_tree_1.default;
//export {/**JSON viewer from npm react-json-tree */JSONTree};
//# sourceMappingURL=react-common-components.js.map