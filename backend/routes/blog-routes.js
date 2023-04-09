import express from "express";
import { addBlog, deleteBlog, getAllBlogs, getById, getByUserId, updateBlog } from "../controllers/blog-controllers.js";

const blogRouter = express.Router();

blogRouter.get("/", getAllBlogs);
blogRouter.post("/add", addBlog);
blogRouter.put("/update/:id", updateBlog);      // req.params.id this is to update the blog which is selected particularly and here id is variable
blogRouter.get("/:id", getById);     // to get a blog from particular id
blogRouter.delete("/:id", deleteBlog);    // to delete a particular blog
blogRouter.get("/user/:id", getByUserId )  // to get blogs of a user          

export default blogRouter;
