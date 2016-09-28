# router
前端路由

### 背景
在前后端分离的大背景下，过往在后台定义页面路由，后来发现其实路由也可以由前端来定义。

### 原理
前端路由是异步加载数据，再改变浏览器地址，故location的hash是首选，html5也重新定义了路径修改api, 在修改url的同时不会刷新页面，并且会保存在浏览器的历史管理纪录。通过监听路径变化，来识别对应的路由。

### 举个例子
```javascript
var router = new Router;
	
// 定义路由
router.use('/page/add', (path, param) => {
	// 异步加载页面
});

// 路由跳转
router.goto('/page/add', { name: 'Jack' });
```

当路由地址发生变化时，这时就会在进入`/page/add`定义的路径控制器，去找对应的页面请求。