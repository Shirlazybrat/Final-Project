var express = require('express');
var router = express.Router();
var FirebaseRef = new Firebase("https://bridesmaidal.firebaseio.com/");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

FirebaseRef.on("value", function(snapshot) {
  FirebaseContent = snapshot.val();
}, function(errorObject) {
  console.log("The read failed: " + errorObject.code);
}); 

module.exports = router;
