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
            require: false
        },
        niche:{
            type:String,
            require:false
        }, 
        bio:{
            type:String,
            require:false
        }, 
        quote:{
            type:String,
            require:false
        },
        goal:{
            type:[String],
            require:false
        }, 
        frustration:{
            type:[String],
            require:false
        }, 
        price:{
            type:Number,
            require:false
        },
        comfort:{
            type:Number,
            require:false
        }, 
        speed:{
            type:Number,
            require:false
        },
        mile:{
            type:Number,
            require:false
        },
        convenience:{
            type:Number,
            require:false
        },
        introvert:{
            type:Number,
            require:false
        },
        creative:{
            type:Number,
            require:false
        }, 
        loyal:{
            type:Number,
            require:false
        },
        passive:{
            type:Number,
            require:false
        },
        location:{
            type:String,
            require:false
        },
        age:{
            type:Number,
            require:false
        }, 
        status:{
            type:String,
            require:false
        },
        tags:{
            type:[String],
            require:false
        },


        
    }, {timestamps: true}
    )

    module.exports = mongoose.model("Bloger", blogerSchema)