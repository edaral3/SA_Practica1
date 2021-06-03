import React, {Component} from 'react';
import classNames from 'classnames';
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {Growl} from 'primereact/growl';
import {Password} from 'primereact/password';
import httpClient from 'react-http-client';

export class Registro extends Component {
	constructor() {
		super();
		this.state = {
			activeContent: 'register',
			activeTab: 'register',
			activeCard: 'pro',
			user: '',
			name: '',
			emai: '',
			pwd: '',
			type: '',
			lastname:''
			
		};

		this.validationStepOne = this.validationStepOne.bind(this);
		
	}

	async crearNuevoUsuario(json){
		let newUser = {}
		let errorActivo = false
		Object.assign(newUser,{
			email: this.state.emai,
			user: this.state.user,
			name: this.state.name + " " + this.state.lastname,
			pwd: this.state.pwd,
			type: "cliente"
		}) 

		const postResponse1 = await httpClient.post(
			'http://34.122.87.252:4001/user',
			JSON.stringify(newUser)
		)
		   
		if (errorActivo){
			return
		}
		console.log(postResponse1);
	}
	

	clickNext(step) {
		if (step === 'register') {
			if (this.state.activeTab === 'register') {
				this.setState({
					activeTab: 'register',
					activeContent: 'register'
				});
			} else if (this.state.activeTab === 'tier') {
				setTimeout(() => {
					this.setState({
						activeContent: 'register'
					});
				}, 600);
				this.setState({
					activeTab: 'register'
				});
			} else {
				this.setState({activeTab: 'tier'});
				setTimeout(() => {
					this.setState({
						activeTab: 'register',
					});
				}, 600);
				setTimeout(() => {
					this.setState({
						activeContent: 'register'
					});
				}, 1200);
			}
		}
		if (step === 'tier') {
			if(this.validationStepOne()){	
				this.setState({
					activeTab: 'tier'
				});
				setTimeout(() => {
					this.setState({
						activeContent: 'tier'
					});
				}, 600);
			}
		}

		if (step === 'payment') {
			if (this.state.activeTab === 'payment') {
				this.setState({
					activeTab: 'payment',
					activeContent: 'payment'
				});
			} else if (this.state.activeTab === 'tier') {
				setTimeout(() => {
					this.setState({
						activeContent: 'payment'
					});
				}, 600);
				this.setState({
					activeTab: 'payment'
				});
			} else {
				this.setState({activeTab: 'tier'});
				setTimeout(() => {
					this.setState({
						activeTab: 'payment'
					});
				}, 600);
				setTimeout(() => {
					this.setState({
						activeContent: 'payment'
					});
				}, 1200);
			}
		}
	}

	selectTier(card) {
		this.setState({activeCard: card});
		setTimeout(() => {
			this.setState({activeTab: 'payment'});
		}, 600 );
		setTimeout(() => {
			this.setState({activeContent: 'payment'});
		}, 600);
	}

	validationStepOne (){

		if(this.state.user === undefined){
			this.growl.show({life:5000, severity: 'error', summary: "Error", detail: "El campo usuario no puede ser vacio"});
			return false;
		}

		if(this.state.emai === undefined){
			this.growl.show({life:5000, severity: 'error', summary: "Error", detail: "Debe agregar un correo para registrarse"});
			return false;
		}

		if(this.state.name === undefined){
			this.growl.show({life:5000, severity: 'error', summary: "Error", detail: "Debe agregar almenos un nombre"});
			return false;
		}

		if(this.state.lastname === undefined){
			this.growl.show({life:5000, severity: 'error', summary: "Error", detail: "Debe agregar almenos un apellido"});
			return false;
		}

		if(this.state.pwd === undefined){
			this.growl.show({life:5000, severity: 'error', summary: "Error", detail: "Ingrese una contraseña para ingresar al sistema"});
			return false;
		}

		if(this.state.confiContrasena === undefined){
			this.growl.show({life:5000, severity: 'error', summary: "Error", detail: "Debe confirmar su contraseña"});
			return false;
		}

		if(this.state.pwd !== this.state.confiContrasena){
			this.growl.show({life:5000, severity: 'error', summary: "Error", detail: "La contraseña y la confirmacion no son iguales"});
			return false;
		}
					 

		return true;
	}

