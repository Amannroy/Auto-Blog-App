import express from 'express';
import { addBlog, addComment, deleteBlogById, getAllBlogs, getBlogById, getBlogComments, togglePublish } from '../controllers/blogController.js';
import upload from '../middleware/multer.js';
import auth from '../middleware/auth.js';

const blogRouter = express.Router();

blogRouter.post("/add", upload.single('image'), auth, addBlog);

// API to get the list of blog
blogRouter.get('/all', getAllBlogs);
blogRouter.get('/:blogId', getBlogById);
blogRouter.post('/delete',auth, deleteBlogById); // Only Admin can delete this blog
blogRouter.post('/toggle-publish',auth, togglePublish); // Only Admin can publish this blog

blogRouter.post('/add-comment', addComment);
blogRouter.post('/comments', getBlogComments);


export default blogRouter;