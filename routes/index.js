/**
 * Created by slipkinem on 2016/11/20.
 */

module.exports = function (app) {
    app.get('/',function (req, res) {
        res.redirect('/posts');
    });
    app.use('/signup',require('./signup'));
    app.use('/signin',require('./signin'));
    app.use('/signout',require('./signout'));
    app.use('/posts',require('./posts'));
    app.use(function (req, res) {
        if (!res.headersSent) {
            res.render('404');
        }
    });
    app.use(function (err, req, res) {
        res.render('error',{
            error:err
        });
    })
};