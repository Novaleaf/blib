/// <reference types="react" />
import * as React from 'react';
export declare namespace reactstrap {
    type Sizes = 'xs' | 'xsmall' | 'sm' | 'small' | 'medium' | 'lg' | 'large';
    /** ( eventKey:any, e:React.SyntheticEvent<{}> ):void */
    interface SelectCallback extends React.EventHandler<any> {
        (eventKey: any, e: React.SyntheticEvent<{}>): void;
        /**
            @deprecated
            This signature is a hack so can still derive from HTMLProps.
            It does not reflect the underlying event and should not be used.
        */
        (e: React.MouseEvent<{}>): void;
    }
    interface TransitionCallbacks {
        onEnter?: Function;
        onEntered?: Function;
        onEntering?: Function;
        onExit?: Function;
        onExited?: Function;
        onExiting?: Function;
    }
    interface AccordionProps extends React.HTMLProps<Accordion> {
        bsSize?: Sizes;
        bsStyle?: string;
        collapsible?: boolean;
        defaultExpanded?: boolean;
        eventKey?: any;
        expanded?: boolean;
        footer?: any;
        header?: any;
    }
    type Accordion = React.ClassicComponent<AccordionProps, {}>;
    var Accordion: React.ClassicComponentClass<AccordionProps>;
    interface BreadcrumbProps extends React.Props<Breadcrumb> {
        bsClass?: string;
    }
    type BreadcrumbItem = React.ClassicComponent<BreadcrumbItemProps, {}>;
    var BreadcrumbItem: React.ClassicComponentClass<BreadcrumbItemProps>;
    interface BreadcrumbClass extends React.ClassicComponentClass<BreadcrumbProps> {
        Item: typeof BreadcrumbItem;
    }
    type Breadcrumb = React.ClassicComponent<BreadcrumbProps, {}>;
    var Breadcrumb: BreadcrumbClass;
    interface BreadcrumbItemProps extends React.Props<BreadcrumbItem> {
        active?: boolean;
        id?: string | number;
        href?: string;
        title?: React.ReactNode;
        target?: string;
    }
    interface ButtonProps extends React.HTMLProps<Button> {
        active?: boolean;
        block?: boolean;
        bsStyle?: string;
        bsSize?: Sizes;
        componentClass?: React.ReactType;
    }
    type Button = React.ClassicComponent<ButtonProps, {}>;
    var Button: React.ClassicComponentClass<ButtonProps>;
    interface ButtonToolbarProps extends React.HTMLProps<ButtonToolbar> {
        block?: boolean;
        bsSize?: Sizes;
        bsStyle?: string;
        justified?: boolean;
        vertical?: boolean;
    }
    type ButtonToolbar = React.ClassicComponent<ButtonToolbarProps, {}>;
    var ButtonToolbar: React.ClassicComponentClass<ButtonToolbarProps>;
    interface ButtonGroupProps extends React.HTMLProps<ButtonGroup> {
        block?: boolean;
        bsSize?: Sizes;
        bsStyle?: string;
        justified?: boolean;
        vertical?: boolean;
    }
    type ButtonGroup = React.ClassicComponent<ButtonGroupProps, {}>;
    var ButtonGroup: React.ClassicComponentClass<ButtonGroupProps>;
    interface SafeAnchorProps extends React.HTMLProps<SafeAnchor> {
        href?: string;
        onClick?: React.MouseEventHandler<{}>;
        disabled?: boolean;
        role?: string;
        componentClass?: React.ReactType;
    }
    type SafeAnchor = React.ClassicComponent<SafeAnchorProps, {}>;
    const SafeAnchor: React.ClassicComponentClass<SafeAnchorProps>;
    interface CheckboxProps extends React.HTMLProps<Checkbox> {
        bsClass?: string;
        disabled?: boolean;
        inline?: boolean;
        inputRef?: (instance: HTMLInputElement) => void;
        validationState?: "success" | "warning" | "error";
    }
    class Checkbox extends React.Component<CheckboxProps, {}> {
    }
    interface ClearfixProps extends React.HTMLProps<Clearfix> {
        componentClass?: React.ReactType;
        visibleXsBlock?: boolean;
        visibleSmBlock?: boolean;
        visibleMdBlock?: boolean;
        visibleLgBlock?: boolean;
    }
    class Clearfix extends React.Component<ClearfixProps, {}> {
    }
    interface CollapseProps extends TransitionCallbacks, React.Props<Collapse> {
        dimension?: 'height' | 'width' | {
            (): string;
        };
        getDimensionValue?: (dimension: number, element: React.ReactElement<any>) => number;
        in?: boolean;
        timeout?: number;
        transitionAppear?: boolean;
        unmountOnExit?: boolean;
    }
    class Collapse extends React.Component<CollapseProps, {}> {
    }
    interface DropdownBaseProps {
        bsClass?: string;
        componentClass?: React.ReactType;
        disabled?: boolean;
        dropup?: boolean;
        id: string;
        onClose?: Function;
        onSelect?: SelectCallback;
        onToggle?: (isOpen: boolean) => void;
        open?: boolean;
        pullRight?: boolean;
        role?: string;
    }
    type DropdownProps = DropdownBaseProps & React.HTMLProps<Dropdown>;
    class Dropdown extends React.Component<DropdownProps, any> {
        static Menu: typeof DropdownMenu;
        static Toggle: typeof DropdownToggle;
    }
    interface DropdownButtonBaseProps extends DropdownBaseProps {
        bsSize?: Sizes;
        bsStyle?: string;
        navItem?: boolean;
        noCaret?: boolean;
        pullRight?: boolean;
    }
    type DropdownButtonProps = DropdownButtonBaseProps & React.HTMLProps<DropdownButton>;
    class DropdownButton extends React.Component<DropdownButtonProps, {}> {
    }
    interface DropdownMenuProps extends React.HTMLProps<DropdownMenu> {
        labelledBy?: string | number;
        onClose?: Function;
        onSelect?: SelectCallback;
        open?: boolean;
        pullRight?: boolean;
    }
    class DropdownMenu extends React.Component<DropdownMenuProps, any> {
    }
    interface DropdownToggleProps extends React.HTMLProps<DropdownToggle> {
        bsRole?: string;
        noCaret?: boolean;
        open?: boolean;
        title?: string;
        useAnchor?: boolean;
        bsClass?: string;
    }
    class DropdownToggle extends React.Component<DropdownToggleProps, any> {
    }
    interface FadeProps extends TransitionCallbacks, React.Props<Fade> {
        in?: boolean;
        timeout?: number;
        transitionAppear?: boolean;
        unmountOnExit?: boolean;
    }
    class Fade extends React.Component<FadeProps, {}> {
    }
    interface MenuItemProps extends React.HTMLProps<MenuItem> {
        active?: boolean;
        bsClass?: string;
        disabled?: boolean;
        divider?: boolean;
        eventKey?: any;
        header?: boolean;
        onClick?: React.MouseEventHandler<{}>;
        onSelect?: SelectCallback;
        target?: string;
        title?: string;
    }
    class MenuItem extends React.Component<MenuItemProps, {}> {
    }
    interface PanelProps extends TransitionCallbacks, React.HTMLProps<Panel> {
        bsClass?: string;
        bsSize?: Sizes;
        bsStyle?: string;
        collapsible?: boolean;
        defaultExpanded?: boolean;
        eventKey?: any;
        expanded?: boolean;
        footer?: React.ReactNode;
        header?: React.ReactNode;
        onSelect?: SelectCallback;
    }
    type Panel = React.ClassicComponent<PanelProps, {}>;
    var Panel: React.ClassicComponentClass<PanelProps>;
    interface PanelGroupProps extends React.HTMLProps<PanelGroup> {
        accordion?: boolean;
        activeKey?: any;
        bsSize?: Sizes;
        bsStyle?: string;
        defaultActiveKey?: any;
        onSelect?: SelectCallback;
    }
    type PanelGroup = React.ClassicComponent<PanelGroupProps, {}>;
    var PanelGroup: React.ClassicComponentClass<PanelGroupProps>;
    interface SplitButtonProps extends React.HTMLProps<SplitButton> {
        bsStyle?: string;
        bsSize?: Sizes;
        dropdownTitle?: any;
        dropup?: boolean;
        pullRight?: boolean;
    }
    class SplitButton extends React.Component<SplitButtonProps, {}> {
    }
    interface ModalDialogProps extends React.HTMLProps<ModalDialog> {
        onHide?: Function;
        onEnter?: Function;
        onEntered?: Function;
        onEntering?: Function;
        onExit?: Function;
        onExited?: Function;
        onExiting?: Function;
    }
    type ModalDialog = React.ClassicComponent<ModalDialogProps, {}>;
    var ModalDialog: React.ClassicComponentClass<ModalDialogProps>;
    interface ModalHeaderProps extends React.HTMLProps<ModalHeader> {
        /** for toggling isOpen in the controlling component */
        toggle: () => void;
    }
    class ModalHeader extends React.Component<ModalHeaderProps, {}> {
    }
    interface ModalBodyProps extends React.HTMLProps<ModalBody> {
        modalClassName?: string;
    }
    class ModalBody extends React.Component<ModalBodyProps, {}> {
    }
    interface ModalFooterProps extends React.HTMLProps<ModalFooter> {
        modalClassName?: string;
    }
    class ModalFooter extends React.Component<ModalFooterProps, {}> {
    }
    interface ModalProps extends React.HTMLProps<Modal> {
        /** boolean to control the state of the popover */
        isOpen: boolean;
        /** for toggling isOpen in the controlling component */
        toggle: () => void;
        size?: number;
        backdrop?: true | "static";
        keyboard?: boolean;
        /** defaults to 1000 */
        zIndex?: number | string;
    }
    class Modal extends React.Component<ModalProps, {}> {
    }
    interface OverlayTriggerProps {
        overlay: any;
        animation?: any;
        container?: any;
        containerPadding?: number;
        defaultOverlayShown?: boolean;
        delay?: number;
        delayHide?: number;
        delayShow?: number;
        onEnter?: Function;
        onEntered?: Function;
        onEntering?: Function;
        onExit?: Function;
        onExited?: Function;
        onExiting?: Function;
        placement?: string;
        rootClose?: boolean;
        trigger?: string | string[];
    }
    type OverlayTrigger = React.ClassicComponent<OverlayTriggerProps, {}>;
    var OverlayTrigger: React.ClassicComponentClass<OverlayTriggerProps>;
    interface TooltipProps extends React.HTMLProps<Tooltip> {
        arrowOffsetLeft?: number | string;
        arrowOffsetTop?: number | string;
        bsSize?: Sizes;
        bsStyle?: string;
        placement?: string;
        positionLeft?: number;
        positionTop?: number;
    }
    type Tooltip = React.ClassicComponent<TooltipProps, {}>;
    var Tooltip: React.ClassicComponentClass<TooltipProps>;
    interface PopoverProps extends React.HTMLProps<Popover> {
        /** / boolean to control the state of the popover */
        isOpen: boolean;
        /** callback for toggling isOpen in the controlling component.  triggered when open and user clicks outside the popover. */
        toggle?: () => void;
        /** target div ID, popover is attached to this element */
        target: string;
        /** optionally overide tether config http://tether.io/#options */
        tether?: any;
        /** function which is passed a reference to the instance of tether for manually `position()`ing */
        tetherRef?: (tether: any) => any;
        placement: 'top' | 'bottom' | 'left' | 'right' | 'top left' | 'top center' | 'top right' | 'right top' | 'right middle' | 'right bottom' | 'bottom right' | 'bottom center' | 'bottom left' | 'left top' | 'left middle' | 'left bottom';
    }
    type Popover = React.ClassicComponent<PopoverProps, {}>;
    var Popover: React.ClassicComponentClass<PopoverProps>;
    var PopoverTitle: React.ClassicComponentClass<{}>;
    var PopoverContent: React.ClassicComponentClass<{}>;
    interface OverlayProps {
        animation?: any;
        container?: any;
        containerPadding?: number;
        onEnter?: Function;
        onEntered?: Function;
        onEntering?: Function;
        onExit?: Function;
        onExited?: Function;
        onExiting?: Function;
        onHide?: Function;
        placement?: string;
        rootClose?: boolean;
        show?: boolean;
        target?: Function;
    }
    class Overlay extends React.Component<OverlayProps, {}> {
    }
    interface ProgressBarProps extends React.HTMLProps<ProgressBar> {
        active?: boolean;
        bsSize?: Sizes;
        bsStyle?: string;
        interpolatedClass?: any;
        max?: number;
        min?: number;
        now?: number;
        srOnly?: boolean;
        striped?: boolean;
    }
    class ProgressBar extends React.Component<ProgressBarProps, {}> {
    }
    interface NavProps extends React.HTMLProps<Nav> {
        activeHref?: string;
        activeKey?: any;
        bsSize?: Sizes;
        bsStyle?: string;
        collapsible?: boolean;
        eventKey?: any;
        expanded?: boolean;
        justified?: boolean;
        navbar?: boolean;
        pullRight?: boolean;
        right?: boolean;
        stacked?: boolean;
        ulClassName?: string;
        ulId?: string;
    }
    class Nav extends React.Component<NavProps, {}> {
    }
    interface NavItemProps extends React.HTMLProps<NavItem> {
        active?: boolean;
        brand?: any;
        bsSize?: Sizes;
        bsStyle?: string;
        componentClass?: React.ReactType;
        defaultNavExpanded?: boolean;
        eventKey?: any;
        fixedBottom?: boolean;
        fixedTop?: boolean;
        fluid?: boolean;
        inverse?: boolean;
        linkId?: string;
        navExpanded?: boolean;
        onSelect?: SelectCallback;
        onToggle?: Function;
        staticTop?: boolean;
        toggleButton?: any;
        toggleNavKey?: string | number;
    }
    type NavItem = React.ClassicComponent<NavItemProps, {}>;
    var NavItem: React.ClassicComponentClass<NavItemProps>;
    interface NavbarBrandProps extends React.HTMLProps<NavbarBrand> {
    }
    class NavbarBrand extends React.Component<NavbarBrandProps, {}> {
    }
    interface NavbarCollapseProps {
    }
    type NavbarCollapse = React.ClassicComponent<NavbarCollapseProps, {}>;
    var NavbarCollapse: React.ClassicComponentClass<NavbarCollapseProps>;
    interface NavbarHeaderProps extends React.HTMLProps<NavbarHeader> {
    }
    type NavbarHeader = React.ClassicComponent<NavbarHeaderProps, {}>;
    var NavbarHeader: React.ClassicComponentClass<NavbarHeaderProps>;
    interface NavbarToggleProps {
    }
    type NavbarToggle = React.ClassicComponent<NavbarToggleProps, {}>;
    var NavbarToggle: React.ClassicComponentClass<NavbarToggleProps>;
    interface NavbarProps extends React.HTMLProps<Navbar> {
        brand?: any;
        bsSize?: Sizes;
        bsStyle?: string;
        componentClass?: React.ReactType;
        defaultNavExpanded?: boolean;
        fixedBottom?: boolean;
        fixedTop?: boolean;
        fluid?: boolean;
        inverse?: boolean;
        navExpanded?: boolean;
        onToggle?: Function;
        staticTop?: boolean;
        toggleButton?: any;
        toggleNavKey?: string | number;
    }
    interface NavbarClass extends React.ClassicComponentClass<NavbarProps> {
        Brand: typeof NavbarBrand;
        Collapse: typeof NavbarCollapse;
        Header: typeof NavbarHeader;
        Toggle: typeof NavbarToggle;
    }
    type Navbar = React.ClassicComponent<NavbarProps, {}>;
    var Navbar: NavbarClass;
    interface NavDropdownBaseProps extends DropdownBaseProps {
        active?: boolean;
        noCaret?: boolean;
        eventKey?: any;
    }
    type NavDropdownProps = NavDropdownBaseProps & React.HTMLProps<NavDropdown>;
    class NavDropdown extends React.Component<NavDropdownProps, {}> {
    }
    interface TabsProps extends React.HTMLProps<Tabs> {
        activeKey?: any;
        animation?: boolean;
        bsStyle?: string;
        defaultActiveKey?: any;
        onSelect?: SelectCallback;
        paneWidth?: any;
        position?: string;
        tabWidth?: any;
        unmountOnExit?: boolean;
    }
    type Tabs = React.ClassicComponent<TabsProps, {}>;
    var Tabs: React.ClassicComponentClass<TabsProps>;
    interface TabProps extends React.HTMLProps<Tab> {
        animation?: boolean;
        eventKey?: any;
    }
    interface TabClass extends React.ClassicComponentClass<TabProps> {
        Container: TabContainer;
        Pane: TabPane;
        Content: TabClass;
    }
    type Tab = TabClass;
    var Tab: TabClass;
    interface TabContainerProps extends React.HTMLAttributes<{}> {
        activeKey?: any;
        defaultActiveKey?: any;
        generateChildId?: (eventKey: any, type: any) => string;
    }
    type TabContainer = React.ClassicComponentClass<TabContainerProps>;
    interface TabPaneProps extends React.HTMLAttributes<{}> {
        animation?: boolean | React.ComponentClass<any>;
        'aria-labelledby'?: string;
        bsClass?: string;
        eventKey?: any;
        onEnter?: Function;
        onEntered?: Function;
        onEntering?: Function;
        onExit?: Function;
        onExited?: Function;
        onExiting?: Function;
        unmountOnExit?: boolean;
    }
    type TabPane = React.ClassicComponentClass<TabPaneProps>;
    interface PagerProps extends React.HTMLProps<Pager> {
        onSelect?: SelectCallback;
    }
    interface PagerClass extends React.ClassicComponentClass<PagerProps> {
        Item: typeof PageItem;
    }
    type Pager = React.ClassicComponent<PagerProps, {}>;
    var Pager: PagerClass;
    interface PageItemProps extends React.HTMLProps<PageItem> {
        disabled?: boolean;
        eventKey?: any;
        next?: boolean;
        onSelect?: SelectCallback;
        previous?: boolean;
        target?: string;
    }
    type PageItem = React.ClassicComponent<PageItemProps, {}>;
    /** @deprecated since v0.30.0, should use <Pager.Item> instead of <PageItem>*/
    var PageItem: React.ClassicComponentClass<PageItemProps>;
    interface PaginationProps extends React.HTMLProps<Pagination> {
        activePage?: number;
        bsSize?: Sizes;
        bsStyle?: string;
        boundaryLinks?: boolean;
        buttonComponentClass?: React.ReactType;
        ellipsis?: React.ReactNode;
        first?: React.ReactNode;
        items?: number;
        last?: React.ReactNode;
        maxButtons?: number;
        next?: React.ReactNode;
        onSelect?: SelectCallback;
        prev?: React.ReactNode;
    }
    type Pagination = React.ClassicComponent<PaginationProps, {}>;
    var Pagination: React.ClassicComponentClass<PaginationProps>;
    interface AlertProps extends React.HTMLProps<Alert> {
        bsSize?: Sizes;
        bsStyle?: string;
        closeLabel?: string;
        /** @deprecated since v0.29.0 */ dismissAfter?: number;
        onDismiss?: Function;
    }
    type Alert = React.ClassicComponent<AlertProps, {}>;
    var Alert: React.ClassicComponentClass<AlertProps>;
    interface CarouselProps extends React.HTMLProps<Carousel> {
        activeIndex?: number;
        bsSize?: Sizes;
        bsStyle?: string;
        controls?: boolean;
        defaultActiveIndex?: number;
        direction?: string;
        indicators?: boolean;
        interval?: number;
        nextIcon?: React.ReactNode;
        onSelect?: SelectCallback;
        onSlideEnd?: Function;
        pauseOnHover?: boolean;
        prevIcon?: React.ReactNode;
        slide?: boolean;
    }
    interface CarouselClass extends React.ClassicComponentClass<CarouselProps> {
        Caption: typeof CarouselCaption;
        Item: typeof CarouselItem;
    }
    type Carousel = React.ClassicComponent<CarouselProps, {}>;
    var Carousel: CarouselClass;
    interface CarouselItemProps extends React.HTMLProps<CarouselItem> {
        active?: boolean;
        animtateIn?: boolean;
        animateOut?: boolean;
        direction?: string;
        index?: number;
        onAnimateOutEnd?: Function;
    }
    type CarouselItem = React.ClassicComponent<CarouselItemProps, {}>;
    var CarouselItem: React.ClassicComponentClass<CarouselItemProps>;
    interface CarouselCaptionProps extends React.HTMLProps<CarouselCaption> {
        componentClass?: React.ReactType;
    }
    type CarouselCaption = React.ClassicComponent<CarouselCaptionProps, {}>;
    var CarouselCaption: React.ClassicComponentClass<CarouselCaptionProps>;
    interface GridProps extends React.HTMLProps<Grid> {
        componentClass?: React.ReactType;
        fluid?: boolean;
    }
    type Grid = React.ClassicComponent<GridProps, {}>;
    var Grid: React.ClassicComponentClass<GridProps>;
    interface RowProps extends React.HTMLProps<Row> {
        componentClass?: React.ReactType;
    }
    type Row = React.ClassicComponent<RowProps, {}>;
    var Row: React.ClassicComponentClass<RowProps>;
    interface ColProps extends React.HTMLProps<Col> {
        componentClass?: React.ReactType;
        lg?: number;
        lgHidden?: boolean;
        lgOffset?: number;
        lgPull?: number;
        lgPush?: number;
        md?: number;
        mdHidden?: boolean;
        mdOffset?: number;
        mdPull?: number;
        mdPush?: number;
        sm?: number;
        smHidden?: boolean;
        smOffset?: number;
        smPull?: number;
        smPush?: number;
        xs?: number;
        xsHidden?: boolean;
        xsOffset?: number;
        xsPull?: number;
        xsPush?: number;
    }
    type Col = React.ClassicComponent<ColProps, {}>;
    var Col: React.ClassicComponentClass<ColProps>;
    interface ThumbnailProps extends React.HTMLProps<Thumbnail> {
        bsSize?: Sizes;
        bsStyle?: string;
    }
    type Thumbnail = React.ClassicComponent<ThumbnailProps, {}>;
    var Thumbnail: React.ClassicComponentClass<ThumbnailProps>;
    interface ListGroupProps extends React.HTMLProps<ListGroup> {
        componentClass?: React.ReactType;
        fill?: boolean;
    }
    class ListGroup extends React.Component<ListGroupProps, {}> {
    }
    interface ListGroupItemProps extends React.HTMLProps<ListGroupItem> {
        active?: any;
        bsSize?: Sizes;
        bsStyle?: string;
        eventKey?: any;
        header?: any;
        key?: any;
        listItem?: boolean;
    }
    class ListGroupItem extends React.Component<ListGroupItemProps, {}> {
    }
    interface LabelProps extends React.HTMLProps<Label> {
        bsSize?: Sizes;
        bsStyle?: string;
        for?: string;
        sm?: number;
    }
    class Label extends React.Component<LabelProps, {}> {
    }
    interface BadgeProps extends React.HTMLProps<Badge> {
        pullRight?: boolean;
    }
    type Badge = React.ClassicComponent<BadgeProps, {}>;
    var Badge: React.ClassicComponentClass<BadgeProps>;
    interface JumbotronProps extends React.HTMLProps<Jumbotron> {
        componentClass?: React.ReactType;
    }
    type Jumbotron = React.ClassicComponent<JumbotronProps, {}>;
    var Jumbotron: React.ClassicComponentClass<JumbotronProps>;
    interface ImageProps extends React.HTMLProps<Image> {
        circle?: boolean;
        responsive?: boolean;
        rounded?: boolean;
        thumbnail?: boolean;
    }
    type Image = React.ClassicComponent<ImageProps, {}>;
    var Image: React.ClassicComponentClass<ImageProps>;
    interface PageHeaderProps extends React.HTMLProps<PageHeader> {
    }
    class PageHeader extends React.Component<PageHeaderProps, {}> {
    }
    interface WellProps extends React.HTMLProps<Well> {
        bsSize?: Sizes;
        bsStyle?: string;
    }
    class Well extends React.Component<WellProps, {}> {
    }
    interface GlyphiconProps extends React.HTMLProps<Glyphicon> {
        glyph: string;
    }
    type Glyphicon = React.ClassicComponent<GlyphiconProps, {}>;
    var Glyphicon: React.ClassicComponentClass<GlyphiconProps>;
    interface TableProps extends React.HTMLProps<Table> {
        bordered?: boolean;
        condensed?: boolean;
        hover?: boolean;
        responsive?: boolean;
        striped?: boolean;
    }
    type Table = React.ClassicComponent<TableProps, {}>;
    var Table: React.ClassicComponentClass<TableProps>;
    interface InputGroupProps extends React.HTMLProps<InputGroup> {
        bsClass?: string;
        bsSize?: Sizes;
    }
    interface InputGroupClass extends React.ClassicComponentClass<InputGroupProps> {
        Addon: typeof InputGroupAddon;
        Button: typeof InputGroupButton;
    }
    type InputGroup = React.Component<InputGroupProps, {}>;
    var InputGroup: InputGroupClass;
    interface InputGroupAddonProps extends React.HTMLProps<InputGroupAddon> {
    }
    type InputGroupAddon = React.ClassicComponent<InputGroupAddonProps, {}>;
    var InputGroupAddon: React.ClassicComponentClass<InputGroupAddonProps>;
    interface InputGroupButtonProps extends React.HTMLProps<InputGroupButton> {
    }
    type InputGroupButton = React.ClassicComponent<InputGroupButtonProps, {}>;
    var InputGroupButton: React.ClassicComponentClass<InputGroupButtonProps>;
    interface FormProps extends React.HTMLProps<Form> {
        bsClass?: string;
        componentClass?: React.ReactType;
        horizontal?: boolean;
        inline?: boolean;
    }
    class Form extends React.Component<FormProps, {}> {
    }
    interface FormGroupProps extends React.HTMLProps<FormGroup> {
        bsClass?: string;
        bsSize?: Sizes;
        controlId?: string;
        color?: BootstrapColor;
        /** set to enable grid layout */
        row?: boolean;
        /** set to make all inputs inline */
        inline?: boolean;
    }
    type BootstrapColor = "success" | "warning" | "error" | "muted";
    class FormGroup extends React.Component<FormGroupProps, {}> {
    }
    interface ControlLabelProps extends React.HTMLProps<ControlLabel> {
        bsClass?: string;
        htmlFor?: string;
        srOnly?: boolean;
    }
    class ControlLabel extends React.Component<ControlLabelProps, {}> {
    }
    interface FormControlProps extends React.HTMLProps<FormControl> {
        bsClass?: string;
        componentClass?: React.ReactType;
        id?: string;
        type?: string;
    }
    class FormControl extends React.Component<FormControlProps, {}> {
    }
    interface FormFeedbackProps extends React.HTMLProps<FormFeedback> {
    }
    class FormFeedback extends React.Component<FormFeedbackProps, {}> {
    }
    /** extra description  */
    class FormText extends React.Component<{
        color?: BootstrapColor;
    }, {}> {
    }
    interface FormControlStaticProps extends React.HTMLProps<FormControlStatic> {
        bsClass?: string;
        componentClass?: React.ReactType;
    }
    class FormControlStatic extends React.Component<FormControlStaticProps, {}> {
    }
    interface HelpBlockProps extends React.HTMLProps<HelpBlock> {
        bsClass?: string;
    }
    class HelpBlock extends React.Component<HelpBlockProps, {}> {
    }
    interface RadioProps extends React.HTMLProps<Radio> {
        bsClass?: string;
        disabled?: boolean;
        inline?: boolean;
        inputRef?: (instance: HTMLInputElement) => void;
        validationState?: "success" | "warning" | "error";
    }
    class Radio extends React.Component<RadioProps, {}> {
    }
    interface PortalProps extends React.Props<Portal> {
        dimension?: string | Function;
        getDimensionValue?: Function;
        in?: boolean;
        onEnter?: Function;
        onEntered?: Function;
        onEntering?: Function;
        onExit?: Function;
        onExited?: Function;
        onExiting?: Function;
        role?: string;
        timeout?: number;
        transitionAppear?: boolean;
        unmountOnExit?: boolean;
    }
    type Portal = React.ClassicComponent<PortalProps, {}>;
    var Portal: React.ClassicComponentClass<PortalProps>;
    interface PositionProps extends TransitionCallbacks, React.Props<Position> {
        dimension?: string | Function;
        getDimensionValue?: Function;
        in?: boolean;
        role?: string;
        timeout?: number;
        transitionAppear?: boolean;
        unmountOnExit?: boolean;
    }
    class Position extends React.Component<PositionProps, {}> {
    }
    interface MediaLeftProps {
        align?: string;
    }
    type MediaLeft = React.ClassicComponent<MediaLeftProps, {}>;
    var MediaLeft: React.ClassicComponentClass<MediaLeftProps>;
    interface MediaRightProps {
        align?: string;
    }
    type MediaRight = React.ClassicComponent<MediaRightProps, {}>;
    var MediaRight: React.ClassicComponentClass<MediaRightProps>;
    interface MediaHeadingProps {
        componentClass?: React.ReactType;
    }
    type MediaHeading = React.ClassicComponent<MediaHeadingProps, {}>;
    var MediaHeading: React.ClassicComponentClass<MediaHeadingProps>;
    interface MediaBodyProps {
        componentClass?: React.ReactType;
    }
    type MediaBody = React.ClassicComponent<MediaBodyProps, {}>;
    var MediaBody: React.ClassicComponentClass<MediaBodyProps>;
    interface MediaListProps {
    }
    type MediaList = React.ClassicComponent<MediaListProps, {}>;
    var MediaList: React.ClassicComponentClass<MediaListProps>;
    interface MediaListItemProps {
        componentClass?: React.ReactType;
    }
    type MediaListItem = React.ClassicComponent<MediaListItemProps, {}>;
    var MediaListItem: React.ClassicComponentClass<MediaListItemProps>;
    interface MediaProps extends React.HTMLProps<Media> {
        componentClass?: React.ReactType;
    }
    interface MediaClass extends React.ClassicComponentClass<MediaProps> {
        Left: typeof MediaLeft;
        Right: typeof MediaRight;
        Heading: typeof MediaHeading;
        Body: typeof MediaBody;
        List: typeof MediaList;
        ListItem: typeof MediaListItem;
    }
    type Media = React.ClassicComponent<MediaProps, {}>;
    var Media: MediaClass;
    interface bootstrapUtilsType {
    }
    function createChainedFunctionType(...funcs: Function[]): Function;
    interface ValidComponentChildrenType {
        map: (children: any, func: any, context: any) => any;
        forEach: (children: any, func: any, context: any) => any;
        count: (children: any) => number;
        filter: (children: any, func: any, context: any) => any;
        find: (children: any, func: any, context: any) => any;
        every: (children: any, func: any, context: any) => any;
        some: (children: any, func: any, context: any) => any;
        toArray: (children: any) => any;
    }
    class utils {
        static bootstrapUtils: bootstrapUtilsType;
        static createChainedFunction: typeof createChainedFunctionType;
        static ValidComponentChildren: ValidComponentChildrenType;
    }
}
export declare const ReactStrap: typeof reactstrap;
