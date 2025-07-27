import fs from 'fs';
import imagekit from '../configs/imagekit.js';
import Blog from '../models/Blog.js';
import Comment from '../models/Comment.js';
import main from '../configs/gemini.js';

export const addBlog = async (req, res) => {
     try{
          const {title, subTitle, description, category, isPublished} = JSON.parse(req.body.blog);
          const imageFile = req.file;

          // Check if all fields are present
          if(!title || !description || !category || !imageFile){
            return res.json({success: false, message: "Missing required fields"})
          }

          const fileBuffer = fs.readFileSync(imageFile.path);

          // We will upload the image on imagekit and then we are generating the image where we will get the transformed and optimized image 

          // Uplaod image to ImageKit
          const response = await imagekit.upload({
               file: fileBuffer,
               fileName: imageFile.originalname,
               folder: "/blogs"
          })

          // Optimization through imagekit URL transformation
          const optimizedImageUrl = imagekit.url({
               path: response.filePath, 
               transformation: [
                    {quality: 'auto'},  // Auto Compression
                    {format: 'webp'},  //  Convert to modern format
                    {width: '1280'}    //   Width resizing
               ]
          });

          const image = optimizedImageUrl;

          // Save the data in the mongodb database
          await Blog.create({title, subTitle, description, category, image, isPublished})

          res.json({success: true, message: "Blog Added Successfully"})

     }catch(error){
          res.json({success: false, message: error.message})

     }
}

// Function to get all the blog data
export const getAllBlogs = async(req, res) => {
     try{
        const blogs = await Blog.find({isPublished: true})
        res.json({success: true, blogs})
     }catch(error){
         res.json({success: false, message: error.message})
     }
}

// Function to get the individual blog data
export const getBlogById = async(req, res) => {
     try{
         const {blogId} = req.params;
         const blog = await Blog.findById(blogId);

         if(!blog){
             return res.json({success: false, message: "Blog not found"});
         }
         res.json({success: true, blog})
     }catch(error){
         res.json({success: false, message: error.message})  
     } 
}

// Function to delete blog by id (After deleting the blog we have to delete the comments also that is posted on this blog)
export const deleteBlogById = async(req, res) => {
     try{
         const {id} = req.body;
         await Blog.findOneAndDelete(id);

         // Delete all comments associated with the blog
         await Comment.deleteMany({blog: id});
         
         res.json({success: true, message: "Blog Deleted Successfully"})
     }catch(error){
         res.json({success: false, message: error.message})  
     } 
}

// Function to Publish or unPublish the blog
export const togglePublish = async(req, res) => {
     try{
        const {id} =  req.body;
        const blog = await Blog.findById(id); 
        blog.isPublished = !blog.isPublished;
        await blog.save();
        res.json({success: true, message: "Blog status updated"})
     }catch(error){
         res.json({success: false, message: error.message})
     }
}

// Function to add(or post) new comment on blog post
export const addComment = async(req, res) => {
     try{
         const {blog, name, content} = req.body;
         await Comment.create({blog, name, content});
         res.json({success: true, message: "Comment added for review"})
     }catch(error){
         res.json({success: false, message: error.message})
     }
}

// Function to get the comment data for the individual blog that we can display on the frontend
export const getBlogComments = async(req, res) => {
     try{
          const {blogId} = req.body;
          // Find comments on this blog(Fetches all approved comments for a specific blog post (blogId) from the database, and sorts them by newest first using the createdAt field.)
          const comments = await Comment.find({blog: blogId, isApproved: true}).sort({
               createdAt: -1});
          res.json({success: true, comments})    
     }catch(error){
          res.json({success: false, message: error.message})
     }
}

// Function to Generate content from gemini ai
export const generateContent = async(req, res) => {
     try{
         const {prompt} = req.body; // Whenever we will make the api call, we have to pass the response in the body
         const content = await main(prompt + ' Generate a blog content for this topic in simple text format');   // Passed this prompt in the main function created using google gemini
         res.json({success: true, content});
     }catch(error){
         res.json({success: false, message: error.message});
     }
}