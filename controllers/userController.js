import userModel from "../models/userModels.js";
import bcrypt from 'bcrypt'
// const userModel = require('../models/userModels');

//create register user
export async function registerController(req, res) {
  try {
    const { username, email, password } = req.body;

    //vallidation
    if (!username || !email || !password) {
      return res.status(400).send({
        success: false,
        message: "Please Fill All Fields",
      });
    }

    //existing user

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(401).send({
        success: false,
        message: "user already exisits",
      });
    }

    const hashedPassword = await bcrypt.hash(password,10)
    

      //save new user

      const user = new userModel({ username, email, password:hashedPassword });
      await user.save();
      return res.status(201).send({
        success: true,
        message: "New user Created",
        user,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: "ERROR IN REGISTER CALLBACK",
      success: false,
      error,
    });
  }
}

//get all users

export async function getAllUsers( req,res) {
    try {
        const users = await userModel.find({})
        return res.status(200).send({
            userCount: users.length,
            success:true,
            message:"all users data",
            users,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in get all users",
            error
        })
    }
}

//login
export async function loginController(req,res) {
    try {
        const {email,password} = req.body
        //validation
        if(!email|| !password){
            return res.status(401).send({
                success:false,
                message:"Please provide email or password"
            })
        }
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(200).send({
                success:false,
                message:"email is not registerd"
            })
        }

        //password
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(401).send({
                success:false,
                message:"Invalid username or password"
            })
        }
        return res.status(200).send({
            success:true,
            message:"Login successfully",
            user
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:flase,
            message:"Error in login"
        })
        
    }
}
