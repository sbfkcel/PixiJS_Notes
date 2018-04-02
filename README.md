# Pixi.js学习笔记

## 初始Pixi.js

Pixi是当前公认渲染效能最高的2D渲染引擎。
Pixi纯碎地只做2D渲染，拥有简洁的api，足够通用是它的优势所在。可以根据自己的编程风格去做你想做的任何事情。
Pixi能与其它许多框架无缝集成。

功能特别：
- 完备的场景、精灵概念
- 精灵拥有完善的事件处理机制

## 开始准备
- 首先需要下载Pixi.js文件 `https://github.com/pixijs/pixi.js/releases`
- 需要有一个http环境

## 上手
- 新建一个html文件，并引入'Pixi.js'文件
- 引入一个空的JS主文件`main.js`

```html
    <body>
        <script src="./js/Pixi.min.js"></script>
        <script src="./js/main.js"></script>
    </body>
```

```javascript
    let type = "WebGL";
    //判断浏览器是否支持WebGL
    if(!PIXI.utils.isWebGLSupported()){
        type = "canvas"
    };
    PIXI.utils.sayHello(type);

    //如果成果，以上代码在控制台中将会打印PixiJs版本信息
```


## 创建Pixin应用
首先要声明一个Pixi应用，并将其绘图板插入到页面中

```javascript
//创建一个pixi应用
const app = new PIXI.Application({
    width:300,                  //[可选] 宽，默认800
    height:300,                 //[可选] 高，默认600
    antialias:true,             //[可选] 抗锯齿，默认false
    transparent:true,           //[可选] 背景透明，默认false
    resolution:1,               //[可选] 屏幕密度，默认1
    backgroundColor:0xff0000,   //[可选] 背景颜色，默认0x000000
    forceCanvas:false           //[可选] 强制使用canvas，不启用WebGL渲染，默认false
});

//将app视图板（canvas）插入到页面
document.body.appendChild(app.view);
```
> http://pixijs.download/release/docs/PIXI.Application.html

此时页面中应该出现300x300的canvas，且是红色的背景

可以通过`app.renderer`对象去重新设置画布的背景色、大小等
```javascript
//修改背景色
app.renderer.backgroundColor = 0x061639;

//设置大小
app.renderer.autoResize = true;
app.renderer.resize(512, 512);
```

## 舞台`app.stage`
所有元素都是放置在舞台上的。在PixiJs中，舞台即`app.stage`对象。
这里的舞台是场景中所有可见对象的根容器（所以`app.stage`拥有其它容器的所有属性和方法，更多容器的介绍见后续）。

## 精灵
精灵可以添加到任意容器中，包括舞台，因为舞台也是容器（根容器）。

创建精灵主要有以下三种方法：
- 用一个图像文件来创建
- 用一个雪碧图来创建
- 从一个纹理贴图集中创建。（用JSON定义了图像大小和位置的雪碧图）

由于WebGL是使用GPU去渲染图像的，所以需要将精灵元素转化成GPU可以处理的数据（可被GPU处理的图像称为纹理）。

### 用一个图像文件来创建

```javascript
//从纹理缓存中获取纹理（需要使用PIXI.loader加载，纹理缓存才会有数据）
let texture = PIXI.utils.TextureCache['./images/1.png'];

//创建一个精灵，将纹理作为参数传入
let sprite = new PIXI.Sprite(texture);
```

### 用一个雪碧图来创建



### 控制精灵
```javascript
//将精灵从容器中移除
app.stage.removeChild(sprite);


//将精灵隐藏（推荐）
sprite.visible = false;


//位置控制
sprite.x = 100;
sprite.y = 100;


//位置控制
sprite.position.set(x, y)


//大小控制
sprite.width = 100;
sprite.height = 100;


//比例控制（0.5即缩小一半）
sprite.scale.x = 0.5;
sprite.scale.y = 0.5;

//比例控制
cat.scale.set(x,y);


//旋转（基点默认从左上角）
cat.rotation = 0.5;


//基点设置（按比调整，其点移至中心）
cat.anchor.x = 0.5;
cat.anchor.y = 0.5;

//基点设置
cat.anchor.set(x,y);


//其点设置（按值调整）
cat.pivot.x = 32;
cat.pivot.y = 32;

cat.pivot.set(32,32);

```



## 容器
容器简单地可以理解为用于分组存储东西的空箱子。

```javascript
//声明一个容器
let container = new PIXI.Container();

//往容器中插入精灵
container.addChild(sprite);
```
> http://pixijs.download/release/docs/PIXI.Container.html


## 加载器`PIXI.loader`
Pixi的loader对象可以加载任何图像资源。

```javascript
PIXI.loader
    .add('./images/1.png')
    .add('./images/2.png')
    .load(()=>{
        console.log('加载完成');
        
        //从纹理缓存中获取纹理
        let resources1 = PIXI.loader.resources['./images/1.png'].texture,
            sprite1 = new PIXI.Sprite(resources1);
        
        //将精灵添加到舞台根容器
        app.stage.addChild(sprite1);
    });
```

### `PIXI.load.add`多种使用方式

```javascript
//参数传入一个数组（推荐）
PIXI.loader
    .add([
        './images/1.png',
        './images/2.png'
    ])；
```

```javascript
//指定别名（不推荐）
PIXI.loader
    .add('catImage','./images/1.png')
    .load(()=>{
        //使用别名获取缓存
        let cat = new PIXI.Sprite(PIXI.loader.resources.catImage.texture);
    });
```

```javascript
//正常语法
PIXI.loader
    .add('./images/1.png',()=>{
        console.log('1.png加载完成')
    })
    .add('./images/2.png',()=>{
        //...
    });
```

```javascript
//对象语法
.add({
    name:'key2',
    url:'http://...'
},()=>{})

.add({
    url:'http://...'
},()=>{})

.add({
    name:'key3',
    url:'http://...'
    onComplete:()=>{}
})

.add({
    url:'https://...',
    onComplete:()=>{},
    crossOrigin:true
})
```

```javascript
//链式加载
.add([
    {
        name:'key4',
        url:'http://...',
        onComplete:()=>{}
    },
    {
        url:'http://...',
        onComplete:()=>{}
    },
    'http://...'
]);
```
注意：如果需要重新加载一批文件，调用加载器`reset`方法，`PIXI.loader.reset()`;

Pixi加载器一些更高级特性，可以加载和解析所有类型二进制文件的选项。

> https://github.com/englercj/resource-loader


### 资源加载进程监视
可以使用加载器`progress`事件来得知资源加载进度。
这很有用，可以用来处理loading提示告诉用户资源加载情况。

```javascript
PIXI.loader
    .add([
        './images/1.png',
        './images/2.png'
    ])
    .on('progress',(loader,resource)=>{
        console.log(loader,resource);
    })
    .load(()=>{
        //...
    });
```






