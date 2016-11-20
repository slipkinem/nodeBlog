/**
 * Created by slipkinem on 2016/11/20.
 */

module.exports = {
    /**
     * 未登录
     * @param req
     * @param res
     * @param next
     * @returns {*}
     */
    checkLogin:function (req, res, next) {
        if (!req.session.user) {
            req.flash('error','未登录');
            return res.redirect('/signin');
        }
        next();
    },
    /**
     * 检测登录
     * @param req
     * @param res
     * @param next
     * @returns {*}
     */
    checkNotLogin:function (req, res, next) {
        if (req.session.user) {
            req.flash('error','已登录');
            return res.redirect('back');
        }
        next();
    }
};