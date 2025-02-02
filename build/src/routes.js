"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.healthRoutes = healthRoutes;
var tslib_1 = require("tslib");
var express_1 = tslib_1.__importDefault(require("express"));
var http_status_codes_1 = require("http-status-codes");
var router = express_1.default.Router();
function healthRoutes() {
    router.get('/notification-health', function (_req, res) {
        res.status(http_status_codes_1.StatusCodes.OK).send('Notification service is up and running');
    });
    return router;
}
//# sourceMappingURL=routes.js.map