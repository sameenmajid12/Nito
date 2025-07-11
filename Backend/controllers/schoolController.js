const express = require("express");
const app = express();
const schoolRouter = express.Router();
const School = require("../models/SchoolModel");

schoolRouter.get("/", async(req,res,next)=>{
  try{
    console.log("Getting schools..")
    const schools = await School.find({});
    if(!schools){
      return res.status(404).json({message:"Error fetching schools"})
    }
    res.status(200).json({schools});
  }
  catch(error){

  }
})

module.exports = { schoolRouter };
