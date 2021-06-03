import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import App from "./App";
import Login from "./pages/Login";
import Error from "./pages/Error";
import Access from "./pages/Access";
import { Wizard } from "./pages/Wizard";
import { Registro } from "./pages/Registro";
import { crearProducto } from "./pages/crearProducto";
import Orden from "./pages/Orden/Orden";
import MisOrden from "./pages/Orden/misOrdenes";

class AppWrapper extends Component {
	componentDidUpdate(prevProps) {
		if (this.props.location !== prevProps.location) {
			window.scrollTo(0, 0)
		}
	}

	render() {
		switch (this.props.location.pathname) {
			case "/login":
				return <Route path="/login" component={Login} />
			case "/error":
				return <Route path="/error" component={Error} />
			case "/access":
				return <Route path="/access" component={Access} />
			case "/wizard":
				return <Route path="/wizard" component={Wizard} />
			case "/registro":
				return <Route path="/registro" component={Registro} />
			case "/crearProducto":
				return <Route path="/crearProducto" component={crearProducto} />
			case "/ordenes":
				return <Route path="/ordenes" component={Orden} />
			case "/misOrdenes":
				return <Route path="/misOrdenes" component={MisOrden} />
			default:
				return <App />;
		}
	}
}

export default withRouter(AppWrapper);
