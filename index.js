
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const AssistantV1 = require('watson-developer-cloud/assistant/v1');

var assistant = new AssistantV1({
  iam_apikey: "",
  version: "2018-03-19",
  url: "https://gateway-syd.watsonplatform.net/assistant/api"
});

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.render('index', {val: null, error: null});
})
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', function (req, res) {
  let chat = req.body.chat;
  watson(chat, undefined)
  .then(response1 => {
    var output = JSON.stringify(response1, null, 2);
     botIN = JSON.parse(output);
     botMessage = botIN.output.text;
    console.log(botMessage);
  });
  res.render('index', {val:botMessage ,error: null});

})

app.listen(3000, function () {
  console.log('Listening on port 3000!');
})

var botMessage = '';
var botIN = '';

function watson (text, context) {
    var payload = {
    workspace_id: 'cc0cd540-5388-4677-87b2-34468249a1b1',
    input: {
      text: text
    },
    context: context
  };
  return new Promise((resolve, reject) =>
   assistant.message(payload, function(err, data) {
     if (err) {
       reject(err);
     } else {
       resolve(data);
     }
   })
 );
}
