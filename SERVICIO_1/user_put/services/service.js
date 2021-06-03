const Repo = require("../repositories/mongoRepo");

module.exports = class Service {

    constructor() {
        this.repo = new Repo();
    };

    async update(user, newInfo) {
        return await this.repo.update(user, newInfo);
    }

    async error(info) {
        return await this.repo.error(info);
    }

    async log(info) {
        return await this.repo.log(info);
    }
}