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
        if(req.body.image){
            user.image = req.body.image;
        }
        console.log(user);
        
        userRef.update(user,error=>{
            if(error){
                res.send({
                    success:false,
                    message:error.message
                })
            }else{
                res.send({
                    success:true,
                    message:"update user successful"
                })
            }
        })
    })
})

module.exports = userRouter;