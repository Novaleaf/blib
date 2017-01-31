//definitions for the npm module https://github.com/ericgio/react-bootstrap-typeahead
//definition by JasonS@Novaleaf.com

import * as React from 'react';

export declare namespace react_bootstrap_typeahead {

	/** react-bootstrap-typeahead accepts an array of either strings or objects. If you pass in objects, each one should have a string property to be used as the label for display. By default, the key is named label, but you can specify a different key via the labelKey prop. If you pass an array of strings, the labelKey prop will be ignored.
	
	The component will throw an error if any options are something other than a string or object with a valid labelKey.
	
	The following are valid data structures:
	
	// Array of strings.
	var myData = [ 'John', 'Miles',];
	
	// Array of objects with default `labelKey`.
	var myData = [ {id: 1, label: 'John'}, {id: 2, label: 'Miles'},];
	
	// Array of objects with custom `labelKey`. The `labelKey` prop must be set to 'name' in this case.
	var myData = [ {id: 1, name: 'John'}, {id: 2, name: 'Miles'},];
	
	// Mixed array of strings and objects. Note: while valid, this is NOT recommended.
	var myData = [ 'John', 'Miles', {id: 3, label: 'Charles'}, 'Herbie',];
	
	Duplicate Data
	You may have unexpected results if your data contains duplicate options. For this reason, it is highly recommended that you pass in objects with unique identifiers (eg: an id) if possible.
	
	Data Sources
	The component simply handles rendering and selection of the data that is passed in. It is agnostic about the data source (eg: an async endpoint), which should be handled separately. */
	export type IDataOption = string | {
		id: number;
		label: string;
	}

	export interface ITypeaheadOptions{

