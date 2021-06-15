const router = require("express").Router();

router.get("/back/:test", async (req, res) => {
    const test = req.params.test;
    if (test === "a") {
        return res.status(200).send({ message: `Este es un mensaje del backend` });

    } else {
        return res.status(404).send({ message: `Hubo un error en el backend` });
    }
});

module.exports = router;