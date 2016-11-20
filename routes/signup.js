/**
 * Created by slipkinem on 2016/11/20.
 */

const router = require('express').Router();

var checkNotLogin = require('../middlewares/check').checkNotLogin;

//GET /signup 注册页

router.get('/',checkNotLogin,function (req,res,next) {
    res.render('signup');
});

//POST /signup 注册

router.post('/',checkNotLogin,function (req, res, next) {
    res.send(req.flash);
});

module.exports = router;