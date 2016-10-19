import * as React from "react";
export { React };
import * as ReactDom from "react-dom";
export { ReactDom };
import * as Redux from "redux";
export { Redux };
import * as ReactRedux from "react-redux";
export { ReactRedux };
import * as ReactRouter from "react-router";
export { ReactRouter };
import * as ReactRouterRedux from "react-router-redux";
export { ReactRouterRedux };
import * as ReduxLogger from "redux-logger";
export { ReduxLogger };
export declare let ReduxUndo: {
    undoable: <T>(reducerIn: Redux.Reducer<T>) => Redux.Reducer<T>;
};
/** the output of all redux actions should be in this form */
export interface IReduxActionResult<TValue> {
    type: string;
    value: TValue;
}
/** interface for our blib redux state pattern.  to simplify + modularize redux state management */
export interface IReduxStateModule {
    _initializeStart(
        /** collection of reducers that will be combined later.   add your state reducer here */
        reducers: Redux.ReducersMapObject): void;
    _initializeFinish(
        /** in case you need it, such as creating bound actions */
        reduxStore: Redux.Store<any>): void;
    actions: any;
}