		/** default 'justify'	Specify menu alignment. The default value is justify, which makes the menu as wide as the input and truncates long values. Specifying left or right will align the menu to that side and the width will be determined by the length of menu item values. */
		align?: string;
		/** 	false	Allows the creation of new selections on the fly. Any new items will be added to the list of selections, but not the list of original options unless handled as such by Typeahead's parent. The newly added item will always be returned as an object even if the other options are simply strings, so be sure your onChange callback can handle this.		*/
		allowNew?: boolean;
		/** one of: 'large', 'lg', 'small', 'sm'		Specify the size of the input.*/
		bsSize?: "large" | "lg" | "small" | "sm";
		/** default 	false	Whether or not filtering should be case-sensitive.
		 * Setting this prop to true changes the string match to be, you guessed it, case-sensitive. Defaults to false.
		 */
		caseSensitive?: boolean;
		/** Specify any pre-selected options. Use only if you want the component to be uncontrolled. */
		defaultSelected?: IDataOption[];
		/** Whether to disable the input. Will also disable selections when multiple={true}. */
		disabled?: boolean;
		/** default 	false	Specify whether the menu should appear above the input. */
		dropup?: boolean;
		/** default 	'No matches found.'	Message to display in the menu if there are no valid results. */
		emptyLabel?: string;
		/** 	The filterBy prop can be used in one of two ways: to specify option properties that should be searched or to pass a completely custom callback.
		 * Specify fields to search:  By default, the filtering algorithm only searches the field that corresponds to labelKey. However, you can pass an array of additional fields to search
		 * Custom callback:  You can also pass your own callback to take complete control over how the filtering works. Note that the caseSensitive prop will no longer work in this case, since you are now completely overriding the algorithm.
		 * 
		*/
		filterBy?:string[] |(( option: IDataOption ) => boolean);
		/** 	Allows you to control the contents of the selection. If set to a string, will use that property of the selected option. 
		 * It can also be set to a function, with one argument (the selected option) and returning a string for rendering.
		<Typeahead		options={options}		labelKey={(option) => {
			// Return custom contents here. 
		}}		/> */
		labelKey?: () => string | string;
		/** default 	300	Maximum height of the dropdown menu, in px. */
		maxHeight?: number;
		/** default 	100	Maximum number of results to display by default. Mostly done for performance reasons so as not to render too many DOM nodes in the case of large data sets. */
		maxResults?: number;
		/** default 	0	Number of input characters that must be entered before showing results. */
		minLength?: number;
		/**default 	false	Whether or not multiple selections are allowed. */
		multiple?: boolean;
		/** 		Name property for the input */
		name?: string;
		/** default 	'New selection:'	Provides the ability to specify a prefix before the user-entered text to indicate that the selection will be new. No-op unless allowNew={true}. */
		newSelectionPrefix?: string;
		/** 	function		Callback fired when the input is blurred. Receives an event. */
		onBlur?: ( event: React.FormEvent<HTMLInputElement> ) => void;
		/** 	function		Callback fired whenever items are added or removed. Receives an array of the selected options. */
		onChange: ( options: IDataOption[] ) => void;
		/** 	function		Callback fired when the input is focused. Receives an event. */
		onFocus?: ( event: React.MouseEvent<HTMLInputElement> ) => void;
		/** 	function		Callback fired when user-input text changes. Receives the text string. */
		onInputChange?: ( text: string ) => void;
		/**  required	array		Full set of options, including any pre-selected options. */
		options: IDataOption[];
		/** default 	true	Give user the ability to display additional results if the number of results exceeds maxResults. */
		paginate?: boolean;
		/** default 	100	DEPRECATED. Use maxResults and paginate instead. */
		paginateResults?: number;
		/** default 	'Display additional results...'	Prompt displayed when large data sets are paginated. */
		paginationText?: string;
		/** default blank.  		Placeholder text for the input. */
		placeholder?: string;
		/** 	Allows you to control the contents of a menu item. Your function will be passed the TypeaheadMenu props, an individual option from your data list, and the index:
<Typeahead  options={options}  renderMenuItemChildren={(props, option, idx) => {
    // Render custom contents here.
  }}/> */
		renderMenuItemChildren?: (props:ITypeaheadOptions,option:IDataOption, idx:number)=>JSX.Element;
		/** 	function		Provides a hook for customized rendering of tokens when multiple selections are enabled. 
		 * Provides the ability to customize rendering of tokens when multiple selections are enabled. The first parameter is the current selected option in the loop, while the second parameter is the onRemove callback passed down by the main component. This callback is a no-op if multiple is false.
		 * <Typeahead
  ...
  multiple
  renderToken={(option, onRemove) => {
    // Render custom token here.
  }}/>
  Be careful when using renderToken, since you will need to handle things like disabling the tokens and removing them (via onRemove) yourself. It is highly recommended that you use the provided Token component:

// ES2015
import Token from 'react-bootstrap-typeahead/lib/Token.react';

// CommonJS
const Token = require('react-bootstrap-typeahead/lib/Token.react');
Note that if you use your own component to render the token, you will lose built-in functionality like removing via keystroke.
		*/
		renderToken?: ( options: IDataOption[], onRemove: () => void ) => JSX.Element;
		/** 	The selected option(s) displayed in the input. Use this prop if you want to control the component via its parent. */
		selected?: IDataOption[];

	}

/** 
 * React Bootstrap Typeahead

React-based typeahead component that uses Bootstrap as a base for styles and behaviors and supports both single- and multi-selection. The UI and behaviors are inspired by Twitter's typeahead.js. 

 * Basic Usage

The component behaves similar to other form elements. It requires an array of data options to be filtered and displayed.
<Typeahead  onChange={this._handleChange}  options={myData}/>

Single & Multi-Selection
The component provides single-selection by default, but also supports multi-selection. Simply set the multiple prop and the component turns into a tokenizer:
<Typeahead  multiple  onChange={this._handleChange}  options={myData}
/>
Controlled vs. Uncontrolled
Like an input, the component can be controlled or uncontrolled. Use the selected prop to control it via the parent, or defaultSelected to optionally set defaults and then allow the component to control itself.
// Controlled
<Typeahead  onChange={this._handleChange}  options={myData}  selected={selected}/>
// Uncontrolled
<Typeahead  defaultSelected={selected}  onChange={this._handleChange}  options={myData}/>

 * Public Methods

To access the component's public methods, add a ref to your typeahead instance:

<Typeahead ref="typeahead" ... />
then access the ref from your handler:

<button onClick={() => this.refs.typeahead.getInstance().clear()}>
  Clear Typeahead
</button>
Note that you must use getInstance to get the typeahead instance. This is because react-bootstrap-typeahead is wrapped by the react-onclickoutside higher-order component, so the clear method is not directly available. See react-onclickoutside's documentation for more information.

blur()

Provides a programmatic way to blur the input.

clear()

Provides a programmatic way to reset the input. Calling the method will clear both text and selection(s).

focus()

Provides a programmatic way to focus the input.
 */
	export class Typeahead extends React.Component<ITypeaheadOptions, {}>{ 

/** Provides a programmatic way to blur the input. */
		public blur():void;
/** Provides a programmatic way to reset the input. Calling the method will clear both text and selection(s). */
		public clear():void;
/**Provides a programmatic way to focus the input. */
		public focus():void;
	}




}

/** React Bootstrap Typeahead
https://github.com/ericgio/react-bootstrap-typeahead

React-based typeahead component that uses Bootstrap as a base for styles and behaviors and supports both single- and multi-selection. The UI and behaviors are inspired by Twitter's typeahead.js. 

Use the "Typeahead" component class in your react code.
 */
export const ReactBootstrapTypeahead: typeof react_bootstrap_typeahead = require( "react-bootstrap-typeahead" );

//export = ReactBootstrapTypeahead;