const successHandleService = require('../services/successHandleService');
const errorHandleService = require('../services/errorHandleService');
const Post = require('../models/PostsModel');  //載入 PostModel

const PostController = {
    async getPosts(req, res) {
        const allPosts = await Post.find();
        successHandleService(res, allPosts);
    },
    async createPosts({body, req, res}) {
        try{
            const data = JSON.parse(body);
            if(data.content !== undefined){
                const newPost = await Post.create(
                    {
                        name: data.name,
                        content: data.content,
                    }
                );
                successHandleService(res, newPost);
            }else{
                errorHandleService(res);
            }
        }catch(error){
            errorHandleService(res, 400, error);
        }
    },
    async deleteAllPosts(req, res) {
        const post = await Post.deleteMany({});
        successHandleService(res, post)
    },
    async deletePosts(req, res) {
        try {
            const { url } = req;
            const id = url.split('/').pop();
            const post = await Post.findByIdAndDelete(id);
            if(post) {
                successHandleService(res, post);
            } else {
                errorHandleService(res);
            }
        } catch (err) {
            errorHandleService(res, err);
        }
    },
    async updatePosts({body, req, res}) {
        const data = JSON.parse(body);
        console.log(data);
        try {
            const id = req.url.split('/').pop();
            const post = await Post.findByIdAndUpdate(id, data);
            successHandleService(res, post);
        } catch(error) {
            errorHandleService(res, 400 ,error);
        }
    }
}

module.exports = PostController;