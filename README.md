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
使用雪碧图来创建精灵有三个步骤
- 导入图片
- 圈出想显示的区域
- 创建精灵

```javascript
//从纹理缓存中获取纹理
let texture = PIXI.utils.TextureCache['./images/sprite.png'],
//创建一个矩形。参数（x,y,width,height）
    rectangle = new PIXI.Rectangle(0,32,32,32);

//设置纹理使用矩形部分（相当于使用绘制的矩形圈出需要显示的部分）
texture.frame = rectangle;

//创建精灵
let tiger = new PIXI.Sprite(texture);
```

### 使用纹理图集来创建
纹理图集由一个JSON文件和一张雪碧图构成，JSON文件包括了每一个子图像的大小及位置信息。

Texture Packer 是一个纹理贴图制作工具（基本功能免费）。
- 选择"JSON Hash"类型
- 图片拖至工作区
- "Algorithm"设置为`Basic`
- "Trim mode"设置为`None`
- "Extrude"设置为`0`
- "Size constraints"设置为`Any size`
- "PNG Opt Level"设置为`0`
- 最后点击"Publish"按钮，将会得到一个`.json`和一张精灵图文件

`fws pixiSprite` 任务也可创建一个纹理贴图，在对应的图片目录中执行即可。

其它相关工具：
!(Shoebox)[https://github.com/Zainking/learningPixi]
!(spritesheet.js)[https://github.com/krzysztof-o/spritesheet.js]

```javascript
PIXI.loader
    //加载图集数据文件
    .add('./images/tuji.json)
    .load(()=>{
        //从纹理缓存中获取纹理
        let id = PIXI.loader.resources['./images/tuji.json'].textures,
            Sprite = PIXI.Sprite,
            
            //创建精灵
            dungeon = new Sprite(id['dungeon.png']);
            
        //插入dungeon精灵到舞台
        app.stage.addChild(dungeon);
        
    });
```

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

Pixi自带了一个轮循执行器，很好用。该轮循器每秒执行60次，参数`delta`代表帧的部分的延迟，这样就可以让精灵移动的速度与帧率无关。

```javascript
app.ticker.add(delta => {
    cat.x += delta;
});
```

当然你也可以直接使用`requestAnimationFrame`取代`app.ticker`。

```javascript
function gameLoop(){
    requestAnimationFrame(gameLoop);
    cat.x += 1;
};
gameLoop();
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
        console.log('加载完成');
    });
```


## 图层
Pixi-layers.js 可以很方便地管理控制图层。

如果有多个元素需要同时控制层级顺序，建议使用组的形式，以提高性能。

```html
<srcipt src="./js/pixi-layers.js"></script>
```

```javascript
const app = new PIXI.Application();
document.body.appendChild(app.view);

const loader = PIXI.loader,
    Stage = PIXI.display.Stage,
    Layer = PIXI.display.Layer,
    Group = PIXI.display.Group,
    Texture = PIXI.Texture,
    Container = PIXI.Container,
    Sprite = PIXI.Sprite;

// 将场景设置为可支持图层的新场景，并启用组排序
app.stage = new Stage();
app.stage.group.enableSort = true;

// 加载资源
loader.add([
    {
        name:'a',
        url:'./images/emoji/a.png'
    },
    {
        name:'b',
        url:'./images/emoji/b.png'
    }
]);

// 创建两个分组，并设置为可允许调整排序
let group1 = new Group(2,true),
    group2 = new Group(1,true);

// 将组添加到场景
app.stage.addChild(new Layer(group1));
app.stage.addChild(new Layer(group2));

let sprites = {
        a:[],
        b:[]
    },
    w = 64,
    h = 64,
    setup = (loader,resource)=>{
        // loader，进度；resource，加载的缓存
        let t = 100;
        for(let i=0; i<5; i++){
            sprites.a[i] = new Sprite(resource.a.texture);

            sprites.a[i].width = w;
            sprites.a[i].height = h;
            sprites.a[i].x = w * (i * 0.5);
            sprites.a[i].y = h * (i * 0.5);

            // 设置其排序（增序），zOrder（降序）
            sprites.a[i].zIndex = i;

            // 设置所属分组
            sprites.a[i].parentGroup = group1;
            app.stage.addChild(sprites.a[i]);

            let blurFilter = new PIXI.filters.BlurFilter(),
                gr = new Sprite(resource.b.texture);

            blurFilter.blur = 0.5;
            gr.filters = [blurFilter];

            gr.parentGroup = group2;
            sprites.a[i].addChild(gr)

        };

        // 500ms后逐个排序
        let tIndex = 0,
            temp = setInterval(()=>{
                sprites.a[tIndex].zIndex = t - tIndex;
                tIndex++;

                if(tIndex >= sprites.a.length){
                    clearInterval(temp);
                    console.log('排序调整完成');
                };
            },500,()=>{
                // sprites.a[tIndex].zOrder = -1000;
            });
    };
loader.load(setup);
```

当然图层较少也可以不使用分组。

```javascript
const app = new PIXI.Application(),
    loader = PIXI.loader,
    Stage = PIXI.display.Stage,
    Layer = PIXI.display.Layer,
    Group = PIXI.display.Group,
    Texture = PIXI.Texture,
    Container = PIXI.Container,

    Sprite = PIXI.Sprite;

document.body.appendChild(app.view);

// 将场景设置为可支持图层的新场景，并启用组排序
app.stage = new Stage();
app.stage.group.enableSort = true;

loader.add([
    {
        name:'a',
        url:'./images/emoji/a.png'
    },
    {
        name:'b',
        url:'./images/emoji/b.png'
    }
]);

let sprites = {
        a:[],
        b:[]
    },
    w = 64,
    h = 64,
    setup = (loader,resource)=>{
        // 创建一个图层，启用排序并添加到舞台
        let layer = new Layer();
        layer.group.enableSort = true;
        app.stage.addChild(layer);

        for(let i=0,len=5; i<len; i++){
            // 创建精灵，并指定精灵所属层级
            sprites.a[i] = new Sprite(resource.a.texture);
            sprites.a[i].parentLayer = layer;

            // 设置精灵宽高，层级
            sprites.a[i].width = w;
            sprites.a[i].height = h;
            sprites.a[i].x = w * (i * 0.5);
            sprites.a[i].zIndex = i;

            // 将精灵添加至舞台
            app.stage.addChild(sprites.a[i]);
        };

        let tIndex = 0,
            temp = setInterval(()=>{
                sprites.a[tIndex].zIndex = 100 - tIndex;
                tIndex++;

                if(tIndex >= sprites.a.length){
                    clearInterval(temp);
                    console.log('排序调整完成');
                };
            },500);
    };
loader.load(setup);
```




http://www.werun.cn/index/pixi/zpcj.html
http://www.werun.cn/index/pixi/suanpan.html