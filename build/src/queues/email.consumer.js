"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consumeAuthEmailMessages = consumeAuthEmailMessages;
exports.consumeOrderEmailMessages = consumeOrderEmailMessages;
var tslib_1 = require("tslib");
var jobber_shared_1 = require("@abdulrehman1363/jobber-shared");
var config_1 = require("../config");
var connection_1 = require("../queues/connection");
var mail_transport_1 = require("../queues/mail.transport");
var log = (0, jobber_shared_1.winstonLogger)("".concat(config_1.config.ELASTIC_SEARCH_URL), 'emailConsumer', 'debug');
function consumeAuthEmailMessages(channel) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var exchangeName, routingKey, queueName, jobberQueue, error_1;
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    if (!!channel) return [3 /*break*/, 2];
                    return [4 /*yield*/, (0, connection_1.createConnection)()];
                case 1:
                    channel = (_a.sent());
                    _a.label = 2;
                case 2:
                    exchangeName = 'jobber-email-notification';
                    routingKey = 'auth-email';
                    queueName = 'auth-email-queue';
                    return [4 /*yield*/, channel.assertExchange(exchangeName, 'direct')];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, channel.assertQueue(queueName, { durable: true, autoDelete: false })];
                case 4:
                    jobberQueue = _a.sent();
                    channel.bindQueue(jobberQueue.queue, exchangeName, routingKey);
                    channel.consume(jobberQueue.queue, function (msg) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        var _a, receiverEmail, username, verifyLink, resetLink, template, locals;
                        return tslib_1.__generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _a = JSON.parse(msg.content.toString()), receiverEmail = _a.receiverEmail, username = _a.username, verifyLink = _a.verifyLink, resetLink = _a.resetLink, template = _a.template;
                                    locals = {
                                        appLink: "".concat(config_1.config.CLIENT_URL),
                                        appIcon: "https://iili.io/2sKAi1j.png",
                                        username: username,
                                        verifyLink: verifyLink,
                                        resetLink: resetLink,
                                    };
                                    return [4 /*yield*/, (0, mail_transport_1.sendEmail)(template, receiverEmail, locals)];
                                case 1:
                                    _b.sent();
                                    channel.ack(msg);
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [3 /*break*/, 6];
                case 5:
                    error_1 = _a.sent();
                    log.log('error', 'NotificationService consumeAuthEmailMessage(): method error: ', error_1);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
function consumeOrderEmailMessages(channel) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var exchangeName, routingKey, queueName, jobberQueue, error_2;
        var _this = this;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    if (!!channel) return [3 /*break*/, 2];
                    return [4 /*yield*/, (0, connection_1.createConnection)()];
                case 1:
                    channel = (_a.sent());
                    _a.label = 2;
                case 2:
                    exchangeName = 'jobber-order-notification';
                    routingKey = 'order-email';
                    queueName = 'order-email-queue';
                    return [4 /*yield*/, channel.assertExchange(exchangeName, 'direct')];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, channel.assertQueue(queueName, { durable: true, autoDelete: false })];
                case 4:
                    jobberQueue = _a.sent();
                    channel.bindQueue(jobberQueue.queue, exchangeName, routingKey);
                    channel.consume(jobberQueue.queue, function (msg) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                        var _a, receiverEmail, username, template, sender, offerLink, amount, buyerUsername, sellerUsername, title, description, deliveryDays, orderId, orderDue, requirements, orderUrl, originalDate, newDate, reason, subject, header, type, message, serviceFee, total, locals;
                        return tslib_1.__generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    _a = JSON.parse(msg.content.toString()), receiverEmail = _a.receiverEmail, username = _a.username, template = _a.template, sender = _a.sender, offerLink = _a.offerLink, amount = _a.amount, buyerUsername = _a.buyerUsername, sellerUsername = _a.sellerUsername, title = _a.title, description = _a.description, deliveryDays = _a.deliveryDays, orderId = _a.orderId, orderDue = _a.orderDue, requirements = _a.requirements, orderUrl = _a.orderUrl, originalDate = _a.originalDate, newDate = _a.newDate, reason = _a.reason, subject = _a.subject, header = _a.header, type = _a.type, message = _a.message, serviceFee = _a.serviceFee, total = _a.total;
                                    locals = {
                                        appLink: "".concat(config_1.config.CLIENT_URL),
                                        appIcon: "https://iili.io/2sKAi1j.png",
                                        username: username,
                                        sender: sender,
                                        offerLink: offerLink,
                                        amount: amount,
                                        buyerUsername: buyerUsername,
                                        sellerUsername: sellerUsername,
                                        title: title,
                                        description: description,
                                        deliveryDays: deliveryDays,
                                        orderId: orderId,
                                        orderDue: orderDue,
                                        requirements: requirements,
                                        orderUrl: orderUrl,
                                        originalDate: originalDate,
                                        newDate: newDate,
                                        reason: reason,
                                        subject: subject,
                                        header: header,
                                        type: type,
                                        message: message,
                                        serviceFee: serviceFee,
                                        total: total,
                                    };
                                    if (!(template === 'orderPlaced')) return [3 /*break*/, 3];
                                    return [4 /*yield*/, (0, mail_transport_1.sendEmail)('orderPlaced', receiverEmail, locals)];
                                case 1:
                                    _b.sent();
                                    return [4 /*yield*/, (0, mail_transport_1.sendEmail)('orderReceipt', receiverEmail, locals)];
                                case 2:
                                    _b.sent();
                                    return [3 /*break*/, 5];
                                case 3: return [4 /*yield*/, (0, mail_transport_1.sendEmail)(template, receiverEmail, locals)];
                                case 4:
                                    _b.sent();
                                    _b.label = 5;
                                case 5:
                                    channel.ack(msg);
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [3 /*break*/, 6];
                case 5:
                    error_2 = _a.sent();
                    log.log('error', 'NotificationService consumeOrderEmailMessages(): method error: ', error_2);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
//# sourceMappingURL=email.consumer.js.map