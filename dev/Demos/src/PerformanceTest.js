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
var PerformanceTest = /** @class */ (function (_super) {
    __extends(PerformanceTest, _super);
    function PerformanceTest() {
        var _this = _super.call(this) || this;
        _this._addingArmature = false;
        _this._removingArmature = false;
        _this._armatures = [];
        _this._resources.push("resource/mecha_1406/mecha_1406_ske.dbbin", "resource/mecha_1406/mecha_1406_tex.json", "resource/mecha_1406/mecha_1406_tex.png");
        return _this;
    }
    PerformanceTest.prototype._onStart = function () {
        this.interactive = true;
        this.addListener("touchstart", this._touchHandler, this);
        this.addListener("touchend", this._touchHandler, this);
        this.addListener("mousedown", this._touchHandler, this);
        this.addListener("mouseup", this._touchHandler, this);
        PIXI.ticker.shared.add(this._enterFrameHandler, this);
        //
        this._text = this.createText("");
        for (var i = 0; i < 300; ++i) {
            this._addArmature();
        }
        this._resetPosition();
        this._updateText();
    };
    PerformanceTest.prototype._enterFrameHandler = function (deltaTime) {
        if (this._addingArmature) {
            for (var i = 0; i < 10; ++i) {
                this._addArmature();
            }
            this._resetPosition();
            this._updateText();
        }
        if (this._removingArmature) {
            for (var i = 0; i < 10; ++i) {
                this._removeArmature();
            }
            this._resetPosition();
            this._updateText();
        }
    };
    PerformanceTest.prototype._touchHandler = function (event) {
        switch (event.type) {
            case "touchstart":
            case "mousedown":
                var touchRight = event.data.global.x > this.stageWidth * 0.5;
                this._addingArmature = touchRight;
                this._removingArmature = !touchRight;
                break;
            case "touchend":
            case "mouseup":
                this._addingArmature = false;
                this._removingArmature = false;
                break;
        }
    };
    PerformanceTest.prototype._addArmature = function () {
        var factory = dragonBones.PixiFactory.factory;
        if (this._armatures.length === 0) {
            factory.parseDragonBonesData(this._pixiResources["resource/mecha_1406/mecha_1406_ske.dbbin"].data);
            factory.parseTextureAtlasData(this._pixiResources["resource/mecha_1406/mecha_1406_tex.json"].data, this._pixiResources["resource/mecha_1406/mecha_1406_tex.png"].texture);
        }
        var armatureDisplay = dragonBones.PixiFactory.factory.buildArmatureDisplay("mecha_1406");
        armatureDisplay.armature.cacheFrameRate = 24;
        armatureDisplay.animation.play("walk", 0);
        armatureDisplay.scale.x = armatureDisplay.scale.y = 0.5;
        this.addChild(armatureDisplay);
        this._armatures.push(armatureDisplay);
    };
    PerformanceTest.prototype._removeArmature = function () {
        if (this._armatures.length === 0) {
            return;
        }
        var armatureDisplay = this._armatures.pop();
        this.removeChild(armatureDisplay);
        armatureDisplay.dispose();
        if (this._armatures.length === 0) {
            dragonBones.PixiFactory.factory.clear(true);
            dragonBones.BaseObject.clearPool();
        }
    };
    PerformanceTest.prototype._resetPosition = function () {
        var armatureCount = this._armatures.length;
        if (armatureCount === 0) {
            return;
        }
        var paddingH = 100;
        var paddingT = 200;
        var paddingB = 100;
        var gapping = 90;
        var stageWidth = this.stageWidth - paddingH * 2;
        var columnCount = Math.floor(stageWidth / gapping);
        var paddingHModify = (this.stageWidth - columnCount * gapping) * 0.5;
        var dX = stageWidth / columnCount;
        var dY = (this.stageHeight - paddingT - paddingB) / Math.ceil(armatureCount / columnCount);
        for (var i = 0, l = armatureCount; i < l; ++i) {
            var armatureDisplay = this._armatures[i];
            var lineY = Math.floor(i / columnCount);
            armatureDisplay.x = (i % columnCount) * dX + paddingHModify - this.stageWidth * 0.5;
            armatureDisplay.y = lineY * dY + paddingT - this.stageHeight * 0.5;
        }
    };
    PerformanceTest.prototype._updateText = function () {
        this._text.text = "Count: " + this._armatures.length + ". Touch screen left to decrease count / right to increase count.";
        this._text.x = -this._text.width * 0.5;
        this._text.y = this.stageHeight * 0.5 - 100.0;
        this.addChild(this._text);
    };
    return PerformanceTest;
}(BaseDemo));

}());
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGVyZm9ybWFuY2VUZXN0LnRzIiwic291cmNlcyI6WyJQZXJmb3JtYW5jZVRlc3QudHMiXSwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgUGVyZm9ybWFuY2VUZXN0IGV4dGVuZHMgQmFzZURlbW8ge1xuICAgIHByaXZhdGUgX2FkZGluZ0FybWF0dXJlOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBfcmVtb3ZpbmdBcm1hdHVyZTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgX2FybWF0dXJlczogQXJyYXk8ZHJhZ29uQm9uZXMuUGl4aUFybWF0dXJlRGlzcGxheT4gPSBbXTtcbiAgICBwcml2YXRlIF90ZXh0OiBQSVhJLlRleHQ7XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5fcmVzb3VyY2VzLnB1c2goXG4gICAgICAgICAgICBcInJlc291cmNlL21lY2hhXzE0MDYvbWVjaGFfMTQwNl9za2UuZGJiaW5cIixcbiAgICAgICAgICAgIFwicmVzb3VyY2UvbWVjaGFfMTQwNi9tZWNoYV8xNDA2X3RleC5qc29uXCIsXG4gICAgICAgICAgICBcInJlc291cmNlL21lY2hhXzE0MDYvbWVjaGFfMTQwNl90ZXgucG5nXCJcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX29uU3RhcnQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLmFkZExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCB0aGlzLl90b3VjaEhhbmRsZXIsIHRoaXMpO1xuICAgICAgICB0aGlzLmFkZExpc3RlbmVyKFwidG91Y2hlbmRcIiwgdGhpcy5fdG91Y2hIYW5kbGVyLCB0aGlzKTtcbiAgICAgICAgdGhpcy5hZGRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCB0aGlzLl90b3VjaEhhbmRsZXIsIHRoaXMpO1xuICAgICAgICB0aGlzLmFkZExpc3RlbmVyKFwibW91c2V1cFwiLCB0aGlzLl90b3VjaEhhbmRsZXIsIHRoaXMpO1xuICAgICAgICBQSVhJLnRpY2tlci5zaGFyZWQuYWRkKHRoaXMuX2VudGVyRnJhbWVIYW5kbGVyLCB0aGlzKTtcbiAgICAgICAgLy9cbiAgICAgICAgdGhpcy5fdGV4dCA9IHRoaXMuY3JlYXRlVGV4dChcIlwiKTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDMwMDsgKytpKSB7XG4gICAgICAgICAgICB0aGlzLl9hZGRBcm1hdHVyZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fcmVzZXRQb3NpdGlvbigpO1xuICAgICAgICB0aGlzLl91cGRhdGVUZXh0KCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZW50ZXJGcmFtZUhhbmRsZXIoZGVsdGFUaW1lOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuX2FkZGluZ0FybWF0dXJlKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyArK2kpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9hZGRBcm1hdHVyZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl9yZXNldFBvc2l0aW9uKCk7XG4gICAgICAgICAgICB0aGlzLl91cGRhdGVUZXh0KCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fcmVtb3ZpbmdBcm1hdHVyZSkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgKytpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVtb3ZlQXJtYXR1cmUoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5fcmVzZXRQb3NpdGlvbigpO1xuICAgICAgICAgICAgdGhpcy5fdXBkYXRlVGV4dCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfdG91Y2hIYW5kbGVyKGV2ZW50OiBQSVhJLmludGVyYWN0aW9uLkludGVyYWN0aW9uRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgc3dpdGNoIChldmVudC50eXBlKSB7XG4gICAgICAgICAgICBjYXNlIFwidG91Y2hzdGFydFwiOlxuICAgICAgICAgICAgY2FzZSBcIm1vdXNlZG93blwiOlxuICAgICAgICAgICAgICAgIGNvbnN0IHRvdWNoUmlnaHQgPSBldmVudC5kYXRhLmdsb2JhbC54ID4gdGhpcy5zdGFnZVdpZHRoICogMC41O1xuICAgICAgICAgICAgICAgIHRoaXMuX2FkZGluZ0FybWF0dXJlID0gdG91Y2hSaWdodDtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZW1vdmluZ0FybWF0dXJlID0gIXRvdWNoUmlnaHQ7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgXCJ0b3VjaGVuZFwiOlxuICAgICAgICAgICAgY2FzZSBcIm1vdXNldXBcIjpcbiAgICAgICAgICAgICAgICB0aGlzLl9hZGRpbmdBcm1hdHVyZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlbW92aW5nQXJtYXR1cmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX2FkZEFybWF0dXJlKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBmYWN0b3J5ID0gZHJhZ29uQm9uZXMuUGl4aUZhY3RvcnkuZmFjdG9yeTtcbiAgICAgICAgaWYgKHRoaXMuX2FybWF0dXJlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIGZhY3RvcnkucGFyc2VEcmFnb25Cb25lc0RhdGEodGhpcy5fcGl4aVJlc291cmNlc1tcInJlc291cmNlL21lY2hhXzE0MDYvbWVjaGFfMTQwNl9za2UuZGJiaW5cIl0uZGF0YSk7XG4gICAgICAgICAgICBmYWN0b3J5LnBhcnNlVGV4dHVyZUF0bGFzRGF0YSh0aGlzLl9waXhpUmVzb3VyY2VzW1wicmVzb3VyY2UvbWVjaGFfMTQwNi9tZWNoYV8xNDA2X3RleC5qc29uXCJdLmRhdGEsIHRoaXMuX3BpeGlSZXNvdXJjZXNbXCJyZXNvdXJjZS9tZWNoYV8xNDA2L21lY2hhXzE0MDZfdGV4LnBuZ1wiXS50ZXh0dXJlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGFybWF0dXJlRGlzcGxheSA9IGRyYWdvbkJvbmVzLlBpeGlGYWN0b3J5LmZhY3RvcnkuYnVpbGRBcm1hdHVyZURpc3BsYXkoXCJtZWNoYV8xNDA2XCIpO1xuICAgICAgICBhcm1hdHVyZURpc3BsYXkuYXJtYXR1cmUuY2FjaGVGcmFtZVJhdGUgPSAyNDtcbiAgICAgICAgYXJtYXR1cmVEaXNwbGF5LmFuaW1hdGlvbi5wbGF5KFwid2Fsa1wiLCAwKTtcbiAgICAgICAgYXJtYXR1cmVEaXNwbGF5LnNjYWxlLnggPSBhcm1hdHVyZURpc3BsYXkuc2NhbGUueSA9IDAuNTtcbiAgICAgICAgdGhpcy5hZGRDaGlsZChhcm1hdHVyZURpc3BsYXkpO1xuXG4gICAgICAgIHRoaXMuX2FybWF0dXJlcy5wdXNoKGFybWF0dXJlRGlzcGxheSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfcmVtb3ZlQXJtYXR1cmUoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLl9hcm1hdHVyZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBhcm1hdHVyZURpc3BsYXkgPSB0aGlzLl9hcm1hdHVyZXMucG9wKCk7XG4gICAgICAgIHRoaXMucmVtb3ZlQ2hpbGQoYXJtYXR1cmVEaXNwbGF5KTtcbiAgICAgICAgYXJtYXR1cmVEaXNwbGF5LmRpc3Bvc2UoKTtcblxuICAgICAgICBpZiAodGhpcy5fYXJtYXR1cmVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgZHJhZ29uQm9uZXMuUGl4aUZhY3RvcnkuZmFjdG9yeS5jbGVhcih0cnVlKTtcbiAgICAgICAgICAgIGRyYWdvbkJvbmVzLkJhc2VPYmplY3QuY2xlYXJQb29sKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9yZXNldFBvc2l0aW9uKCk6IHZvaWQge1xuICAgICAgICBjb25zdCBhcm1hdHVyZUNvdW50ID0gdGhpcy5fYXJtYXR1cmVzLmxlbmd0aDtcbiAgICAgICAgaWYgKGFybWF0dXJlQ291bnQgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHBhZGRpbmdIID0gMTAwO1xuICAgICAgICBjb25zdCBwYWRkaW5nVCA9IDIwMDtcbiAgICAgICAgY29uc3QgcGFkZGluZ0IgPSAxMDA7XG4gICAgICAgIGNvbnN0IGdhcHBpbmcgPSA5MDtcbiAgICAgICAgY29uc3Qgc3RhZ2VXaWR0aCA9IHRoaXMuc3RhZ2VXaWR0aCAtIHBhZGRpbmdIICogMjtcbiAgICAgICAgY29uc3QgY29sdW1uQ291bnQgPSBNYXRoLmZsb29yKHN0YWdlV2lkdGggLyBnYXBwaW5nKTtcbiAgICAgICAgY29uc3QgcGFkZGluZ0hNb2RpZnkgPSAodGhpcy5zdGFnZVdpZHRoIC0gY29sdW1uQ291bnQgKiBnYXBwaW5nKSAqIDAuNTtcbiAgICAgICAgY29uc3QgZFggPSBzdGFnZVdpZHRoIC8gY29sdW1uQ291bnQ7XG4gICAgICAgIGNvbnN0IGRZID0gKHRoaXMuc3RhZ2VIZWlnaHQgLSBwYWRkaW5nVCAtIHBhZGRpbmdCKSAvIE1hdGguY2VpbChhcm1hdHVyZUNvdW50IC8gY29sdW1uQ291bnQpO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gYXJtYXR1cmVDb3VudDsgaSA8IGw7ICsraSkge1xuICAgICAgICAgICAgY29uc3QgYXJtYXR1cmVEaXNwbGF5ID0gdGhpcy5fYXJtYXR1cmVzW2ldO1xuICAgICAgICAgICAgY29uc3QgbGluZVkgPSBNYXRoLmZsb29yKGkgLyBjb2x1bW5Db3VudCk7XG4gICAgICAgICAgICBhcm1hdHVyZURpc3BsYXkueCA9IChpICUgY29sdW1uQ291bnQpICogZFggKyBwYWRkaW5nSE1vZGlmeSAtIHRoaXMuc3RhZ2VXaWR0aCAqIDAuNTtcbiAgICAgICAgICAgIGFybWF0dXJlRGlzcGxheS55ID0gbGluZVkgKiBkWSArIHBhZGRpbmdUIC0gdGhpcy5zdGFnZUhlaWdodCAqIDAuNTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX3VwZGF0ZVRleHQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3RleHQudGV4dCA9IFwiQ291bnQ6IFwiICsgdGhpcy5fYXJtYXR1cmVzLmxlbmd0aCArIFwiLiBUb3VjaCBzY3JlZW4gbGVmdCB0byBkZWNyZWFzZSBjb3VudCAvIHJpZ2h0IHRvIGluY3JlYXNlIGNvdW50LlwiO1xuICAgICAgICB0aGlzLl90ZXh0LnggPSAtIHRoaXMuX3RleHQud2lkdGggKiAwLjU7XG4gICAgICAgIHRoaXMuX3RleHQueSA9IHRoaXMuc3RhZ2VIZWlnaHQgKiAwLjUgLSAxMDAuMDtcbiAgICAgICAgdGhpcy5hZGRDaGlsZCh0aGlzLl90ZXh0KTtcbiAgICB9XG59Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQTtJQUE4QixtQ0FBUTtJQU1sQztRQUFBLFlBQ0ksaUJBQU8sU0FPVjtRQWJPLHFCQUFlLEdBQVksS0FBSyxDQUFDO1FBQ2pDLHVCQUFpQixHQUFZLEtBQUssQ0FBQztRQUMxQixnQkFBVSxHQUEyQyxFQUFFLENBQUM7UUFNckUsS0FBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQ2hCLDBDQUEwQyxFQUMxQyx5Q0FBeUMsRUFDekMsd0NBQXdDLENBQzNDLENBQUM7O0tBQ0w7SUFFUyxrQ0FBUSxHQUFsQjtRQUNJLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDekQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUMsV0FBVyxDQUFDLFdB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