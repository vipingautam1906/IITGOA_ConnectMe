const express=require('express');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

const router=express.Router();

const User=require('../models/user');

router.post('/signup',(req,res,next)=>{
  bcrypt.hash(req.body.password,10)
     .then(hash=>{
         const user=new User({
             email : req.body.email,
             password: hash,
             fname : req.body.fname,
             lname : req.body.lname,
             about : req.body.aboutMe
         })
         user.save()
           .then(result=>{
               res.status(201).json({
                   message : "New user added successfully"
               })
           })
           .catch(err=>{
               res.status(500).json({
                   error : err
               })
           })
     })
})

router.post('/login',(req,res,next)=>{
    let fetchedUser;
    User.findOne({email : req.body.email})
     .then(user=>{
         if(!user)
           return res.status(404).json({
              message : "User with this id does not exist"
          })
         fetchedUser=user; 
         return bcrypt.compare(req.body.password,user.password)   
     })
     .then(result=>{
         if(!result)
          return res.status(401).json({
              message : 'Wrong password entered!'
          })
         const token=jwt.sign({email : req.body.email,userId : fetchedUser._id},"secret_key",{expiresIn: "1h"});
         res.status(200).json({
             token : token,
             expiresIn : 3600,
             userId : fetchedUser._id,
             fname : fetchedUser.fname,
             lname : fetchedUser.lname,
             email : fetchedUser.email,
             aboutMe : fetchedUser.about
         })
     })
     .catch(err=>{
        return res.status(401).json({
            message : 'Authentication failed'
        })
     })
})

router.post('/updatePass',(req,res,next)=>{
   const userId=req.body.userId;
   let fetchedUser;
   User.findOne({_id: userId})
      .then(user=>{
        if(!user)
        return res.status(404).json({
           message : "User with this id does not exist"
       })
       fetchedUser=user;
       return bcrypt.compare(req.body.currentPassword,user.password)  
      })
      .then(result=>{
        if(!result)
          return res.status(401).json({
              message : 'Wrong password entered!'
          })
        bcrypt.hash(req.body.password,10)
      })
       .then(hash=>{
          User.updateOne({_id : req.body.userId},{password : hash})
                .then(result=>{
                    if(result.modifiedCount>0)
                    {
                      res.status(200).json({message : "Password Update Successful"});
                    }
                    else
                    {
                      res.status(500).json({message : "Failed to update Password, please try again later"});
                    }
                })
                .catch(err=>{
                    res.status(500).json({
                        error : err
                    })
                })
       })    
})

module.exports = router;
