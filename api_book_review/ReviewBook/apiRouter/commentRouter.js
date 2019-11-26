var firebase = require("firebase");
var express = require("express");
var Comment = require("./../model/comment");

const commentRouter = express.Router();
const user = firebase.auth().currentUser;
commentRouter
  .route("/comment")
  //luu 1 comment cua user vao co so du lieu
  .post((req, res) => {
    var body = req.body.body;
    var imageUser = req.body.imageUser;
    var nameUser = req.body.nameUser;
    var review_id = req.body.review_id;
    var comment = new Comment(user.uid, body, imageUser, nameUser);
    dbCommentRef = firebase
      .database()
      .ref()
      .child("Comments");
    newCommentRef = dbCommentRef.push();
    newCommentRef.set(comment, error => {
      if (error) {
        var errorMessage = error.message;
        res.send(errorMessage);
      } else {
            dbReview = firebase.database().ref().child('Reviews').child(review_id).child('comments');
            dbReview.once('value',snapshot=>{
                var key = newCommentRef.key;
                var comments = [key];
                if(snapshot.exists()){
                    comments = Object.values(snapshot.val());
                    comments.unshift(key);
                }
                dbReview.set(comments,error=>{
                    if (error) {
                        var errorMessage = error.message;
                        res.send(errorMessage);
                      } else {
                        res.send({ 
                          success: true,
                          message: "comment review successful"
                        });
                      }
                })
            })
      }
    });
  });

module.exports = commentRouter;
