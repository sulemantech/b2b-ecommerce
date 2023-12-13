const express = require('express');
const jwt = require('jsonwebtoken');


const verifyToken = (req, res, next) => {
     const token = req.headers.authorization;
    // console.log(req.headers.cookie);
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
   
    
    // console.log(token);
     const tokenValue = token.split(' ')[1];
    // const tokenValue = token.substring(token.indexOf('=') + 1);
    jwt.verify(tokenValue, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.log(err);
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
      }
  
      req.user = decoded;
      // console.log(req.user.id);
      next();
    });
  };
  module.exports=verifyToken;