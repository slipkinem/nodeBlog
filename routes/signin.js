/**
 * Created by slipkinem on 2016/11/20.
 */

'use strict';
const sha1 = require('sha1');
const router = require('express').Router();

var UserModel = require('../models/users');
var checkNotLogin = require('../middlewares/check').checkNotLogin;

//GET /signin 登录页面
router.get('/',checkNotLogin,(req, res, next) => res.render('signin'));

//POST /signin 用户登录
router.post('/',checkNotLogin,function (req, res, next) {
    // res.send(req.flash);
    var name = req.fields.name;
    var password = req.fields.password;
    /**
     * 检查登录信息
     */
    UserModel.getUserByName(name)
        .then(user => {
            if (!user) {
                req.flash('error', '用户不存在');
               return res.redirect('back');
            }
            if (sha1(password) != user.password) {
                req.flash('error','密码错误');
                return res.redirect('back');
            }
            req.flash('success','登陆成功');

            delete user.password;
            req.session.user = user;
            res.redirect('/posts');
        })
        .catch(next);

});

module.exports = router;