var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var gcm = require('node-gcm');
var firebase = require('firebase');

var app = express();

var message = new gcm.Message();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Firebase
firebase.initializeApp({
  databaseURL: "https://superacao-dc62e.firebaseio.com",
  serviceAccount: "./credentials.json"
});


var sender = new gcm.Sender('AIzaSyCsYtTFahDWEpT0s9RgtwCbKFRxk0VbOSA');

// ================= GENERATE NOTIFICATION ================
app.post('/notification', function(req, res) {
  var idToken = req.body.token;
  var tokenDevice = req.body.token_device;
  var message = req.body.name_user + ": " + req.body.message;

  firebase.auth().verifyIdToken(idToken).then(function(decodedToken) {
    generatePush(tokenDevice, decodedToken.user_id, message);
  });
  res.send("");
});

app.listen(3000);
console.log('Server esta na porta 3000....');

function generatePush(tokenDevice, userUid, msg) {
  var registrationTokensDevice = [];

  console.log(userUid);
  message.addData('user_uid', userUid);
  message.addData('title','Superação: Nova mensagem!');
  message.addData('body', msg);
  message.addData('sound',  'file://sounds/reminder.mp3');
  message.addData('icon', 'ic_laucher');
  message.addData('style', 'inbox');
  message.addData('summaryText', 'Há %n% novas mensagens');
  registrationTokensDevice.push(tokenDevice);

  sender.send(message, {registrationTokens: registrationTokensDevice}, function(error, success) {
    if(error) {
      console.log(error);
    } else {
      console.log(success);
    }
  });
}

/*app.get('/generate-token', function(req, res) {
  res.sendFile(path.join(__dirname + '/generateToken.html'));
});*/
