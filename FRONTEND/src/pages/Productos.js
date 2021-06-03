import React, { Component } from "react";
import { ProductoService } from "../service/ProductoService";
import { NodeService } from "../service/NodeService";
import { EventService } from "../service/EventService";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Growl } from "primereact/growl";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";

export class Productos extends Component {
  constructor() {
    super();
    this.state = {
      mostrarCargaImg: false,
      productoModificar: {},
      productoCrear: {},
      displayCrear: false,
      productoSeleccionado: {},
      dataTableValue: [],
      datatableBrand: null,
      datatableColors: null,
      dataViewValue: [],
      picklistSourceCars: [],
      picklistTargetCars: [],
      orderlistCars: [],
      selectedFile: null,
      documents: [],
      documentsSelection: [],
      layout: "list",
      sortOptions: [
        { label: "Newest First", value: "!year" },
        { label: "Oldest First", value: "year" },
        { label: "Brand", value: "brand" },
      ],
      categoriasProductos: [
        { label: "Hamburguesas", value: "Hamburguesas" },
        { label: "Pizzas", value: "Pizzas" },
        { label: "Panes", value: "Panes" },
        { label: "Ensaladas", value: "Ensaladas" },
      ],
      categoria: null,
    };

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

    this.productoService = new ProductoService();
    this.nodeService = new NodeService();
    this.eventService = new EventService();

    this.pickListTemplate = this.pickListTemplate.bind(this);
    this.orderListTemplate = this.orderListTemplate.bind(this);
    this.onSortChange = this.onSortChange.bind(this);
    this.onBrandChange = this.onBrandChange.bind(this);
    this.onColorChange = this.onColorChange.bind(this);
    this.actionTemplate = this.actionTemplate.bind(this);
    this.handleEliminar = this.handleEliminar.bind(this);
    this.handleModificar = this.handleModificar.bind(this);
    this.handleGuardar = this.handleGuardar.bind(this);
  }

  componentDidMount() {
    this.productoService
      .getProductos()
      .then((data) => {this.setState({ dataTableValue: data })});
  }

  pickListTemplate(car) {
    if (!car) {
      return;
    }

    return (
      <div className="p-clearfix">
        <img
          src={`assets/demo/images/car/${car.brand}.png`}
          alt={car.brand}
          style={{
            display: "inline-block",
            margin: "2px 0 2px 2px",
            width: "50px",
          }}
        />
        <div
          style={{ fontSize: "16px", float: "right", margin: "15px 5px 0 0" }}
        >
          {car.brand}
        </div>
      </div>
    );
  }

  orderListTemplate(car) {
    if (!car) {
      return;
    }

    return (
      <div className="p-clearfix">
        <img
          src={`assets/demo/images/car/${car.brand}.png`}
          alt={car.brand}
          style={{
            display: "inline-block",
            margin: "2px 0 2px 2px",
            width: "50px",
          }}
        />
        <div style={{ fontSize: 14, float: "right", margin: "15px 5px 0 0" }}>
          {car.year} - {car.color}
        </div>
      </div>
    );
  }

  onSortChange(event) {
    let value = event.value;

    if (value.indexOf("!") === 0)
      this.setState({
        sortOrder: -1,
        sortField: value.substring(1, value.length),
        sortKey: value,
      });
    else this.setState({ sortOrder: 1, sortField: value, sortKey: value });
  }

  onBrandChange(event) {
    this.dt.filter(event.value, "brand", "equals");
    this.setState({ datatableBrand: event.value });
  }

  onColorChange(event) {
    this.dt.filter(event.value, "color", "in");
    this.setState({ datatableColors: event.value });
  }

