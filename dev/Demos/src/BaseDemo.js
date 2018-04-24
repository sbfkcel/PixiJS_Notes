(function () {
'use strict';

var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var BaseDemo = /** @class */ (function (_super) {
    __extends(BaseDemo, _super);
    function BaseDemo() {
        var _this = _super.call(this) || this;
        _this._renderer = new PIXI.WebGLRenderer(1136, 640);
        _this._background = new PIXI.Sprite(PIXI.Texture.EMPTY);
        _this._resources = [];
        _this._renderer.backgroundColor = 0x666666;
        _this._resources.push(BaseDemo.BACKGROUND_URL);
        document.body.appendChild(_this._renderer.view);
        //
        setTimeout(function () {
            _this.x = _this.stageWidth * 0.5;
            _this.y = _this.stageHeight * 0.5;
            _this._loadResources();
        }, 10);
        return _this;
    }
    BaseDemo.prototype._renderHandler = function (deltaTime) {
        this._renderer.render(this);
    };
    BaseDemo.prototype._startRenderTick = function () {
        PIXI.ticker.shared.add(this._renderHandler, this);
    };
    BaseDemo.prototype._loadResources = function () {
        var _this = this;
        var binaryOptions = { loadType: PIXI.loaders.Resource.LOAD_TYPE.XHR, xhrType: PIXI.loaders.Resource.XHR_RESPONSE_TYPE.BUFFER };
        for (var _i = 0, _a = this._resources; _i < _a.length; _i++) {
            var resource = _a[_i];
            if (resource.indexOf("dbbin") > 0) {
                PIXI.loader.add(resource, resource, binaryOptions);
            }
            else {
                PIXI.loader.add(resource, resource);
            }
        }
        PIXI.loader.once("complete", function (loader, resources) {
            _this._pixiResources = resources;
            //
            _this._background.texture = _this._pixiResources[BaseDemo.BACKGROUND_URL].texture;
            _this._background.x = -_this._background.texture.width * 0.5;
            _this._background.y = -_this._background.texture.height * 0.5;
            _this.addChild(_this._background);
            //
            _this._onStart();
            _this._startRenderTick(); // Make sure render after dragonBones update.
        });
        PIXI.loader.load();
    };
    BaseDemo.prototype.createText = function (string) {
        var text = new PIXI.Text(string, { align: "center" });
        text.text = string;
        text.scale.x = 0.7;
        text.scale.y = 0.7;
        text.x = -text.width * 0.5;
        text.y = this.stageHeight * 0.5 - 100.0;
        this.addChild(text);
        return text;
    };
    Object.defineProperty(BaseDemo.prototype, "stageWidth", {
        get: function () {
            return this._renderer.width;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseDemo.prototype, "stageHeight", {
        get: function () {
            return this._renderer.height;
        },
        enumerable: true,
        configurable: true
    });
    BaseDemo.BACKGROUND_URL = "resource/background.png";
    return BaseDemo;
}(PIXI.Container));

}());
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZURlbW8udHMiLCJzb3VyY2VzIjpbIkJhc2VEZW1vLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImFic3RyYWN0IGNsYXNzIEJhc2VEZW1vIGV4dGVuZHMgUElYSS5Db250YWluZXIge1xuICAgIHByaXZhdGUgc3RhdGljIEJBQ0tHUk9VTkRfVVJMOiBzdHJpbmcgPSBcInJlc291cmNlL2JhY2tncm91bmQucG5nXCI7XG4gICAgcHJvdGVjdGVkIHJlYWRvbmx5IF9yZW5kZXJlciA9IG5ldyBQSVhJLldlYkdMUmVuZGVyZXIoMTEzNiwgNjQwKTtcbiAgICBwcm90ZWN0ZWQgcmVhZG9ubHkgX2JhY2tncm91bmQ6IFBJWEkuU3ByaXRlID0gbmV3IFBJWEkuU3ByaXRlKFBJWEkuVGV4dHVyZS5FTVBUWSk7XG4gICAgcHJvdGVjdGVkIHJlYWRvbmx5IF9yZXNvdXJjZXM6IHN0cmluZ1tdID0gW107XG4gICAgcHJvdGVjdGVkIF9waXhpUmVzb3VyY2VzOiBkcmFnb25Cb25lcy5NYXA8UElYSS5sb2FkZXJzLlJlc291cmNlPjtcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLl9yZW5kZXJlci5iYWNrZ3JvdW5kQ29sb3IgPSAweDY2NjY2NjtcbiAgICAgICAgdGhpcy5fcmVzb3VyY2VzLnB1c2goQmFzZURlbW8uQkFDS0dST1VORF9VUkwpO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuX3JlbmRlcmVyLnZpZXcpO1xuICAgICAgICAvL1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMueCA9IHRoaXMuc3RhZ2VXaWR0aCAqIDAuNTtcbiAgICAgICAgICAgIHRoaXMueSA9IHRoaXMuc3RhZ2VIZWlnaHQgKiAwLjU7XG4gICAgICAgICAgICB0aGlzLl9sb2FkUmVzb3VyY2VzKCk7XG4gICAgICAgIH0sIDEwKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgYWJzdHJhY3QgX29uU3RhcnQoKTogdm9pZDtcblxuICAgIHByb3RlY3RlZCBfcmVuZGVySGFuZGxlcihkZWx0YVRpbWU6IG51bWJlcik6IHZvaWQge1xuICAgICAgICB0aGlzLl9yZW5kZXJlci5yZW5kZXIodGhpcyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIF9zdGFydFJlbmRlclRpY2soKTogdm9pZCB7XG4gICAgICAgIFBJWEkudGlja2VyLnNoYXJlZC5hZGQodGhpcy5fcmVuZGVySGFuZGxlciwgdGhpcyk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIF9sb2FkUmVzb3VyY2VzKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBiaW5hcnlPcHRpb25zID0geyBsb2FkVHlwZTogUElYSS5sb2FkZXJzLlJlc291cmNlLkxPQURfVFlQRS5YSFIsIHhoclR5cGU6IFBJWEkubG9hZGVycy5SZXNvdXJjZS5YSFJfUkVTUE9OU0VfVFlQRS5CVUZGRVIgfTtcblxuICAgICAgICBmb3IgKGNvbnN0IHJlc291cmNlIG9mIHRoaXMuX3Jlc291cmNlcykge1xuICAgICAgICAgICAgaWYgKHJlc291cmNlLmluZGV4T2YoXCJkYmJpblwiKSA+IDApIHtcbiAgICAgICAgICAgICAgICBQSVhJLmxvYWRlci5hZGQocmVzb3VyY2UsIHJlc291cmNlLCBiaW5hcnlPcHRpb25zIGFzIGFueSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBQSVhJLmxvYWRlci5hZGQocmVzb3VyY2UsIHJlc291cmNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIFBJWEkubG9hZGVyLm9uY2UoXCJjb21wbGV0ZVwiLCAobG9hZGVyOiBQSVhJLmxvYWRlcnMuTG9hZGVyLCByZXNvdXJjZXM6IGRyYWdvbkJvbmVzLk1hcDxQSVhJLmxvYWRlcnMuUmVzb3VyY2U+KSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9waXhpUmVzb3VyY2VzID0gcmVzb3VyY2VzO1xuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIHRoaXMuX2JhY2tncm91bmQudGV4dHVyZSA9IHRoaXMuX3BpeGlSZXNvdXJjZXNbQmFzZURlbW8uQkFDS0dST1VORF9VUkxdLnRleHR1cmU7XG4gICAgICAgICAgICB0aGlzLl9iYWNrZ3JvdW5kLnggPSAtdGhpcy5fYmFja2dyb3VuZC50ZXh0dXJlLndpZHRoICogMC41O1xuICAgICAgICAgICAgdGhpcy5fYmFja2dyb3VuZC55ID0gLXRoaXMuX2JhY2tncm91bmQudGV4dHVyZS5oZWlnaHQgKiAwLjU7XG4gICAgICAgICAgICB0aGlzLmFkZENoaWxkKHRoaXMuX2JhY2tncm91bmQpO1xuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIHRoaXMuX29uU3RhcnQoKTtcbiAgICAgICAgICAgIHRoaXMuX3N0YXJ0UmVuZGVyVGljaygpOyAvLyBNYWtlIHN1cmUgcmVuZGVyIGFmdGVyIGRyYWdvbkJvbmVzIHVwZGF0ZS5cbiAgICAgICAgfSk7XG4gICAgICAgIFBJWEkubG9hZGVyLmxvYWQoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgY3JlYXRlVGV4dChzdHJpbmc6IHN0cmluZyk6IFBJWEkuVGV4dCB7XG4gICAgICAgIGNvbnN0IHRleHQgPSBuZXcgUElYSS5UZXh0KHN0cmluZywgeyBhbGlnbjogXCJjZW50ZXJcIiB9KTtcbiAgICAgICAgdGV4dC50ZXh0ID0gc3RyaW5nO1xuICAgICAgICB0ZXh0LnNjYWxlLnggPSAwLjc7XG4gICAgICAgIHRleHQuc2NhbGUueSA9IDAuNztcbiAgICAgICAgdGV4dC54ID0gLSB0ZXh0LndpZHRoICogMC41O1xuICAgICAgICB0ZXh0LnkgPSB0aGlzLnN0YWdlSGVpZ2h0ICogMC41IC0gMTAwLjA7XG4gICAgICAgIHRoaXMuYWRkQ2hpbGQodGV4dCk7XG5cbiAgICAgICAgcmV0dXJuIHRleHQ7XG4gICAgfVxuXG4gICAgcHVibGljIGdldCBzdGFnZVdpZHRoKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZW5kZXJlci53aWR0aDtcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IHN0YWdlSGVpZ2h0KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yZW5kZXJlci5oZWlnaHQ7XG4gICAgfVxufSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7SUFBZ0MsNEJBQWM7SUFPMUM7UUFBQSxZQUNJLGlCQUFPLFNBV1Y7UUFqQmtCLGVBQVMsR0FBRyxJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzlDLGlCQUFXLEdBQWdCLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQy9ELGdCQUFVLEdBQWEsRUFBRSxDQUFDO1FBTXpDLEtBQUksQ0FBQyxTQUFTLENBQUMsZUFBZSxHQUFHLFFBQVEsQ0FBQztRQUMxQyxLQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDOUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7UUFFL0MsVUFBVSxDQUFDO1lBQ1AsS0FBSSxDQUFDLENBQUMsR0FBRyxLQUFJLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQztZQUMvQixLQUFJLENBQUMsQ0FBQyxHQUFHLEtBQUksQ0FBQyxXQUFXLEdBQUcsR0FBRyxDQUFDO1lBQ2hDLEtBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztTQUN6QixFQUFFLEVBQUUsQ0FBQyxDQUFDOztLQUNWO0lBSVMsaUNBQWMsR0FBeEIsVUFBeUIsU0FBaUI7UUFDdEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDL0I7SUFFUyxtQ0FBZ0IsR0FBMUI7UUFDSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGNB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