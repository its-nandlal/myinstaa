const mongoose = require("mongoose")
const plm = require("passport-local-mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/myinsta")


const userSchema =  mongoose.Schema({
    name: String,
    username: String,
    dp:{
        type: String,
        default: "defoultdp.jpg"
    },
    email: String,
    contact: {
        type: Number,
        default: 9999999999
    },
    bio: {
        type: String,
        default: "im use myinsta 🚩"
    },
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'post'
        }
    ],
    savePost: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'post'
        }
    ],
    password: String

})


userSchema.plugin(plm);

module.exports = mongoose.model('user', userSchema);