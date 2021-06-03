import React, {Component} from 'react';
import {DataView, DataViewLayoutOptions} from 'primereact/dataview';
import {InputText} from 'primereact/inputtext';
import {Button} from 'primereact/button';
import {Panel} from 'primereact/panel';
import axios from 'axios';
import {Growl} from 'primereact/growl';
import {Dropdown} from "primereact/dropdown";

export class CarritoCompras extends Component {

    constructor(){
        super()

        this.state={
            dataViewValue: [],
            direccion:"",
            restaurante:""
        }

        this.dataViewItemTemplate = this.dataViewItemTemplate.bind(this);
        this.realizarPedido = this.realizarPedido.bind(this);
        this.quitarCarrito = this.quitarCarrito.bind(this);
    }

    componentDidMount(){
        let carrito = JSON.parse(localStorage.getItem("carrito"))
        let dataAux = []
        for (let i = 0; i < carrito.length; i++) {
            const element = carrito[i];
            if(dataAux.length === 0){
                Object.assign(element,{
                    cantidad:1
                })
                if(element.oferta !== undefined){
                    element.precio = (element.precio - element.precio * (element.oferta / 100) )
                }
                dataAux.push(element)
                console.log(element)
            }else{
               
                const resultado = dataAux.find( producto => producto.nombre === element.nombre );
                console.log(resultado)
                if(resultado !== undefined){
                    for (let j = 0; j < dataAux.length; j++) {
                        const ele = dataAux[j];
                        if(ele.cantidad === null){
                            Object.assign(ele,{
                                cantidad:1
                            })
                            
                        }
                       
                        if(ele.nombre === element.nombre){
                            if(ele.oferta !== undefined){
                                ele.precio = ele.precio + (element.precio - element.precio * (ele.oferta / 100) )
                            } else {
                                ele.precio = ele.precio + element.precio
                            }
                            
                            ele.cantidad = ele.cantidad + 1
                        }
                    }
                }else{
                    Object.assign(element,{
                        cantidad:1
                    })
                    dataAux.push(element);
                }

                
            }
        }
        //let info = {data:dataAux}
        let direccion
        if(localStorage.getItem("usuario") === null){
            direccion = []
        }else{
            
            direccion =  JSON.parse(localStorage.getItem("usuario")).address ? JSON.parse(localStorage.getItem("usuario")).address : []
        }
        
        
        this.setState({dataViewValue:dataAux,
            direccion: direccion.length >0 ? direccion[0] : ""
        })

        let url = 'http://35.192.44.112:4002/users/restaurante'
		
        const options = {
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json"
            }
        };

