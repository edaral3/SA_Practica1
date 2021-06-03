import React, {Component} from 'react';
import {InputText} from 'primereact/components/inputtext/InputText';
import {Button} from 'primereact/components/button/Button';
import {Panel} from 'primereact/components/panel/Panel';
import {Growl} from 'primereact/growl';
import httpClient from 'react-http-client';

export class Restaurantes extends Component {
    constructor(){
        super()

        this.state={
            nombre:"",
            descripcion:""
        }
        this.agregar = this.agregar.bind(this)
    }

    async agregar(){
        if(this.state.nombre === ""){
            this.growl.show({life:5000, severity: 'error', summary: "Error", detail: "El nombre no puede ir vacio"});
            return
        }
        if(this.state.descripcion === ""){
            this.growl.show({life:5000, severity: 'error', summary: "Error", detail: "Debe agregar descripcion para el restaurante"});
            return
        }
        
        let newUser = {}
		let errorActivo = false
		Object.assign(newUser,{
			email: 'email',
			user: this.state.nombre,
			name: this.state.descripcion,
			pwd: "123",
			type: "restaurante"
		}) 
		
		const postResponse = await httpClient.post(
			'http://34.122.87.252:4001/user',
			JSON.stringify(newUser)
		).catch((e) =>{
			console.log(e);
			let error = e.toString()
			let cadenaError = error.split("Error:")
			let jsonError = JSON.parse(cadenaError[1])
			this.growl.show({life:5000, severity: 'error', summary: "Error", detail: jsonError.data.message});
			errorActivo = true
		});;
		   
		if (errorActivo){
			return
		}
		console.log(postResponse);

		if (postResponse.createdAt !== null) {
			this.growl.show({life:5000, severity: 'success', summary: "Error", detail: "El restuarante se creo exitosamente"});
            this.setState({nombre:"", descripcion:""})
		} 
    }

    render(){
        return(
            <center>
                <Growl ref={(el) => this.growl = el }style={{ marginTop: "70px" }}></Growl>
                <div className="p-grid p-align-center">
                    <div className="p-col-12">
                        <div className="p-col-12 p-md-6 p-lg-4 p-fluid contact-form">
                            <Panel header="Agregar Restaurantes" style={{minHeight: '200px', marginTop:"120px" }}>
                                <div className="p-grid">
                                   
                                    <div className="p-col-12">
                                        <InputText type="text" placeholder="Id" value={this.state.nombre} onChange={(e) => this.setState({ nombre: e.target.value })}/>
                                    </div>
                                    <div className="p-col-12">
                                        <InputText type="text" placeholder="Nombre" value={this.state.descripcion} onChange={(e) => this.setState({ descripcion: e.target.value })} />
                                    </div>

                                    <div className="p-col-12">
                                        <Button type="button" label="Agregar" icon="fa fa-send" onClick={() => this.agregar()}></Button>
                                    </div>

                                </div>
                            </Panel>
                        </div>
                    </div>
                </div>
            </center>
        )
    }

}