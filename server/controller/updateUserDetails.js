const { response } = require("express");
const getUserDetailsFromToken = require("../helpers/getUserDetailsFromToken");
const UserModel = require("../models/UserModel");

async function updateUserDetails(req,res){
    try {token

        const token = req.cookies.token || ""

        const user = await getUserDetailsFromToken()

        const {name , profile_pic, email} = req.body

        const updateUser = await UserModel.updateOne({_id:user._id},{
            name,
            profile_pic
        })

        const userInformation = await UserModel.findById(user._id)

        return res.json({
            message:"User update Successfully",
            data: userInformation,
            success:true
        })
        
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
          });
    }
}

module.exports = updateUserDetails