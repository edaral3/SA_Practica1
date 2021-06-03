import React, { Component } from "react";
import { Button } from "primereact/components/button/Button";
import { Carousel } from "primereact/carousel";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Message } from "primereact/message";
import httpClient from "react-http-client";

export class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      tasks: [],
      productos: this.getProducto(),
      display: false,
      productoSeleccionado: {},
    };

    this.onTaskChange = this.onTaskChange.bind(this);
    this.responsiveOptions = [
      {
        breakpoint: "1024px",
        numVisible: 3,
        numScroll: 3,
      },
      {
        breakpoint: "768px",
        numVisible: 2,
        numScroll: 2,
      },
      {
        breakpoint: "560px",
        numVisible: 1,
        numScroll: 1,
      },
    ];

    this.carouselItemTemplate = this.carouselItemTemplate.bind(this);
    this.agregarProducto = this.agregarProducto.bind(this);
  }

  onTaskChange(e) {
    let selectedTasks = [...this.state.tasks];
    if (e.checked) selectedTasks.push(e.value);
    else selectedTasks.splice(selectedTasks.indexOf(e.value), 1);

    this.setState({ tasks: selectedTasks });
  }

  componentDidMount() {
    console.log("la variable productos tiene->", this.state.productos);
  }

  async getProducto() {
    const postResponse = await httpClient.get(
      "http://34.72.175.19:9001/productos"
    );
    console.log("los productos son: ", postResponse);
    if (postResponse.mensaje === "OK") {
      this.setState({ productos: postResponse.productos });
      //return postResponse.productos;
    }
  }

  handleVer() {}

  carouselItemTemplate(producto) {
    return (
      <div className="car-details">
        <div className="p-grid p-nogutter separator">
          <div className="p-col-12">
            <img
              width="180"
              height="180"
              id="img"
              className="img"
              src={producto.fotografia}
              alt="sin imagen"
            />
          </div>
          <div className="p-col-12 car-data">
            <div className="car-title">{producto.nombre}</div>

            {producto.oferta && <div><div className="car-subtitle" style={{"padding-top": "5%"}}>
              <Message severity="success" text={`¡Oferta ${producto.oferta}%!`} />
            </div>

            <div className="car-subtitle">
              Precio Ofertado: Q{((producto.precio / 100) * (100 - producto.oferta)).toFixed(2)}
            </div></div>}

            <div className="car-subtitle">
              Precio Normal: Q {producto.precio}
            </div>
            
            <div className="car-subtitle">
              Categoria:  {producto.categoria === undefined ? 'Sin categoria' : producto.categoria }
            </div>


            <div className="car-subtitle">{producto.descripcion}</div>

            <div className="car-buttons">
              <Button
                icon="pi pi-shopping-cart"
                className="p-button-warning"
                onClick={() => this.agregarProducto(producto)}
              />
              <Button
                icon="pi pi-eye"
                className="p-button-info"
                onClick={() => {
                  this.setState({ productoSeleccionado: producto });
                  this.setState({ display: true });
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  agregarProducto(producto) {
    let carrito = JSON.parse(localStorage.getItem("carrito"));
    carrito.push(producto);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    localStorage.setItem("noItems", carrito.length);
  }

  render() {
    const dialogFooter = (
      <div>
        <Button
          icon="pi pi-shopping-cart"
          label="Agregar al carrito"
          className="p-button-success"
          onClick={() => {
            this.agregarProducto(this.state.productoSeleccionado);
            this.setState({ display: false });
          }}
        />
        <Button
          icon="pi pi-times"
          onClick={() => {
            this.setState({ display: false });
            this.setState({ productoSeleccionado: {} });
          }}
          label="Cancelar"
          className="p-button-secondary"
        />
      </div>
    );

    return (
      <div className="p-grid dashboard">
        <div className="p-col-12">
          <div className="card card-w-title carousel-demo">
            <h1>Restaurante</h1>
            <Carousel
              value={this.state.productos}
              itemTemplate={this.carouselItemTemplate}
              numVisible={4}
              autoplayInterval={5000}
              numScroll={1}
              responsiveOptions={this.responsiveOptions}
            ></Carousel>
          </div>
        </div>

        <Dialog
          header={this.state.productoSeleccionado.nombre}
          visible={this.state.display}
          modal={true}
          style={{ width: "50vw" }}
          footer={dialogFooter}
          onHide={() => {
            this.setState({ display: false });
            this.setState({ productoSeleccionado: {} });
          }}
        >
          <img
            src={this.state.productoSeleccionado.fotografia}
            alt={this.state.productoSeleccionado.nombre}
            style={{
              width: "40%",
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          />

          <div>
            <p>
              <b>ID: </b>
              {this.state.productoSeleccionado.id}
            </p>
            <div className="p-grid">
              <div className="p-col-12 p-md-4">
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-pencil" />
                  </span>
                  <InputText
                    placeholder="Nombre"
                    defaultValue={this.state.productoSeleccionado.nombre}
                    disabled
                  />
                </div>
              </div>

              <div className="p-col-12 p-md-4">
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-list" />
                  </span>
                  <InputText
                    placeholder="Descripción"
                    defaultValue={this.state.productoSeleccionado.descripcion}
                    disabled
                  />
                </div>
              </div>

              <div className="p-col-12 p-md-4">
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-dollar" />
                  </span>
                  <InputText
                    placeholder="Precio"
                    type="number"
                    defaultValue={this.state.productoSeleccionado.precio}
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}
