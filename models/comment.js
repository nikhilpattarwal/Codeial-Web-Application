const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    
    //comment belongs to a user
     user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
     },

     post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
     }


},{
    timestamps: true
});

const Comments = mongoose.model('Comment', commentSchema);

module.exports = Comments;