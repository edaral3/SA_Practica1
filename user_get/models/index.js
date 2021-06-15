
const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);

const   db = {};
db.mongoose = mongoose;

db.url = dbConfig.url;

db.user = require("./model")(mongoose);
db.error = require("./errorModel")(mongoose);
db.log = require("./logModel")(mongoose);

db.mongoose.set('useNewUrlParser', true);
db.mongoose.set('useFindAndModify', false);
db.mongoose.set('useCreateIndex', true);
db.mongoose.set('useUnifiedTopology', true);

module.exports = db;