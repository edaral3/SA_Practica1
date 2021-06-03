import React, {Component} from 'react';
import {InputText} from 'primereact/inputtext';
import {Button} from "primereact/button";
import {Growl} from 'primereact/growl';
import httpClient from 'react-http-client';

export default class Login extends Component {

	constructor(){
		super()

		this.state={
			usuario: "",
			contra:"",
			mensajeLogin: '',
			msgRes: ''
		}
		
		this.login = this.login.bind(this);
	}

	async login(){

		this.setState({ mensajeLogin: 'Clic' })

		if(this.state.usuario === ""){
			this.growl.show({life:5000, severity: 'error', summary: "Error", detail: "El usuario esta vacio"});
			this.setState({ mensajeLogin: 'El usuario esta vacio' })
			return;
		}

		if(this.state.contra === ""){
			this.growl.show({life:5000, severity: 'error', summary: "Error", detail: "El password esta vacio"});
			this.setState({ mensajeLogin: 'El pwd esta vacio' })
			return;
		}

		let errorActivo = false;

		const postResponse = await httpClient.get(
			'http://35.239.199.104:4003/login/'+this.state.usuario+"/"+this.state.contra
		).catch((e) =>{
			console.log(e);
			let error = e.toString()
			let cadenaError = error.split("Error:")
			let jsonError = JSON.parse(cadenaError[1])
			this.growl.show({life:5000, severity: 'error', summary: "Error", detail: jsonError.data.message});
			this.setState({ mensajeLogin: jsonError.data.message })
			this.setState({ msgRes: jsonError.data.message })
			errorActivo = true
		});
		   
		if (errorActivo){
			return
		}
		if(postResponse === ""){
			this.growl.show({life:5000, severity: 'error', summary: "Error", detail: "Error en datos de usuario para login"});
			this.setState({ mensajeLogin: 'Error en datos de usuario para login' })
			this.setState({ msgRes: 'Error en datos de usuario para login' })
			return
		}
		localStorage.removeItem("usuario")
		localStorage.setItem("usuario", JSON.stringify(postResponse));
		this.setState({ mensajeLogin: 'Correcto' })
		this.setState({ msgRes: 'Correcto' })
		window.location = process.env.PUBLIC_URL +'/#/'
	}

	render() {
		return <div className="login-body">
			<Growl ref={(el) => this.growl = el }></Growl>
			<div className="login-image"></div>
			<div className="card login-panel p-fluid">
				<div className="login-panel-content">
					<div className="p-grid">
						<div className="p-col-3" style={{textAlign:'left'}}>
							<img src="assets/layout/images/login/icon-login.svg" alt="avalon-react"/>
						</div>
						<div className="p-col-9" style={{textAlign:'left'}}>
							<h2 className="welcome-text">Bienvenidos a Foot Delivery</h2>
							<span id="mensaje-login" className="guest-sign-in">{this.state.mensajeLogin || 'Ingresa tus datos'}</span>
							<br/>
							{this.state.msgRes && <span id="resultadoLogin" className="guest-sign-in">{this.state.msgRes}</span>}
						</div>
						<div className="p-col-12" style={{textAlign:'left'}}>
							<label className="login-label">Usuario</label>
							<div className="login-input">
								<InputText id="input-usuario" name="usuario" placeholder="Usuario" value={this.state.usuario} onChange={(e) => this.setState({ usuario: e.target.value })}/>
							</div>
						</div>
						<div className="p-col-12" style={{textAlign:'left'}}>
							<label className="login-label">Contraseña</label>
							<div className="login-input">
								<InputText id="input-pwd" name="pwd" type="password" placeholder="Contraseña" value={this.state.contra} onChange={(e) => this.setState({ contra: e.target.value })}/>
							</div>
						</div>
						<div className="p-col-12 p-md-6 button-pane">
							<Button id="btn-ingresar" name="ingresar" label="Ingresar" onClick={this.login} />
						</div>
						
					</div>
				</div>
			</div>
		</div>
	}
}