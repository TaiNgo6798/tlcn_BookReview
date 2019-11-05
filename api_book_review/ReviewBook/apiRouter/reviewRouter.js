var firebase = require("firebase");
var express = require("express");

const reviewRouter = express.Router();
reviewRouter.route("/review/post")
  .post((req, res) => {
    var databaseRef = firebase.database().ref().child("Reviews");
    databaseRef.once("value").then(function(snapshot) {
      var fileCompleteName = req.body.nameImage;
      var desc = req.body.desc;
      var url = req.body.url;

      var user = firebase.auth().currentUser;
      firebase.database().ref().child("Users/" + user.uid).once("value").then(function(snapshot) {
          var fName = snapshot.val() && snapshot.val().firstName;
          var sName = snapshot.val() && snapshot.val().secondName;
          var userName = fName + " " + sName;

            var time = new Date();
            var reviewData = {
              numberTime:-Date.now(),
              image: url,
              nameImage: fileCompleteName,
              desc: desc,
              uid: user.uid,
              name: userName,
              time: time.toLocaleString("vi", {
                hour: "numeric",
                minute: "numeric"
              }),
              date: time.toLocaleDateString("vi", {
                weekday: "long",
                month: "long",
                day: "2-digit",
                year: "numeric"
              })
            };

            var newPostReviewRef = databaseRef.push();
            newPostReviewRef.set(reviewData, function(error) {
              if (error) {
                var errorMessage = error.message;
                res.send(errorMessage);
              } else {
                res.send({ success: true });
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
          result.unshift(child);
        })
        res.send(result);
      }else{
        res.send({ success: true });
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
        result.unshift(child);
      })
      res.send(result);
    }else{
      res.send({ success: true });
    }
  })
})


module.exports = reviewRouter;
