import React, { useState, useEffect } from "react";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";

// core components
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import GridItem from "./components/Grid/GridItem.js";
import GridContainer from "./components/Grid/GridContainer.js";
import Card from "./components/Card/Card.js";
import CardHeader from "./components/Card/CardHeader.js";
import CardBody from "./components/Card/CardBody.js";

import styles from "../../styles/dashboardStyle";

import Table from "./tableMisOrdenes";
import axios from 'axios'

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();

  const [nuevaOrden, setNuevaOrden] = useState([]);
  const [enPreparacion, setEnPreparacion] = useState([]);
  const [entregada, setEntregada] = useState([]);
  const [pagada, setPagada] = useState([]);
  const [user, setUser] = useState({user: 'undefined', name: "------"});
  
  const storage = localStorage.getItem("usuario");

  useEffect(async () => {
    const newNuevaOrden = [];
    const newPreparandoOrden = [];
    const newOrdenEnPreparacion = [];
    let URI = 'http://34.121.232.21:4007/orden/usuario/';

    if (storage) {
      const aux = JSON.parse(storage);
      URI += aux.user;
      setUser({name: aux.name})
    } else {
      URI += user.user;
    }
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
              address: item.direccion,
              productos: productos,
              id: item._id
            })
          }
          else if (item.estado === 1) {
            newPreparandoOrden.push({
              hora: item.fecha_y_hora,
              address: item.direccion,
              productos: productos,
              id: item._id
            })
          }
          else if (item.estado === 2) {
            newOrdenEnPreparacion.push({
              hora: item.fecha_y_hora,
              address: item.direccion,
              productos: productos,
              id: item._id
            })
          }
          else if (item.estado === 3) {
            pagada.push({
              hora: item.fecha_y_hora,
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

  }, []);

  const header = [
    {
      headerName: 'HORA',
      prop: "hora"
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

  return (
    <div>
      <AppBar position="static">
                    <Toolbar variant="dense">
                        <Typography variant="h6" color="inherit">
                            {user.name}
                        </Typography>
                    </Toolbar>
                </AppBar>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="danger">
              <h4 className={classes.cardTitleWhite}>Ordenes Nuevas</h4>
              <p className={classes.cardCategoryWhite}>
                :)
              </p>
            </CardHeader>
            <CardBody>
              <Table
                rows={nuevaOrden}
                header={header}
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
              />
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>Orden en Camino</h4>
              <p className={classes.cardCategoryWhite}>
                :p
              </p>
            </CardHeader>
            <CardBody>
              <Table
                rows={entregada}
                header={header}
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
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
