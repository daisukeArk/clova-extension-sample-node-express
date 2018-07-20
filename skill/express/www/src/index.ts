import * as Clova from '@line/clova-cek-sdk-nodejs';
import * as bodyParser from 'body-parser';
import * as Express from 'express';
import * as Handlers from './handlers';

const app = Express();

const clovaHandler = Clova.Client
  .configureSkill()
  .onLaunchRequest(Handlers.LaunchRequestHandler.handle)
  .onIntentRequest(Handlers.intentHandlers)
  .onSessionEndedRequest(Handlers.SessionEndedRequestHandler.handle)
  .handle();

app.post('/clova', bodyParser.json(), <Express.RequestHandler>clovaHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
