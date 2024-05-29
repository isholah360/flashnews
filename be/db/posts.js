const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema(
    {
        title:{
            type: String,
            required: true
        },
        body:{
            type: String,
            required: true
        },
        category:{
            type: String,
            required: true, 
        },
        newsPhoto:{
            type: String, 
            default:"https://www.hubblehosting.com/img/blog-img/post-details-3.jpg"
        }, 
        author:{
            type: String, 
            require: true
        },
        authorPhoto:{
            type: String, 
            require:true
        },
        create:{
            type:Date, 
            default:Date.now
        }

    }, {timestamps: true}
)

module.exports = mongoose.model("Post", postSchema)