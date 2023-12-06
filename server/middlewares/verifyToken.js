const express = require('express');
const jwt = require('jsonwebtoken');


const verifyToken = (req, res, next) => {
    // const token = req.headers.authorization;
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6eyJpZCI6MSwiZmlyc3RuYW1lIjoiam9obldJQ0siLCJsYXN0bmFtZSI6IkRvZSIsImVtYWlsIjoiam9obmRvZWVAZW1haS5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCR0ZEpqT2ZCYzFaUmVYZEc2TVpTU3NlU05nUFd4ZGpxbENzRkl3bDkuYksuZEJraW1kS04uNiIsImFkZHJlc3MiOiIxMjMgTWFpbiBTdCIsImNvbnRhY3ROdW1iZXIiOjEyMzQ1Njc4OTAsImJ1c2luZXNzTmFtZSI6IkRvZSBFbnRlcnByaXNlcyIsImNyZWF0ZWRBdCI6IjIwMjMtMTItMDRUMTI6NTQ6NTEuNTA2WiIsInVwZGF0ZWRBdCI6IjIwMjMtMTItMDRUMTI6NTQ6NTEuNTA2WiJ9LCJpYXQiOjE3MDE3NjkzNjIsImV4cCI6MTcwMTg1NTc2Mn0.EmsuEgU_F7tSwNDvbuyOODfqLyAbCqH28s71t0btJ38";
  
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
   

  
    // Extract token from "Bearer <token>"
    const [tokenValue] = token.split(' ');

    // console.log(tokenValue);
    jwt.verify(tokenValue, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
      }
  
      req.user = decoded;
      next();
    });
  };
  module.exports=verifyToken;