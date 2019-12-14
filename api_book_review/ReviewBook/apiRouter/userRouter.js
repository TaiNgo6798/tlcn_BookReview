var firebase = require("firebase");
var express = require("express");
var User = require('./../model/user');

const userRouter = express.Router();

userRouter.route("/users")
.get((req,res)=>{
    firebase.database().ref().child('Users').once('value',snapshot=>{
        res.send(snapshot.val());
    })
})

userRouter.route("/user/:id_user")
.get((req,res)=>{
    var userID = req.params.id_user;
    userRef = firebase.database().ref().child("Users").child(userID);
    userRef.once('value',snapshot=>{
        res.send(snapshot.val());
    })
})
.put((req,res)=>{
    var userID = req.params.id_user;
    var userRef = firebase.database().ref().child('Users').child(userID);
    userRef.once('value',snapshot=>{
        var user = new User();
        user = snapshot.val();

        if(req.body.fName && req.body.fName.length > 0){  
            user.firstName = req.body.fName;
        }
        if(req.body.sName && req.body.sName.length > 0){
            user.secondName = req.body.sName;
        }
        if(req.body.gender && req.body.gender.length > 0){
            user.gender = req.body.gender;
        }
        if(req.body.phone && req.body.phone.length > 0){
            user.phone = req.body.phone;
        }
        if(req.body.birthday && req.body.birthday.length > 0){
            user.birthday = req.body.birthday;
        }
        if(req.body.image && req.body.image.length > 0){
            user.image = req.body.image;
        }

        req.decoded.user = user;
        
        userRef.update(user,error=>{
            if(error){ 
                res.send({
                    success:false,
                    message:error.message
                })
            }else{
                res.send({
                    success:true,
                    user: req.decoded
                })
            }
        })
    })
})

module.exports = userRouter;