        axios.get(url,options)
          .then((response) => {
            
            console.log(response);
            if(response.status === 200){
                let aux = response.data
                let dataAux = []
                aux.forEach(element => {
                    dataAux.push({label:element.name,value:element.name})                    
                });
                this.setState({dropdownOptions:dataAux})
            }else {
                this.growl.show({life:5000, severity: 'error', summary: "Error", detail: response.data.message}); 
            }
            
          }, (error) => {
            console.log(error);
          });


    }

    realizarPedido(){

        if(this.state.direccion === "" && this.state.restaurante === ""){
            this.growl.show({life:5000, severity: 'error', summary: "Error", detail: "Seleccione una restaurante para recoger su pedido"});
            return;
        }

        let prodAux = []

        for (let i = 0; i < this.state.dataViewValue.length; i++) {
            const element = this.state.dataViewValue[i];
            prodAux.push({
                id_producto:element.id,
                cantidad_producto: element.cantidad,
                nombre_producto: element.nombre
            })
        }

        if(localStorage.getItem("usuario") === null){
            localStorage.setItem("usuario",JSON.stringify({
                user: "user"+ Math.floor(Math.random() * (5000 - 1)) + 1,
                name: "Anonimo",
                type: "cliente",
                tienda: this.state.restaurante,
                address : []
            }))
        }
        

        let objPedido = {
            id_usuario: JSON.parse(localStorage.getItem("usuario")).user,
            direccion: this.state.direccion,
            productos: prodAux,
            tienda: this.state.restaurante
        }

        let url = 'http://34.121.232.21:4007/orden'
		
        const options = {
            headers: {
                'Content-Type': 'application/json',
                "Accept": "application/json"
            }
        };

        axios.post(url, JSON.stringify(objPedido),options)
          .then((response) => {
            
            console.log(response);
            if(response.status === 200){
                this.growl.show({life:5000, severity: 'success', summary: "Exito", detail: "Se creo el pedido con exito"});
                localStorage.setItem("carrito",JSON.stringify([]))
                localStorage.setItem("noItems",0)
            }else {
                this.growl.show({life:5000, severity: 'error', summary: "Error", detail: response.data.message}); 
            }
            
          }, (error) => {
            console.log(error);
          });

    }

    dataViewItemTemplate(car,layout) {
        if (!car) {
            return(
                <div>
                    
                </div>
            )
        }

        if (layout === 'list') {
            return (
                <div className="p-grid" style={{padding: '2em', borderBottom: '1px solid #d9d9d9'}}>
                    <div className="p-col-12 p-md-3">
                        <img   width="180" height="180" id="img" className="img"src={car.fotografia} alt="sin imagen" />
                    </div>
                    <div className="p-col-12 p-md-8 car-details">
                        <div className="p-grid">
                            <div className="p-col-2 p-sm-6">Nombre:</div>
                            <div className="p-col-10 p-sm-6">{car.nombre}</div>

                            <div className="p-col-2 p-sm-6">Descripcion:</div>
                            <div className="p-col-10 p-sm-6">{car.descripcion}</div>

                            <div className="p-col-2 p-sm-6">Precion:</div>
                            <div className="p-col-10 p-sm-6">{car.precio}</div>

                            <div className="p-col-2 p-sm-6">Cantidad:</div>
                            <div className="p-col-10 p-sm-6">{car.cantidad}</div>

                            <div className="p-col-2 p-sm-6">Eliminar:</div>
                            <div className="p-col-10 p-sm-6"><Button icon="pi pi-trash" style={{color:'#ff0000' }} onClick={() => this.quitarCarrito(car)} /></div>
                        </div>
                    </div>
                </div>
            );
        }

        if (layout === 'grid') {
            return (
                <div style={{ padding: '.5em' }} className="p-col-12 p-md-3">
                    <Panel header={car.vin} style={{ textAlign: 'center' }}>
                        <img   width="180" height="180" id="img" className="img"src={car.fotografia} alt="sin imagen" />
                        <div className="car-detail">{car.nombre} - {car.cantidad} - {car.precio}</div>
                        
                    </Panel>
                </div>
            );
        }
    }

    quitarCarrito(datosQuitar){
        let datosPedido = this.state.dataViewValue
        let indiceQuitar = 0;
        for (let i = 0; i < this.state.dataViewValue.length; i++) {
            const element = datosPedido[i];
            if(element.nombre === datosQuitar.nombre){
                indiceQuitar = i
            }
        }

        datosPedido.splice(indiceQuitar);

        this.setState({dataViewValue:datosPedido})
        
        let carrito = JSON.parse(localStorage.getItem("carrito"))
        let dataAux = []
        let hayProducto = 0
        for (let i = 0; i < carrito.length; i++) {
            const element = carrito[i];
            if(element.nombre !== datosQuitar.nombre){
                dataAux.push(element)
                localStorage.setItem("carrito",JSON.stringify(dataAux))
                localStorage.setItem("noItems",dataAux.length)
                hayProducto += 1
            }
        }

        if(hayProducto === 0){
            localStorage.setItem("noItems",0);
        }
    }

    render(){

        let dialogFooter =  <div className="ui-dialog-buttonpane p-clearfix">
                                <Button className='btn-Save' id='id_btn_save_new_user' label={"Realizar Pedido"} icon="pi pi-check"  onClick={this.realizarPedido}/>
                                
                            </div>;


        const dataViewHeader = (
            <div className="p-grid">
                <div className="p-col-6 p-md-8 filter-container">
                    <div style={{textAlign:'left'}}>
                        <InputText placeholder="Direccion" value={this.state.direccion} onChange={(e) => this.setState({ direccion: e.target.value })}/>
                        
                        <Dropdown id="avalon" appendTo={document.body} className="form-element"
                                                    options={this.state.dropdownOptions}
                                                    value={this.state.restaurante}
                                                    onChange={event => this.setState({restaurante: event.value})}/>
                    </div>
                </div>
                <div className="p-col-6 p-md-4" style={{textAlign: 'right'}}>
                    <DataViewLayoutOptions layout={this.state.layout} onChange={(e) => this.setState({layout: e.value})} />
                </div>
            </div>
        );

        return(
            <div className="p-col-12">
                <Growl ref={(el) => this.growl = el }style={{ marginTop: "70px" }}></Growl>
                <div className="card card-w-title">
                    <h1>Pedido</h1>
                    <DataView ref={el => this.dv = el} value={this.state.dataViewValue} filterBy="brand" itemTemplate={this.dataViewItemTemplate}
                            paginatorPosition="both" paginator={true} rows={10} header={dataViewHeader} layout={this.state.layout} footer={dialogFooter} />
                </div>
            </div>
        )
    }
}