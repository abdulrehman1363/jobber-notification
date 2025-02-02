"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createConnection = createConnection;
var tslib_1 = require("tslib");
var jobber_shared_1 = require("@abdulrehman1363/jobber-shared");
var config_1 = require("../config");
var amqplib_1 = tslib_1.__importDefault(require("amqplib"));
var log = (0, jobber_shared_1.winstonLogger)("".concat(config_1.config.ELASTIC_SEARCH_URL), 'notificationQueueConnection', 'debug');
function createConnection() {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var connection, channel, error_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, amqplib_1.default.connect("".concat(config_1.config.RABBITMQ_URL))];
                case 1:
                    connection = _a.sent();
                    return [4 /*yield*/, connection.createChannel()];
                case 2:
                    channel = _a.sent();
                    log.info('Notification server connected to RabbitMQ successfully');
                    closeConnection(channel, connection);
                    return [2 /*return*/, channel];
                case 3:
                    error_1 = _a.sent();
                    log.log('error', 'NotificationService createConnection() RabbitMQ: method', error_1);
                    return [2 /*return*/, undefined];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function closeConnection(channel, connection) {
    var _this = this;
    process.once('SIGINT', function () { return tslib_1.__awaiter(_this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            channel.close();
            connection.close();
            return [2 /*return*/];
        });
    }); });
}
//# sourceMappingURL=connection.js.map