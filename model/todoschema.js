const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const todoschema=new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    completed:{
        type:Boolean,
        default:false
    }
},
{
    timestamps:true
})
module.exports=mongoose.model("Todo",todoschema);
