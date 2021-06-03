const db = require('../models/index').user;
const error = require('../models/index').error;
const log = require('../models/index').log;

module.exports = class MySQLRepo {
     async findOne(user) {
          return db.findOne({user:user});
     }

     async error(errorInfo) {
          return error.create(errorInfo);
     }

     async log(logInfo) {
          return log.create(logInfo);
     }
}