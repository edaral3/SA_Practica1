const Repo = require("../repositories/mongoRepo");

module.exports = class Service {

    constructor() {
        this.repo = new Repo();
    };

    async delete(user) {
        return await this.repo.delete(user);
    }

    async error(info) {
        return await this.repo.error(info);
    }

    async log(info) {
        return await this.repo.log(info);
    }
}