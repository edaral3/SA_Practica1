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
        origen: "Microservicio Crear Usuario",
        descripcion: error.message,
        entrada: {stack: error.stack},
    }
    service.error(err);
}

const saveLog = function(user){
    delete user.pwd
    const log = {
        tipo: 'Escritura',
        id_usuario: '',
        nombre_usuario: '',
        nivel: 'Cliente',
        origen: 'Microservicio Crear Usuario',
        informacion: user
    }
    service.log(log);
}

router.post("/user/", [Validator, ValidateIfExists], async (req, res) => {
    const newInfo = req.body;
    try {
        if (newInfo.name === 'error123'){
            throw new Error('Error en el sistema');
        }
        newInfo.address = []
        newInfo.pwd = encrypt(newInfo.pwd)
        const created = await service.create(newInfo);
        saveLog(newInfo)
        return res.status(201).send(created);
    } catch (error) {
        saveError(error)
        return res.status(404).send({message: `Ocurrio un error inesperado`});
    }
});

module.exports = router;