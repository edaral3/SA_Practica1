const router = require("express").Router();
const Service = require("../services/service");
const ValidateIfExists = require('../middleware/validateExists');
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
        origen: "Microservicio Eliminar Usuario",
        descripcion: error.message,
        entrada: {stack: error.stack}
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
        origen: 'Microservicio Eliminar Usuario',
        informacion: user
    }
    service.log(log);
}

router.delete("/user/:user", [ValidateIfExists], async (req, res) => {
    const { user } = req.params
    try {
        if (user === 'error123'){
            throw new Error('Error en el sistema');
        }
        const data = await service.delete(user);
        saveLog(data);
        return res.status(201).send(data);
    } catch (error) {
        saveError(error)
        return res.status(404).send({message: `Ocurrio un error inesperado`});
    }
});

module.exports = router;