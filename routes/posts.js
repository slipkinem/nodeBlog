/**
 * Created by slipkinem on 2016/11/20.
 */

const express = require('express');
const router = express.Router();
const checkLogin = require('../middlewares/check').checkLogin;

const PostModel = require('../models/posts');
const CommentModel= require('../models/comment');

//GET/POST 所有用户或者特定用户的文章列表
//eg:GET /posts?author=xx

router.get('/',function (req, res, next) {
    // res.send(req.flash);
    var author = req.query.author;

    PostModel.getPosts(author)
        .then(posts => {
            res.render('posts', {
                posts: posts
            })
        })
        .catch(next);
});

//POST /posts 发表一篇文章
router.post('/',checkLogin,function (req, res, next) {
    // res.send(req.flash);
    var author = req.session.user._id;
    var title = req.fields.title;
    var content = req.fields.content;

    try {
        if (!title.length || !content.length) {
            // req.flash('error','请填写标题');
            throw new Error('内容请填写完整');
        }
    } catch (e) {
        req.flash('error',e.message);
        return res.redirect('back');
    }

    var post = {
        author: author,
        title: title,
        content: content,
        pv: 0
    };

    PostModel.create(post)
        .then(function (result) {
            post = result.ops[0];
            req.flash('success','文章发表成功');
            res.redirect(`/posts/${post._id}`);
        })
        .catch(next);
});

//GET 发表文章页 /posts/create
router.get('/create',checkLogin,function (req, res, next) {
    // res.send(req.flash);
    res.render('create');
});

//GET 具体文章 /posts/:postId;
router.get('/:postId',function (req, res, next) {
    // res.send(req.flash);
    var postId = req.params.postId;

    Promise.all([
        PostModel.getPostById(postId), //获取文章信息
        CommentModel.getComments(postId), //获取该文章的所有留言
        CommentModel.getCommentsCount(postId),
        PostModel.incPv(postId) //PV+1 浏览数
    ])
    .then(result => {
        var post = result[0];
        var comments = result[1];
        post.commentsCount = result[2];
        if (!post) {
            throw new Error('文章不存在');
        }

        res.render('post',{
            post: post,
            comments: comments
        })
    })
    .catch(next);
});

//GET /posts/:postId/Edit  更新文章页
router.get('/:postId/edit',checkLogin,function (req, res, next) {
    // res.send(req.flash);
    var postId = req.params.postId;
    var author = req.session.user._id;

    PostModel.getRowPostById(postId)
        .then(post => {
            if (!post) {
                throw new Error('文章不存在');
            }
            if (author.toString() !== post.author._id.toString()) {
                throw new Error('权限不足');
            }
            res.render('edit', {
                post: post
            })
        })
        .catch(next)
});

//POST /posts/:postId/edit 更新某一篇文章
router.post('/:postId/edit',checkLogin,function (req, res, next) {
    // res.send(req.flash);
    var postId = req.params.postId;
    var author = req.session.user._id;
    var title = req.fields.title;
    var content = req.fields.content;

    PostModel.updatePostId(postId, author,{title: title, content: content})
        .then(() => {
            req.flash('success','编辑文章成功');
            res.redirect(`/posts/${postId}`);
        })
        .catch(next);

});

//GET /posts/:postId/remove 删除文章
router.get('/:postId/remove',checkLogin,function (req, res, next) {
    // res.send(req.flash);
    var postId = req.params.postId;
    var author = req.session.user._id;

    PostModel.delPostById(postId, author)
        .then(() => {
            req.flash('success','deleted success');
            res.redirect('/posts');
        })
        .catch(next);
});

//POST /posts/:postId/comment 创建一条留言
router.post('/:postId/comment',checkLogin,function (req, res, next) {
    // res.send(req.flash);
    var author = req.session.user._id;
    var postId = req.params.postId;
    var content = req.fields.content;

    var comment = {
        author: author,
        postId: postId,
        content: content
    };
    /**
     * 创建留言
     */
    CommentModel.create(comment)
        .then(() => {
            req.flash('success','留言成功');
            res.redirect('back');
        })
        .catch(next);
});

//GET /posts/:postId/comment/:commentId/remove 删除一条留言
router.get('/:postId/comment/:commentId/remove',checkLogin,function (req, res, next) {
    // res.send(req.flash);
    var commentId = req.params.commentId;
    var author = req.session.user._id;

    CommentModel.delCommentById(commentId, author)
        .then(() => {
            req.flash('success','删除成功');
            res.redirect('back');
        })
        .catch(next);
});


module.exports = router;