import mongoose from "mongoose";
import Blog from "../model/Blog.js";
import User from "../model/User.js";

export const getAllBlogs = async(req,res,next) => {
    let blogs;

    try {
        blogs = await Blog.find().populate("user");
    } catch (error) {
        return console.log(error);
    }

    if (!blogs) {
        return res.status(404).json({message : "No Blogs Found"});
    }
    return res.status(200).json({blogs});
};

export const addBlog = async (req,res,next) => {
    const { title, description, image, user } = req.body;

    let existingUser;
    try {
        existingUser = await User.findById(user);
    } catch (error) {
        return console.log(error);
    };

    if (!existingUser) {
        return res.status(400).json({message : "Unable To Find the User with this Id"})
    }
    const blog = new Blog ({
        title, // it is title : title
        description,
        image,
        user,
    });

    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await blog.save({session});  // to save blog to the respective user
        existingUser.blogs.push(blog);
        await existingUser.save({session});  // to relate user  with his blogs
        await session.commitTransaction();   // to commit(save) all the sessions
    } catch (error) {
        console.log(error);
        return res.status(500).json({message : error})
    };
    return res.status(200).json({blog});
};

export const updateBlog = async(req,res,next) => {

    const { title, description, image } = req.body;  // only title and description can be updated
    const blogId = req.params.id;

    let blog;
    try {
        blog = await Blog.findByIdAndUpdate(blogId, {
            title,
            description,
            image
        })
    } catch (error) {
        return console.log(error);
    };

    if(!blog) {
        return res.status(500).json({message : "Sorry... Unable to Update the Blog"})
    }
    return res.status(200).json({blog});
 
};

export const getById = async(req,res,next) => {

    const id = req.params.id;
    let blog;

    try {
        blog = await Blog.findById(id);
    } catch (error) {
        return console.log(error);
    }

    if(!blog) {
        return res.status(404).json({message : "No Blog Found"});
    }
    return res.status(200).json({blog});
};

export const deleteBlog = async (req,res,next) => {

    const id = req.params.id;
    let blog;

    try {
        blog = await Blog.findByIdAndRemove(id).populate("user");  // we use populate to do some action in user blog
        await blog.user.blogs.pull(blog); // blog is the blog from the prev line and user.blogs is the blogs array of each user (user is object)and pull is to remove blog from there 
        await blog.user.save();

    } catch (error) {
        console.log(error);
    };

    if(!blog) {
        return res.status(500).json({message : "Unable to Delete"});
    }
    return res.status(200).json({message : "Blog Deleted Successfully"});

};

export const getByUserId = async (req,res,next) => {

    const userId = req.params.id;
    let userBlogs;

    try {
        userBlogs = await User.findById(userId).populate("blogs");  // User is object and from there we are accessing blogs using userId
    } catch (error) {
        return console.log(error);
    }

    if (!userBlogs) {
        return res.status(404).json({message : "No Blogs are found in this User Id"});
    }
    return res.status(200).json({user : userBlogs});

}