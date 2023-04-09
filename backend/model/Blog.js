import mongoose from "mongoose";

const Schema = mongoose.Schema;

const blogSchema = new Schema ({

    title : {
        type : String,
        required : true,
    },

    description : {
        type : String,
        required : true,
    },

    image : {
        type : String,
        required : true,
    },

    user : {
        type : mongoose.Types.ObjectId,    // to link user to the blog
        ref : "User",      // to provide reference
        required : true,  
    },

});

export default mongoose.model("Blog" , blogSchema);