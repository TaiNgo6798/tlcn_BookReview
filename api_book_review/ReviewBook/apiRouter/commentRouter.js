var firebase = require("firebase");
var express = require("express");
var Comment = require("./../model/comment");

const commentRouter = express.Router();
commentRouter
  .route("/review/comment/:review_id")
  //luu 1 comment cua user vao co so du lieu
  .post((req, res) => {
    var body = req.body.body;
    var imageUser = req.body.imageUser;
    var nameUser = req.body.nameUser;
    var review_id = req.params.review_id;

    const userID = firebase.auth().currentUser.uid;
    var comment = new Comment(userID, body, imageUser, nameUser);
    dbCommentRef = firebase
      .database()
      .ref()
      .child("Comments")
      .child(review_id);
    newCommentRef = dbCommentRef.push();
    newCommentRef.set(comment, error => {
      if (error) {
        var errorMessage = error.message;
        res.send(errorMessage);
      } else {
        dbReview = firebase
          .database()
          .ref()
          .child("Reviews")
          .child(review_id)
          .child("comments");
        var key = newCommentRef.key;
        dbReview.update({ [key]: true }, error => {
          if (error) {
            var errorMessage = error.message;
            res.send(errorMessage);
          } else {
            res.send({
              success: true,
              message: "Commented successfully"
            });
          }
        });
      }
    });
  })
  // TRẢ VỀ TẤT CẢ COMMMENT CỦA BÀI VIẾT
  .get((req,res)=>{
    var review_id = req.params.review_id;
    dbCommentRef = firebase
    .database()
    .ref()
    .child("Comments")
    .child(review_id);
    dbCommentRef.on('value',snapshot=>{
      if(snapshot.exists()){
        res.send(snapshot.val());
      }else{
        res.send({
          success:false,
          message:"no exists"
        })
      }
    })
  })

module.exports = commentRouter;
