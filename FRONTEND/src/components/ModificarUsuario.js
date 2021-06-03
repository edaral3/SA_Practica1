import React, {Component} from 'react';
import {InputText} from 'primereact/components/inputtext/InputText';
import {Button} from 'primereact/components/button/Button';
import {Panel} from 'primereact/components/panel/Panel';
import {Password} from 'primereact/password';
import {Growl} from 'primereact/growl';
import httpClient from 'react-http-client';
import axios from 'axios';
import {Dialog} from 'primereact/dialog';


export class ModificarUsuario extends Component {

    constructor(){
        super()

        this.state={
            usuario: "",
            nombre:"",
            apellidos :"",
            correo: "",
            contra:"",
            contraConfir: "",
            tipoUsuario: "",
            lastContra: "",
            displayDialogDelete:false,
            direcciones: null,
            direccion:""
        }
        this.getDatos = this.getDatos.bind(this);
        this.createDialogDelete = this.createDialogDelete.bind(this);
    }

    componentDidMount(){
        this.getDatos();
    }

    async getDatos (){
        let errorActivo = false;
        let usr = JSON.parse(localStorage.getItem("usuario"))
        let url = 'http://35.192.44.112:4002/user/'+usr.user
		const getResponse = await httpClient.get(
			url
		).catch((e) =>{
			console.log(e);
			let error = e.toString()
			let cadenaError = error.split("Error:")
			let jsonError = JSON.parse(cadenaError[1])
			this.growl.show({life:5000, severity: 'error', summary: "Error", detail: jsonError.data.message});
			errorActivo = true
		});
		   
		if (errorActivo){
			return
		}

        if(getResponse === ""){
            return
        }

        let nombre = getResponse.name.split(" ")
        this.setState({
            usuario: getResponse.user,
            nombre: nombre[0],
            apellidos: nombre[1],
            correo: getResponse.email,
            tipoUsuario : getResponse.type,
            lastContra: getResponse.pwd,
            direcciones: getResponse.address
        })
    }

    async modificar(){
        if(this.state.nombre === ""){
            this.growl.show({life:5000, severity: 'error', summary: "Error", detail: "El nombre no puede ir vacio"});
            return
        }
        if(this.state.apellidos === ""){
            this.growl.show({life:5000, severity: 'error', summary: "Error", detail: "El apellido no puede ir vacio"});
            return
        }
        if(this.state.correo === ""){
            this.growl.show({life:5000, severity: 'error', summary: "Error", detail: "El correo no puede ir vacio"});
            return
        }
        if(this.state.contra !== this.state.contraConfir){
            this.growl.show({life:5000, severity: 'error', summary: "Error", detail: "Los valores del nuevo password no coinciden"});
            return
        }

        if(this.state.direccion === ""){
            this.growl.show({life:5000, severity: 'error', summary: "Error", detail: "La direccion no puede ir vacia"});
            return
        }
        

        let objUsr ={}
        
        let direc = this.state.direcciones
        direc.push(this.state.direccion)

        Object.assign(objUsr,{
			email: this.state.correo,
			user: this.state.usuario,
			name: this.state.nombre + " " + this.state.apellidos,
			pwd: this.state.contra !== "" ? this.state.contra : this.state.lastContra,
			type: JSON.parse( localStorage.getItem("usuario")).type,
            address: direc
		}) 

        let url = 'http://35.193.194.47:4004/user/'+JSON.parse( localStorage.getItem("usuario")).user
		
        const options = {
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json"
            }
        };


