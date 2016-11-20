/**
 * Created by slipkinem on 2016/11/20.
 */
const router = require('express').Router();

const checkLogin = require('../middlewares/check').checkLogin;

//GET /signout
router.get('/',checkLogin,function (req, res, next) {
    res.send(req.flash);
});

module.exports = router;