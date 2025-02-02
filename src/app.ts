import { winstonLogger } from "@abdulrehman1363/jobber-shared"
import { Logger } from "winston"
import { config } from "@notifications/config"
import express, { Express } from "express"
import { start } from "@notifications/server"

const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'NotificationApp', 'debug');

function initialize(){
  const app: Express = express();
  start(app);
  log.info('Notification Service has started');
}

initialize();
