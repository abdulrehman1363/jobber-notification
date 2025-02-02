import { Client } from '@elastic/elasticsearch';
import { config } from '@notifications/config';
import { winstonLogger } from '@abdulrehman1363/jobber-shared';
import { Logger } from 'winston';
import { ClusterHealthResponse } from '@elastic/elasticsearch/lib/api/types';

const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'notificationElasticSearchServer', 'debug')

const elasticSearchClient = new Client({
  node: `${config.ELASTIC_SEARCH_URL}`
})

export async function checkConnection() : Promise<void> {
  let isConnected = false;
  while(!isConnected) {
    try {
      const health: ClusterHealthResponse = await elasticSearchClient.cluster.health({});
      log.info(`NotificationService elasticSearch Health Status: ${health.status}`);
      isConnected = true;
    } catch (error) {
      log.error('Error connecting to ElasticSearch, Retrying ...');
      log.info('error', 'NotificationService checkConnection():method ', error);
    }
  }
}