  async handleGuardar() {
    console.log(this.state.productoCrear);
    let data = null;
    let productoCrear = {};

    if (
      !(
        this.state.productoCrear.nombre &&
        this.state.productoCrear.descripcion &&
        this.state.productoCrear.precio &&
        this.state.selectedFile
      )
    ) {
      const msg = {
        severity: "warn",
        summary: "Campos insuficientes",
        detail: "Debes llenar todos los campos primero.",
      };
      this.growl.show(msg);
      return;
    }

    try {
      const usuarioActual = await JSON.parse(localStorage.getItem("usuario"));

      productoCrear = {
        nombre: this.state.productoCrear.nombre,
        descripcion: this.state.productoCrear.descripcion,
        precio: this.state.productoCrear.precio,
        categoria: this.state.productoCrear.categoria,
        id_usuario: usuarioActual.user,
        nombre_usuario: usuarioActual.name,
      };

      data = await this.productoService.crearProducto(
        productoCrear,
        this.state.selectedFile
      );
    } catch (error) {
      console.log(error);
      const msg = {
        severity: "warn",
        summary: "Error",
        detail: "No se pudo guardar el producto.",
      };
      this.growl.show(msg);
      this.setState({ displayCrear: false });
      this.setState({ selectedFile: null });
      this.setState({ productoCrear: {} });

      return;
    }

    let msg;

    console.log(data);
    if (data && data.mensaje === "OK") {
      msg = {
        severity: "success",
        summary: "Creado",
        detail: "Producto creado correctamente.",
      };
    } else {
      msg = {
        severity: "error",
        summary: "Error",
        detail: "No se pudo crear el producto.",
      };
    }

    this.growl.show(msg);
    this.setState({ displayCrear: false });
    this.setState({ selectedFile: null });
    this.setState({ productoCrear: {} });
    if (data.mensaje === "OK") {
      window.location.reload();
    }
  }

  async handleModificar() {
    console.log(this.state.productoModificar);
    let mensaje = "";
    let productoModificar = {};

    try {
      const usuarioActual = await JSON.parse(localStorage.getItem("usuario"));

      productoModificar = {
        nombre: this.state.productoModificar.nombre
          ? this.state.productoModificar.nombre
          : this.state.productoSeleccionado.nombre,
        descripcion: this.state.productoModificar.descripcion
          ? this.state.productoModificar.descripcion
          : this.state.productoSeleccionado.descripcion,
        precio: this.state.productoModificar.precio
          ? this.state.productoModificar.precio
          : this.state.productoSeleccionado.precio,
        id: this.state.productoSeleccionado.id,
        id_usuario: usuarioActual.user,
        nombre_usuario: usuarioActual.name,
      };

      if (
        this.state.productoModificar.oferta &&
        this.state.productoModificar.oferta > 0
      ) {
        productoModificar.oferta = this.state.productoModificar.oferta;
      }

      mensaje = await this.productoService.modificarProducto(
        productoModificar,
        this.state.selectedFile
      );
    } catch (error) {
      console.log(error);
      const msg = {
        severity: "warn",
        summary: "Error",
        detail: "No se pudo guardar el producto.",
      };
      this.growl.show(msg);
      this.setState({ display: false });
      this.setState({ selectedFile: null });
      this.setState({ productoSeleccionado: {} });
      return;
    }

    let msg;

    if (mensaje === "OK") {
      msg = {
        severity: "success",
        summary: "Modificado",
        detail: "Producto modificado correctamente.",
      };
    } else {
      msg = {
        severity: "error",
        summary: "Error",
        detail: "No se pudo modificar el producto.",
      };
    }

    this.growl.show(msg);
    this.modificarDeArreglo(productoModificar);
    this.setState({ display: false });
    this.setState({ selectedFile: null });
    this.setState({ productoSeleccionado: {} });
  }

  async handleEliminar() {
    let mensaje = "";

    try {
      mensaje = await this.productoService.eliminarProducto(
        this.state.productoSeleccionado.id
      );
    } catch (error) {
      console.log(error);
      const msg = {
        severity: "warn",
        summary: "Error",
        detail: "No se pudo eliminar el producto.",
      };
      this.growl.show(msg);
      this.setState({ display: false });
      this.setState({ selectedFile: null });
      return;
    }

    let msg;

    if (mensaje === "OK") {
      msg = {
        severity: "success",
        summary: "Eliminado",
        detail: "Producto eliminado correctamente.",
      };
    } else {
      msg = {
        severity: "error",
        summary: "Error",
        detail: "No se pudo eliminar al producto.",
      };
    }

    this.growl.show(msg);
    this.eliminarDeArreglo(this.state.productoSeleccionado.id);
    this.setState({ display: false });
    this.setState({ selectedFile: null });
    this.setState({ productoSeleccionado: {} });
  }

  modificarDeArreglo(productoModificado) {
    this.state.dataTableValue.forEach((producto) => {
      if (producto.id === this.state.productoSeleccionado.id) {
        producto.nombre = productoModificado.nombre;
        producto.precio = productoModificado.precio;
        producto.descripcion = productoModificado.descripcion;
      }
    });
  }

