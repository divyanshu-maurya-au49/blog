import express from 'express';
import { createBlogController, deleteBlogController, getAllBlogsController, getBlogByIdController, updateBlogController, userBlogController } from '../controllers/blogController.js';

//router object
const router = express.Router()

//routes
//get ||all blogs
router.get('/all-blog',getAllBlogsController)

//POST ||create blog
router.post('/create-blog', createBlogController)

//PUT ||update blog
router.put('/update-blog/:id', updateBlogController)


//GET ||single blog Details
router.get('/get-blog/:id', getBlogByIdController)


//DELETE || delete blog
router.delete('/delete-blog/:id', deleteBlogController)


//GET // user blog get
router.get('/user-blog/:id',userBlogController)

export default  router