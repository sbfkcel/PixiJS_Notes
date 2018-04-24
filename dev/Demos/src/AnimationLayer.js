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
var AnimationLayer = /** @class */ (function (_super) {
    __extends(AnimationLayer, _super);
    function AnimationLayer() {
        var _this = _super.call(this) || this;
        _this._resources.push("resource/mecha_1004d/mecha_1004d_ske.json", "resource/mecha_1004d/mecha_1004d_tex.json", "resource/mecha_1004d/mecha_1004d_tex.png");
        return _this;
    }
    AnimationLayer.prototype._onStart = function () {
        var factory = dragonBones.PixiFactory.factory;
        factory.parseDragonBonesData(this._pixiResources["resource/mecha_1004d/mecha_1004d_ske.json"].data);
        factory.parseTextureAtlasData(this._pixiResources["resource/mecha_1004d/mecha_1004d_tex.json"].data, this._pixiResources["resource/mecha_1004d/mecha_1004d_tex.png"].texture);
        this._armatureDisplay = factory.buildArmatureDisplay("mecha_1004d");
        this._armatureDisplay.on(dragonBones.EventObject.LOOP_COMPLETE, this._animationEventHandler, this);
        this._armatureDisplay.animation.play("walk");
        this._armatureDisplay.x = 0.0;
        this._armatureDisplay.y = 100.0;
        this.addChild(this._armatureDisplay);
    };
    AnimationLayer.prototype._animationEventHandler = function (event) {
        var attackState = this._armatureDisplay.animation.getState("attack_01");
        if (!attackState) {
            attackState = this._armatureDisplay.animation.fadeIn("attack_01", 0.1, 1, 1);
            attackState.resetToPose = false;
            attackState.autoFadeOutTime = 0.1;
            attackState.addBoneMask("chest");
            attackState.addBoneMask("effect_l");
            attackState.addBoneMask("effect_r");
        }
    };
    return AnimationLayer;
}(BaseDemo));

}());
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQW5pbWF0aW9uTGF5ZXIudHMiLCJzb3VyY2VzIjpbIkFuaW1hdGlvbkxheWVyLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImNsYXNzIEFuaW1hdGlvbkxheWVyIGV4dGVuZHMgQmFzZURlbW8ge1xuICAgIHByaXZhdGUgX2FybWF0dXJlRGlzcGxheTogZHJhZ29uQm9uZXMuUGl4aUFybWF0dXJlRGlzcGxheTtcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLl9yZXNvdXJjZXMucHVzaChcbiAgICAgICAgICAgIFwicmVzb3VyY2UvbWVjaGFfMTAwNGQvbWVjaGFfMTAwNGRfc2tlLmpzb25cIixcbiAgICAgICAgICAgIFwicmVzb3VyY2UvbWVjaGFfMTAwNGQvbWVjaGFfMTAwNGRfdGV4Lmpzb25cIixcbiAgICAgICAgICAgIFwicmVzb3VyY2UvbWVjaGFfMTAwNGQvbWVjaGFfMTAwNGRfdGV4LnBuZ1wiXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIF9vblN0YXJ0KCk6IHZvaWQge1xuICAgICAgICBjb25zdCBmYWN0b3J5ID0gZHJhZ29uQm9uZXMuUGl4aUZhY3RvcnkuZmFjdG9yeTtcbiAgICAgICAgZmFjdG9yeS5wYXJzZURyYWdvbkJvbmVzRGF0YSh0aGlzLl9waXhpUmVzb3VyY2VzW1wicmVzb3VyY2UvbWVjaGFfMTAwNGQvbWVjaGFfMTAwNGRfc2tlLmpzb25cIl0uZGF0YSk7XG4gICAgICAgIGZhY3RvcnkucGFyc2VUZXh0dXJlQXRsYXNEYXRhKHRoaXMuX3BpeGlSZXNvdXJjZXNbXCJyZXNvdXJjZS9tZWNoYV8xMDA0ZC9tZWNoYV8xMDA0ZF90ZXguanNvblwiXS5kYXRhLCB0aGlzLl9waXhpUmVzb3VyY2VzW1wicmVzb3VyY2UvbWVjaGFfMTAwNGQvbWVjaGFfMTAwNGRfdGV4LnBuZ1wiXS50ZXh0dXJlKTtcblxuICAgICAgICB0aGlzLl9hcm1hdHVyZURpc3BsYXkgPSBmYWN0b3J5LmJ1aWxkQXJtYXR1cmVEaXNwbGF5KFwibWVjaGFfMTAwNGRcIik7XG4gICAgICAgIHRoaXMuX2FybWF0dXJlRGlzcGxheS5vbihkcmFnb25Cb25lcy5FdmVudE9iamVjdC5MT09QX0NPTVBMRVRFLCB0aGlzLl9hbmltYXRpb25FdmVudEhhbmRsZXIsIHRoaXMpO1xuICAgICAgICB0aGlzLl9hcm1hdHVyZURpc3BsYXkuYW5pbWF0aW9uLnBsYXkoXCJ3YWxrXCIpO1xuXG4gICAgICAgIHRoaXMuX2FybWF0dXJlRGlzcGxheS54ID0gMC4wO1xuICAgICAgICB0aGlzLl9hcm1hdHVyZURpc3BsYXkueSA9IDEwMC4wO1xuICAgICAgICB0aGlzLmFkZENoaWxkKHRoaXMuX2FybWF0dXJlRGlzcGxheSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfYW5pbWF0aW9uRXZlbnRIYW5kbGVyKGV2ZW50OiBkcmFnb25Cb25lcy5FdmVudE9iamVjdCk6IHZvaWQge1xuICAgICAgICBsZXQgYXR0YWNrU3RhdGUgPSB0aGlzLl9hcm1hdHVyZURpc3BsYXkuYW5pbWF0aW9uLmdldFN0YXRlKFwiYXR0YWNrXzAxXCIpO1xuICAgICAgICBpZiAoIWF0dGFja1N0YXRlKSB7XG4gICAgICAgICAgICBhdHRhY2tTdGF0ZSA9IHRoaXMuX2FybWF0dXJlRGlzcGxheS5hbmltYXRpb24uZmFkZUluKFwiYXR0YWNrXzAxXCIsIDAuMSwgMSwgMSk7XG4gICAgICAgICAgICBhdHRhY2tTdGF0ZS5yZXNldFRvUG9zZSA9IGZhbHNlO1xuICAgICAgICAgICAgYXR0YWNrU3RhdGUuYXV0b0ZhZGVPdXRUaW1lID0gMC4xO1xuICAgICAgICAgICAgYXR0YWNrU3RhdGUuYWRkQm9uZU1hc2soXCJjaGVzdFwiKTtcbiAgICAgICAgICAgIGF0dGFja1N0YXRlLmFkZEJvbmVNYXNrKFwiZWZmZWN0X2xcIik7XG4gICAgICAgICAgICBhdHRhY2tTdGF0ZS5hZGRCb25lTWFzayhcImVmZmVjdF9yXCIpO1xuICAgICAgICB9XG4gICAgfVxufSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7SUFBNkIsa0NBQVE7SUFHakM7UUFBQSxZQUNJLGlCQUFPLFNBT1Y7UUFMRyxLQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FDaEIsMkNBQTJDLEVBQzNDLDJDQUEyQyxFQUMzQywwQ0FBMEMsQ0FDN0MsQ0FBQzs7S0FDTDtJQUVTLGlDQUFRLEdBQWxCO1FBQ0ksSUFBTSxPQUFPLEdBQUcsV0FBVyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUM7UUFDaEQsT0FBTyxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsMkNBQTJDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwRyxPQUFPLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQywyQ0FBMkMsQ0FBQyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLDBDQUEwQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFOUssSUFBSSxDQUFDLGdCQUFnQixHQUFHLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNwRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNuRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUU3QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUM5QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUNoQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0tBQ3hDO0lBRU8sK0NBQXNCLEdBQTlCLFVBQStCLEtBQThCO1FBQ3pELElBQUksV0FBVyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3hFLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDZCxXQUFXLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsV0FBVyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDN0UsV0FBVyxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7WUFDaEMsV0FBVyxDQUFDLGVBQWUsR0FBRyxHQUFHLENBQUM7WUFDbEMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNqQyxXQUFXLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3BDLFdBQVcsQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7U0FDdkM7S0FDSjtJQUNMLHFCQUFDO0NBQUEsQ0F0QzRCLFFBQVEsR0FzQ3BDOzs7OyJ9