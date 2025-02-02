"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkConnection = checkConnection;
var tslib_1 = require("tslib");
var elasticsearch_1 = require("@elastic/elasticsearch");
var config_1 = require("./config");
var jobber_shared_1 = require("@abdulrehman1363/jobber-shared");
var log = (0, jobber_shared_1.winstonLogger)("".concat(config_1.config.ELASTIC_SEARCH_URL), 'notificationElasticSearchServer', 'debug');
var elasticSearchClient = new elasticsearch_1.Client({
    node: "".concat(config_1.config.ELASTIC_SEARCH_URL)
});
function checkConnection() {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var isConnected, health, error_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    isConnected = false;
                    _a.label = 1;
                case 1:
                    if (!!isConnected) return [3 /*break*/, 6];
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 4, , 5]);
                    return [4 /*yield*/, elasticSearchClient.cluster.health({})];
                case 3:
                    health = _a.sent();
                    log.info("NotificationService elasticSearch Health Status: ".concat(health.status));
                    isConnected = true;
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    log.error('Error connecting to ElasticSearch, Retrying ...');
                    log.info('error', 'NotificationService checkConnection():method ', error_1);
                    return [3 /*break*/, 5];
                case 5: return [3 /*break*/, 1];
                case 6: return [2 /*return*/];
            }
        });
    });
}
//# sourceMappingURL=elasticsearch.js.map