        axios.put(url, JSON.stringify( objUsr),options)
          .then((response) => {
            
            console.log(response);
            if(response.status === 201){
                this.growl.show({life:5000, severity: 'success', summary: "Exito", detail: "Se modifico con exito tus datos"});
            
                this.setState({
                    contraConfir:"",
                    contra:""
                })
            }else {
                this.growl.show({life:5000, severity: 'error', summary: "Error", detail: response.data.message}); 
            }
            
          }, (error) => {
            console.log(error);
          });
          
    }

    
    eliminarUsuario(){
        let url = 'http://35.239.63.117:4005/user/'+localStorage.getItem("usuario")
		
        const options = {
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json"
            }
        };


        axios.delete(url,options)
          .then((response) => {
            
            console.log(response);
            if(response.status === 200){
                //this.growl.show({life:5000, severity: 'success', summary: "Exito", detail: "Se elimino el usuario"});
                localStorage.clear()
                window.location = process.env.PUBLIC_URL +'/#/'
            }else {
                this.growl.show({life:5000, severity: 'error', summary: "Error", detail: response.data.message}); 
            }
            
          }, (error) => {
            console.log(error);
          });   
    }

    createDialogDelete(){
        let dialogFooterActivate =<div id='dialogFooter' className="ui-dialog-buttonpane p-clearfix">
                                    <Button id='id_btn_delete_yes' label={"SI"} icon="pi pi-check"  onClick={this.eliminarUsuario}/>
                                    <Button id='id_btn_delete_not' label={"NO"}  className='btn-Not' onClick={() => this.setState({displayDialogDelete:false})}/>
                                </div>  ; 

        return(
            <Dialog  visible={this.state.displayDialogDelete} width="100px" header={"Eliminar"} footer={dialogFooterActivate} modal={true}  onHide={() => this.setState({displayDialogDelete: false})}>
                    <p>{"¿Esta seguro que desea eliminar su usuario?"}</p>
            </Dialog>
        );
    }

    render() {
        return (
            
            <React.Fragment>
            <Growl ref={(el) => this.growl = el }style={{ marginTop: "70px" }}></Growl>
            <center>
                <div className="p-grid p-align-center">
                    <div className="p-col-12">
                        <div className="p-col-12 p-md-6 p-lg-4 p-fluid contact-form">
                            <Panel header="Modificar Datos" style={{minHeight: '415px'}}>
                                <div className="p-grid">
                                    <div className="p-col-12">
                                        <InputText type="text" placeholder="Usuario" disabled={true} value={this.state.usuario} onChange={(e) => this.setState({ usuario: e.target.value })}/>
                                    </div>
                                    <div className="p-col-12">
                                        <InputText type="text" placeholder="Nombres" value={this.state.nombre} onChange={(e) => this.setState({ nombre: e.target.value })}/>
                                    </div>
                                    <div className="p-col-12">
                                        <InputText type="text" placeholder="Apellidos" value={this.state.apellidos} onChange={(e) => this.setState({ apellidos: e.target.value })} />
                                    </div>
                                    <div className="p-col-12">
                                        <InputText type="text" placeholder="Correo" value={this.state.correo} onChange={(e) => this.setState({ correo: e.target.value })}/>
                                    </div>
                                    <div className="p-col-12">
                                        <InputText type="text" placeholder="Direccion" value={this.state.direccion} onChange={(e) => this.setState({ direccion: e.target.value })} />
                                    </div>
                                    <div className="p-col-12">
                                        <Password id="password" placeholder="Nueva Contraseña" className="form-element" value={this.state.contra} onChange={(e) => this.setState({ contra: e.target.value })}/>
                                    </div>
                                    <div className="p-col-12">
                                        <Password id="password" placeholder="Confirmar Contraseña" className="form-element" value={this.state.contraConfir} onChange={(e) => this.setState({ contraConfir: e.target.value })}/>
                                    </div>
                                    
                                    <div className="p-col-12">
                                        <Button type="button" label="Enviar" icon="fa fa-send" onClick={() => this.modificar()}></Button>
                                    </div>
                                    <div className="p-col-12">
                                        <Button type="button" label="Eliminar Usuario" icon="fa fa-trash" className="p-button-danger" onClick={()=>this.setState({displayDialogDelete:true})}></Button>
                                    </div>
                                </div>
                            </Panel>
                        </div>
                    </div>
                </div>
            </center>
            {this.createDialogDelete()}
            </React.Fragment>
        );
    }
}