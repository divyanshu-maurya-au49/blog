import blogModel from "../models/blogModels.js";
import userModel from "../models/userModels.js";
import mongoose from "mongoose";

//GET ALL BLOGS
export async function getAllBlogsController(req,res){
    try {
        const blogs = await blogModel.find({}).populate("user");
        if(!blogs){
            return trs.status(200).send({
                success:false,
                message:"No Blogs Found"
            })
        }
        return res.status(200).send({
            success:true,
            BlogCount: blogs.length,
            message:"All Blogs lists",
            blogs,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:'Error while getting Blogs',
            error
        })
    }
}

//create ALL BLOGS
export async function createBlogController(req,res){
    try {
        const {title, description, image,user} = req.body

        //validation
        if(!title||!description||!image ||!user){
            return res.status(400).send({
                success:false,
                message:'Please Provide All Fields'
            })
        }
        const existingUser = await userModel.findById(user)
        if(!existingUser){
            return res.status(404).send({
                success:false,
                message:'unable to find user'
            })
        }
        
        const newBlog = new blogModel({title,description,image,user})

        // uses for  update operation by user
         const session = await mongoose.startSession()
        session.startTransaction()
        await newBlog.save({session})
        existingUser.blogs.push(newBlog)
        await existingUser.save({session})
        await session.commitTransaction()
        await newBlog.save();

        return res.status(201).send({
            success:true,
            message:'Blog Created',
            newBlog,
        })
        
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            success:false,
            message:"Error While Creating blog",
            error
        })
    }
}

//update ALL BLOGS
export async function updateBlogController(req,res){
    try {
        const {id} = req.params;
        const {title,description,image} = req.body;
        const blog = await blogModel.findByIdAndUpdate(id,{...req.body},{new:true});
        return res.status(200).send({
            success:true,
            message:"Blog Updated",
            blog,
        })
        
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success:false,
            message:'Error While updating Blog',
            error
        })
    }
}


//get single BLOGS
export async function getBlogByIdController(req,res){
    try {
        const {id} = req.params
        const blog = await blogModel.findById(id)
        if(!blog){
            return res.status(404).send({
                success:false,
                message:'blog not fount with this id',
            })
        }
        return res.status(200).send({
            success:true,
            message:"fetch single blog",
            blog,
        })
        
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success:false,
            message:'error while getting single blog',
            error
        })
    }
}


//Delete single BLOGS
export async function deleteBlogController(req,res){
    try {
        //populated is uses for any specific operation
        const blog =await  blogModel.findByIdAndDelete(req.params.id).populate("user");
       await blog.user.blogs.pull(blog);
       await blog.user.save();
        return res.status(200).send({
            success:true,
            message:"  Blog Deleted",   
        })
        
    } catch (error) {
        console.log(error);
        return res.status(400).send({
            success:false,
            message:'error while deleting  blog',
            error
        })
    }
}


//get user blog
export async function userBlogController(req,res){
    try {
        const userBlog = await userModel.findById(req.params.id).populate("blogs")
        if(!userBlog){
            return res.status(404).send({
                success:false,
                message:'blogs not found with this id'
            })
        }
        return res.status(200).send({
            success:true,
            message:'user blogs',
            userBlog,
        })
    } catch (error) {
        console.log(error);
        return  res.status(400).send({
            success:false,
            message:"error in user blog",
            error
        })
    }
};