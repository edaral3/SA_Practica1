import React, { Component } from 'react';
import classNames from 'classnames';
import { AppTopbar } from './AppTopbar';
import { AppInlineProfile } from './AppInlineProfile';
import { AppFooter } from './AppFooter';
import { AppMenu } from './AppMenu';
import { Route } from 'react-router-dom';
import {Dashboard} from './components/Dashboard';
import {DashboardBanking} from './components/DashboardBanking';
import {FormsDemo} from './components/FormsDemo';
import {SampleDemo} from './components/SampleDemo';
import {DataDemo} from './components/DataDemo';
import {PanelsDemo} from './components/PanelsDemo';
import {OverlaysDemo} from './components/OverlaysDemo';
import {MenusDemo} from './components/MenusDemo';
import {MessagesDemo} from './components/MessagesDemo';
import {ChartsDemo} from './components/ChartsDemo';
import {MiscDemo} from './components/MiscDemo';
import {EmptyPage} from './components/EmptyPage';
import {Invoice} from "./pages/Invoice";
import {Productos} from "./pages/Productos";
import {Restaurantes} from "./components/Restaurantes"
import Orden from "./pages/Orden/Orden";
import {ModificarUsuario} from "./components/ModificarUsuario";
import {CarritoCompras} from "./components/CarritoCompras";

import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'font-awesome/css/font-awesome.css';
import 'primereact/resources/primereact.min.css';
import './App.css';

class App extends Component {

    constructor() {
        super();
        this.state = {
            layoutMode: 'overlay',
            profileMode: 'top',
            layoutCompact: true,
            overlayMenuActive: false,
            staticMenuDesktopInactive: false,
            staticMenuMobileActive: false,
            rotateMenuButton: false,
            topbarMenuActive: false,
            activeTopbarItem: null,
            darkMenu: true,
            menuActive: false,
            theme: 'amber',
            layout: 'amber',
            version: 'v3',
            configDialogActive: false
        };

        this.onDocumentClick = this.onDocumentClick.bind(this);
        this.onMenuClick = this.onMenuClick.bind(this);
        this.onMenuButtonClick = this.onMenuButtonClick.bind(this);
        this.onTopbarMenuButtonClick = this.onTopbarMenuButtonClick.bind(this);
        this.onTopbarItemClick = this.onTopbarItemClick.bind(this);
        this.onMenuItemClick = this.onMenuItemClick.bind(this);
        this.onRootMenuItemClick = this.onRootMenuItemClick.bind(this);
        this.changeMenuMode = this.changeMenuMode.bind(this);
        this.changeMenuColor = this.changeMenuColor.bind(this);
        this.changeProfileMode = this.changeProfileMode.bind(this);
        this.changeVersion = this.changeVersion.bind(this);
        this.changeLayout = this.changeLayout.bind(this);
        this.changeTheme = this.changeTheme.bind(this);
        this.onConfigButtonClick = this.onConfigButtonClick.bind(this);
        this.onConfigCloseClick = this.onConfigCloseClick.bind(this);
        this.onConfigClick = this.onConfigClick.bind(this);
        this.havePermissions = this.havePermissions.bind(this);
        this.createMenu();
        this.changeVersion({ version: 'v3' })

        localStorage.setItem("noItems",0);
        localStorage.setItem("carrito",JSON.stringify([]))
        
    }

    onMenuClick(event) {
        this.menuClick = true;
    }

    onMenuButtonClick(event) {
        this.menuClick = true;
        this.setState(({
            rotateMenuButton: !this.state.rotateMenuButton,
            topbarMenuActive: false
        }));

        if (this.state.layoutMode === 'overlay') {
            this.setState({
                overlayMenuActive: !this.state.overlayMenuActive
            });
        }
        else {
            if (this.isDesktop())
                this.setState({ staticMenuDesktopInactive: !this.state.staticMenuDesktopInactive });
            else
                this.setState({ staticMenuMobileActive: !this.state.staticMenuMobileActive });
        }

        event.preventDefault();
    }

    onTopbarMenuButtonClick(event) {
        this.topbarItemClick = true;
        this.setState({ topbarMenuActive: !this.state.topbarMenuActive });
        this.hideOverlayMenu();
        event.preventDefault();
    }

