"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = sendEmail;
var tslib_1 = require("tslib");
var jobber_shared_1 = require("@abdulrehman1363/jobber-shared");
var config_1 = require("../config");
var helpers_1 = require("../helpers");
var log = (0, jobber_shared_1.winstonLogger)("".concat(config_1.config.ELASTIC_SEARCH_URL), 'mailTransport', 'debug');
function sendEmail(template, receiverEmail, locals) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            try {
                (0, helpers_1.emailTemplates)(template, receiverEmail, locals);
                log.info('Email sent successfully');
            }
            catch (error) {
                log.log('error', 'NotificationService EmailTransport sendEmail(): method error', error);
            }
            return [2 /*return*/];
        });
    });
}
//# sourceMappingURL=mail.transport.js.map