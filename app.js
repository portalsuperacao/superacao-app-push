var express = require('express')
var app = express()
var server = require('http').Server(app)
var port = process.env.PORT || 8080
var firebase = require('firebase')
var request = require('request')
var bodyParser = require('body-parser')
var methodOverride = require('method-override')

app.use(bodyParser.urlencoded({'extended' : 'true'}))
app.use(bodyParser.json())
app.use(methodOverride('X-HTTP-Method-Override'))

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,accesstoken')
  res.setHeader('Access-Control-Allow-Credentials', true)
  next()
})

var config = {
  apiKey: ' AIzaSyAnTqOEZHBU-1CMx0fKY2v4zFeGvPnvA1I',
  authDomain: 'superacao-dc62e.firebaseapp.com',
  databaseURL: 'https://superacao-dc62e.firebaseio.com',
  messagingSenderId: '1018181753983'
}

var Firebase = firebase.initializeApp(config)
app.database = Firebase.database().ref()

//CRIE UMA CONTA DE USUÁRIO NO FIREBASE EXCLUSIVA PARA USO NO SERVIDOR
firebase.auth().signInWithEmailAndPassword('root@gmail.com', '123456').then(function(result) {
  console.log('logado!')
}).catch(function(error) {
  console.log(error.code)
  console.log(error.message)
})

//PUSH NOTIFICATION
app.database.child('notifications').on('child_added', function(snapshot) {
  var obj = snapshot.val()
  obj.key = snapshot.key

  request({
      url: 'https://fcm.googleapis.com/fcm/send',
      method: 'POST',
      headers: {
        'Content-Type' :'application/json',
        'Authorization': 'key=AAAA7RBcnH8:APA91bFwdJUT6HO6mvNSL61t839LnM9RxcrYUhwIEtJQ1R2z8awuorCQALyjxssXVN8U7MqROgtr_JUD4Dt32yTYjdSTRSKoFoOzjdZJgT0aDhAPQ6HqOUd7k2Fa7npd61eQ5_D7dbxI'
      },
      body: JSON.stringify(obj)
    },
    function(error, response, body) {
      if (error) {
        console.error(error)
      } else if (response.statusCode >= 400) {
        console.error('HTTP Error: '+response.statusCode+' - '+response.statusMessage);
      } else {
        app.database.child("notifications").child(obj.key).remove();
      }
    })
})


server.listen(port, '', function() {
  console.log("Server On: " + server.address().port)
})
