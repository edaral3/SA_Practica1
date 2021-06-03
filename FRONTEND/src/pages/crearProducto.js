import React, {Component} from 'react';
import classNames from 'classnames';
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {Growl} from 'primereact/growl';
import {FileUpload} from 'primereact/fileupload';
import {OverlayPanel} from 'primereact/overlaypanel';
import { InputTextarea } from 'primereact/inputtextarea';
import httpClient from 'react-http-client';
import {Messages} from 'primereact/messages';
import {Message} from 'primereact/message';

//import {Password} from 'primereact/password';

export class crearProducto extends Component {
	constructor() {
		super();
		this.state = {
			foto:'assets/layout/images/extensions/agregar.png',
			activeContent: 'register',
			activeTab: 'register',
			activeCard: 'pro',
		
		};

		this.validationStepOne = this.validationStepOne.bind(this);
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

		if(step==='crear'){
			if (this.validationStepOne()) {
				
				var aux=this.state.foto.split(',')
				var foto=aux[1]
				var json={
					nombre:this.state.nombre,
					descripcion:this.state.descripcion,
					precio:Number(this.state.precio), 
					fotografia:foto,
				}

				console.log(JSON.stringify(json))
				this.postProducto(json)
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


	async postProducto(json){
		const postResponse = await httpClient.post(
			'http://34.72.175.19:9001/productos',
			JSON.stringify(json)
		  );
		   
		  console.log(postResponse);

		  if (postResponse.message==='OK') {
			  this.showSuccess();
		  } else {
			  
		  }
	}

	showSuccess() {
        let msg = {life:3500,severity: 'success', summary: 'Producto creado con exito!', detail: this.state.nombre};
        this.growl.show(msg);
        //this.messages.show(msg);
    }

	validationStepOne (){

		if(this.state.precio === undefined){
			this.growl.show({life:5000, severity: 'error', summary: "Error", detail: "El campo precio no puede ser vacio"});
			return false;
		}

		if(this.state.descripcion === undefined){
			this.growl.show({life:5000, severity: 'error', summary: "Error", detail: "El campo descripcion no puede ser vacio"});
			return false;
		}

		if(this.state.nombre === undefined){
			this.growl.show({life:5000, severity: 'error', summary: "Error", detail: "El campo nombre no puede ser vacio"});
			return false;
		}

		if(this.state.foto === 'assets/layout/images/extensions/agregar.png'){
			this.growl.show({life:5000, severity: 'error', summary: "Error", detail: "El campo foto no puede ser vacio"});
			return false;
		}
					 

		return true;
	}

	onUpload() {
        this.growl.show({severity: 'info', summary: 'Success', detail: 'File Uploaded'});
    }

	render() {
		const {foto}=this.state
		const invoiceUploadHandler = ({files}) => {
			const [file] = files;
			const fileReader = new FileReader();
			fileReader.onload = (e) => {
				//uploadInvoice(e.target.result);
				console.log('la foto es->',e.target.result)
				this.setState({'foto':e.target.result})
			};
			fileReader.readAsDataURL(file);
		}; 

		return (
			<div className="wizard-body">
				<Growl ref={(el) => this.growl = el }></Growl>
				<div className="wizard-wrapper">
					<div className="wizard-container">
					
							<div className="wizard-tabs-container">
								<div
									className={classNames("wizard-tab register-tab", {'active-tab': this.state.activeTab !== null})}
									onClick={() => this.clickNext('register')}>
									
								</div>
								<div
									className={classNames("wizard-tab tier-tab", {'active-tab': this.state.activeTab === 'tier' || this.state.activeTab === 'payment'})}
									onClick={() => this.clickNext('tier')}>
									
								</div>
								
							</div>
						

						<div className={classNames("wizard-content register", {'active-content': this.state.activeContent === 'register'})}>
							<div className="content-header">
								<div className="p-grid">
									<div className="p-col-6 title">
										<h1>Datos del articulo</h1>
										<span>Ingrese la informacion solicitada para crear el producto</span>
									</div>
									<div className="p-col-6 icon">
										<img src="assets/layout/images/extensions/nuevoBlack.png"
											 className="layout-image" alt="avalon-layout"/>
									</div>
								</div>
							</div>


							<div className="content">
								<div className="p-grid forms">
									<div className="p-col-12 p-lg-6">
										<label htmlFor="nombre">Nombre</label>
										<InputText id="nombre" placeholder="Nombre" className="form-element" value={this.state.nombre} onChange={(e) => this.setState({ nombre: e.target.value })}/>

										<label htmlFor="precio">Precio</label>
										<InputText id="precio" placeholder="Precio" className="form-element" value={this.state.precio} onChange={(e) => this.setState({ precio: e.target.value })}/>

										<label htmlFor="descrpcion">Descripcion</label>
										<InputTextarea id="descripcion" placeholder="descripcion" className="form-element" value={this.state.descripcion} onChange={(e) => this.setState({ descripcion: e.target.value })}/>
									</div>

									<div className="p-col-12 p-lg-6">
										
                       					 <Growl ref={(el) => this.growl = el} />
                                        <FileUpload name="producto" auto={true} mode="basic"  customUpload={true} id ="foto" className="wizard-file" uploadHandler={invoiceUploadHandler}  accept="image/*" maxFileSize={1000000} chooseLabel="Selecciona una imagen" />
										<div className="img-holder">
										<img  onClick={(event)=> this.overlayPanel1.toggle(event)}  src={foto} alt="" width="180" height="180" id="img" className="img" />
											<OverlayPanel ref={el => this.overlayPanel1 = el}>
											<img src={foto} alt="Nature 1" />
											</OverlayPanel>
										</div>
									</div>
									
								</div>

								<div className="p-grid button">
									<Button className="continue-button" label="Crear" style={{width: '100%'}} onClick={() => this.clickNext('crear')}/>
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
									<Button className="continue-button" label="Registrar" style={{width: '100%'}} onClick={() => this.clickNext('payment')}/>
								</div>
							</div>
						</div>

						
					</div>
				</div>
			</div>
		)
	}
}
