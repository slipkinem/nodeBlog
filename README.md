# nodeBlog
这是我用来学习的node博客

ROUTE AND MODEL

注册<br/>
注册页：GET /signup<br/>
注册（包含上传头像）：POST /signup<br/>
登录<br/>
登录页：GET /signin<br/>
登录：POST /signin<br/>
登出：GET /signout<br/>
查看文章<br/>
主页：GET /posts<br/>
个人主页：GET /posts?author=xxx<br/>
查看一篇文章（包含留言）：GET /posts/:postId<br/>
发表文章<br/>
发表文章页：GET /posts/create<br/>
发表文章：POST /posts<br/>
修改文章<br/>
修改文章页：GET /posts/:postId/edit<br/>
修改文章：POST /posts/:postId/edit<br/>
删除文章：GET /posts/:postId/remove<br/>
留言<br/>
创建留言：POST /posts/:postId/comment<br/>
删除留言：GET /posts/:postId/comment/:commentId/remove<br/>