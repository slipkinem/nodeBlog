/**
 * Created by slipkinem on 2016/11/21.
 */
'use strict';
const marked = require('marked');
const Comment = require('../lib/mongo').Comment;

/**
 * 将留言的markdown转换为html
 */
Comment.plugin('contentToHtml',{
    afterFind: comments => comments.map(comment => {
        comment.content = marked(comment.content);
        return comment;
    })
});

/**
 * Comment 留言模型
 * @type {{create: ((p1?:*)=>(any)), delCommentById: ((p1?:*, p2?:*)), getComments: ((p1?:*)=>(any)), getCommentsCount: ((p1?:*)=>(any))}}
 */
module.exports = {
    /**
     * 添加留言
     * @param comment
     */
    create: comment => Comment.create(comment).exec(),
    /**
     * 删除留言
     * @param commentId
     * @param author
     */
    delCommentById: (commentId, author) => Comment.remove({author: author, _id: commentId}),
    /**
     * 获取文章所有留言
     * @param postId
     */
    getComments: postId => Comment
        .find({postId: postId })
        .populate({path: 'author',model: 'User'})
        .sort({_id:1})
        .addCreatedAt()
        .contentToHtml()
        .exec(),
    /**
     * 获取留言的条数
     * @param postId
     */
    getCommentsCount: postId => Comment.count({postId:postId}).exec()
};