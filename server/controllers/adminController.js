import  jwt  from "jsonwebtoken";
import Blog from "../models/Blog.js";
import Comment from "../models/Comment.js";

// Function to login admin
export const adminLogin = async(req, res) => {
   try{
        const {email, password} = req.body;

        if(email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD){
            return res.json({success: false, message: "Invalid Credentails"})
        }

        const token = jwt.sign({email}, process.env.JWT_SECRET)
        res.json({success: true, token})
   }catch(error){
        res.json({success: false, message: error.message})
   }
}

// Function to get the blog list to the admin whether it is published or unplublished(Here we will find all blog post where isPublished field is true or false)
export const getAllBlogsAdmin = async(req, res) => {
     try{
         const blogs = await Blog.find({}).sort({createdAt: -1});
         res.json({success: true, blogs});
     }catch(error){
         res.json({success: false, message: error.message});
     }
}


// Function where admin can see all the comments whether it is upload or not upload
export const getAllComments = async(req, res) => {
     try{
          const comments = await Comment.find({}).populate("blog").sort({createdAt: -1});
          res.json({success: true, comments});
     }catch(error){
          res.json({success: false, message: error.message});
     }
}

// Function where admin can get the dashboard data(5 blogs)
export const getDashboard = async(req, res) => {
     try{
          const recentBlogs = await Blog.find({}).sort({createdAt: -1}).limit(5);
          const blogs = await Blog.countDocuments(); // It will give the total number of blogs
          const comments = await Comment.countDocuments(); // It will give the total number of comments
          const drafts = await Blog.countDocuments({isPublished: false}); // It will give all the drafts

          const dashboardData = {
               blogs, comments, drafts, recentBlogs
          }
          res.json({success: true, dashboardData});
     }catch(error){
          res.json({success: false, message: error.message});
     }
}

// Function where Admin can delete the comment 
export const deleteCommentById = async(req, res) => {
     try{
          const {id} = req.body;
          await Comment.findByIdAndDelete(id);
          res.json({success: true, message: "Comment Deleted Successfully"});
     }catch(error){
          res.json({success: false, message: error.message});
     }
}

// Function where Admin can approve the comment 
export const approveCommentById = async(req, res) => {
     try{
          const {id} = req.body;
          await Comment.findByIdAndUpdate(id, {isApproved: true});
          res.json({success: true, message: "Comment Approved Successfully"});
     }catch(error){
          res.json({success: false, message: error.message});
     }
}