const express = require('express');
const jwt = require('jsonwebtoken');


const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;


  
  if (!token) {
    
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }
  
  const tokenValue = token.split(' ')[1];
  console.log("token",token);
    

    jwt.verify(tokenValue, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        //console.log("error is  :", err)
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
      }
  
      req.user = decoded;
      // console.log(req.user.id);
      next();
    });
  };
  module.exports=verifyToken;