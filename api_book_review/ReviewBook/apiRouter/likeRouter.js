var firebase = require("firebase");
var express = require("express");
var Like = require('./../model/like');

const likeRouter = express.Router();
likeRouter.route("/review/like/:review_id")
//tra ve danh sach nguoi thich bai review
.get((req,res)=>{
    dbLike = firebase.database().ref().child('Likes').child(req.params.review_id);
    dbLike.on('value',likes=>{
        if(likes.exists()){
         var result = [];
         likes.forEach(like => {
             var obj = {};
             obj[like.key] = like;
             result.unshift(obj);
         });
         res.send(result);
        }else{
            res.send({
                success:false,
                message:"Nobody likes the post"
            })
        }
    })
})
//luu nguoi thich bai viet len db
.post((req,res)=>{
    var like = new Like(req.body.imageUser,req.body.nameUser);
    var userID = firebase.auth().currentUser.uid;
    dblike = firebase.database().ref().child('Likes').child(req.params.review_id).child(userID);
    dblike.set(like,error=>{
        if(error){
            res.send({
                success:false,
                message:error.message
            })
        }else{
            dbReview = firebase.database().ref().child('Reviews').child(req.params.review_id).child('likes');
            dbReview.once('value',snapshot=>{
                var likes =[userID];
                if(snapshot.exists()){
                    likes = Object.values(snapshot.val());
                    likes.unshift(userID);
                }
                dbReview.set(likes,error=>{
                    if(error){
                        res.send({
                            success:false,
                            message:error.message
                        })
                    }else{
                        res.send({      
                            success:true,
                            message:"liked successful"
                        })
                    }
                })
            })
        }
    })
})

module.exports = likeRouter;    