    onTopbarItemClick(event) {
        this.topbarItemClick = true;

        if (this.state.activeTopbarItem === event.item)
            this.setState({ activeTopbarItem: null });
        else
            this.setState({ activeTopbarItem: event.item });

        event.originalEvent.preventDefault();
    }

    onMenuItemClick(event) {
        if (!event.item.items) {
            this.hideOverlayMenu();
        }
        if (!event.item.items && this.isHorizontal()) {
            this.setState({
                menuActive: false
            })
        }
    }

    onRootMenuItemClick(event) {
        this.setState({
            menuActive: !this.state.menuActive
        });
    }

    onConfigButtonClick(event) {
        this.configClick = true;
        this.setState({ configDialogActive: !this.state.configDialogActive })
    }

    onConfigCloseClick() {
        this.setState({ configDialogActive: false })
    }

    onConfigClick() {
        this.configClick = true;
    }

    onDocumentClick(event) {
        if (!this.topbarItemClick) {
            this.setState({
                activeTopbarItem: null,
                topbarMenuActive: false
            });
        }

        if (!this.menuClick) {
            if (this.isHorizontal() || this.isSlim()) {
                this.setState({
                    menuActive: false
                })
            }

            this.hideOverlayMenu();
        }

        if (!this.configClick) {
            this.setState({ configDialogActive: false });
        }

        if (!this.rightPanelClick) {
            this.setState({
                rightPanelActive: false
            })
        }

        this.topbarItemClick = false;
        this.menuClick = false;
        this.configClick = false;
        this.rightPanelClick = false;
    }

    hideOverlayMenu() {
        this.setState({
            rotateMenuButton: false,
            overlayMenuActive: false,
            staticMenuMobileActive: false
        })
    }

    isTablet() {
        let width = window.innerWidth;
        return width <= 1024 && width > 640;
    }

    isDesktop() {
        return window.innerWidth > 1024;
    }

    isMobile() {
        return window.innerWidth <= 640;
    }

    isOverlay() {
        return this.state.layoutMode === 'overlay';
    }

    isHorizontal() {
        return this.state.layoutMode === 'horizontal';
    }

    isSlim() {
        return this.state.layoutMode === 'slim';
    }

    changeMenuMode(event) {
        this.setState({ layoutMode: event.layoutMode })
        if (event.layoutMode === 'horizontal') {
            this.setState({ profileMode: 'top' })
        }
    }

    changeMenuColor(event) {
        this.setState({ darkMenu: event.darkMenu })
    }

    changeProfileMode(event) {
        this.setState({ profileMode: event.profileMode })
    }

    changeVersion(event) {
        this.setState({ version: event.version });
        if (event.version === 'v3') {
            this.changeStyleSheetUrl('layout-css', this.state.layout, 'layout');
            this.changeStyleSheetUrl('theme-css', this.state.theme, 'theme');
        } else {
            this.changeStyleSheetUrl('layout-css', this.state.layout + '-v4', 'layout');
            this.changeStyleSheetUrl('theme-css', this.state.theme + '-v4', 'theme');
        }
    }

    changeLayout(event) {
        this.setState({ layout: event.layout });
        if (this.state.version === 'v3') {
            this.changeStyleSheetUrl('layout-css', event.layout, 'layout');
        } else {
            this.changeStyleSheetUrl('layout-css', event.layout + '-v4', 'layout');
        }

        if (event.special) {
            this.setState({
                darkMenu: true
            })
        }
    }

    changeTheme(event) {
        this.setState({ theme: event.theme });
        if (this.state.version === 'v3') {
            this.changeStyleSheetUrl('theme-css', event.theme, 'theme');
        } else {
            this.changeStyleSheetUrl('theme-css', event.theme + '-v4', 'theme');
        }
    }

    changeStyleSheetUrl(id, value, prefix) {
        let element = document.getElementById(id);
        let urlTokens = element.getAttribute('href').split('/');
        urlTokens[urlTokens.length - 1] = prefix + '-' + value + '.css';
        let newURL = urlTokens.join('/');

        this.replaceLink(element, newURL);
    }

    isIE() {
        return /(MSIE|Trident\/|Edge\/)/i.test(window.navigator.userAgent)
    }

