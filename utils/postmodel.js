const mongoose = require("mongoose")

const postSchema =  mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
      },
    postImage: String,
    postCaption: String,
    postLikes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        }
    ],
    postDate: {
        type: Date,
        default: Date.now
    }

})



module.exports = mongoose.model('post', postSchema);