const mongoose = require('mongoose');
// schema 開始
const postSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: [true, 'Content 未填寫']
        },
        image: {
            type: String,
            default: ""
        },
        createAt: {
            type: Date,
            default: Date.now(),
            select: false
        },
        name: {
            type: String,
            required: [true, '貼文姓名未填寫']
        },
        likes: {
            type: Number,
            default: 0
        }
    }
)
const Post = mongoose.model('Post', postSchema);

module.exports = Post;