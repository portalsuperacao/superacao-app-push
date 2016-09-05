exports.findAll = function(req, res) {
  var ref = db.ref("/users");
}

exports.findById = function(req, res) {

}

exports.addEvent = function(req, res) {
  var event = req.body;
  console.log(event.title);

  res.send(JSON.stringify(event));
}
