// 缓存 更新 版本号
var cacheStorsgeKey = 'minimal-pwa-1'
// 那些文件需要缓存，离线访问
// caches 缓存
var cacheList = [
    '/',
    'index.html',
    'main.css',
    'logo.png'
]

// 借助 Service Worker, 可以在注册完成安装 Service Worker 时, 抓取资源写入缓存:
// self 表示Service Worker作用域 也是全局变量
self.addEventListener('install',e => {
    e.waitUntil(
        caches.open(cacheStorsgeKey)
        .then(cache => cache.addAll(cacheList))
        .then(() => self.skipWaiting())
        //强制当前处于waiting状态的脚本进入
        // active状态
    )
})
//处理动态缓存 决定如何响应资源的请求
self.addEventListener('fetch',function(e) {
    e.responseWith(
        caches.match(e.request).then(
            function(response){
                if(response !=null){
                    return response
                }
            return fetch(e.request.url)
        })
    )
})

self.addEventListener('active',)