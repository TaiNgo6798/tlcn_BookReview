var firebase = require("firebase");
var express = require("express");
var Review = require("./../model/review");

const searchRouter = express.Router();
searchRouter.route("/review/search").get((req, res) => {
var query = 'zzz';
  var dbReviews = firebase
    .database()
    .ref()
    .child("Reviews")
    .orderByChild("desc").startAt(`%${query}%`)
    .endAt(query+"\uf8ff")
    .limitToLast(10);
  dbReviews.once("value", reviews => {
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
});

module.exports = searchRouter;