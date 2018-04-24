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
var DragonBonesEvent = /** @class */ (function (_super) {
    __extends(DragonBonesEvent, _super);
    function DragonBonesEvent() {
        var _this = _super.call(this) || this;
        _this._resources.push("resource/mecha_1004d/mecha_1004d_ske.json", "resource/mecha_1004d/mecha_1004d_tex.json", "resource/mecha_1004d/mecha_1004d_tex.png");
        return _this;
    }
    DragonBonesEvent.prototype._onStart = function () {
        var _this = this;
        var factory = dragonBones.PixiFactory.factory;
        factory.parseDragonBonesData(this._pixiResources["resource/mecha_1004d/mecha_1004d_ske.json"].data);
        factory.parseTextureAtlasData(this._pixiResources["resource/mecha_1004d/mecha_1004d_tex.json"].data, this._pixiResources["resource/mecha_1004d/mecha_1004d_tex.png"].texture);
        factory.soundEventManager.on(dragonBones.EventObject.SOUND_EVENT, this._soundEventHandler, this);
        this._armatureDisplay = factory.buildArmatureDisplay("mecha_1004d");
        this._armatureDisplay.on(dragonBones.EventObject.COMPLETE, this._animationEventHandler, this);
        this._armatureDisplay.animation.play("walk");
        this._armatureDisplay.x = 0.0;
        this._armatureDisplay.y = 100.0;
        this.addChild(this._armatureDisplay);
        //
        this.interactive = true;
        var touchHandler = function () {
            _this._armatureDisplay.animation.fadeIn("skill_03", 0.2);
        };
        this.addListener("mousedown", touchHandler, this);
        this.addListener("touchstart", touchHandler, this);
        //
        this.createText("Touch to play animation.");
    };
    DragonBonesEvent.prototype._soundEventHandler = function (event) {
        console.log(event.name);
    };
    DragonBonesEvent.prototype._animationEventHandler = function (event) {
        if (event.animationState.name === "skill_03") {
            this._armatureDisplay.animation.fadeIn("walk", 0.2);
        }
    };
    return DragonBonesEvent;
}(BaseDemo));

}());
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRHJhZ29uQm9uZXNFdmVudC50cyIsInNvdXJjZXMiOlsiRHJhZ29uQm9uZXNFdmVudC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBEcmFnb25Cb25lc0V2ZW50IGV4dGVuZHMgQmFzZURlbW8ge1xuICAgIHByaXZhdGUgX2FybWF0dXJlRGlzcGxheTogZHJhZ29uQm9uZXMuUGl4aUFybWF0dXJlRGlzcGxheTtcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLl9yZXNvdXJjZXMucHVzaChcbiAgICAgICAgICAgIFwicmVzb3VyY2UvbWVjaGFfMTAwNGQvbWVjaGFfMTAwNGRfc2tlLmpzb25cIixcbiAgICAgICAgICAgIFwicmVzb3VyY2UvbWVjaGFfMTAwNGQvbWVjaGFfMTAwNGRfdGV4Lmpzb25cIixcbiAgICAgICAgICAgIFwicmVzb3VyY2UvbWVjaGFfMTAwNGQvbWVjaGFfMTAwNGRfdGV4LnBuZ1wiXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIF9vblN0YXJ0KCk6IHZvaWQge1xuICAgICAgICBjb25zdCBmYWN0b3J5ID0gZHJhZ29uQm9uZXMuUGl4aUZhY3RvcnkuZmFjdG9yeTtcbiAgICAgICAgZmFjdG9yeS5wYXJzZURyYWdvbkJvbmVzRGF0YSh0aGlzLl9waXhpUmVzb3VyY2VzW1wicmVzb3VyY2UvbWVjaGFfMTAwNGQvbWVjaGFfMTAwNGRfc2tlLmpzb25cIl0uZGF0YSk7XG4gICAgICAgIGZhY3RvcnkucGFyc2VUZXh0dXJlQXRsYXNEYXRhKHRoaXMuX3BpeGlSZXNvdXJjZXNbXCJyZXNvdXJjZS9tZWNoYV8xMDA0ZC9tZWNoYV8xMDA0ZF90ZXguanNvblwiXS5kYXRhLCB0aGlzLl9waXhpUmVzb3VyY2VzW1wicmVzb3VyY2UvbWVjaGFfMTAwNGQvbWVjaGFfMTAwNGRfdGV4LnBuZ1wiXS50ZXh0dXJlKTtcbiAgICAgICAgZmFjdG9yeS5zb3VuZEV2ZW50TWFuYWdlci5vbihkcmFnb25Cb25lcy5FdmVudE9iamVjdC5TT1VORF9FVkVOVCwgdGhpcy5fc291bmRFdmVudEhhbmRsZXIsIHRoaXMpO1xuXG4gICAgICAgIHRoaXMuX2FybWF0dXJlRGlzcGxheSA9IGZhY3RvcnkuYnVpbGRBcm1hdHVyZURpc3BsYXkoXCJtZWNoYV8xMDA0ZFwiKTtcbiAgICAgICAgdGhpcy5fYXJtYXR1cmVEaXNwbGF5Lm9uKGRyYWdvbkJvbmVzLkV2ZW50T2JqZWN0LkNPTVBMRVRFLCB0aGlzLl9hbmltYXRpb25FdmVudEhhbmRsZXIsIHRoaXMpO1xuICAgICAgICB0aGlzLl9hcm1hdHVyZURpc3BsYXkuYW5pbWF0aW9uLnBsYXkoXCJ3YWxrXCIpO1xuXG4gICAgICAgIHRoaXMuX2FybWF0dXJlRGlzcGxheS54ID0gMC4wO1xuICAgICAgICB0aGlzLl9hcm1hdHVyZURpc3BsYXkueSA9IDEwMC4wO1xuICAgICAgICB0aGlzLmFkZENoaWxkKHRoaXMuX2FybWF0dXJlRGlzcGxheSk7XG4gICAgICAgIC8vXG4gICAgICAgIHRoaXMuaW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgICAgICBjb25zdCB0b3VjaEhhbmRsZXIgPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9hcm1hdHVyZURpc3BsYXkuYW5pbWF0aW9uLmZhZGVJbihcInNraWxsXzAzXCIsIDAuMik7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuYWRkTGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgdG91Y2hIYW5kbGVyLCB0aGlzKTtcbiAgICAgICAgdGhpcy5hZGRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgdG91Y2hIYW5kbGVyLCB0aGlzKTtcbiAgICAgICAgLy9cbiAgICAgICAgdGhpcy5jcmVhdGVUZXh0KFwiVG91Y2ggdG8gcGxheSBhbmltYXRpb24uXCIpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3NvdW5kRXZlbnRIYW5kbGVyKGV2ZW50OiBkcmFnb25Cb25lcy5FdmVudE9iamVjdCk6IHZvaWQge1xuICAgICAgICBjb25zb2xlLmxvZyhldmVudC5uYW1lKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9hbmltYXRpb25FdmVudEhhbmRsZXIoZXZlbnQ6IGRyYWdvbkJvbmVzLkV2ZW50T2JqZWN0KTogdm9pZCB7XG4gICAgICAgIGlmIChldmVudC5hbmltYXRpb25TdGF0ZS5uYW1lID09PSBcInNraWxsXzAzXCIpIHtcbiAgICAgICAgICAgIHRoaXMuX2FybWF0dXJlRGlzcGxheS5hbmltYXRpb24uZmFkZUluKFwid2Fsa1wiLCAwLjIpO1xuICAgICAgICB9XG4gICAgfVxufSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7SUFBK0Isb0NBQVE7SUFHbkM7UUFBQSxZQUNJLGlCQUFPLFNBT1Y7UUFMRyxLQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FDaEIsMkNBQTJDLEVBQzNDLDJDQUEyQyxFQUMzQywwQ0FBMEMsQ0FDN0MsQ0FBQzs7S0FDTDtJQUVTLG1DQUFRLEdBQWxCO1FBQUEsaUJBc0JDO1FBckJHLElBQU0sT0FBTyxHQUFHLFdBQVcsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDO1FBQ2hELE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLDJDQUEyQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDcEcsT0FBTyxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsMkNBQTJDLENBQUMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQywwQ0FBMEMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzlLLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixFQUFFLElBQUksQ0FBQyxDQUFDO1FBRWpHLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxPQUFPLENBQUMsb0JBQW9CLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDcEUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsc0JBQXNCLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDOUYsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFN0MsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDOUIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDaEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQzs7UUFFckMsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFDeEIsSUFBTSxZQUFZLEdBQUc7WUFDakIsS0FBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQzNELENBQUM7UUFDRixJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDOztRQUVuRCxJQUFJLENBQUMsVUFBVSxDQUFDLDBCQUEwQixDQUFDLENBQUM7S0FDL0M7SUFFTyw2Q0FBa0IsR0FBMUIsVUFBMkIsS0FBOEI7UUFDckQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDM0I7SUFFTyxpREFBc0IsR0FBOUIsVUFBK0IsS0FBOEI7UUFDekQsSUFBSSxLQUFLLENBQUMsY0FBYyxDQUFDLElBQUksS0FBSyxVQUFVLEVBQUU7WUFDMUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQ3ZEO0tBQ0o7SUFDTCx1QkFBQztDQUFBLENBOUM4QixRQUFRLEdBOEN0Qzs7OzsifQ==