/**
 * Created by slipkinem on 2016/11/20.
 */

const User = require('../lib/mongo').User;


module.exports = {
    /**
     * 注册用户
     * @param user
     * @returns {*|Array|{index: number, input: string}} promise
     */
    create: function (user) {
        return  User.create(user).exec();
    },
    /**
     * 通过name获取用户
     * @param name
     * @returns {*|Array|{index: number, input: string}}
     */
    getUserByName: function (name) {
        return User
            .findOne({name: name})
            .addCreatedAt()
            .exec();
    }
};