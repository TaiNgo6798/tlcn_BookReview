var firebase = require("firebase");
var express = require("express");
var Review = require("./../model/review");

const approveRouter = express.Router();
approveRouter.route("/approvereviews").get((req, res) => {
  var user = req.decoded.user;
  if (user.role === "admin") {
    var approveRef = firebase
      .database()
      .ref()
      .child("ApproveReviews")
      .orderByChild("numberTime");
    approveRef.once("value", reviews => {
      var result = [];
      if (reviews.exists()) {
        reviews.forEach(child => {
          var obj = {};
          obj[child.key] = child.val();
          result.unshift(obj);
        });
        res.send(result);
      } else {
        res.send({
          success: false
        });
      }
    });
  } else {
    res.send({
      success: false,
      message: "You are not the admin"
    });
  }
});

approveRouter.route("/approvereviews/:id_review").post((req, res) => {
  var user = req.decoded.user;
  if (user.role === "admin") {
    var id_review = req.params.id_review;
    var approveRef = firebase
      .database()
      .ref()
      .child("ApproveReviews")
      .child(id_review);
    approveRef.once("value", snapshot => {
      if (snapshot.exists()) {
        var reviewRef = firebase
          .database()
          .ref()
          .child("Reviews")
          .child(id_review);
          reviewRef.set(snapshot.val(), error => {
          if (error) {
            res.send({
              success: false,
              message: error.message
            });
          }else{
              approveRef.remove();
              res.send({
                success: true,
                message: "approved review"
              });
          }
        });
      } else {
        res.send({
          success: false,
          message: "reviews no exists"
        });
      }
    });
  } else {
    res.send({
      success: false,
      message: "You are not the admin"
    });
  }
});

module.exports = approveRouter;