  eliminarDeArreglo(id) {
    console.log("eliminarDeArreglo", id);
    const arregloAuxiliar = this.state.dataTableValue.filter(
      (producto) => producto.id != id
    );
    this.setState({ dataTableValue: arregloAuxiliar });
  }

  actionTemplate(rowData, column) {
    return (
      <div>
        <Button
          type="button"
          icon="pi pi-pencil"
          className="p-button-success"
          onClick={() => {
            this.setState({ productoSeleccionado: rowData });
            this.setState({ display: true });
          }}
          style={{ marginRight: ".5em" }}
        />
      </div>
    );
  }

  render() {
    let actionHeader = <Button type="button" icon="pi pi-cog" />;

    const dialogFooter = (
      <div>
        <Button
          icon="pi pi-save"
          onClick={this.handleModificar}
          label="Guardar"
          className="p-button-success"
        />
        <Button
          icon="pi pi-ban"
          onClick={this.handleEliminar}
          label="Eliminar"
          className="p-button-danger"
        />
        <Button
          icon="pi pi-times"
          onClick={() => {
            this.setState({ display: false });
            this.setState({ selectedFile: null });
            this.setState({ productoModificado: {} });
            this.setState({ productoSeleccionado: {} });
          }}
          label="Cancelar"
          className="p-button-secondary"
        />
      </div>
    );

    const dialogFooterCrear = (
      <div>
        <Button
          icon="pi pi-save"
          onClick={this.handleGuardar}
          label="Guardar"
          className="p-button-success"
          name="btnguardar"
        />
        <Button
          icon="pi pi-times"
          onClick={() => {
            this.setState({ displayCrear: false });
            this.setState({ selectedFile: null });
            this.setState({ productoCrear: {} });
          }}
          label="Cancelar"
          className="p-button-secondary"
        />
      </div>
    );

    return (
      <div className="p-grid">
        <div className="p-col-12">
          <div className="card card-w-title datatable-demo">
            <h1 style={{ display: "inline-block", marginRight: "0" }}>
              Productos
            </h1>

            <Button
              name="btncrear"
              style={{ float: "right" }}
              type="button"
              className="p-button-info"
              icon="pi pi-plus"
              onClick={() => this.setState({ displayCrear: true })}
            />
            <label style={{ float: "right", margin: "10px" }}>
              <b>Crear producto </b>
            </label>

            <Growl
              ref={(el) => (this.growl = el)}
              style={{ marginTop: "75px" }}
            />
            <DataTable
              ref={(el) => (this.dt = el)}
              value={this.state.dataTableValue}
              selectionMode="single"
              header="Lista de productos"
              paginator={false}
              responsive={true}
              selection={this.state.dataTableSelection1}
              onSelectionChange={(event) =>
                this.setState({ dataTableSelection1: event.value })
              }
            >
              <Column
                field="id"
                header="Identificador"
                sortable={true}
                filter={true}
              />
              <Column
                field="nombre"
                header="Nombre"
                sortable={true}
                filter={true}
              />
              <Column
                field="descripcion"
                header="Descripción"
                sortable={true}
                filter={true}
              />
              <Column
                field="precio"
                header="Precio (Q)"
                sortable={true}
                filter={true}
              />
              <Column
                field="categoria"
                header="Categoria"
                sortable={true}
                filter={true}
              />
              <Column
                header={actionHeader}
                body={this.actionTemplate}
                style={{ textAlign: "center", width: "8em" }}
              />
            </DataTable>
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
            this.setState({ selectedFile: null });
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
              <div className="p-col-12 p-md-6">
                {/* <div className="p-col-12">
                  <label>Nombre</label>
                </div> */}
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-pencil" />
                  </span>
                  <InputText
                    placeholder="Nombre"
                    defaultValue={this.state.productoSeleccionado.nombre}
                    onChange={(event) =>
                      this.setState({
                        productoModificar: {
                          ...this.state.productoModificar,
                          nombre: event.target.value,
                        },
                      })
                    }
                  />
                </div>
              </div>

              <div className="p-col-12 p-md-6">
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-list" />
                  </span>
                  <InputText
                    placeholder="Descripción"
                    defaultValue={this.state.productoSeleccionado.descripcion}
                    onChange={(event) =>
                      this.setState({
                        productoModificar: {
                          ...this.state.productoModificar,
                          descripcion: event.target.value,
                        },
                      })
                    }
                  />
                </div>
              </div>

              <div className="p-col-12 p-md-6">
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-dollar" />
                  </span>
                  <InputText
                    placeholder="Precio"
                    type="number"
                    defaultValue={this.state.productoSeleccionado.precio}
                    onChange={(event) =>
                      this.setState({
                        productoModificar: {
                          ...this.state.productoModificar,
                          precio: event.target.value,
                        },
                      })
                    }
                  />
                </div>
              </div>

              <div className="p-col-12 p-md-6">
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-info-circle">Oferta</i>
                  </span>
                  <InputText
                    placeholder="Oferta"
                    type="number"
                    defaultValue={
                      this.state.productoSeleccionado.oferta
                        ? this.state.productoSeleccionado.oferta
                        : 0
                    }
                    onChange={(event) =>
                      this.setState({
                        productoModificar: {
                          ...this.state.productoModificar,
                          oferta: event.target.value,
                        },
                      })
                    }
                  />
                </div>
              </div>

              <div className="p-col-12 p-md-6">
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-info-circle"></i>
                  </span>
                  <InputText
                    type="text"
                    defaultValue={
                      this.state.productoSeleccionado.categoria
                    }
                    disabled
                  />
                </div>
              </div>

              <div className="p-col-12 p-md-6">
                <div className="p-inputgroup">
                  <label
                    className="p-button p-component p-button-text-only"
                    htmlFor="file-upload"
                  >
                    <i className="pi pi-image"></i>{" "}
                    {this.state.selectedFile
                      ? this.state.selectedFile.name
                      : "Subir imagen"}
                  </label>
                  <InputText
                    id="file-upload"
                    style={{ display: "none" }}
                    onChange={(e) =>
                      this.setState({ selectedFile: e.target.files[0] })
                    }
                    type="file"
                    accept="image/*"
                  />
                </div>
              </div>

              {this.state.selectedFile && console.log(this.state.selectedFile)}
            </div>
          </div>
        </Dialog>

        <Dialog
          header="Crear producto"
          visible={this.state.displayCrear}
          modal={true}
          style={{ width: "50vw" }}
          footer={dialogFooterCrear}
          onHide={() => {
            this.setState({ displayCrear: false });
            this.setState({ selectedFile: null });
            this.setState({ productoCrear: {} });
          }}
        >
          <div>
            <div className="p-grid">
              <div className="p-col-12 p-md-6">
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-pencil" />
                  </span>
                  <InputText
                    name="nombreP"
                    placeholder="Nombre"
                    onChange={(event) =>
                      this.setState({
                        productoCrear: {
                          ...this.state.productoCrear,
                          nombre: event.target.value,
                        },
                      })
                    }
                  />
                </div>
              </div>

              <div className="p-col-12 p-md-6">
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-dollar" />
                  </span>
                  <InputText
                    name="precioP"
                    placeholder="Precio"
                    type="number"
                    onChange={(event) =>
                      this.setState({
                        productoCrear: {
                          ...this.state.productoCrear,
                          precio: event.target.value,
                        },
                      })
                    }
                  />
                </div>
              </div>

              <div className="p-col-12 p-md-6">
                <InputTextarea
                  name="descP"
                  placeholder="Descripción"
                  rows={5}
                  cols={27}
                  onChange={(event) =>
                    this.setState({
                      productoCrear: {
                        ...this.state.productoCrear,
                        descripcion: event.target.value,
                      },
                    })
                  }
                />
              </div>

              <div className="p-col-12 p-md-6">
                <div className="p-inputgroup">
                  <Dropdown
                    name="categoriaDd"
                    value={this.state.categoria}
                    options={this.state.categoriasProductos}
                    placeholder="Categoria"
                    onChange={(event) => {
                      this.setState({
                        productoCrear: {
                          ...this.state.productoCrear,
                          categoria: event.value,
                        },
                      });
                      this.setState({
                        categoria: event.value,
                      });
                    }}
                  ></Dropdown>
                </div>
              </div>

              <div className="p-col-12 p-md-6">
                <div className="p-inputgroup">
                  <label
                    className="p-button p-component p-button-text-only"
                    htmlFor="file-upload"
                  >
                    <i className="pi pi-image"></i>{" "}
                    {this.state.selectedFile
                      ? this.state.selectedFile.name
                      : "Subir imagen"}
                  </label>
                  <InputText
                    name="fotoP"
                    id="file-upload"
                    style={{ display: "none" }}
                    onChange={(e) =>
                      this.setState({ selectedFile: e.target.files[0] })
                    }
                    type="file"
                    accept="image/*"
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
