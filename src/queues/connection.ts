import { winstonLogger } from '@abdulrehman1363/jobber-shared';
import { config } from '@notifications/config';
import client, { Channel, Connection } from 'amqplib';
import { Logger } from 'winston';

const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'notificationQueueConnection', 'debug')

async function createConnection() : Promise<Channel | undefined> {
  try {
    const connection: Connection = await client.connect(`${config.RABBITMQ_URL}`);
    const channel: Channel = await connection.createChannel();
    log.info('Notification server connected to RabbitMQ successfully');
    closeConnection(channel, connection);
    return channel;
  } catch (error) {
    log.log('error', 'NotificationService createConnection() RabbitMQ: method', error);
    return undefined;
  }
}

function closeConnection(channel: Channel, connection: Connection) : void {
  process.once('SIGINT', async () => {
    channel.close();
    connection.close();
  })
}

export { createConnection };
