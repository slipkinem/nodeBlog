'use strict';
var config = require('config-lite');
var Mongolass = require('mongolass');
const moment = require('moment');
const objectIdToTimestamp = require('objectid-to-timestamp');


var mongolass = new Mongolass();
mongolass.connect(config.mongodb);

/**
 * 根据ID生成创建时间 created_at
 */
mongolass.plugin('addCreatedAt',{
    afterFind: results => {
        results.forEach(item => {
            item.created_at = moment(objectIdToTimestamp(item._id)).format('YYYY-MM-DD HH:mm');
        });
        return results;
    },
    afterFindOne: result => {
        if (result) {
            result.created_at = moment(objectIdToTimestamp(result._id)).format('YYYY-MM-DD HH:mm');
        }
        return result;
    }
});
/**
 * user 模型
 */
exports.User = mongolass.model('User', {
    name: { type: 'string' },
    password: { type: 'string' },
    avatar: { type: 'string' },
    gender: { type: 'string', enum: ['m', 'f', 'x'] },
    bio: { type: 'string' }
});
exports.User.index({ name: 1 }, { unique: true }).exec();// 根据用户名找到用户，用户名全局唯一
/**
 * POST 模型
 */
exports.Post = mongolass.model('Post', {
    author: {type: Mongolass.Types.ObjectId},
    title: {type: 'string'},
    content: {type: 'string'},
    pv: {type: 'number'}
});
exports.Post.index({author: 1,_id: -1}).exec();
/**
 * 留言模型
 */
exports.Comment = mongolass.model('Comment', {
    author: {type: Mongolass.Types.ObjectId},
    content: {type: 'string'},
    postId: {type: 'string'}
});
exports.Comment.index({author: 1, _id:1}).exec();
exports.Comment.index({postId: 1, _id:1}).exec();
