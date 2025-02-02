"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailTemplates = emailTemplates;
var tslib_1 = require("tslib");
var jobber_shared_1 = require("@abdulrehman1363/jobber-shared");
var config_1 = require("./config");
var nodemailer_1 = tslib_1.__importDefault(require("nodemailer"));
var email_templates_1 = tslib_1.__importDefault(require("email-templates"));
var path_1 = tslib_1.__importDefault(require("path"));
var log = (0, jobber_shared_1.winstonLogger)("".concat(config_1.config.ELASTIC_SEARCH_URL), 'mailTransportHelper', 'debug');
function emailTemplates(template, receiver, locals) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var smtpTransporter, email, error_1;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    smtpTransporter = nodemailer_1.default.createTransport({
                        host: 'smtp.ethereal.email',
                        port: 587,
                        auth: {
                            user: config_1.config.SENDER_EMAIL,
                            pass: config_1.config.SENDER_EMAIL_PASSWORD
                        }
                    });
                    email = new email_templates_1.default({
                        message: {
                            from: "Jobber App ".concat(config_1.config.SENDER_EMAIL)
                        },
                        send: true,
                        transport: smtpTransporter,
                        views: {
                            options: {
                                extension: 'ejs'
                            }
                        },
                        juice: true,
                        juiceResources: {
                            preserveImportant: true,
                            webResources: {
                                relativeTo: path_1.default.join(__dirname, '../build')
                            }
                        }
                    });
                    return [4 /*yield*/, email.send({
                            template: path_1.default.join(__dirname, '..', 'src/emails', template),
                            message: { to: receiver },
                            locals: locals
                        })];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    log.log('error', 'NotificationService EmailTransport emailTemplates(): method error', error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
//# sourceMappingURL=helpers.js.map