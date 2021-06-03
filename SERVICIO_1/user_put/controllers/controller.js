const router = require("express").Router();
const Service = require("../services/service");
const ValidateIfExists = require('../middleware/validateExists');
const Validator = require('../middleware/validator');
const _crypto = require("crypto-js");

const service = new Service();

const encrypt = function (pwd) {
    return (_crypto.AES.encrypt(pwd, "pwd")).toString();
}

const decrypt = function (pwd) {
    var bytes  = _crypto.AES.decrypt(pwd, _password);
    return bytes.toString(_crypto.enc.Utf8);
}

const saveError = function(error){
    const err = {
        nivel: "Sistema",
        origen: "Microservicio Actualizar Usuario",
        descripcion: error.message,
        entrada: {stack: error.stack},
    }
    service.error(err);
}

const saveLog = function(user){
    delete user.pwd
    const log = {
        tipo: 'Escritura',
        id_usuario: user.user,
        nombre_usuario: user.name,
        nivel: 'Cliente',
        origen: 'Microservicio Actualizar Usuario',
        informacion: user
    }
    service.log(log);
}

router.put("/user/:user", [Validator, ValidateIfExists], async (req, res) => {
    const user = req.params.user
    const newInfo = req.body;
    try {
        if (newInfo.name === 'error123'){
            throw new Error('Error en el sistema');
        }
        newInfo.pwd = encrypt(newInfo.pwd)
        await service.update(user, newInfo);
        saveLog(newInfo);
        return res.status(201).send(newInfo);
    } catch (error) {
        saveError(error)
        return res.status(404).send({message: `Ocurrio un error inesperado`});
    }
});

module.exports = router;