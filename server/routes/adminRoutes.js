import express from "express";
import { adminLogin, approveCommentById, deleteCommentById, getAllBlogsAdmin, getAllComments, getDashboard } from "../controllers/adminController.js";
import auth from "../middleware/auth.js";

const adminRouter = express.Router();

adminRouter.post("/login", adminLogin);
adminRouter.get("/comments", auth, getAllComments); // Get all the comments for the admin
adminRouter.get("/blogs", auth, getAllBlogsAdmin); // Get complete blog list for the admin
adminRouter.post("/delete-comment", auth, deleteCommentById); // Delete comment by id
adminRouter.post("/approve-comment", auth, approveCommentById); // Approve comment by id
adminRouter.get("/dashboard", auth, getDashboard); // Get Dashboard data

export default adminRouter;