	render() {
		return (
			<div className="wizard-body">
				<Growl ref={(el) => this.growl = el }></Growl>
				<div className="wizard-wrapper">
					<div className="wizard-container">
						<div className="wizard-header">
							<div className="wizard-tabs-container">
								<div
									className={classNames("wizard-tab register-tab", {'active-tab': this.state.activeTab !== null})}
									onClick={() => this.clickNext('register')}>
									<div className="tab-progressbar"/>
									<div className="tab-header"/>
								</div>
								<div
									className={classNames("wizard-tab tier-tab", {'active-tab': this.state.activeTab === 'tier' || this.state.activeTab === 'payment'})}
									onClick={() => this.clickNext('tier')}>
									<div className="tab-progressbar"/>
									<div className="tab-header"/>
								</div>
								
							</div>
						</div>

						<div className={classNames("wizard-content register", {'active-content': this.state.activeContent === 'register'})}>
							<div className="content-header">
								<div className="p-grid">
									<div className="p-col-6 title">
										<h1>Datos Usuario</h1>
										<span>Ingrese la informacion para su usuario</span>
									</div>
									<div className="p-col-6 icon">
										<img src="assets/layout/images/extensions/icon-register.svg"
											 className="layout-image" alt="avalon-layout"/>
									</div>
								</div>
							</div>


							<div className="content">
								<div className="p-grid forms">
									<div className="p-col-12 p-lg-6">
										<label htmlFor="name">Usuario</label>
										<InputText id="name" placeholder="Usuario" className="form-element" value={this.state.user} onChange={(e) => this.setState({ user: e.target.value })}/>

										<label htmlFor="email">Nombre</label>
										<InputText id="email" placeholder="Nombre" className="form-element" value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })}/>

										<label htmlFor="password">Contraseña</label>
										<Password id="password" placeholder="Contraseña" className="form-element" value={this.state.pwd} onChange={(e) => this.setState({ pwd: e.target.value })}/>
									</div>

									<div className="p-col-12 p-lg-6">
										<label htmlFor="password">Corrreo</label>
										<InputText id="password" placeholder="Corrreo" className="form-element" value={this.state.emai} onChange={(e) => this.setState({ emai: e.target.value })}/>

										<label htmlFor="password">Apellidos</label>
										<InputText id="password" placeholder="Apellidos" className="form-element" value={this.state.lastname} onChange={(e) => this.setState({ lastname: e.target.value })}/>

										<label htmlFor="password">Confirmar Contraseña</label>
										<Password id="password" placeholder="Confirmar Contraseña" className="form-element" value={this.state.confiContrasena} onChange={(e) => this.setState({ confiContrasena: e.target.value })}/>

									</div>
								</div>

								<div className="p-grid button">
									<Button className="continue-button" label="Continuar" style={{width: '100%'}} onClick={() => this.clickNext('tier')}/>
								</div>
							</div>
						</div>

						<div className={classNames("wizard-content tier", {'active-content': this.state.activeContent === 'tier'})}>
							<div className="content-header">
								<div className="p-grid">
									<div className="p-col-6 title">
										<h1>Datos de Cobro</h1>
										<span>Ingrese los datos para el cobro de sus compras</span>
									</div>
									<div className="p-col-6 icon">
										<img src="assets/layout/images/extensions/icon-tier@2x.png"
											 className="layout-image" alt="avalon-layout"/>
									</div>
								</div>
							</div>

							<div className="content">
								<div className="p-grid forms">
										<div className="p-col-12 p-lg-6">
											<label htmlFor="name">Nombre Tarjeta</label>
											<InputText id="name" placeholder="Nombre Tarjeta" className="form-element" value={this.state.nombreTarjeta} onChange={(e) => this.setState({ nombreTarjeta: e.target.value })}/>

											<label htmlFor="email">Fecha Expiracion</label>
											<InputText id="email" placeholder="Fecha Expiracion" className="form-element" value={this.state.fechaExpiracion} onChange={(e) => this.setState({ fechaExpiracion: e.target.value })}/>

										</div>

										<div className="p-col-12 p-lg-6">
											<label htmlFor="password">No. Tarjeta</label>
											<InputText id="password" placeholder="No. Tarjeta" className="form-element"value={this.state.noTarjeta} onChange={(e) => this.setState({ noTarjeta: e.target.value })} />

											<label htmlFor="password">Codigo de Seguridad</label>
											<InputText id="password" placeholder="Codigo de Seguridad" className="form-element" value={this.state.codSeguridad} onChange={(e) => this.setState({ codSeguridad: e.target.value })}/>

										</div>
								</div>

								<div className="p-grid button">
									<Button className="continue-button" label="Registrar" style={{width: '100%'}} onClick={() => {this.crearNuevoUsuario()}}/>
								</div>
							</div>
						</div>

						
					</div>
				</div>
			</div>
		)
	}
}
