"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.start = start;
var tslib_1 = require("tslib");
require("express-async-errors");
var jobber_shared_1 = require("@abdulrehman1363/jobber-shared");
var config_1 = require("./config");
var http_1 = tslib_1.__importDefault(require("http"));
var routes_1 = require("./routes");
var elasticsearch_1 = require("./elasticsearch");
var connection_1 = require("./queues/connection");
//import { consumeAuthEmailMessages, consumeOrderEmailMessages } from './queues/email.consumer';
var SERVER_PORT = 4001;
var log = (0, jobber_shared_1.winstonLogger)("".concat(config_1.config.ELASTIC_SEARCH_URL), 'notificationServer', 'debug');
function start(app) {
    startServer(app);
    app.use('', (0, routes_1.healthRoutes)());
    startQueues();
    startElasticSearch();
}
function startQueues() {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, connection_1.createConnection)()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function startElasticSearch() {
    (0, elasticsearch_1.checkConnection)();
}
function startServer(app) {
    try {
        var httpServer = new http_1.default.Server(app);
        log.info("Worker with process id of ".concat(process.pid, " on notification server has started"));
        httpServer.listen(SERVER_PORT, function () {
            log.info("Notification server is listening on port ".concat(SERVER_PORT));
        });
    }
    catch (error) {
        log.log('error', 'NotificationService startServer(): method', error);
    }
}
//# sourceMappingURL=server.js.map