var firebase = require("firebase");
var express = require("express");
var User = require('./../model/user');
global.XMLHttpRequest = require("xhr2");
var jwt = require("jsonwebtoken");
var superSecret = "datvuBookReview";

const userRouter = express.Router();

userRouter.route("/register").post((req, res) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(req.body.email, req.body.password)
    .then(function() {
      res.send({ 
        success: true,
        message: "Registering is successful"
      });
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
      var userID = firebase.auth().currentUser.uid;
      userRef = firebase.database().ref().child('Users').child(userID);
      userRef.once('value',snapshot=>{
        var token = createToken(snapshot.val());
        if(snapshot.exists()){
          res.send({
            [userID]:snapshot.val(),
            token
          });
        }else{
          res.send({
            success: true,
            message: "setting account"
          })
        }
      })
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
      res.send({
        success: true,
        message: "Retrieve password successfully"
      });
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
  var user = firebase.auth().currentUser;
  var usersRef = rootRef.child(user.uid);
  var userData = new User(
    req.body.fName,
    req.body.sName,
    req.body.gender,
    req.body.phone,
    req.body.birthday,
    user.email
  )

  firebase.storage().ref().child("Gender Image").child(userData.gender + ".jpg")
    .getDownloadURL().
    then(function(url){
      userData.image = url;
      usersRef.set(userData, function(err) {
        if (err) {
          var errorMessage = err.message;
          res.send(errorMessage);
        } else {
          res.send({ 
            success: true,
            message:"account settings successfully"
          });
        }
      });
    })
});

userRouter.route("/current")
.get((req,res)=>{
  userID = firebase.auth().currentUser.uid;
  dbUser = firebase.database().ref().child("Users").child(userID);
  dbUser.once('value').then((snapshot)=>{
    res.send({[userID] : snapshot.val()});
  })
})
.put((req,res)=>{
  userID = firebase.auth().currentUser.uid;
  dbUser = firebase.database().ref().child("Users").child(userID);
  dbUser.once('value').then((snapshot)=>{
    var user = new User();
    user = snapshot.val();
    if(req.body.fName){
      user.firstName = req.body.fName;
    }
    if(req.body.sName){
      user.secondName = req.body.sName;
    }
    if(req.body.gender){
      user.gender = req.body.gender;
    }
    if(req.body.phone){
      user.phone = req.body.phone;
    }
    if(req.body.birthday){
      user.birthday = req.body.birthday;
    }

    dbUser.update(user, error=>{
      if (error) {
        var errorMessage = error.message;
        res.send(errorMessage);
      } else {
        res.send({
           success: true,
           message:'Update account successful'
        });
      }
    })
  })
})

function createToken(account) {
  var token = jwt.sign(
    account,
    superSecret,
    {
      expiresIn: "24h" // expires in 24 hours
    }
  );
  return token;
}

module.exports = userRouter;
