import User from "../model/User.js";
import bcrypt from "bcryptjs";

export const getAllUser = async (req,res,next) => {
    let users;

    try {
        users = await User.find();
    } catch (error) {
        return console.log(error)
    }
    if (!users) {
        return res.status(404).json({message : "No Users Found"});
    }
    return res.status(200).json({users})  //it is actually  return res.status(200).json({users : users})

};

export const signup = async (req,res,next) => {
    const { name,email,password } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({email}) //email is the filter 
    } catch (error) {
        return console.log(error)
    }
    if (existingUser) {
        return res.status(400).json({message : "User Already Exists !!! Try to Login Instead" })
    };

    const hashedPassword = bcrypt.hashSync(password);


    const user = new User({                     //else block
        name,                                  // actually it is  name : name 
        email,
        password : hashedPassword,
        blogs : [],
    });

    try {
        await user.save();
    } catch (error) {
        return console.log(error);
    }
    return res.status(201).json({user});
};

export const login = async(req,res,next) => {

    const { email,password } = req.body;
    
    let existingUser;
    try {
        existingUser = await User.findOne({email}) //email is the filter 
    } catch (error) {
        return console.log(error)
    }
    if (!existingUser) {
        return res.status(404).json({message : "Could not Find User By this Email Id"})
    }; // now email is verified next step is to verify password

    const isPasswordCorrect = bcrypt.compareSync(password,existingUser.password); // we use bcrypt as the password is hashed 
                                // and here we are comparing the entered password with the hashed password that is stored in our db

    if (!isPasswordCorrect) {
        return res.status(400).json({message : "Incorrect Password"})
    }
    return res.status(200).json({message : "Login Successful" , user : existingUser}) // is to server the logged in user with all his blogs 

}