import express from 'express';
import * as messenger from './messenger/index';
import bodyParser from 'body-parser';

let app = express();

app.set('port', (process.env.PORT || 3000));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', messenger.verifyMessenger);
app.post('/', messenger.handleMessages);

app.listen(app.get('port'), () => {
  console.log('Server listening at port', app.get('port'));
  curl -X POST -H "Content-Type: application/json" -d '{
  "setting_type":"greeting",
  "greeting":{
    "text":"Hi {{user_first_name}}! Welcome to My Company!"
  }
}' "https://graph.facebook.com/v2.6/me/thread_settings?access_token=EAAaaynZCAqP0BANTwHZBxzNHco1mEwvn9mlymCwNheCEqmy2clDCUs8Y9oLae6EChj0lTSmuU0wt6VFDUgII1SpFP8p64ZC3usC58F7ZA7c8pYZCdhoVTbM5NVousoK9tZBnwwDQKtkgcBi6lpBSPlSFjEZCfBV7SZAvH2qn41kQ0wZDZD"
});
