const express = require('express');
const jwt = require('jsonwebtoken');


const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
   

  
    // Extract token from "Bearer <token>"
    const [tokenValue] = token.split(' ');

    jwt.verify(tokenValue, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
      }
  
      req.user = decoded;
      next();
    });
  };
  module.exports=verifyToken;