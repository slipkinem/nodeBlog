module.exports = {
    port:3000,
    //express session
    session:{
       secret:'nodeBlog',
       key:'nodeBlog',
       maxAge:2592000000
    },
    mongodb:'mongodb://localhost:27017/nblog'
};