
const {NestFactory} = require('@nestjs/core')
const {askForEnv} = require('./utils/ask-for-env')
const {resolve} = require('path')



async function stats() {
  const env = await askForEnv();
  console.log('TODO: Display stats for env:', env)

  const {AppModule} = require('../app.module')
  const {AppService} = require('../app.service')
  const app = await NestFactory.createApplicationContext(AppModule);
  const appService = app.get(AppService);
  console.log('STATS', appService.getHello())

}
stats();
