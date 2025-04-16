// Importing the express package using require
import pkg from 'express';
const { Request, Response, NextFunction } = pkg;
// Defining the catchAsyncError middleware function
const catchAsyncError = (fun) => 
  (req, res, next) => 
    Promise.resolve(fun(req, res, next)).catch(next);
export default catchAsyncError;
