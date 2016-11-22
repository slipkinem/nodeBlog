/**
 * Created by slipkinem on 2016/11/21.
 */
'use strict';
const Post = require('../lib/mongo').Post;
const marked = require('marked');
const CommentModel = require('./comment');

/**
 * markdown转HTML
 */
Post.plugin('contentToHtml',{
    /**
     * 中间
     * @param posts
     * @returns {*}
     */
   afterFind: posts => posts.map( post => {
        post.content = marked(post.content);
        return post;
    }),
    /**
     * 中间
     * @param post
     * @returns {*}
     */
    afterFindOne: post => {
        if (post) {
            post.content = marked(post.content);
        }
        return post;
    }
});
/**
 * post 添加留言数 commentsCount
 */
Post.plugin('addCommentsCount', {
    afterFind: posts => Promise.all(posts.map(post => CommentModel.getCommentsCount(post._id)
        .then(commentsCount => {
            post.commentsCount = commentsCount;
            return post;
        })
    )),
    afterFindOne: post => {
        if (post) {
            return CommentModel.getCommentsCount(post._id)
                .then(count => {
                    post.commentsCount = count;
                    return post;
                })
        }
        return post;
    }
});
/**
 * 文章模型
 * @type {{create: ((p1?:*)=>(any)), getPostById: ((p1?:*)=>(any)), getPosts: ((p1?:*)), incPv: ((p1?:*)=>(any)), getRowPostById: ((p1?:*)=>(any)), updatePostId: ((p1?:*, p2?:*, p3?:*)=>(any)), delPostById: ((p1?:*, p2?:*)=>(any))}}
 */
module.exports = {
    /**
     * 创建一篇文章
     * @param post
     */
    create: post => Post
        .create(post)
        .exec(),
    /**
     * 通过id获取一篇文章
     * @param postId
     */
    getPostById: postId => Post
        .findOne({_id: postId})
        .populate({path: 'author',model: 'User'})
        .addCreatedAt()
        .addCommentsCount()
        .contentToHtml()
        .exec(),
    /**
     * 按创建时间降序获取所有用户文章或者某个特定用户的所有文章
     * @param author
     * @returns {*|Array|{index: number, input: string}}
     */
    getPosts: author => {
        var query ={};
        if (author) {
            query.author = author;
        }
        return Post
            .find(query)
            .populate({path: 'author',model: 'User'})
            .sort({_id: -1})
            .addCreatedAt()
            .addCommentsCount()
            .contentToHtml()
            .exec();
    },
    /**
     * 通过文章id给pv加一
     * @param postId
     */
    incPv: postId => Post
        .update({_id:postId},{$inc: {pv: 1}})
        .exec(),
    /**
     * 编辑文章
     * @param postId
     */
    getRowPostById: postId => Post
        .findOne({_id: postId})
        .populate({path: 'author', model:'User'})
        .exec(),
    /**
     * 更新文章
     * @param postId
     * @param author
     * @param data
     */
    updatePostId: (postId, author, data) => Post
        .update({author: author,_id: postId},{$set: data})
        .exec(),
    /**
     * 删除文章
     * @param postId
     * @param author
     */
    delPostById: (postId, author) => Post
        .remove({author: author,_id: postId})
        .exec()
};