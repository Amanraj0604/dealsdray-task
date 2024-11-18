const mongoose=require('mongoose');

const employeeShema=new mongoose.Schema(
    {
        // userId: {
        //     type: String,
        //     required: true
        //   },
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        phone:{
            type:Number,
            required:true
        },
        designation:{
            type:String,
            required:true
        },
        gender:{
            type:String,
            required:true,
        },
        course:{
            type:String,
            required:true
        },
        img:{
            type:String,
            // required:true,
        }

    },
    {timestamps:true}
)
module.exports=mongoose.model("empList",employeeShema);