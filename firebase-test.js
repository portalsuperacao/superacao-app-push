var firebase = require('firebase');
var FCM = require('fcm-node');

var serverKey = 'AIzaSyBoBbg0t3Cafj_O8PXkLIRqB5eXCAtLaOE';
var fcm = new FCM(serverKey);

firebase.initializeApp({
  databaseURL: "https://projetosuperacao-1382.firebaseio.com",
});

var message = {
  to: 'eCUj6oNKwpU:APA91bH2pb4oE3vF8feiIZvKWmPkMKfsW3NxLxcNKBJKax7nTkG3Qxho0TS_6Pi0k8aQtA7Isvt_pzomxpjF0xP5t5r5qbHAxKhhhqWY8MI1b1MNzpUJc_EcsdqNuPLIgfbByXeeuRBy',
  collapse_key: 'test',

  notification: {
    title: 'Titulo',
    body: 'Body'
  },

  data: {
    my_key : 'dados',

  }
};

fcm.send(message, function(error, response) {
  if(error) {
    console.log(err);
  } else {
    console.log("Success!!")
  }
});

var ref = firebase.database().ref("schedule");

ref.once("value").then(function(snap) {
  console.log('test!')
  console.log(snap.val());
}, function(error) {
  console.log(error);
})
