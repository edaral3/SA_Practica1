const db = require('../models/index').user;
const error = require('../models/index').error;
const log = require('../models/index').log;

module.exports = class MySQLRepo {
     async delete(user) {
          const res = db.findOneAndDelete({user});
          return res;
     }

     async error(errorInfo) {
          return error.create(errorInfo);
     }

     async log(logInfo) {
          return log.create(logInfo);
     }
}