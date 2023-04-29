const HttpController = require('../controllers/HttpController');
const PostController = require('../controllers/PostController');

const routes = async (req, res) => {
    const { url, method } = req;
    // 接收 POST API 的 body 資料
    let body = "";
    req.on('data', chunk => {
        body+=chunk;  // 將chunk組成body
    })
    if(url == '/posts' && method == 'GET') {  // 取得所有貼文資料
        PostController.getPosts(req, res);
    }else if(url == '/posts' && method == 'POST') { // 新增一筆貼文資料
        req.on('end',async()=>{
            PostController.createPosts({body, req, res});
        })
    } else if (url == '/posts' && method == 'DELETE') { // 刪除所有貼文資料
        PostController.deleteAllPosts(req, res)
    } else if (url.startsWith('/posts/') && method == 'DELETE') { // 刪除一筆貼文資料
        PostController.deletePosts(req, res);
    } else if (url.startsWith('/posts/') && method == 'PATCH') { // 編輯一筆貼文資料
        req.on('end', async() => {
            PostController.updatePosts({body, req, res});
        })
    } else if (method == "OPTIONS") {
        HttpController.cors(req, res);
    } else {
        HttpController.notFound(req, res);
    }
}

module.exports = routes;