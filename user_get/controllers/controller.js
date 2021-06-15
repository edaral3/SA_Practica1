const router = require("express").Router();
const Service = require("../services/service");
const _crypto = require("crypto-js");

const service = new Service();

const encrypt = function (pwd) {
    return (_crypto.AES.encrypt(pwd, "pwd")).toString();
}

const decrypt = function (pwd) {
    var bytes  = _crypto.AES.decrypt(pwd, "pwd");
    return bytes.toString(_crypto.enc.Utf8);
}

const saveError = function(error){
    service.error(error);
}

const saveLog = function(user){
    const log = {
        tipo: 'Lectura',
        id_usuario: user.user,
        nombre_usuario: user.name,
        nivel: 'Cliente',
        origen: 'Microservicio Obtener Usuario',
        informacion: user
    }
    service.log(log);
}

router.get("/user/:user", async (req, res) => {
    const user = req.params.user;
    try {
        const result = await service.findOne(user);
        
        if(!result){
            const err = {
                nivel: "Usuario",
                origen: "Microservicio Obtener Usuario",
                descripcion: `El usuario "${user}" no se encuentra registrado`,
                entrada: `Entrada: ${user}`,
            }
            saveError(err)
            return res.status(204).send({message: `El usuario ${user} no se encuentra registrado`});
        }

        result.pwd = '****'

        saveLog(result)
        return res.status(200).send(result);
    } catch (error) {
        const err = {
            nivel: "Sistema",
            origen: "Microservicio Obtener Usuario",
            descripcion: error.message,
            entrada: {stack: error.stack},
        }
        saveError(err)
        return res.status(404).send({message: `Ocurrio un error inesperado`});
    }
});

router.get("/users/:type", async (req, res) => {
    const type = req.params.type;
    try {
        
        const result = await service.findVarious(type);
        
        if(!result){
            const err = {
                nivel: "Usuario",
                origen: "Microservicio Obtener Usuarios por Tipo",
                descripcion: `El tipo de usuario "${type}" no se encuentra registrado`,
                entrada: `Entrada: ${type}`,
            }
            saveError(err)
            return res.status(204).send({message: `El tipo de usuario ${type} no se encuentra registrado`});
        }

        result.pwd = '****'

        saveLog(result)
        return res.status(200).send(result);
    } catch (error) {
        const err = {
            nivel: "Sistema",
            origen: "Microservicio Obtener Usuarios por Tipo",
            descripcion: error.message,
            entrada: {stack: error.stack},
        }
        saveError(err)
        return res.status(404).send({message: `Ocurrio un error inesperado`});
    }
});

router.get("/logs/", async (_req, res) => {
    try {
        const result = await service.getLog();

        return res.status(200).send(result);
    } catch (error) {
        saveError(error)
        return res.status(404).send({message: `Ocurrio un error inesperado`});
    }
});

router.get("/errors/", async (_req, res) => {
    try {
        const result = await service.getError();

        return res.status(200).send(result);
    } catch (error) {
        saveError(error)
        return res.status(404).send({message: `Ocurrio un error inesperado`});
    }
});

module.exports = router;