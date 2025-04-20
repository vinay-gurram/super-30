const mongooes = require ('mongoose');

const userSchema = new mongooes.Schema ({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },

    email:{
        type:String,
        
        unique:true
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