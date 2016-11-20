# nodeBlog
这是我用来学习的node博客

ROUTE AND MODEL\n

注册\n
注册页：GET /signup\n
注册（包含上传头像）：POST /signup\n
登录\n
登录页：GET /signin\n
登录：POST /signin\n
登出：GET /signout\n
查看文章\n
主页：GET /posts\n
个人主页：GET /posts?author=xxx\n
查看一篇文章（包含留言）：GET /posts/:postId\n
发表文章\n
发表文章页：GET /posts/create\n
发表文章：POST /posts\n
修改文章\n
修改文章页：GET /posts/:postId/edit\n
修改文章：POST /posts/:postId/edit\n
删除文章：GET /posts/:postId/remove\n
留言\n
创建留言：POST /posts/:postId/comment\n
删除留言：GET /posts/:postId/comment/:commentId/remove\n