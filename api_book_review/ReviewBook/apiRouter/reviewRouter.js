var firebase = require("firebase");
var express = require("express");
var Review = require('./../model/review');

const reviewRouter = express.Router();
reviewRouter.route("/review/post")
  .post((req, res) => {
    var databaseRef = firebase.database().ref().child("Reviews");
    databaseRef.once("value").then(function(snapshot) {
      var nameImage = req.body.nameImage;
      var desc = req.body.desc;
      var url = req.body.url;
      var title = req.body.title;
      var kind = req.body.kind;

      var user = firebase.auth().currentUser;
      firebase.database().ref().child("Users/" + user.uid).once("value").then(function(snapshot) {
        var fName = snapshot.val() && snapshot.val().firstName;
        var sName = snapshot.val() && snapshot.val().secondName;
        var userName = fName + " " + sName;
        var reviewData = new Review(title, kind, url, nameImage, desc, user.uid, userName);

        var newPostReviewRef = databaseRef.push();
        newPostReviewRef.set(reviewData, function(error) {
          if (error) {
            var errorMessage = error.message;
            res.send(errorMessage);
          } else {
            res.send({ 
              success: true,
              message: "post review successful"
            });
          }
        });
      });
    });
  })
  .get((req,res)=>{
    var dbReviews = firebase.database().ref().child("Reviews").orderByChild('numberTime');
    dbReviews.on('value',function(reviews){
      var result = [];
      if(reviews.exists){
        reviews.forEach(child=>{
          var obj ={};
          obj[child.key] = child;
          result.unshift(obj);
        })
        res.send(result);
      }else{
        res.send({ 
          success: true,
          message:"Get all post review successful"
         });
      }
    })
  })

reviewRouter.route("/review/post/own")
.get((req,res)=>{
  var user = firebase.auth().currentUser;
  var dbReviews = firebase.database().ref().child("Reviews").orderByChild('uid').equalTo(user.uid);
  dbReviews.on('value',function(reviews){
    var result = [];
    if(reviews.exists){
      reviews.forEach(child=>{
        var obj ={};
        obj[child.key] = child;
        result.unshift(obj);
      })
      res.send(result);
    }else{
      res.send({
        success: true,
        message:"Get all post review of currentUser successful"
      });
    }
  })
})

module.exports = reviewRouter;
