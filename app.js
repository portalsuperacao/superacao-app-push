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


// Change the message data
// ... as key-value
message.addData('message','Vou indo!');
message.addData('title','Notificação');
message.addData('count', '2');
message.addData('sound',  'file://sounds/reminder.mp3');
message.addData('icon', 'http://icons.com/?cal_id=1');

var sender = new gcm.Sender('AIzaSyCsYtTFahDWEpT0s9RgtwCbKFRxk0VbOSA');


var registrationTokens = [];
registrationTokens.push("e_MCJsHWNZ0:APA91bEmMeWv8m6Mpk52yNiQgBzPCFJu3PK7TVSaXZ38AKzOV4NhHv27ADMswCL1aTI1ttHkC__gsHuMM6veHf5klg331vBFX6029tJGyeqtmnXJWwP0kFsXFe0fc-XQvqIyzBiNjeVv");

// ================= GENERATE NOTIFICATION ================
app.post('/notification', function(req, res) {
  var idToken = req.body.token;
  firebase.auth().verifyIdToken(idToken).then(function(decodedToken) {
    //res.send(req.body);
    console.log(decodedToken);
  });
});

// ================== NOTIFICATION =============================
app.get('/generate-notification', function(req, res) {
  sender.send(message, { registrationTokens: registrationTokens }, function (err, response) {
    if(err) {
       console.error(err);
       res.send("Algo deu errado!");
    } else {
      console.log(response);
      res.send("Notificação enviada!");
    }
  });
});




app.get('/generate-token', function(req, res) {
  res.sendFile(path.join(__dirname + '/generateToken.html'));
});




app.listen(3000);
console.log('Server esta na porta 3000....');
