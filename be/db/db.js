
const mongoose = require ("mongoose");

const blogDb = async () => {
    try {
        // const onlineDbUrl = "mongodb+srv://babalolah360:BABAlola360@dates.vkqmldt.mongodb.net/dating?retryWrites=true&w=majority&appName=dates";
        // await mongoose.connect(onlineDbUrl);
        // console.log(`dating app Server is connecetd to database`) 
        // const konect = await mongoose.connect(process.env.MONGO_URI)
        const konect = await mongoose.connect("mongodb://127.0.0.1:27017/blog")
        console.log(`blog app Server is connecetd to ${konect.connection.host}`)
        
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}
module.exports = blogDb;