"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
var tslib_1 = require("tslib");
var dotenv_1 = tslib_1.__importDefault(require("dotenv"));
dotenv_1.default.config({});
var Config = /** @class */ (function () {
    function Config() {
        this.NODE_ENV = process.env.NODE_ENVIRONMENT || '';
        this.CLIENT_URL = process.env.CLIENT_URL || '';
        this.SENDER_EMAIL = process.env.SENDER_EMAIL || '';
        this.SENDER_EMAIL_PASSWORD = process.env.SENDER_EMAIL_PASSWORD || '';
        this.RABBITMQ_URL = process.env.RABBITMQ_URL || '';
        this.ELASTIC_SEARCH_URL = process.env.ELASTIC_SEARCH_URL || '';
    }
    return Config;
}());
exports.config = new Config();
//# sourceMappingURL=config.js.map