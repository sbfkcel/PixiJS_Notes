//创建一个pixi应用
window.app = new PIXI.Application({
    width:300,                  //宽，默认800
    height:300,                 //高，默认600
    antialias:true,             //抗锯齿，默认false
    //transparent:true,           //背景透明，默认false
    resolution:1,               //屏幕密度，默认1
    backgroundColor:0xff0000    //背景颜色
});


//使用加载器加载资源
PIXI.loader
    .add([
        './images/1.jpg',
        './images/2.jpg',
        './images/3.jpg',
    ])
    .load(()=>{
        let resources = PIXI.loader.resources,          //已经加载的资源
            TextureCache = PIXI.utils.TextureCache,     //纹理缓存
            sprite1 = new PIXI.Sprite(                  //声明精灵
                resources['./images/1.jpg'].texture     //传入可被WebGL兼容的纹理缓存
            ),
            sprite2 = new PIXI.Sprite(
                //与上方相等
                TextureCache['./images/2.jpg']
            );
    
        
        
        let container = new PIXI.Container();
        container.addChild(sprite2);
        app.stage.addChild(container);
        
        //将精灵添加到舞台
        app.stage.addChild(sprite1);
        
        
        let x = 0,
            y = 0,
            w = sprite1.width,
            h = sprite1.height,
            r = 1,
            s = 1;
        
        //设置精灵锚点为中心anchor是按比来调整，pivot是按像素来调整
        sprite1.anchor.x = 0.5;
        sprite1.anchor.y = 0.5;
        
        setInterval(()=>{
            console.log(1)
            sprite1.x = x++;
            sprite1.y = y+=2;
            // sprite1.width = w++;
            // sprite1.height = h--;
            container.x = x;

            //缩放比
            sprite1.scale.x = s-=0.01;

            //旋转
            sprite1.rotation = 0.5;

        },500)
    
        //1000ms后从舞台中隐藏或移除精灵
        setTimeout(()=>{
            //移除
            //app.stage.removeChild(sprite1);
    
            //隐藏
            //sprite1.visible = false;
        },1000);
    });



//文件加载进度监听
PIXI.loader.on('progress',(loader,resource) => {
    //console.log(loader,resource)
});




//将app视图添加到页面
document.body.appendChild(app.view);



// let type = "WebGL"
// if(!PIXI.utils.isWebGLSupported()){
//   type = "canvas"
// }

// console.log(PIXI.utils.isWebGLSupported())

// PIXI.utils.sayHello(type)