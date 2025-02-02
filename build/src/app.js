"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var jobber_shared_1 = require("@abdulrehman1363/jobber-shared");
var config_1 = require("./config");
var express_1 = tslib_1.__importDefault(require("express"));
var server_1 = require("./server");
var log = (0, jobber_shared_1.winstonLogger)("".concat(config_1.config.ELASTIC_SEARCH_URL), 'NotificationApp', 'debug');
function initialize() {
    var app = (0, express_1.default)();
    (0, server_1.start)(app);
    log.info('Notification Service has started');
}
initialize();
//# sourceMappingURL=app.js.map