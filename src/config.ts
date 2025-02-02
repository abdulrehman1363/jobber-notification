import dotenv from 'dotenv';
dotenv.config({});

class Config {
  public NODE_ENV: string | undefined;
  public CLIENT_URL: string | undefined;
  public SENDER_EMAIL: string | undefined;
  public SENDER_EMAIL_PASSWORD: string | undefined;
  public RABBITMQ_URL: string | undefined;
  public ELASTIC_SEARCH_URL: string | undefined;

  constructor(){
    this.NODE_ENV = process.env.NODE_ENVIRONMENT || '';
    this.CLIENT_URL = process.env.CLIENT_URL || '';
    this.SENDER_EMAIL = process.env.SENDER_EMAIL || '';
    this.SENDER_EMAIL_PASSWORD = process.env.SENDER_EMAIL_PASSWORD || '';
    this.RABBITMQ_URL = process.env.RABBITMQ_URL || '';
    this.ELASTIC_SEARCH_URL = process.env.ELASTIC_SEARCH_URL || '';
  }
}

export const config: Config = new Config();
