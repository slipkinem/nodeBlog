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
    }
};