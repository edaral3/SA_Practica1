import axios from 'axios';
const productos_uri = "http://34.72.175.19:9001/productos/";

export class ProductoService {
    
    getProductos() {
        return axios.get(productos_uri).then(res => res.data.productos);
    }

    async crearProducto(productoNuevo, foto){
        let foto_base64 = "";
        foto_base64 = await pFileReader(foto);
        foto_base64 = foto_base64.split(",")[1];

        productoNuevo = {...productoNuevo, fotografia: foto_base64};
        return axios.put(productos_uri, productoNuevo).then(res => res.data);
    }

    async modificarProducto(productoModificar, foto){
        let foto_base64 = "";

        if(foto){
            foto_base64 = await pFileReader(foto);
            foto_base64 = foto_base64.split(",")[1];
        }

        productoModificar = {...productoModificar, fotografia: foto_base64};
        return axios.post(productos_uri, productoModificar).then(res => res.data.mensaje);
    }

    eliminarProducto(id){
        return axios.delete(productos_uri + id).then(res => res.data.mensaje);
    }

}

function pFileReader(file) {
    return new Promise((resolve, reject) => {
      var fr = new FileReader();
      fr.onload = () => {
        resolve(fr.result);
      };
      fr.readAsDataURL(file);
    });
  }
