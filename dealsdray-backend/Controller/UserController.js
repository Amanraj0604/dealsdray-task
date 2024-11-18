const asyncHandler=require("express-async-handler");
const User=require("../Models/User");
const CryptoJS=require("crypto-js");
const generateToken=require("./GenToken")
const jwt=require("jsonwebtoken")



//validate email and password using regex

const validateEmail=(email)=>{
    const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

const validatePassword=(password)=>{
    const passwordRegex=/^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[A-Z])(?=.*[0-9]).{8,}$/;
    return passwordRegex.test(password);
}


//Register User

const registerUser=asyncHandler(async(req,res)=>{
    const {userName,email,password}=req.body;
    // console.log(req.body);
    
    //find user
    const user = await User.findOne({ email: req.body.email });
    // console.log(user);
    if(user){
        return res.status(400).json("user all ready exites")
    }


    //validate email,password and otp
    
    if(!validateEmail(email)){
        return res.status(400).json("Invalid email format");
    }

    if(!validatePassword(password)){
        return res.status(400).json("Invalid password format: Your password must contain at least one uppercase letter, one lowercase letter, one special character, and be at least 8 characters long ");
    }

    //Encrypt Passsword
    const encryptPassword=CryptoJS.AES.encrypt(password,process.env.PASS_SEC).toString();
    //Save user to the database

    const newUser=new User({
        userName:userName,
        email:email,
        password:encryptPassword,
    });
    try{
        const savedUser=await newUser.save();
        res.status(200).json(`user register succusfully`);
    }
    catch(err){
        res.status(500).json(err);
    }
});

const loginuser=asyncHandler(async(req,res)=>{
    try {
        const {email,password}=req.body;
        const user=await User.findOne({email})
        if(!user){
            return res.status(404).json('User Not Found')
        }

        //password dycript
        const hashedPassword=CryptoJS.AES.decrypt(user.password,process.env.PASS_SEC);
        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        if(originalPassword !==password){
            return res.status(400).json("Password is incorrect");
        }
        const token = generateToken(user);

        //email and password is verifyed 

        // const{pass,...others}=user._doc;
        // console.log(...others);
        
        const response = {
            message: "User logged in successfully",
            user: user,  
            token: token  
        };
        
        res.status(200).json(response);

    } catch (error) {
        res.status(500).json(`Invalid user and password ${error}`);
    }
})

module.exports = {registerUser,loginuser};