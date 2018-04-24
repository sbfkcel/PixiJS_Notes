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
var AnimationBase = /** @class */ (function (_super) {
    __extends(AnimationBase, _super);
    function AnimationBase() {
        var _this = _super.call(this) || this;
        _this._isTouched = false;
        _this._resources.push("resource/progress_bar/progress_bar_ske.json", "resource/progress_bar/progress_bar_tex.json", "resource/progress_bar/progress_bar_tex.png");
        return _this;
    }
    AnimationBase.prototype._onStart = function () {
        var factory = dragonBones.PixiFactory.factory;
        factory.parseDragonBonesData(this._pixiResources["resource/progress_bar/progress_bar_ske.json"].data);
        factory.parseTextureAtlasData(this._pixiResources["resource/progress_bar/progress_bar_tex.json"].data, this._pixiResources["resource/progress_bar/progress_bar_tex.png"].texture);
        //
        this._armatureDisplay = factory.buildArmatureDisplay("progress_bar");
        this._armatureDisplay.x = 0.0;
        this._armatureDisplay.y = 0.0;
        this.addChild(this._armatureDisplay);
        // Add animation event listener.
        this._armatureDisplay.on(dragonBones.EventObject.START, this._animationEventHandler, this);
        this._armatureDisplay.on(dragonBones.EventObject.LOOP_COMPLETE, this._animationEventHandler, this);
        this._armatureDisplay.on(dragonBones.EventObject.COMPLETE, this._animationEventHandler, this);
        this._armatureDisplay.on(dragonBones.EventObject.FADE_IN, this._animationEventHandler, this);
        this._armatureDisplay.on(dragonBones.EventObject.FADE_IN_COMPLETE, this._animationEventHandler, this);
        this._armatureDisplay.on(dragonBones.EventObject.FADE_OUT, this._animationEventHandler, this);
        this._armatureDisplay.on(dragonBones.EventObject.FADE_OUT_COMPLETE, this._animationEventHandler, this);
        this._armatureDisplay.on(dragonBones.EventObject.FRAME_EVENT, this._animationEventHandler, this);
        this._armatureDisplay.animation.play("idle");
        //
        this.interactive = true;
        this.addListener("touchstart", this._touchHandler, this);
        this.addListener("touchend", this._touchHandler, this);
        this.addListener("touchmove", this._touchHandler, this);
        this.addListener("mousedown", this._touchHandler, this);
        this.addListener("mouseup", this._touchHandler, this);
        this.addListener("mousemove", this._touchHandler, this);
        //
        this.createText("Touch to control animation play progress.");
    };
    AnimationBase.prototype._touchHandler = function (event) {
        var progress = Math.min(Math.max((event.data.global.x - this.x + 300.0) / 600.0, 0.0), 1.0);
        switch (event.type) {
            case "touchstart":
            case "mousedown":
                this._isTouched = true;
                this._armatureDisplay.animation.gotoAndStopByProgress("idle", progress);
                break;
            case "touchend":
            case "mouseup":
                this._isTouched = false;
                this._armatureDisplay.animation.play();
                break;
            case "touchmove":
            case "mousemove":
                if (this._isTouched) {
                    var animationState = this._armatureDisplay.animation.getState("idle");
                    if (animationState) {
                        animationState.currentTime = animationState.totalTime * progress;
                    }
                }
                break;
        }
    };
    AnimationBase.prototype._animationEventHandler = function (event) {
        console.log(event.animationState.name, event.type, event.name);
    };
    return AnimationBase;
}(BaseDemo));

}());
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQW5pbWF0aW9uQmFzZS50cyIsInNvdXJjZXMiOlsiQW5pbWF0aW9uQmFzZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBBbmltYXRpb25CYXNlIGV4dGVuZHMgQmFzZURlbW8ge1xuICAgIHByaXZhdGUgX2FybWF0dXJlRGlzcGxheTogZHJhZ29uQm9uZXMuUGl4aUFybWF0dXJlRGlzcGxheTtcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLl9yZXNvdXJjZXMucHVzaChcbiAgICAgICAgICAgIFwicmVzb3VyY2UvcHJvZ3Jlc3NfYmFyL3Byb2dyZXNzX2Jhcl9za2UuanNvblwiLFxuICAgICAgICAgICAgXCJyZXNvdXJjZS9wcm9ncmVzc19iYXIvcHJvZ3Jlc3NfYmFyX3RleC5qc29uXCIsXG4gICAgICAgICAgICBcInJlc291cmNlL3Byb2dyZXNzX2Jhci9wcm9ncmVzc19iYXJfdGV4LnBuZ1wiXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIF9vblN0YXJ0KCk6IHZvaWQge1xuICAgICAgICBjb25zdCBmYWN0b3J5ID0gZHJhZ29uQm9uZXMuUGl4aUZhY3RvcnkuZmFjdG9yeTtcbiAgICAgICAgZmFjdG9yeS5wYXJzZURyYWdvbkJvbmVzRGF0YSh0aGlzLl9waXhpUmVzb3VyY2VzW1wicmVzb3VyY2UvcHJvZ3Jlc3NfYmFyL3Byb2dyZXNzX2Jhcl9za2UuanNvblwiXS5kYXRhKTtcbiAgICAgICAgZmFjdG9yeS5wYXJzZVRleHR1cmVBdGxhc0RhdGEodGhpcy5fcGl4aVJlc291cmNlc1tcInJlc291cmNlL3Byb2dyZXNzX2Jhci9wcm9ncmVzc19iYXJfdGV4Lmpzb25cIl0uZGF0YSwgdGhpcy5fcGl4aVJlc291cmNlc1tcInJlc291cmNlL3Byb2dyZXNzX2Jhci9wcm9ncmVzc19iYXJfdGV4LnBuZ1wiXS50ZXh0dXJlKTtcbiAgICAgICAgLy9cbiAgICAgICAgdGhpcy5fYXJtYXR1cmVEaXNwbGF5ID0gZmFjdG9yeS5idWlsZEFybWF0dXJlRGlzcGxheShcInByb2dyZXNzX2JhclwiKTtcbiAgICAgICAgdGhpcy5fYXJtYXR1cmVEaXNwbGF5LnggPSAwLjA7XG4gICAgICAgIHRoaXMuX2FybWF0dXJlRGlzcGxheS55ID0gMC4wO1xuICAgICAgICB0aGlzLmFkZENoaWxkKHRoaXMuX2FybWF0dXJlRGlzcGxheSk7XG4gICAgICAgIC8vIEFkZCBhbmltYXRpb24gZXZlbnQgbGlzdGVuZXIuXG4gICAgICAgIHRoaXMuX2FybWF0dXJlRGlzcGxheS5vbihkcmFnb25Cb25lcy5FdmVudE9iamVjdC5TVEFSVCwgdGhpcy5fYW5pbWF0aW9uRXZlbnRIYW5kbGVyLCB0aGlzKTtcbiAgICAgICAgdGhpcy5fYXJtYXR1cmVEaXNwbGF5Lm9uKGRyYWdvbkJvbmVzLkV2ZW50T2JqZWN0LkxPT1BfQ09NUExFVEUsIHRoaXMuX2FuaW1hdGlvbkV2ZW50SGFuZGxlciwgdGhpcyk7XG4gICAgICAgIHRoaXMuX2FybWF0dXJlRGlzcGxheS5vbihkcmFnb25Cb25lcy5FdmVudE9iamVjdC5DT01QTEVURSwgdGhpcy5fYW5pbWF0aW9uRXZlbnRIYW5kbGVyLCB0aGlzKTtcbiAgICAgICAgdGhpcy5fYXJtYXR1cmVEaXNwbGF5Lm9uKGRyYWdvbkJvbmVzLkV2ZW50T2JqZWN0LkZBREVfSU4sIHRoaXMuX2FuaW1hdGlvbkV2ZW50SGFuZGxlciwgdGhpcyk7XG4gICAgICAgIHRoaXMuX2FybWF0dXJlRGlzcGxheS5vbihkcmFnb25Cb25lcy5FdmVudE9iamVjdC5GQURFX0lOX0NPTVBMRVRFLCB0aGlzLl9hbmltYXRpb25FdmVudEhhbmRsZXIsIHRoaXMpO1xuICAgICAgICB0aGlzLl9hcm1hdHVyZURpc3BsYXkub24oZHJhZ29uQm9uZXMuRXZlbnRPYmplY3QuRkFERV9PVVQsIHRoaXMuX2FuaW1hdGlvbkV2ZW50SGFuZGxlciwgdGhpcyk7XG4gICAgICAgIHRoaXMuX2FybWF0dXJlRGlzcGxheS5vbihkcmFnb25Cb25lcy5FdmVudE9iamVjdC5GQURFX09VVF9DT01QTEVURSwgdGhpcy5fYW5pbWF0aW9uRXZlbnRIYW5kbGVyLCB0aGlzKTtcbiAgICAgICAgdGhpcy5fYXJtYXR1cmVEaXNwbGF5Lm9uKGRyYWdvbkJvbmVzLkV2ZW50T2JqZWN0LkZSQU1FX0VWRU5ULCB0aGlzLl9hbmltYXRpb25FdmVudEhhbmRsZXIsIHRoaXMpO1xuICAgICAgICB0aGlzLl9hcm1hdHVyZURpc3BsYXkuYW5pbWF0aW9uLnBsYXkoXCJpZGxlXCIpO1xuICAgICAgICAvL1xuICAgICAgICB0aGlzLmludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5hZGRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgdGhpcy5fdG91Y2hIYW5kbGVyLCB0aGlzKTtcbiAgICAgICAgdGhpcy5hZGRMaXN0ZW5lcihcInRvdWNoZW5kXCIsIHRoaXMuX3RvdWNoSGFuZGxlciwgdGhpcyk7XG4gICAgICAgIHRoaXMuYWRkTGlzdGVuZXIoXCJ0b3VjaG1vdmVcIiwgdGhpcy5fdG91Y2hIYW5kbGVyLCB0aGlzKTtcbiAgICAgICAgdGhpcy5hZGRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCB0aGlzLl90b3VjaEhhbmRsZXIsIHRoaXMpO1xuICAgICAgICB0aGlzLmFkZExpc3RlbmVyKFwibW91c2V1cFwiLCB0aGlzLl90b3VjaEhhbmRsZXIsIHRoaXMpO1xuICAgICAgICB0aGlzLmFkZExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIHRoaXMuX3RvdWNoSGFuZGxlciwgdGhpcyk7XG4gICAgICAgIC8vXG4gICAgICAgIHRoaXMuY3JlYXRlVGV4dChcIlRvdWNoIHRvIGNvbnRyb2wgYW5pbWF0aW9uIHBsYXkgcHJvZ3Jlc3MuXCIpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2lzVG91Y2hlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgX3RvdWNoSGFuZGxlcihldmVudDogUElYSS5pbnRlcmFjdGlvbi5JbnRlcmFjdGlvbkV2ZW50KTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHByb2dyZXNzID0gTWF0aC5taW4oTWF0aC5tYXgoKGV2ZW50LmRhdGEuZ2xvYmFsLnggLSB0aGlzLnggKyAzMDAuMCkgLyA2MDAuMCwgMC4wKSwgMS4wKTtcbiAgICAgICAgc3dpdGNoIChldmVudC50eXBlKSB7XG4gICAgICAgICAgICBjYXNlIFwidG91Y2hzdGFydFwiOlxuICAgICAgICAgICAgY2FzZSBcIm1vdXNlZG93blwiOlxuICAgICAgICAgICAgICAgIHRoaXMuX2lzVG91Y2hlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5fYXJtYXR1cmVEaXNwbGF5LmFuaW1hdGlvbi5nb3RvQW5kU3RvcEJ5UHJvZ3Jlc3MoXCJpZGxlXCIsIHByb2dyZXNzKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBcInRvdWNoZW5kXCI6XG4gICAgICAgICAgICBjYXNlIFwibW91c2V1cFwiOlxuICAgICAgICAgICAgICAgIHRoaXMuX2lzVG91Y2hlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuX2FybWF0dXJlRGlzcGxheS5hbmltYXRpb24ucGxheSgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIFwidG91Y2htb3ZlXCI6XG4gICAgICAgICAgICBjYXNlIFwibW91c2Vtb3ZlXCI6XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2lzVG91Y2hlZCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBhbmltYXRpb25TdGF0ZSA9IHRoaXMuX2FybWF0dXJlRGlzcGxheS5hbmltYXRpb24uZ2V0U3RhdGUoXCJpZGxlXCIpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoYW5pbWF0aW9uU3RhdGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGlvblN0YXRlLmN1cnJlbnRUaW1lID0gYW5pbWF0aW9uU3RhdGUudG90YWxUaW1lICogcHJvZ3Jlc3M7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9hbmltYXRpb25FdmVudEhhbmRsZXIoZXZlbnQ6IGRyYWdvbkJvbmVzLkV2ZW50T2JqZWN0KTogdm9pZCB7XG4gICAgICAgIGNvbnNvbGUubG9nKGV2ZW50LmFuaW1hdGlvblN0YXRlLm5hbWUsIGV2ZW50LnR5cGUsIGV2ZW50Lm5hbWUpO1xuICAgIH1cbn0iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0lBQTRCLGlDQUFRO0lBR2hDO1FBQUEsWUFDSSxpQkFBTyxTQU9WO1FBaUNPLGdCQUFVLEdBQVksS0FBSyxDQUFDO1FBdENoQyxLQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FDaEIsNkNBQTZDLEVBQzdDLDZDQUE2QyxFQUM3Qyw0Q0FBNEMsQ0FDL0MsQ0FBQzs7S0FDTDtJQUVTLGdDQUFRLEdBQWxCO1FBQ0ksSUFBTSxPQUFPLEdBQUcsV0FBVyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUM7UUFDaEQsT0FBTyxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsNkNBQTZDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0RyxPQUFPLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyw2Q0FBNkMsQ0FBQyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsY0FBYyxDQUFDLDRDQUE0QyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUM7O1FBRWxMLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxPQUFPLENBQUMsb0JBQW9CLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDckUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDOUIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7UUFDOUIsSUFBSSxDQUFDLFFBQVEsQ0FB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