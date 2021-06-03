import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export class AppTopbar extends Component {

    static defaultProps = {
        onMenuButtonClick: null,
        onTopbarMenuButtonClick: null,
        onTopbarItemClick: null,
        profileMode: null,
        horizontal: false,
        topbarMenuActive: false,
        activeTopbarItem: null
    }

    static propTypes = {
        onMenuButtonClick: PropTypes.func.isRequired,
        onTopbarMenuButtonClick: PropTypes.func.isRequired,
        onTopbarItemClick: PropTypes.func.isRequired,
        profileMode: PropTypes.string.isRequired,
        horizontal: PropTypes.bool.isRequired,
        topbarMenuActive: PropTypes.bool.isRequired,
        activeTopbarItem: PropTypes.string
    }

    constructor() {
        super();
        this.state = {};

        this.cerrarSesion = this.cerrarSesion.bind(this);
    }

    onTopbarItemClick(event, item) {
        if(this.props.onTopbarItemClick) {
            this.props.onTopbarItemClick({
                originalEvent: event,
                item: item
            });
        }
    }

    cerrarSesion(){
        localStorage.clear()
        window.location = '/#/'
    }

    render() {
        let topbarItemsClassName = classNames('topbar-items fadeInDown', {'topbar-items-visible': this.props.topbarMenuActive});

        return <div className="topbar clearfix">
            <div className="topbar-left">
                <img alt="Logo" src="assets/layout/images/log-foot.png" className="topbar-logo" style={{width:"100%",height:"100%"}} />
            </div>

            <div className="topbar-right">
                <button className="p-link" id="menu-button" onClick={this.props.onMenuButtonClick}>
                    <i className="fa fa-angle-left"></i>
                </button>

                <button className="p-link" id="topbar-menu-button" onClick={this.props.onTopbarMenuButtonClick}>
                    <i className="fa fa-bars"></i>
                </button>
                <ul className={topbarItemsClassName}>
                    {(this.props.profileMode === 'top' || this.props.horizontal) &&
                    <li className={classNames('profile-item', {'active-top-menu': this.props.activeTopbarItem === 'profile'})}
                        onClick={(e) => this.onTopbarItemClick(e, 'profile')}>
                        <button className="p-link">
                            <img alt="User" className="profile-image" src="assets/layout/images/avatar6.png" />
                            <span id="nombre-usuario" className="topbar-item-name">{localStorage.getItem("usuario") === null ? "Anonimo" : JSON.parse(localStorage.getItem("usuario")).user }</span>
                            <span className="topbar-item-role">{localStorage.getItem("usuario") === null ? "Cliente Anonimo" : JSON.parse(localStorage.getItem("usuario")).type }</span>
                        </button>

                        <ul className="layout-menu fadeInDown">
                            <li role="menuitem">
                                <button className="p-link" onClick={() => {window.location = "/#/login"}} >
                                    <i className="fa fa-fw fa-user"></i>
                                    <span>Login</span>
                                </button>
                            </li>

                            {localStorage.getItem("usuario") !== null ? 
                                <li role="menuitem">
                                    <button className="p-link" onClick={() => {window.location = '/#/modUsuario'}}>
                                        <i className="pi pi-fw pi-user-edit"></i>
                                        <span>Editar Perfil</span>
                                    </button>
                                    <button className="p-link" onClick={() => {this.cerrarSesion()}}>
                                        <i className="fa fa-fw fa-sign-out"></i>
                                        <span>Logout</span>
                                    </button>
                                </li>
                                :
                                <div></div>
                            }
                        </ul>
                    </li>}

                    
                    <li className={classNames({'active-top-menu': this.props.activeTopbarItem === 'messages'})}
                        onClick={() => {window.location = '/#/carrito'}}>
                        <button className="p-link">
                            <i className="topbar-icon fa fa-fw fa-shopping-cart"></i>
                            <span className="topbar-badge">{localStorage.getItem("noItems")}</span>
                            <span className="topbar-item-name">Carrito</span>
                        </button>
                        
                    </li>
                    
                    
                </ul>
            </div>
        </div>;
    }
}