const Repo = require("../repositories/mongoRepo");

module.exports = class Service {

    constructor() {
        this.repo = new Repo();
    };

    async findOne(info) {
        return await this.repo.findOne(info);
    }

    async findVarious(info) {
        return await this.repo.findVarious(info);
    }

    async getError() {
        return await this.repo.findError();
    }

    async getLog() {
        return await this.repo.findLog();
    }

    async error(info) {
        return await this.repo.error(info);
    }

    async log(info) {
        return await this.repo.log(info);
    }
}