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
        origen: 'Microservicio Login Usuario',
        informacion: user
    }
    service.log(log);
}

router.get("/login/:user/:pwd", async (req, res) => {
    const user = req.params.user;
    const pwd = req.params.pwd;
    try {
        const result = await service.findOne(user);

        if(!result){
            const err = {
                nivel: "Usuario",
                origen: "Microservicio Login Usuario",
                descripcion: `El usuario "${user}" no se encuentra registrado`,
                entrada: `Entrada: ${user}`,
            }
            saveError(err)
            return res.status(204).send({message: `El usuario ${user} no se encuentra registrado`});
        }
        
        if(pwd!=decrypt(result.pwd)){
            const err = {
                nivel: "Usuario",
                origen: "Microservicio Login Usuario",
                descripcion: `La contraseña ${pwd} es invalida`,
                entrada: `Entrada: ${pwd}`,
            }
            saveError(err)
            return res.status(401).send({message: `La contraseña ${pwd} es invalida`});
        }

        result.pwd = '****' 

        saveLog(result)
        return res.status(200).send(result);
    } catch (error) {
        saveError(error)
        return res.status(404).send({message: `Ocurrio un error inesperado`});
    }
});

module.exports = router;