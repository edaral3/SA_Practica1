import React, { useEffect, useState } from "react";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";

// core components
import GridItem from "./components/Grid/GridItem.js";
import GridContainer from "./components/Grid/GridContainer.js";
import Card from "./components/Card/Card.js";
import CardHeader from "./components/Card/CardHeader.js";
import CardBody from "./components/Card/CardBody.js";

import styles from "../../styles/dashboardStyle";

import Table from "./table";
import TableDelete from "./tableDelete";
import axios from 'axios';


const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();

  const storage = localStorage.getItem("usuario");

  useEffect(async () => {
    const newNuevaOrden = [];
    const newPreparandoOrden = [];
    const newOrdenEnPreparacion = [];
    let URI = 'http://34.121.232.21:4007/orden/tienda/';

    if (storage) {
      const aux = JSON.parse(storage);
      console.log(aux)
      console.log(aux)
      console.log(aux)
      URI += aux.name;
    } else {
      URI += "admin";
    }

    console.log(URI)
    console.log(URI)
    console.log(URI)
    console.log(URI)

    axios.get(URI)
      .then(data => {
        data.data.forEach(item => {
          let productos = ''

          item.productos.forEach((producto) => {
            productos += producto.nombre_producto + ': ' + producto.cantidad_producto + ',\n'
          });

          if (item.estado === 0) {
            newNuevaOrden.push({
              hora: item.fecha_y_hora,
              user: item.id_usuario,
              address: item.direccion,
              productos: productos,
              id: item._id
            })
          }
          else if (item.estado === 1) {
            newPreparandoOrden.push({
              hora: item.fecha_y_hora,
              user: item.id_usuario,
              address: item.direccion,
              productos: productos,
              id: item._id
            })
          }
          else if (item.estado === 2) {
            newOrdenEnPreparacion.push({
              hora: item.fecha_y_hora,
              user: item.id_usuario,
              address: item.direccion,
              productos: productos,
              id: item._id
            })
          }
          else if (item.estado === 3) {
            pagada.push({
              hora: item.fecha_y_hora,
              user: item.id_usuario,
              address: item.direccion,
              productos: productos,
              id: item._id
            })
          }
        });
        setNuevaOrden(newNuevaOrden);
        setEnPreparacion(newPreparandoOrden);
        setEntregada(newOrdenEnPreparacion);
        setPagada(pagada);
      })
      .catch(function (error) {
        console.log(error);
      });

  }, [])

  const header = [
    {
      headerName: 'HORA',
      prop: "hora"
    },
    {
      headerName: 'USUARIO',
      prop: "user"
    },
    {
      headerName: 'DIRECCION',
      prop: "address"
    },
    {
      headerName: 'PRODUCTOS',
      prop: "productos"
    }
  ];

  const [nuevaOrden, setNuevaOrden] = useState([]);
  const [enPreparacion, setEnPreparacion] = useState([]);
  const [entregada, setEntregada] = useState([]);
  const [pagada, setPagada] = useState([]);

  const deleteRowNuevas = async (id, i) => {
    const aux = nuevaOrden.filter((_row, j) => j === i);
    
    axios.put(`http://34.121.232.21:4007/orden/${aux[0].id}/1`)
      .then(() => {
        setNuevaOrden(nuevaOrden.filter((_row, j) => j !== i));
        const newData = [...enPreparacion];
        newData.push(aux[0]);
        setEnPreparacion(newData);
      });

  };
  

  const deleteRowNuevasEliminarOrden = async (id, i) => {
    const aux = nuevaOrden.filter((_row, j) => j === i);
    axios.delete(`http://34.121.232.21:4007/orden/${aux[0].id}`)
      .then(() => {
        setNuevaOrden(nuevaOrden.filter((_row, j) => j !== i));
      });

  };
  
  const deleteRowPreparado = async (id, i) => {
    const aux = enPreparacion.filter((_row, j) => j === i);

    axios.put(`http://34.121.232.21:4007/orden/${aux[0].id}/2`)
      .then(() => {
        setEnPreparacion(enPreparacion.filter((_row, j) => j !== i));
        const newData = [...entregada];
        newData.push(aux[0]);
        setEntregada(newData);
      });
  };

  const deleteRowCamino = async (id, i) => {
    const aux = entregada.filter((_row, j) => j === i);

    axios.put(`http://34.121.232.21:4007/orden/${aux[0].id}/3`)
    .then(() => {
      setEntregada(entregada.filter((_row, j) => j !== i));
      const newData = [...pagada];
      newData.push(aux[0]);
      setPagada(newData);
    });
  };

  const deleteRowPagada = async (id, i) => {
    const aux = pagada.filter((_row, j) => j === i);

    axios.put(`http://34.121.232.21:4007/orden/${aux[0].id}/4`)
    .then(() => {
      setPagada(pagada.filter((_row, j) => j !== i));
    });
  };

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="danger">
              <h4 className={classes.cardTitleWhite}>Ordenes Nuevas</h4>
              <p className={classes.cardCategoryWhite}>
                prueba calificacion
              </p>
            </CardHeader>
            <CardBody>
              <TableDelete
                rows={nuevaOrden}
                header={header}
                deleteRow={deleteRowNuevas}
                deleteOrden={deleteRowNuevasEliminarOrden}
              />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Preparando Orden</h4>
              <p className={classes.cardCategoryWhite}>
                :x
              </p>
            </CardHeader>
            <CardBody>
              <Table
                rows={enPreparacion}
                header={header}
                deleteRow={deleteRowPreparado}
              />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>Orden en Camino</h4>
              <p className={classes.cardCategoryWhite}>
                :pp
              </p>
            </CardHeader>
            <CardBody>
              <Table
                rows={entregada}
                header={header}
                deleteRow={deleteRowCamino}
              />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="success">
              <h4 className={classes.cardTitleWhite}>Orden Pagada</h4>
              <p className={classes.cardCategoryWhite}>
                :v
              </p>
            </CardHeader>
            <CardBody>
              <Table
                rows={pagada}
                header={header}
                deleteRow={deleteRowPagada}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
