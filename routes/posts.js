/**
 * Created by slipkinem on 2016/11/20.
 */

const express = require('express');
const router = express.Router();
const checkLogin = require('../middlewares/check').checkLogin;

//GET/POST 所有用户或者特定用户的文章列表
//eg:GET /posts?author=xx

router.get('/',function (req, res, next) {
    res.send(req.flash);
});

//POST /posts 发表一篇文章
router.post('/',checkLogin,function (req, res, next) {
    res.send(req.flash);
});

//GET 发表文章页 /posts/create
router.get('/create',checkLogin,function (req, res, next) {
    res.send(req.flash);
});

//GET 具体文章 /posts/:postId;
router.get('/:postId',function (req, res, next) {
    res.send(req.flash);
});

//GET /posts/:postId/Edit  更新文章页
router.get('/:postId/edit',checkLogin,function (req, res, next) {
    res.send(req.flash);
});

//POST /posts/:postId/edit 更新某一篇文章
router.post('/:postId/edit',checkLogin,function (req, res, next) {
    res.send(req.flash);
});

//GET /posts/:postId/remove 删除文章
router.get('/:postId/remove',checkLogin,function (req, res, next) {
    res.send(req.flash);
});

//POST /posts/:postId/comment 创建一条留言
router.post('/:postId/comment',checkLogin,function (req, res, next) {
    res.send(req.flash);
});

//GET /posts/:postId/comment/:commentId/remove 删除一条留言
router.get('/:postId/comment/:commentId/remove',checkLogin,function (req, res, next) {
    res.send(req.flash);
});


module.exports = router;