import reactEco = require("./_index");
import xlib = require("xlib");
import Promise = xlib.promise.bluebird;
import React = reactEco.React;
export interface RouterProps {
    history: any;
    location: {
        pathname: string;
        search: string;
        hash: string;
        state: any;
        action: string;
        key: string;
        query: {
            [key: string]: string;
        };
        $searchBase: {
            search: string;
            searchBase: string;
        };
    };
    params: any;
    route: {
        path: string;
        component: (props: any, context: any) => any;
    };
    routeParams: any;
    routes: any[];
    children: any;
}
export declare class ReactRouterComponent<P, S> extends React.Component<P & RouterProps, S> {
}
/**
 * workaround for bug in typescript 1.7, disallowing use of generic type unions in components (cast components to this type)
 */
export declare class _GenericJsxComponent extends React.Component<{}, {}> {
}
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
export declare class EzModal extends React.Component<{
    ref: string;
}, {
    isOpen: boolean;
    title?: string | JSX.Element;
    message?: string | JSX.Element;
    details?: string | JSX.Element;
    showOptions?: IEzModalShowOptions;
}> {
    constructor(props: any);
    render(): JSX.Element;
    private _modalClosePromise;
    Show(title: string | JSX.Element, message: string | JSX.Element, details?: string | JSX.Element, options?: IEzModalShowOptions): Promise<void>;
    CloseConfirm: () => void;
    CloseCancel: () => void;
}
export declare module StripeCheckout {
    interface IStripeCheckoutOptions {
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
    /**
     * The Stripe Checkout modal, as an API.
     * how to use:
     *		//your Component:
     *		render(){ return <EzStripeCheckout ref="ezCheckout"/>}
     *		_btn_Click(){ let ezCheckout = this.refs["ezCheckout"] as EzStripeCheckout;  ezCheckout.showStripe(options).then((stripeToken)=>{ *use token* }); }
     */
    class EzStripeCheckout extends React.Component<{
        configOptions: {
            stripeKey: string;
        };
        ref: string;
    }, {
        showOptions: IStripeCheckoutOptions;
    }> {
        constructor();
        private _showPromise;
        /**
         * shows the stripe checkout modal using your options.    returns the stripeToken via promise.
         * @param showOptions
         */
        showStripe(showOptions: IStripeCheckoutOptions): Promise<{
            stripeToken: xlib.definitions.stripe.IToken;
        }>;
        render(): JSX.Element;
        /**
         *  called if manually closed by user, or after onToken() is called
         */
        private _checkoutClosed();
        private _onToken(stripeToken);
    }
}
/**
 *  bootstrap "Card" component
 * @param props
 */
export declare function Card(props: {
    children?: React.ReactNode;
}): JSX.Element;
/**
 * a <Button> component that will disable itself and show a loader spinner while the onClick callback is in-progress
 * great for async callback operations
 */
export declare class SpinnerButton extends React.Component<{
    /** if you want an external process to control the load state, you can force unloaded state by setting props.isLoaded=false */
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => Promise<any>;
    /** set to true to force the button to be disabled, doesn't impact the Spinner "waiting" state. */
    disabled?: boolean;
    /** set this property to false to force the spinner to the "Loading" status, even if it's promise is resolved. */
    isLoaded?: boolean;
    className?: string;
}, {
    onClickPromise: Promise<any> & {
        isMounted: boolean;
    };
}> {
    constructor(props: any);
    private _instrumentMountInfo(promise, isMounted);
    componentDidMount(): void;
    componentWillUnmount(): void;
    private isMounted;
    render(): JSX.Element;
    private _onClick;
}
export declare class Loader extends React.Component<{
    isLoaded: boolean;
    message?: any;
    unmountChildrenWhenLoading?: boolean;
}, {}> {
    render(): JSX.Element;
    private _getMessage();
    private _renderChildrenMaybe();
}
/**JSON viewer from npm react-json-tree */
import JSONTree from "react-json-tree";
/**JSON viewer from npm react-json-tree */
export declare const JsonTree: typeof JSONTree;
