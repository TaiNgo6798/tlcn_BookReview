var firebase = require("firebase");
var express = require("express");

const userRouter = express.Router();
userRouter.route("/register").post((req, res) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(req.body.email, req.body.password)
    .then(function() {
      res.send({ success: true });
    })
    .catch(function(error) {
      var errorMessage = error.message;
      res.send(errorMessage);
    });
});

userRouter.route("/login").post((req, res) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(req.body.email, req.body.password)
    .then(function() {
      res.send({ success: true });
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorMessage = error.message;
      res.send(errorMessage);
    });
});

userRouter.route("/forgot").post((req, res) => {
  firebase
    .auth()
    .sendPasswordResetEmail(req.body.email)
    .then(function() {
      res.send({ success: true });
    })
    .catch(function(error) {
      var errorMessage = error.message;
      res.send(errorMessage);
    });
});

userRouter.route("/setting").post((req, res) => {
  var rootRef = firebase
    .database()
    .ref()
    .child("Users");
  var userID = firebase.auth().currentUser.uid;
  var usersRef = rootRef.child(userID);
  var userData = {
    firstName: req.body.fName,
    secondName: req.body.sName,
    gender: req.body.gender,
    phone: req.body.phone
  };

  console.log(userData)

  usersRef.set(userData, function(err) {
    if (err) {
      var errorMessage = error.message;
      res.send(errorMessage);
    } else {
      res.send({ success: true });
    }
  });
});

module.exports = userRouter;
