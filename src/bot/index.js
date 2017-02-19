/*
 * This is the actual logic behind the messages
 */
import * as wiki from './wiki';
import responses from './responses';

const defaultResponses = {
  // these are just some various responses you might want to send
  instructions: {
    type: 'template',
    payload: {
      template_type: 'button',
      text: "Get a random article!",
      buttons: [
        {
          type: 'postback',
          title: 'Press me!',
          payload: 'random'
        },
      ]
    }
  },
  startMessage: "Hello there friend! Thanks for coming to the Pet Detective. \n You have three options! Option 1, Option 2, and Option 3."
  samarMessage: "Oh you're the best!",
  lostMessage: "Alrighty then! I'm here to help",
  awareMessage: "Hey there! Good to hear from you. What kind of info would you like to know about?",

  greetingMessage: "Hello world!",
  invalidMessage: "Sorry, didn't understand that!",
  failure: "Sorry, something went wrong!",
  hereYouGo: "Here's a cool article",

  /*
  curl -X POST -H "Content-Type: application/json" -d '{
    "recipient":{
      "id":"USER_ID"
    },
    "message":{
      "text":"Please share your location:",
    "quick_replies":[
      {
        "content_type":"location",
      }
    ]
  }
}' "https://graph.facebook.com/v2.6/me/messages?access_token=EAAaaynZCAqP0BANTwHZBxzNHco1mEwvn9mlymCwNheCEqmy2clDCUs8Y9oLae6EChj0lTSmuU0wt6VFDUgII1SpFP8p64ZC3usC58F7ZA7c8pYZCdhoVTbM5NVousoK9tZBnwwDQKtkgcBi6lpBSPlSFjEZCfBV7SZAvH2qn41kQ0wZDZD"
  */

  locationInstruction: {
    text: 'Please share your location.',
    quick_replies: [
      {
        "content_type":"location",
      }
    ]
  }
}

export const handleMessage = ({message, userKey}) => {
  return getResponsesForMessage({message, userKey})
  .then(messages => {
    return generateMessagesFromArray(messages, userKey);
  })
};

const generateMessagesFromArray = (messages, key) => {
  let msgs = [];

  messages.forEach(message => {
    msgs = msgs.concat(buildMessage(message, key));
  });

  return msgs;
};

const buildMessage = (message, key) => {
  if(typeof message === 'string') {
    return {
      text: message,
      key
    }
  } else if(typeof message === 'object') {
    return {
      attachment: message,
      key
    }
  }
};

const getResponsesForMessage = ({message, userKey}) => {
  return new Promise((resolve, reject) => {
    if(message.text === 'Option 1') {
      resolve([defaultResponses.samarMessage]);
    } else if(message.text === 'Option 2') {
      resolve([defaultResponses.lostMessage]);
    } else if(message.text === 'Option 3') {
      resolve([defaultResponses.awareMessage]);
    } else if(responses.hasOwnProperty(message.text)) {
      // add something cooler
    } else {
      resolve([defaultResponses.invalidMessage]);
    }
  });
};
