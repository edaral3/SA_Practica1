const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const PORT = 4002;

const createApp = () => {
    const app = express();

    app.use(cors());
    app.use(bodyParser.json());
    
    const Controller = require("./controllers/controller");

    app.use('', Controller);

    return app;
};

const app = createApp();

app.listen(PORT, () => {
    console.log(`El backend ${PORT}`)
});

module.exports = { createApp };