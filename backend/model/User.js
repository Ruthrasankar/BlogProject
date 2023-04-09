import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name : {
        type : String,
        required : true
    },

    email : {
        type : String,
        required : true,
        unique : true
    },
    
    password : {
        type : String,
        required : true,
        minlength : 6
    },

    blogs : [
        {type : mongoose.Types.ObjectId,   // to link blog and user
         ref : "Blog" ,              // for reference
         required : true,
        }]
});

export default mongoose.model ("User",userSchema); //in mongodb the collections will be stored as users because of naming conventions
