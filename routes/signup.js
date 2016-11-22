/**
 * Created by slipkinem on 2016/11/20.
 */

'use strict';
const router = require('express').Router();
const path = require('path');
const sha1 = require('sha1');
const UserModel = require('../models/users');

var checkNotLogin = require('../middlewares/check').checkNotLogin;

//GET /signup 注册页

router.get('/',checkNotLogin,function (req,res,next) {
    res.render('signup');
});

//POST /signup 注册

router.post('/',checkNotLogin,function (req, res, next) {
    // res.send(req.flash);

    var name = req.fields.name;
    var gender = req.fields.gender;
    var bio = req.fields.bio;
    var avatar = req.files.avatar.path.split(path.sep).pop();
    var password = req.fields.password;
    var repassword = req.fields.repassword;

    //校验
    try{
        if (!(name.length >= 1 && name.length <= 10 )){
            throw new Error('名字在1-10个字符');
        }
        if (['m','f','x'].indexOf(gender) === -1) {
            throw new Error('性别只能是m/f/x');
        }
        if (!(bio.length >=1 && bio.length <= 30)) {
            throw new Error('个人简介应在1-30个字符之间');
        }
        if (!req.files.avatar.name) {
            throw new Error('图像不能为空');
        }
        if (password.length < 6){
            throw new Error('密码位数不能小于6位');
        }
        if (password !== repassword) {
            throw new Error('两次输入密码不一致');
        }

    } catch (e) {
        req.flash('error',e.message);
        return res.redirect('/signup');
    }

    //密码加密
    password = sha1(password);

    var user = {
        name:name,
        password:password,
        gender:gender,
        avatar:avatar,
        bio:bio  //个人简历
    };
    //用户数据写入数据库
    UserModel.create(user)
        .then(result => {
            user = result.ops[0];
            //存入session
            delete user.password;
            req.session.user = user;
            //写入flash
            req.flash('success','注册成功');
            //挑传到首页
            res.redirect('/posts');
        })
        .catch(e => {
            if (e.message.match('E11000 duplicate key')){
                req.flash('error','用户名已经被占用');
                res.redirect('/signup');
            }
            next(e);
        });
});

module.exports = router;