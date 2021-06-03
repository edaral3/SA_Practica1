const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const db = require('./models/index');

const PORT = 4004;

const createApp = () => {
    const app = express();

    app.use(cors());
    app.use(bodyParser.json());
    
    const Controller = require("./controllers/controller");

    app.use('', Controller);

    return app;
};

const dbConnect = (url) => {
    db.mongoose
        .connect(url)
        .catch(err => {
            console.error("No se pudo conectar a la base de datos");
            console.error(err);
            process.exit();
        });
};

const app = createApp();

app.listen(PORT, () => {
    dbConnect(db.url);
    console.log(`El microsevico activo en el puerto ${PORT}`)
});

module.exports = { createApp };