var firebase = require("firebase");
var express = require("express");
var Review = require("./../model/review");

const approveRouter = express.Router();
approveRouter.route("/approvereviews")
.get((req,res)=>{
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
})

module.exports = approveRouter;