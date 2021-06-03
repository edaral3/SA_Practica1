const db = require('../models/index').user;
const error = require('../models/index').error;
const log = require('../models/index').log;

module.exports = class MySQLRepo {
     async findOne(user) {
          return await db.findOne({user:user});
     }
     
     async findVarious(type) {
          return await db.find({type:type});
     }

     async findError() {
          return error.find();
     }

     async findLog() {
          return log.find();
     }     

     async error(errorInfo) {
          return error.create(errorInfo);
     }

     async log(logInfo) {
          return log.create(logInfo);
     }
}