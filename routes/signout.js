/**
 * Created by slipkinem on 2016/11/20.
 */

'use strict';
const router = require('express').Router();

const checkLogin = require('../middlewares/check').checkLogin;

//GET /signout
router.get('/',checkLogin,(req, res, next) => {
    // res.send(req.flash);
    //清除用户session
    req.session.user = null;
    req.flash('success','登出成功');
    res.redirect('/posts');
});

module.exports = router;