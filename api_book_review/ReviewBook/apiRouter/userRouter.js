var firebase = require("firebase");
var express = require("express");

const userRouter = express.Router();
userRouter.route("/register").post((req, res) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(req.body.email, req.body.password)
    .then(function() {
      res.send({success:true});
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
      res.send({success:true});
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
      res.send({success:true});
    })
    .catch(function(error) {
      var errorMessage = error.message;
      res.send(errorMessage);
    });
});

module.exports = userRouter;