    replaceLink(linkElement, href) {
        if (this.isIE()) {
            linkElement.setAttribute('href', href);
        }
        else {
            const id = linkElement.getAttribute('id');
            const cloneLinkElement = linkElement.cloneNode(true);

            cloneLinkElement.setAttribute('href', href);
            cloneLinkElement.setAttribute('id', id + '-clone');

            linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);

            cloneLinkElement.addEventListener('load', () => {
                linkElement.remove();
                cloneLinkElement.setAttribute('id', id);
            });
        }
    }

    createMenu() {
        this.menu = [
			{label: 'Registrate', icon: 'fa fa-fw fa-users', to: '/registro'},
            {label: 'Mis ordenes', icon: 'fa fa-fw fa-book', to: '/misOrdenes'}
				
        ];

        if(localStorage.getItem("usuario") && (JSON.parse (localStorage.getItem("usuario")).type === "admin" || JSON.parse (localStorage.getItem("usuario")).type === "restaurante")){
            this.menu.push({label: 'Productos', icon: 'fa fa-fw fa-cutlery', to: '/productos'})
            this.menu.push({label: 'Ordenes', icon: 'fa fa-fw fa-book', to: '/ordenes'})
            this.menu.push({label: 'Restaurantes', icon: 'fa fa-fw fa-id-card', to: '/restaurantes'})
        }

    }

    async havePermissions() {

        const usr = await JSON.parse (localStorage.getItem("usuario"))
        if ( usr.type && usr.type == "admin")
            return true

        return false
    }

    render() {
        let layoutClassName = classNames('layout-wrapper', {
            'menu-layout-static': this.state.layoutMode !== 'overlay',
            'menu-layout-overlay': this.state.layoutMode === 'overlay',
            'layout-menu-overlay-active': this.state.overlayMenuActive,
            'menu-layout-slim': this.state.layoutMode === 'slim',
            'menu-layout-horizontal': this.state.layoutMode === 'horizontal',
            'layout-menu-static-inactive': this.state.staticMenuDesktopInactive,
            'layout-menu-static-active': this.state.staticMenuMobileActive
        });
        let menuClassName = classNames('layout-menu-container', { 'layout-menu-dark': this.state.darkMenu });

        return (
            <div className={layoutClassName} onClick={this.onDocumentClick}>
                <div>
                    <AppTopbar profileMode={this.state.profileMode} horizontal={this.isHorizontal()}
                        topbarMenuActive={this.state.topbarMenuActive} activeTopbarItem={this.state.activeTopbarItem}
                        onMenuButtonClick={this.onMenuButtonClick} onTopbarMenuButtonClick={this.onTopbarMenuButtonClick}
                        onTopbarItemClick={this.onTopbarItemClick} />

                    <div className={menuClassName} onClick={this.onMenuClick}>
                        <div className="menu-scroll-content">
                            {(this.state.profileMode === 'inline' && this.state.layoutMode !== 'horizontal') && <AppInlineProfile />}
                            <AppMenu model={this.menu} onMenuItemClick={this.onMenuItemClick} onRootMenuItemClick={this.onRootMenuItemClick}
                                layoutMode={this.state.layoutMode} active={this.state.menuActive} />
                        </div>
                    </div>

                    <div className="layout-main">
                        <Route path="/" exact component={Dashboard} />
                        <Route path="/dashboard_banking" exact component={DashboardBanking} />
                        <Route path="/forms" component={FormsDemo} />
                        <Route path="/sample" component={SampleDemo} />
                        <Route path="/data" component={DataDemo} />
                        <Route path="/panels" component={PanelsDemo} />
                        <Route path="/overlays" component={OverlaysDemo} />
                        <Route path="/menus" component={MenusDemo} />
                        <Route path="/messages" component={MessagesDemo} />
                        <Route path="/charts" component={ChartsDemo} />
                        <Route path="/misc" component={MiscDemo} />
                        <Route path="/empty" component={EmptyPage} />
                        <Route path="/productos" component={Productos} />
						<Route path="/invoice" component={Invoice} />
                        <Route path="/modUsuario" component={ModificarUsuario}/>
                        <Route path="/carrito" component={CarritoCompras}/>
                        <Route path="/restaurantes" component={Restaurantes}/>
                    </div>

                    <div className="layout-mask"></div>

                    <AppFooter />
                </div>
            </div>
        );
    }
}

export default App;
