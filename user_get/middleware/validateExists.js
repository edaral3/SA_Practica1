const db = require('../models/index').user;
const Service = require("../services/service");
const service = new Service();

module.exports = async function ValidateIfUserExists(req, res, next) {
    const { user } = req.body;
    const data = await db.findOne({ user: user });
    if (!data) {
        next();
    } else {
        delete req.body.pwd
        const error = {
            nivel: "Usuario",
            origen: "Microservicio Crear Usuario",
            descripcion: `El usuario ${user} ya esta registrado`,
            entrada: req.body,
        }
        service.error(error);
        return res.status(409).send({message: `El usuario ${user} ya esta registrado`});
    }
};
