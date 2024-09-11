const { response } = require("express");
const UserModel = require("../models/UserModel");
const bcrypt = require('bcryptjs')

async function registerUser(req, res) {
  try {
    const { name, email, password, profile_pic } = req.body;
    const checkEmail = await UserModel.findOne({email})

    if(checkEmail){
        return res.status(400).json({
            message: "Already exist please login",
            error:true
        })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(password,salt)

    const payload = {
        name,
        email,
        profile_pic,
        hashedPass
    }

    const user = new UserModel(payload)
    const userSave = user.save()

    return res.status(201).json({
        message:"User created successfully",
        data:userSave,
        success:true
    })


  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
}


module.exports = registerUser