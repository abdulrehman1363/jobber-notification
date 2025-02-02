"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var connection = tslib_1.__importStar(require("../../queues/connection"));
var email_consumer_1 = require("../email.consumer");
jest.mock('@notifications/queues/connection');
jest.mock('amqplib');
jest.mock('@abdulrehman1363/jobber-shared');
describe('Email Consumer', function () {
    beforeEach(function () {
        jest.resetAllMocks();
    });
    afterAll(function () {
        jest.clearAllMocks();
    });
    describe('consumeAuthEmailMessages method', function () {
        it('should be called', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            var channel, connectionChannel;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        channel = {
                            assertExchange: jest.fn(),
                            publish: jest.fn(),
                            assertQueue: jest.fn(),
                            bindQueue: jest.fn(),
                            consume: jest.fn(),
                        };
                        jest.spyOn(channel, 'assertExchange');
                        jest.spyOn(channel, 'assertQueue').mockReturnValue({ queue: 'auth-email-queue', messageCount: 0, consumerCount: 0 });
                        jest.spyOn(connection, 'createConnection').mockReturnValue(channel);
                        return [4 /*yield*/, connection.createConnection()];
                    case 1:
                        connectionChannel = _a.sent();
                        return [4 /*yield*/, (0, email_consumer_1.consumeAuthEmailMessages)(connectionChannel)];
                    case 2:
                        _a.sent();
                        expect(connectionChannel.assertExchange).toHaveBeenCalledWith('jobber-email-notification', 'direct');
                        expect(connectionChannel.assertQueue).toHaveBeenCalledTimes(1);
                        expect(connectionChannel.bindQueue).toHaveBeenCalledWith('auth-email-queue', 'jobber-email-notification', 'auth-email');
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe('consumeOrderEmailMessages method', function () {
        it('should be called', function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
            var channel, connectionChannel;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        channel = {
                            assertExchange: jest.fn(),
                            publish: jest.fn(),
                            assertQueue: jest.fn(),
                            bindQueue: jest.fn(),
                            consume: jest.fn(),
                        };
                        jest.spyOn(channel, 'assertExchange');
                        jest.spyOn(channel, 'assertQueue').mockReturnValue({ queue: 'order-email-queue', messageCount: 0, consumerCount: 0 });
                        jest.spyOn(connection, 'createConnection').mockReturnValue(channel);
                        return [4 /*yield*/, connection.createConnection()];
                    case 1:
                        connectionChannel = _a.sent();
                        return [4 /*yield*/, (0, email_consumer_1.consumeOrderEmailMessages)(connectionChannel)];
                    case 2:
                        _a.sent();
                        expect(connectionChannel.assertExchange).toHaveBeenCalledWith('jobber-order-notification', 'direct');
                        expect(connectionChannel.assertQueue).toHaveBeenCalledTimes(1);
                        expect(connectionChannel.bindQueue).toHaveBeenCalledWith('order-email-queue', 'jobber-order-notification', 'order-email');
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
//# sourceMappingURL=email.consumer.test.js.map