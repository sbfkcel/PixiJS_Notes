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
var BoneOffset = /** @class */ (function (_super) {
    __extends(BoneOffset, _super);
    function BoneOffset() {
        var _this = _super.call(this) || this;
        _this._resources.push("resource/bullet_01/bullet_01_ske.json", "resource/bullet_01/bullet_01_tex.json", "resource/bullet_01/bullet_01_tex.png");
        return _this;
    }
    BoneOffset.prototype._onStart = function () {
        var factory = dragonBones.PixiFactory.factory;
        factory.parseDragonBonesData(this._pixiResources["resource/bullet_01/bullet_01_ske.json"].data);
        factory.parseTextureAtlasData(this._pixiResources["resource/bullet_01/bullet_01_tex.json"].data, this._pixiResources["resource/bullet_01/bullet_01_tex.png"].texture);
        for (var i = 0; i < 100; ++i) {
            var armatureDisplay = factory.buildArmatureDisplay("bullet_01");
            armatureDisplay.on(dragonBones.EventObject.COMPLETE, this._animationHandler, this);
            armatureDisplay.x = 0.0;
            armatureDisplay.y = 0.0;
            this.addChild(armatureDisplay);
            //
            this._moveTo(armatureDisplay);
        }
    };
    BoneOffset.prototype._animationHandler = function (event) {
        this._moveTo(event.armature.display);
    };
    BoneOffset.prototype._moveTo = function (armatureDisplay) {
        var fromX = armatureDisplay.x;
        var fromY = armatureDisplay.y;
        var toX = Math.random() * this.stageWidth - this.stageWidth * 0.5;
        var toY = Math.random() * this.stageHeight - this.stageHeight * 0.5;
        var dX = toX - fromX;
        var dY = toY - fromY;
        var rootSlot = armatureDisplay.armature.getBone("root");
        var bulletSlot = armatureDisplay.armature.getBone("bullet");
        // Modify root and bullet bone offset.
        rootSlot.offset.scaleX = Math.sqrt(dX * dX + dY * dY) / 100; // Bullet translate distance is 100 px.
        rootSlot.offset.rotation = Math.atan2(dY, dX);
        rootSlot.offset.skew = Math.random() * Math.PI - Math.PI * 0.5; // Random skew.
        bulletSlot.offset.scaleX = 0.5 + Math.random() * 0.5; // Random scale.
        bulletSlot.offset.scaleY = 0.5 + Math.random() * 0.5;
        // Update root and bullet bone.
        rootSlot.invalidUpdate();
        bulletSlot.invalidUpdate();
        //
        armatureDisplay.animation.timeScale = 0.5 + Math.random() * 1.0; // Random animation speed.
        armatureDisplay.animation.play("idle", 1);
    };
    return BoneOffset;
}(BaseDemo));

}());
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQm9uZU9mZnNldC50cyIsInNvdXJjZXMiOlsiQm9uZU9mZnNldC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBCb25lT2Zmc2V0IGV4dGVuZHMgQmFzZURlbW8ge1xuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLl9yZXNvdXJjZXMucHVzaChcbiAgICAgICAgICAgIFwicmVzb3VyY2UvYnVsbGV0XzAxL2J1bGxldF8wMV9za2UuanNvblwiLFxuICAgICAgICAgICAgXCJyZXNvdXJjZS9idWxsZXRfMDEvYnVsbGV0XzAxX3RleC5qc29uXCIsXG4gICAgICAgICAgICBcInJlc291cmNlL2J1bGxldF8wMS9idWxsZXRfMDFfdGV4LnBuZ1wiXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIF9vblN0YXJ0KCk6IHZvaWQge1xuICAgICAgICBjb25zdCBmYWN0b3J5ID0gZHJhZ29uQm9uZXMuUGl4aUZhY3RvcnkuZmFjdG9yeTtcbiAgICAgICAgZmFjdG9yeS5wYXJzZURyYWdvbkJvbmVzRGF0YSh0aGlzLl9waXhpUmVzb3VyY2VzW1wicmVzb3VyY2UvYnVsbGV0XzAxL2J1bGxldF8wMV9za2UuanNvblwiXS5kYXRhKTtcbiAgICAgICAgZmFjdG9yeS5wYXJzZVRleHR1cmVBdGxhc0RhdGEodGhpcy5fcGl4aVJlc291cmNlc1tcInJlc291cmNlL2J1bGxldF8wMS9idWxsZXRfMDFfdGV4Lmpzb25cIl0uZGF0YSwgdGhpcy5fcGl4aVJlc291cmNlc1tcInJlc291cmNlL2J1bGxldF8wMS9idWxsZXRfMDFfdGV4LnBuZ1wiXS50ZXh0dXJlKTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDsgKytpKSB7XG4gICAgICAgICAgICBjb25zdCBhcm1hdHVyZURpc3BsYXkgPSBmYWN0b3J5LmJ1aWxkQXJtYXR1cmVEaXNwbGF5KFwiYnVsbGV0XzAxXCIpO1xuICAgICAgICAgICAgYXJtYXR1cmVEaXNwbGF5Lm9uKGRyYWdvbkJvbmVzLkV2ZW50T2JqZWN0LkNPTVBMRVRFLCB0aGlzLl9hbmltYXRpb25IYW5kbGVyLCB0aGlzKTtcbiAgICAgICAgICAgIGFybWF0dXJlRGlzcGxheS54ID0gMC4wO1xuICAgICAgICAgICAgYXJtYXR1cmVEaXNwbGF5LnkgPSAwLjA7XG4gICAgICAgICAgICB0aGlzLmFkZENoaWxkKGFybWF0dXJlRGlzcGxheSk7XG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgdGhpcy5fbW92ZVRvKGFybWF0dXJlRGlzcGxheSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9hbmltYXRpb25IYW5kbGVyKGV2ZW50OiBkcmFnb25Cb25lcy5FdmVudE9iamVjdCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9tb3ZlVG8oZXZlbnQuYXJtYXR1cmUuZGlzcGxheSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfbW92ZVRvKGFybWF0dXJlRGlzcGxheTogZHJhZ29uQm9uZXMuUGl4aUFybWF0dXJlRGlzcGxheSk6IHZvaWQge1xuICAgICAgICBjb25zdCBmcm9tWCA9IGFybWF0dXJlRGlzcGxheS54O1xuICAgICAgICBjb25zdCBmcm9tWSA9IGFybWF0dXJlRGlzcGxheS55O1xuICAgICAgICBjb25zdCB0b1ggPSBNYXRoLnJhbmRvbSgpICogdGhpcy5zdGFnZVdpZHRoIC0gdGhpcy5zdGFnZVdpZHRoICogMC41O1xuICAgICAgICBjb25zdCB0b1kgPSBNYXRoLnJhbmRvbSgpICogdGhpcy5zdGFnZUhlaWdodCAtIHRoaXMuc3RhZ2VIZWlnaHQgKiAwLjU7XG4gICAgICAgIGNvbnN0IGRYID0gdG9YIC0gZnJvbVg7XG4gICAgICAgIGNvbnN0IGRZID0gdG9ZIC0gZnJvbVk7XG4gICAgICAgIGNvbnN0IHJvb3RTbG90ID0gYXJtYXR1cmVEaXNwbGF5LmFybWF0dXJlLmdldEJvbmUoXCJyb290XCIpO1xuICAgICAgICBjb25zdCBidWxsZXRTbG90ID0gYXJtYXR1cmVEaXNwbGF5LmFybWF0dXJlLmdldEJvbmUoXCJidWxsZXRcIik7XG4gICAgICAgIC8vIE1vZGlmeSByb290IGFuZCBidWxsZXQgYm9uZSBvZmZzZXQuXG4gICAgICAgIHJvb3RTbG90Lm9mZnNldC5zY2FsZVggPSBNYXRoLnNxcnQoZFggKiBkWCArIGRZICogZFkpIC8gMTAwOyAvLyBCdWxsZXQgdHJhbnNsYXRlIGRpc3RhbmNlIGlzIDEwMCBweC5cbiAgICAgICAgcm9vdFNsb3Qub2Zmc2V0LnJvdGF0aW9uID0gTWF0aC5hdGFuMihkWSwgZFgpO1xuICAgICAgICByb290U2xvdC5vZmZzZXQuc2tldyA9IE1hdGgucmFuZG9tKCkgKiBNYXRoLlBJIC0gTWF0aC5QSSAqIDAuNTsgLy8gUmFuZG9tIHNrZXcuXG4gICAgICAgIGJ1bGxldFNsb3Qub2Zmc2V0LnNjYWxlWCA9IDAuNSArIE1hdGgucmFuZG9tKCkgKiAwLjU7IC8vIFJhbmRvbSBzY2FsZS5cbiAgICAgICAgYnVsbGV0U2xvdC5vZmZzZXQuc2NhbGVZID0gMC41ICsgTWF0aC5yYW5kb20oKSAqIDAuNTtcbiAgICAgICAgLy8gVXBkYXRlIHJvb3QgYW5kIGJ1bGxldCBib25lLlxuICAgICAgICByb290U2xvdC5pbnZhbGlkVXBkYXRlKCk7XG4gICAgICAgIGJ1bGxldFNsb3QuaW52YWxpZFVwZGF0ZSgpO1xuICAgICAgICAvL1xuICAgICAgICBhcm1hdHVyZURpc3BsYXkuYW5pbWF0aW9uLnRpbWVTY2FsZSA9IDAuNSArIE1hdGgucmFuZG9tKCkgKiAxLjA7IC8vIFJhbmRvbSBhbmltYXRpb24gc3BlZWQuXG4gICAgICAgIGFybWF0dXJlRGlzcGxheS5hbmltYXRpb24ucGxheShcImlkbGVcIiwgMSk7XG4gICAgfVxufSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7SUFBeUIsOEJBQVE7SUFDN0I7UUFBQSxZQUNJLGlCQUFPLFNBT1Y7UUFMRyxLQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FDaEIs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