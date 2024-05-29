const mongoose = require("mongoose")

const Schema = mongoose.Schema

const blogerSchema = new Schema(
    {
        username:{
            type: String,
            required: true
        },
        email:{
            type: String,
            required: true, 
            unique: true,
        },
        password:{
            type: String,
            required: true
        },
        profilePhoto:{
            type: String, 
            default:"https://as1.ftcdn.net/v2/jpg/03/46/83/96/1000_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
        },
        name:{
            type:String,
            require: true
        }

    }, {timestamps: true}
    )

    module.exports = mongoose.model("Bloger", blogerSchema)