module.exports = {
    port:3000,
    //express session
    session:{
       secret:'nodeBlog',
       key:'nodeBlog',
       maxAge:2592000000
    },
    mongodb:'mongodb://<nnn>:<123456>@ds161497.mlab.com:61497/private_name'
};