const mongooes = require ('mongoose');

const userSchema = new mongooes.Schema ({
    username:{
        type:String,
        required:true,
        uniqe:true
    },
    password:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true,
        uniqe:true
    },
    age:{
        type:Number,
        required:true   
    },
    createdAt:{
        type:Date,
        default:Date.now
    }



})

module.exports = mongooes.model("User",userSchema);