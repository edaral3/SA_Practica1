const Repo = require("../repositories/mongoRepo");

module.exports = class Service {

    constructor() {
        this.repo = new Repo();
    };

    async create(info) {
        return await this.repo.create(info);
    }

    async error(info) {
        return await this.repo.error(info);
    }

    async log(info) {
        return await this.repo.log(info);
    }
}