const model = require("../models/model");
const Service = require("../services/service");
const service = new Service();

let schema = model.ValidationSchema;

module.exports = function ValidationMiddleware(req, res, next) {
    const result = schema.validate(req.body);
    if (result.error) {
        delete req.body.pwd
        const error = {
            nivel: "Usuario",
            origen: "Microservicio Actualizar Usuario",
            descripcion: `No se cuenta con los campos necesarios para la actualizacion de los datos`,
            entrada: req.body,
        }
        service.error(error);
        return res.status(400).send({message: `No se cuenta con los campos necesarios para la actualizacion de los datos`});
    }
    else {
        next();
    }
}