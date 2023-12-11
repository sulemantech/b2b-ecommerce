const express = require('express');
const jwt = require('jsonwebtoken');


const verifyToken = (req, res, next) => {
    // const token = req.headers.authorization;
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6eyJpZCI6OCwiZmlyc3RuYW1lIjoibHV0aGZpIiwibGFzdG5hbWUiOiJraGFuIiwiZW1haWwiOiJsdXRoZmlAZW1haS5jb20iLCJwYXNzd29yZCI6IiQyYiQxMCRyQlBHdlVVQ3JSMFFNUkxUMnY0NlFPLkhpUnFBb2xyV3BGYXFaQm84R0xldEY3Yi9XNk1rZSIsImFkZHJlc3MiOiIxMjMgTWFpbiBTdCIsImNvbnRhY3ROdW1iZXIiOjEyMzQ1Njc4OTAsImJ1c2luZXNzTmFtZSI6IkRvZSBFbnRlcnByaXNlcyIsImNyZWF0ZWRBdCI6IjIwMjMtMTItMDhUMTA6MTk6MDIuNjQxWiIsInVwZGF0ZWRBdCI6IjIwMjMtMTItMDhUMTA6MTk6MDIuNjQxWiJ9LCJpYXQiOjE3MDIwMzA4MzEsImV4cCI6MTcwMjExNzIzMX0.pIRNGXQuhgVuN0WdlHd00q39QpuU5Q046yXYe4pH8f8";
  
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