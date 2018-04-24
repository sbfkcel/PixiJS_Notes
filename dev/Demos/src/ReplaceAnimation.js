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
var ReplaceAnimation = /** @class */ (function (_super) {
    __extends(ReplaceAnimation, _super);
    function ReplaceAnimation() {
        var _this = _super.call(this) || this;
        _this._resources.push("resource/mecha_2903/mecha_2903_ske.json", "resource/mecha_2903/mecha_2903_tex.json", "resource/mecha_2903/mecha_2903_tex.png");
        return _this;
    }
    ReplaceAnimation.prototype._onStart = function () {
        var _this = this;
        var factory = dragonBones.PixiFactory.factory;
        factory.parseDragonBonesData(this._pixiResources["resource/mecha_2903/mecha_2903_ske.json"].data);
        factory.parseTextureAtlasData(this._pixiResources["resource/mecha_2903/mecha_2903_tex.json"].data, this._pixiResources["resource/mecha_2903/mecha_2903_tex.png"].texture);
        this._armatureDisplayA = factory.buildArmatureDisplay("mecha_2903");
        this._armatureDisplayB = factory.buildArmatureDisplay("mecha_2903b");
        this._armatureDisplayC = factory.buildArmatureDisplay("mecha_2903c");
        this._armatureDisplayD = factory.buildArmatureDisplay("mecha_2903d");
        var sourceArmatureData = factory.getArmatureData("mecha_2903d");
        factory.replaceAnimation(this._armatureDisplayA.armature, sourceArmatureData);
        factory.replaceAnimation(this._armatureDisplayB.armature, sourceArmatureData);
        factory.replaceAnimation(this._armatureDisplayC.armature, sourceArmatureData);
        this.addChild(this._armatureDisplayD);
        this.addChild(this._armatureDisplayA);
        this.addChild(this._armatureDisplayB);
        this.addChild(this._armatureDisplayC);
        this._armatureDisplayA.x = 0.0 - 350.0;
        this._armatureDisplayA.y = 0.0 + 150.0;
        this._armatureDisplayB.x = 0.0;
        this._armatureDisplayB.y = 0.0 + 150.0;
        this._armatureDisplayC.x = 0.0 + 350.0;
        this._armatureDisplayC.y = 0.0 + 150.0;
        this._armatureDisplayD.x = 0.0;
        this._armatureDisplayD.y = 0.0 - 50.0;
        //
        this.interactive = true;
        var touchHandler = function () {
            _this._changeAnimation();
        };
        this.addListener("touchstart", touchHandler, this);
        this.addListener("mousedown", touchHandler, this);
        //
        this.createText("Touch to change animation.");
    };
    ReplaceAnimation.prototype._changeAnimation = function () {
        var animationName = this._armatureDisplayD.animation.lastAnimationName;
        if (animationName) {
            var animationNames = this._armatureDisplayD.animation.animationNames;
            var animationIndex = (animationNames.indexOf(animationName) + 1) % animationNames.length;
            this._armatureDisplayD.animation.play(animationNames[animationIndex]);
        }
        else {
            this._armatureDisplayD.animation.play();
        }
        animationName = this._armatureDisplayD.animation.lastAnimationName;
        this._armatureDisplayA.animation.play(animationName);
        this._armatureDisplayB.animation.play(animationName);
        this._armatureDisplayC.animation.play(animationName);
    };
    return ReplaceAnimation;
}(BaseDemo));

}());
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVwbGFjZUFuaW1hdGlvbi50cyIsInNvdXJjZXMiOlsiUmVwbGFjZUFuaW1hdGlvbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBSZXBsYWNlQW5pbWF0aW9uIGV4dGVuZHMgQmFzZURlbW8ge1xuICAgIHByaXZhdGUgX2FybWF0dXJlRGlzcGxheUE6IGRyYWdvbkJvbmVzLlBpeGlBcm1hdHVyZURpc3BsYXk7XG4gICAgcHJpdmF0ZSBfYXJtYXR1cmVEaXNwbGF5QjogZHJhZ29uQm9uZXMuUGl4aUFybWF0dXJlRGlzcGxheTtcbiAgICBwcml2YXRlIF9hcm1hdHVyZURpc3BsYXlDOiBkcmFnb25Cb25lcy5QaXhpQXJtYXR1cmVEaXNwbGF5O1xuICAgIHByaXZhdGUgX2FybWF0dXJlRGlzcGxheUQ6IGRyYWdvbkJvbmVzLlBpeGlBcm1hdHVyZURpc3BsYXk7XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5fcmVzb3VyY2VzLnB1c2goXG4gICAgICAgICAgICBcInJlc291cmNlL21lY2hhXzI5MDMvbWVjaGFfMjkwM19za2UuanNvblwiLFxuICAgICAgICAgICAgXCJyZXNvdXJjZS9tZWNoYV8yOTAzL21lY2hhXzI5MDNfdGV4Lmpzb25cIixcbiAgICAgICAgICAgIFwicmVzb3VyY2UvbWVjaGFfMjkwMy9tZWNoYV8yOTAzX3RleC5wbmdcIlxuICAgICAgICApO1xuICAgIH1cblxuICAgIHByb3RlY3RlZCBfb25TdGFydCgpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgZmFjdG9yeSA9IGRyYWdvbkJvbmVzLlBpeGlGYWN0b3J5LmZhY3Rvcnk7XG4gICAgICAgIGZhY3RvcnkucGFyc2VEcmFnb25Cb25lc0RhdGEodGhpcy5fcGl4aVJlc291cmNlc1tcInJlc291cmNlL21lY2hhXzI5MDMvbWVjaGFfMjkwM19za2UuanNvblwiXS5kYXRhKTtcbiAgICAgICAgZmFjdG9yeS5wYXJzZVRleHR1cmVBdGxhc0RhdGEodGhpcy5fcGl4aVJlc291cmNlc1tcInJlc291cmNlL21lY2hhXzI5MDMvbWVjaGFfMjkwM190ZXguanNvblwiXS5kYXRhLCB0aGlzLl9waXhpUmVzb3VyY2VzW1wicmVzb3VyY2UvbWVjaGFfMjkwMy9tZWNoYV8yOTAzX3RleC5wbmdcIl0udGV4dHVyZSk7XG5cbiAgICAgICAgdGhpcy5fYXJtYXR1cmVEaXNwbGF5QSA9IGZhY3RvcnkuYnVpbGRBcm1hdHVyZURpc3BsYXkoXCJtZWNoYV8yOTAzXCIpO1xuICAgICAgICB0aGlzLl9hcm1hdHVyZURpc3BsYXlCID0gZmFjdG9yeS5idWlsZEFybWF0dXJlRGlzcGxheShcIm1lY2hhXzI5MDNiXCIpO1xuICAgICAgICB0aGlzLl9hcm1hdHVyZURpc3BsYXlDID0gZmFjdG9yeS5idWlsZEFybWF0dXJlRGlzcGxheShcIm1lY2hhXzI5MDNjXCIpO1xuICAgICAgICB0aGlzLl9hcm1hdHVyZURpc3BsYXlEID0gZmFjdG9yeS5idWlsZEFybWF0dXJlRGlzcGxheShcIm1lY2hhXzI5MDNkXCIpO1xuXG4gICAgICAgIGNvbnN0IHNvdXJjZUFybWF0dXJlRGF0YSA9IGZhY3RvcnkuZ2V0QXJtYXR1cmVEYXRhKFwibWVjaGFfMjkwM2RcIik7XG4gICAgICAgIGZhY3RvcnkucmVwbGFjZUFuaW1hdGlvbih0aGlzLl9hcm1hdHVyZURpc3BsYXlBLmFybWF0dXJlLCBzb3VyY2VBcm1hdHVyZURhdGEpO1xuICAgICAgICBmYWN0b3J5LnJlcGxhY2VBbmltYXRpb24odGhpcy5fYXJtYXR1cmVEaXNwbGF5Qi5hcm1hdHVyZSwgc291cmNlQXJtYXR1cmVEYXRhKTtcbiAgICAgICAgZmFjdG9yeS5yZXBsYWNlQW5pbWF0aW9uKHRoaXMuX2FybWF0dXJlRGlzcGxheUMuYXJtYXR1cmUsIHNvdXJjZUFybWF0dXJlRGF0YSk7XG5cbiAgICAgICAgdGhpcy5hZGRDaGlsZCh0aGlzLl9hcm1hdHVyZURpc3BsYXlEKTtcbiAgICAgICAgdGhpcy5hZGRDaGlsZCh0aGlzLl9hcm1hdHVyZURpc3BsYXlBKTtcbiAgICAgICAgdGhpcy5hZGRDaGlsZCh0aGlzLl9hcm1hdHVyZURpc3BsYXlCKTtcbiAgICAgICAgdGhpcy5hZGRDaGlsZCh0aGlzLl9hcm1hdHVyZURpc3BsYXlDKTtcblxuICAgICAgICB0aGlzLl9hcm1hdHVyZURpc3BsYXlBLnggPSAwLjAgLSAzNTAuMDtcbiAgICAgICAgdGhpcy5fYXJtYXR1cmVEaXNwbGF5QS55ID0gMC4wICsgMTUwLjA7XG4gICAgICAgIHRoaXMuX2FybWF0dXJlRGlzcGxheUIueCA9IDAuMDtcbiAgICAgICAgdGhpcy5fYXJtYXR1cmVEaXNwbGF5Qi55ID0gMC4wICsgMTUwLjA7XG4gICAgICAgIHRoaXMuX2FybWF0dXJlRGlzcGxheUMueCA9IDAuMCArIDM1MC4wO1xuICAgICAgICB0aGlzLl9hcm1hdHVyZURpc3BsYXlDLnkgPSAwLjAgKyAxNTAuMDtcbiAgICAgICAgdGhpcy5fYXJtYXR1cmVEaXNwbGF5RC54ID0gMC4wO1xuICAgICAgICB0aGlzLl9hcm1hdHVyZURpc3BsYXlELnkgPSAwLjAgLSA1MC4wO1xuICAgICAgICAvL1xuICAgICAgICB0aGlzLmludGVyYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgY29uc3QgdG91Y2hIYW5kbGVyID0gKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5fY2hhbmdlQW5pbWF0aW9uKCk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuYWRkTGlzdGVuZXIoXCJ0b3VjaHN0YXJ0XCIsIHRvdWNoSGFuZGxlciwgdGhpcyk7XG4gICAgICAgIHRoaXMuYWRkTGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgdG91Y2hIYW5kbGVyLCB0aGlzKTtcbiAgICAgICAgLy9cbiAgICAgICAgdGhpcy5jcmVhdGVUZXh0KFwiVG91Y2ggdG8gY2hhbmdlIGFuaW1hdGlvbi5cIik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfY2hhbmdlQW5pbWF0aW9uKCk6IHZvaWQge1xuICAgICAgICBsZXQgYW5pbWF0aW9uTmFtZSA9IHRoaXMuX2FybWF0dXJlRGlzcGxheUQuYW5pbWF0aW9uLmxhc3RBbmltYXRpb25OYW1lO1xuICAgICAgICBpZiAoYW5pbWF0aW9uTmFtZSkge1xuICAgICAgICAgICAgY29uc3QgYW5pbWF0aW9uTmFtZXMgPSB0aGlzLl9hcm1hdHVyZURpc3BsYXlELmFuaW1hdGlvbi5hbmltYXRpb25OYW1lcztcbiAgICAgICAgICAgIGNvbnN0IGFuaW1hdGlvbkluZGV4ID0gKGFuaW1hdGlvbk5hbWVzLmluZGV4T2YoYW5pbWF0aW9uTmFtZSkgKyAxKSAlIGFuaW1hdGlvbk5hbWVzLmxlbmd0aDtcbiAgICAgICAgICAgIHRoaXMuX2FybWF0dXJlRGlzcGxheUQuYW5pbWF0aW9uLnBsYXkoYW5pbWF0aW9uTmFtZXNbYW5pbWF0aW9uSW5kZXhdKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2FybWF0dXJlRGlzcGxheUQuYW5pbWF0aW9uLnBsYXkoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFuaW1hdGlvbk5hbWUgPSB0aGlzLl9hcm1hdHVyZURpc3BsYXlELmFuaW1hdGlvbi5sYXN0QW5pbWF0aW9uTmFtZTtcblxuICAgICAgICB0aGlzLl9hcm1hdHVyZURpc3BsYXlBLmFuaW1hdGlvbi5wbGF5KGFuaW1hdGlvbk5hbWUpO1xuICAgICAgICB0aGlzLl9hcm1hdHVyZURpc3BsYXlCLmFuaW1hdGlvbi5wbGF5KGFuaW1hdGlvbk5hbWUpO1xuICAgICAgICB0aGlzLl9hcm1hdHVyZURpc3BsYXlDLmFuaW1hdGlvbi5wbGF5KGFuaW1hdGlvbk5hbWUpO1xuICAgIH1cbn0iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0lBQStCLG9DQUFRO0lBTW5DO1FBQUEsWUFDSSxpQkFBTyxTQU9WO1FBTEcsS0FBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQ2hCLHlDQUF5QyxFQUN6Qyx5Q0FBeUMsRUFDekMsd0NBQXdDLENBQzNDLENBQUM7O0tBQ0w7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