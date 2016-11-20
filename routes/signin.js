/**
 * Created by slipkinem on 2016/11/20.
 */

const router = require('express').Router();

var checkNotLogin = require('../middlewares/check').checkNotLogin;

//GET /signin 登录页面
router.get('/',checkNotLogin,function (req, res, next) {
    res.send(req.flash);
});

//POST /signin 用户登录
router.post('/',checkNotLogin,function (req, res, next) {
    res.send(req.flash);
});

module.exports = router;