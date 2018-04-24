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
var ReplaceSkin = /** @class */ (function (_super) {
    __extends(ReplaceSkin, _super);
    function ReplaceSkin() {
        var _this = _super.call(this) || this;
        _this._replaceSuitIndex = 0;
        _this._factory = dragonBones.PixiFactory.factory;
        _this._suitConfigs = [];
        _this._replaceSuitParts = [];
        _this._suitConfigs.push([
            "2010600a",
            "2010600a_1",
            "20208003",
            "20208003_1",
            "20208003_2",
            "20208003_3",
            "20405006",
            "20509005",
            "20703016",
            "20703016_1",
            "2080100c",
            "2080100e",
            "2080100e_1",
            "20803005",
            "2080500b",
            "2080500b_1",
        ]);
        _this._suitConfigs.push([
            "20106010",
            "20106010_1",
            "20208006",
            "20208006_1",
            "20208006_2",
            "20208006_3",
            "2040600b",
            "2040600b_1",
            "20509007",
            "20703020",
            "20703020_1",
            "2080b003",
            "20801015",
        ]);
        _this._resources.push("resource/you_xin/body/body_ske.json", "resource/you_xin/body/body_tex.json", "resource/you_xin/body/body_tex.png");
        for (var i = 0, l = _this._suitConfigs.length; i < l; ++i) {
            for (var _i = 0, _a = _this._suitConfigs[i]; _i < _a.length; _i++) {
                var partArmatureName = _a[_i];
                // resource/you_xin/suit1/2010600a/xxxxxx
                var path = "resource/you_xin/" + "suit" + (i + 1) + "/" + partArmatureName + "/" + partArmatureName;
                var dragonBonesJSONPath = path + "_ske.json";
                var textureAtlasJSONPath = path + "_tex.json";
                var textureAtlasPath = path + "_tex.png";
                //
                _this._resources.push(dragonBonesJSONPath, textureAtlasJSONPath, textureAtlasPath);
            }
        }
        return _this;
    }
    ReplaceSkin.prototype._onStart = function () {
        var _this = this;
        this._factory.parseDragonBonesData(this._pixiResources["resource/you_xin/body/body_ske.json"].data);
        this._factory.parseTextureAtlasData(this._pixiResources["resource/you_xin/body/body_tex.json"].data, this._pixiResources["resource/you_xin/body/body_tex.png"].texture);
        for (var i = 0, l = this._suitConfigs.length; i < l; ++i) {
            for (var _i = 0, _a = this._suitConfigs[i]; _i < _a.length; _i++) {
                var partArmatureName = _a[_i];
                var path = "resource/you_xin/" + "suit" + (i + 1) + "/" + partArmatureName + "/" + partArmatureName;
                var dragonBonesJSONPath = path + "_ske.json";
                var textureAtlasJSONPath = path + "_tex.json";
                var textureAtlasPath = path + "_tex.png";
                //
                this._factory.parseDragonBonesData(this._pixiResources[dragonBonesJSONPath].data);
                this._factory.parseTextureAtlasData(this._pixiResources[textureAtlasJSONPath].data, this._pixiResources[textureAtlasPath].texture);
            }
        }
        //
        this._armatureDisplay = this._factory.buildArmatureDisplay("body");
        this._armatureDisplay.on(dragonBones.EventObject.LOOP_COMPLETE, this._animationEventHandler, this);
        this._armatureDisplay.animation.play("idle", 0);
        //
        this._armatureDisplay.x = 0.0;
        this._armatureDisplay.y = 200.0;
        this._armatureDisplay.scale.x = this._armatureDisplay.scale.y = 0.25;
        this.addChild(this._armatureDisplay);
        // Init the first suit.
        for (var _b = 0, _c = this._suitConfigs[0]; _b < _c.length; _b++) {
            var part = _c[_b];
            var partArmatureData = this._factory.getArmatureData(part);
            this._factory.replaceSkin(this._armatureDisplay.armature, partArmatureData.defaultSkin);
        }
        //
        this.interactive = true;
        var touchHandler = function () {
            _this._randomReplaceSkin();
        };
        this.addListener("touchstart", touchHandler, this);
        this.addListener("mousedown", touchHandler, this);
        //
        this.createText("Touch to replace armature skin.");
    };
    ReplaceSkin.prototype._animationEventHandler = function (event) {
        // Random animation index.
        var animationIndex = Math.floor(Math.random() * this._armatureDisplay.animation.animationNames.length);
        var animationName = this._armatureDisplay.animation.animationNames[animationIndex];
        // Play animation.
        this._armatureDisplay.animation.fadeIn(animationName, 0.3, 0);
    };
    ReplaceSkin.prototype._randomReplaceSkin = function () {
        // This suit has been replaced, next suit.
        if (this._replaceSuitParts.length === 0) {
            this._replaceSuitIndex++;
            if (this._replaceSuitIndex >= this._suitConfigs.length) {
                this._replaceSuitIndex = 0;
            }
            // Refill the unset parits.
            for (var _i = 0, _a = this._suitConfigs[this._replaceSuitIndex]; _i < _a.length; _i++) {
                var partArmatureName_1 = _a[_i];
                this._replaceSuitParts.push(partArmatureName_1);
            }
        }
        // Random one part in this suit.
        var partIndex = Math.floor(Math.random() * this._replaceSuitParts.length);
        var partArmatureName = this._replaceSuitParts[partIndex];
        var partArmatureData = this._factory.getArmatureData(partArmatureName);
        // Replace skin.
        this._factory.replaceSkin(this._armatureDisplay.armature, partArmatureData.defaultSkin);
        // Remove has been replaced
        this._replaceSuitParts.splice(partIndex, 1);
    };
    return ReplaceSkin;
}(BaseDemo));

}());
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVwbGFjZVNraW4udHMiLCJzb3VyY2VzIjpbIlJlcGxhY2VTa2luLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImNsYXNzIFJlcGxhY2VTa2luIGV4dGVuZHMgQmFzZURlbW8ge1xuICAgIHByaXZhdGUgX3JlcGxhY2VTdWl0SW5kZXg6IG51bWJlciA9IDA7XG4gICAgcHJpdmF0ZSByZWFkb25seSBfZmFjdG9yeTogZHJhZ29uQm9uZXMuUGl4aUZhY3RvcnkgPSBkcmFnb25Cb25lcy5QaXhpRmFjdG9yeS5mYWN0b3J5O1xuICAgIHByaXZhdGUgcmVhZG9ubHkgX3N1aXRDb25maWdzOiBzdHJpbmdbXVtdID0gW107XG4gICAgcHJpdmF0ZSByZWFkb25seSBfcmVwbGFjZVN1aXRQYXJ0czogc3RyaW5nW10gPSBbXTtcbiAgICBwcml2YXRlIF9hcm1hdHVyZURpc3BsYXk6IGRyYWdvbkJvbmVzLlBpeGlBcm1hdHVyZURpc3BsYXk7XG5cbiAgICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5fc3VpdENvbmZpZ3MucHVzaChbXG4gICAgICAgICAgICBcIjIwMTA2MDBhXCIsXG4gICAgICAgICAgICBcIjIwMTA2MDBhXzFcIixcbiAgICAgICAgICAgIFwiMjAyMDgwMDNcIixcbiAgICAgICAgICAgIFwiMjAyMDgwMDNfMVwiLFxuICAgICAgICAgICAgXCIyMDIwODAwM18yXCIsXG4gICAgICAgICAgICBcIjIwMjA4MDAzXzNcIixcbiAgICAgICAgICAgIFwiMjA0MDUwMDZcIixcbiAgICAgICAgICAgIFwiMjA1MDkwMDVcIixcbiAgICAgICAgICAgIFwiMjA3MDMwMTZcIixcbiAgICAgICAgICAgIFwiMjA3MDMwMTZfMVwiLFxuICAgICAgICAgICAgXCIyMDgwMTAwY1wiLFxuICAgICAgICAgICAgXCIyMDgwMTAwZVwiLFxuICAgICAgICAgICAgXCIyMDgwMTAwZV8xXCIsXG4gICAgICAgICAgICBcIjIwODAzMDA1XCIsXG4gICAgICAgICAgICBcIjIwODA1MDBiXCIsXG4gICAgICAgICAgICBcIjIwODA1MDBiXzFcIixcbiAgICAgICAgXSk7XG5cbiAgICAgICAgdGhpcy5fc3VpdENvbmZpZ3MucHVzaChbXG4gICAgICAgICAgICBcIjIwMTA2MDEwXCIsXG4gICAgICAgICAgICBcIjIwMTA2MDEwXzFcIixcbiAgICAgICAgICAgIFwiMjAyMDgwMDZcIixcbiAgICAgICAgICAgIFwiMjAyMDgwMDZfMVwiLFxuICAgICAgICAgICAgXCIyMDIwODAwNl8yXCIsXG4gICAgICAgICAgICBcIjIwMjA4MDA2XzNcIixcbiAgICAgICAgICAgIFwiMjA0MDYwMGJcIixcbiAgICAgICAgICAgIFwiMjA0MDYwMGJfMVwiLFxuICAgICAgICAgICAgXCIyMDUwOTAwN1wiLFxuICAgICAgICAgICAgXCIyMDcwMzAyMFwiLFxuICAgICAgICAgICAgXCIyMDcwMzAyMF8xXCIsXG4gICAgICAgICAgICBcIjIwODBiMDAzXCIsXG4gICAgICAgICAgICBcIjIwODAxMDE1XCIsXG4gICAgICAgIF0pO1xuXG4gICAgICAgIHRoaXMuX3Jlc291cmNlcy5wdXNoKFxuICAgICAgICAgICAgXCJyZXNvdXJjZS95b3VfeGluL2JvZHkvYm9keV9za2UuanNvblwiLFxuICAgICAgICAgICAgXCJyZXNvdXJjZS95b3VfeGluL2JvZHkvYm9keV90ZXguanNvblwiLFxuICAgICAgICAgICAgXCJyZXNvdXJjZS95b3VfeGluL2JvZHkvYm9keV90ZXgucG5nXCJcbiAgICAgICAgKTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IHRoaXMuX3N1aXRDb25maWdzLmxlbmd0aDsgaSA8IGw7ICsraSkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBwYXJ0QXJtYXR1cmVOYW1lIG9mIHRoaXMuX3N1aXRDb25maWdzW2ldKSB7XG4gICAgICAgICAgICAgICAgLy8gcmVzb3VyY2UveW91X3hpbi9zdWl0MS8yMDEwNjAwYS94eHh4eHhcbiAgICAgICAgICAgICAgICBjb25zdCBwYXRoID0gXCJyZXNvdXJjZS95b3VfeGluL1wiICsgXCJzdWl0XCIgKyAoaSArIDEpICsgXCIvXCIgKyBwYXJ0QXJtYXR1cmVOYW1lICsgXCIvXCIgKyBwYXJ0QXJtYXR1cmVOYW1lO1xuICAgICAgICAgICAgICAgIGNvbnN0IGRyYWdvbkJvbmVzSlNPTlBhdGggPSBwYXRoICsgXCJfc2tlLmpzb25cIjtcbiAgICAgICAgICAgICAgICBjb25zdCB0ZXh0dXJlQXRsYXNKU09OUGF0aCA9IHBhdGggKyBcIl90ZXguanNvblwiO1xuICAgICAgICAgICAgICAgIGNvbnN0IHRleHR1cmVBdGxhc1BhdGggPSBwYXRoICsgXCJfdGV4LnBuZ1wiO1xuICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgdGhpcy5fcmVzb3VyY2VzLnB1c2goXG4gICAgICAgICAgICAgICAgICAgIGRyYWdvbkJvbmVzSlNPTlBhdGgsXG4gICAgICAgICAgICAgICAgICAgIHRleHR1cmVBdGxhc0pTT05QYXRoLFxuICAgICAgICAgICAgICAgICAgICB0ZXh0dXJlQXRsYXNQYXRoXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3RlY3RlZCBfb25TdGFydCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fZmFjdG9yeS5wYXJzZURyYWdvbkJvbmVzRGF0YSh0aGlzLl9waXhpUmVzb3VyY2VzW1wicmVzb3VyY2UveW91X3hpbi9ib2R5L2JvZHlfc2tlLmpzb25cIl0uZGF0YSk7XG4gICAgICAgIHRoaXMuX2ZhY3RvcnkucGFyc2VUZXh0dXJlQXRsYXNEYXRhKHRoaXMuX3BpeGlSZXNvdXJjZXNbXCJyZXNvdXJjZS95b3VfeGluL2JvZHkvYm9keV90ZXguanNvblwiXS5kYXRhLCB0aGlzLl9waXhpUmVzb3VyY2VzW1wicmVzb3VyY2UveW91X3hpbi9ib2R5L2JvZHlfdGV4LnBuZ1wiXS50ZXh0dXJlKTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbCA9IHRoaXMuX3N1aXRDb25maWdzLmxlbmd0aDsgaSA8IGw7ICsraSkge1xuICAgICAgICAgICAgZm9yIChjb25zdCBwYXJ0QXJtYXR1cmVOYW1lIG9mIHRoaXMuX3N1aXRDb25maWdzW2ldKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcGF0aCA9IFwicmVzb3VyY2UveW91X3hpbi9cIiArIFwic3VpdFwiICsgKGkgKyAxKSArIFwiL1wiICsgcGFydEFybWF0dXJlTmFtZSArIFwiL1wiICsgcGFydEFybWF0dXJlTmFtZTtcbiAgICAgICAgICAgICAgICBjb25zdCBkcmFnb25Cb25lc0pTT05QYXRoID0gcGF0aCArIFwiX3NrZS5qc29uXCI7XG4gICAgICAgICAgICAgICAgY29uc3QgdGV4dHVyZUF0bGFzSlNPTlBhdGggPSBwYXRoICsgXCJfdGV4Lmpzb25cIjtcbiAgICAgICAgICAgICAgICBjb25zdCB0ZXh0dXJlQXRsYXNQYXRoID0gcGF0aCArIFwiX3RleC5wbmdcIjtcbiAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAgIHRoaXMuX2ZhY3RvcnkucGFyc2VEcmFnb25Cb25lc0RhdGEodGhpcy5fcGl4aVJlc291cmNlc1tkcmFnb25Cb25lc0pTT05QYXRoXS5kYXRhKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9mYWN0b3J5LnBhcnNlVGV4dHVyZUF0bGFzRGF0YSh0aGlzLl9waXhpUmVzb3VyY2VzW3RleHR1cmVBdGxhc0pTT05QYXRoXS5kYXRhLCB0aGlzLl9waXhpUmVzb3VyY2VzW3RleHR1cmVBdGxhc1BhdGhdLnRleHR1cmUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vXG4gICAgICAgIHRoaXMuX2FybWF0dXJlRGlzcGxheSA9IHRoaXMuX2ZhY3RvcnkuYnVpbGRBcm1hdHVyZURpc3BsYXkoXCJib2R5XCIpO1xuICAgICAgICB0aGlzLl9hcm1hdHVyZURpc3BsYXkub24oZHJhZ29uQm9uZXMuRXZlbnRPYmplY3QuTE9PUF9DT01QTEVURSwgdGhpcy5fYW5pbWF0aW9uRXZlbnRIYW5kbGVyLCB0aGlzKTtcbiAgICAgICAgdGhpcy5fYXJtYXR1cmVEaXNwbGF5LmFuaW1hdGlvbi5wbGF5KFwiaWRsZVwiLCAwKTtcbiAgICAgICAgLy9cbiAgICAgICAgdGhpcy5fYXJtYXR1cmVEaXNwbGF5LnggPSAwLjA7XG4gICAgICAgIHRoaXMuX2FybWF0dXJlRGlzcGxheS55ID0gMjAwLjA7XG4gICAgICAgIHRoaXMuX2FybWF0dXJlRGlzcGxheS5zY2FsZS54ID0gdGhpcy5fYXJtYXR1cmVEaXNwbGF5LnNjYWxlLnkgPSAwLjI1O1xuICAgICAgICB0aGlzLmFkZENoaWxkKHRoaXMuX2FybWF0dXJlRGlzcGxheSk7XG4gICAgICAgIC8vIEluaXQgdGhlIGZpcnN0IHN1aXQuXG4gICAgICAgIGZvciAoY29uc3QgcGFydCBvZiB0aGlzLl9zdWl0Q29uZmlnc1swXSkge1xuICAgICAgICAgICAgY29uc3QgcGFydEFybWF0dXJlRGF0YSA9IHRoaXMuX2ZhY3RvcnkuZ2V0QXJtYXR1cmVEYXRhKHBhcnQpO1xuICAgICAgICAgICAgdGhpcy5fZmFjdG9yeS5yZXBsYWNlU2tpbih0aGlzLl9hcm1hdHVyZURpc3BsYXkuYXJtYXR1cmUsIHBhcnRBcm1hdHVyZURhdGEuZGVmYXVsdFNraW4pO1xuICAgICAgICB9XG4gICAgICAgIC8vXG4gICAgICAgIHRoaXMuaW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgICAgICBjb25zdCB0b3VjaEhhbmRsZXIgPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9yYW5kb21SZXBsYWNlU2tpbigpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmFkZExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCB0b3VjaEhhbmRsZXIsIHRoaXMpO1xuICAgICAgICB0aGlzLmFkZExpc3RlbmVyKFwibW91c2Vkb3duXCIsIHRvdWNoSGFuZGxlciwgdGhpcyk7XG4gICAgICAgIC8vXG4gICAgICAgIHRoaXMuY3JlYXRlVGV4dChcIlRvdWNoIHRvIHJlcGxhY2UgYXJtYXR1cmUgc2tpbi5cIik7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfYW5pbWF0aW9uRXZlbnRIYW5kbGVyKGV2ZW50OiBkcmFnb25Cb25lcy5FdmVudE9iamVjdCk6IHZvaWQge1xuICAgICAgICAvLyBSYW5kb20gYW5pbWF0aW9uIGluZGV4LlxuICAgICAgICBjb25zdCBhbmltYXRpb25JbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMuX2FybWF0dXJlRGlzcGxheS5hbmltYXRpb24uYW5pbWF0aW9uTmFtZXMubGVuZ3RoKTtcbiAgICAgICAgY29uc3QgYW5pbWF0aW9uTmFtZSA9IHRoaXMuX2FybWF0dXJlRGlzcGxheS5hbmltYXRpb24uYW5pbWF0aW9uTmFtZXNbYW5pbWF0aW9uSW5kZXhdO1xuICAgICAgICAvLyBQbGF5IGFuaW1hdGlvbi5cbiAgICAgICAgdGhpcy5fYXJtYXR1cmVEaXNwbGF5LmFuaW1hdGlvbi5mYWRlSW4oYW5pbWF0aW9uTmFtZSwgMC4zLCAwKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9yYW5kb21SZXBsYWNlU2tpbigpOiB2b2lkIHtcbiAgICAgICAgLy8gVGhpcyBzdWl0IGhhcyBiZWVuIHJlcGxhY2VkLCBuZXh0IHN1aXQuXG4gICAgICAgIGlmICh0aGlzLl9yZXBsYWNlU3VpdFBhcnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5fcmVwbGFjZVN1aXRJbmRleCsrO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5fcmVwbGFjZVN1aXRJbmRleCA+PSB0aGlzLl9zdWl0Q29uZmlncy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZXBsYWNlU3VpdEluZGV4ID0gMDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gUmVmaWxsIHRoZSB1bnNldCBwYXJpdHMuXG4gICAgICAgICAgICBmb3IgKGNvbnN0IHBhcnRBcm1hdHVyZU5hbWUgb2YgdGhpcy5fc3VpdENvbmZpZ3NbdGhpcy5fcmVwbGFjZVN1aXRJbmRleF0pIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZXBsYWNlU3VpdFBhcnRzLnB1c2gocGFydEFybWF0dXJlTmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBSYW5kb20gb25lIHBhcnQgaW4gdGhpcyBzdWl0LlxuICAgICAgICBjb25zdCBwYXJ0SW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0aGlzLl9yZXBsYWNlU3VpdFBhcnRzLmxlbmd0aCk7XG4gICAgICAgIGNvbnN0IHBhcnRBcm1hdHVyZU5hbWUgPSB0aGlzLl9yZXBsYWNlU3VpdFBhcnRzW3BhcnRJbmRleF07XG4gICAgICAgIGNvbnN0IHBhcnRBcm1hdHVyZURhdGEgPSB0aGlzLl9mYWN0b3J5LmdldEFybWF0dXJlRGF0YShwYXJ0QXJtYXR1cmVOYW1lKTtcbiAgICAgICAgLy8gUmVwbGFjZSBza2luLlxuICAgICAgICB0aGlzLl9mYWN0b3J5LnJlcGxhY2VTa2luKHRoaXMuX2FybWF0dXJlRGlzcGxheS5hcm1hdHVyZSwgcGFydEFybWF0dXJlRGF0YS5kZWZhdWx0U2tpbik7XG4gICAgICAgIC8vIFJlbW92ZSBoYXMgYmVlbiByZXBsYWNlZFxuICAgICAgICB0aGlzLl9yZXBsYWNlU3VpdFBhcnRzLnNwbGljZShwYXJ0SW5kZXgsIDEpO1xuICAgIH1cbn0iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBO0lBQTBCLCtCQUFRO0lBTzlCO1FBQUEsWUFDSSxpQkFBTyxTQTBEVjtRQWpFTyx1QkFBaUIsR0FBVyxDQUFDLENBQUM7UUFDckIsY0FBUSxHQUE0QixXQUFXLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQztRQUNwRSxrQkFBWSxHQUFlLEVBQUUsQ0FBQztRQUM5Qix1QkFBaUIsR0FBYSxFQUFFLENBQUM7UUFNOUMsS0FBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUM7WUFDbkIsVUFBVTtZQUNWLFlBQVk7WUFDWixVQUFVO1lBQ1YsWUFBWTtZQUNaLFlBQVk7WUFDWixZQUFZO1lBQ1osVUFBVTtZQUNWLFVBQVU7WUFDVixVQUFVO1lBQ1YsWUFBWTtZQUNaLFVBQVU7WUFDVixVQUFVO1lBQ1YsWUFBWTtZQUNaLFVBQVU7WUFDVixVQUFVO1lBQ1YsWUFBWTtTQUNmLENBQUMsQ0FBQztRQUVILEtBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDO1lBQ25CLFVBQVU7WUFDVixZQUFZO1lBQ1osVUFBVTtZQUNWLFlBQVk7WUFDWixZQUFZO1lBQ1osWUFBWTtZQUNaLFVBQVU7WUFDVixZQUFZO1lBQ1osVUFBVTtZQUNWLFVBQVU7WUFDVixZQUFZO1lBQ1osVUFBVTtZQUNWLFVBQVU7U0FDYixDQUFDLENBQUM7UUFFSCxLQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FDaEIscUNBQXFDLEVBQ3JDLHFDQUFxQyxFQUNyQyxvQ0FBb0MsQ0FDdkMsQ0FBQztRQUVGLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFO1lBQ3RELEtBQStCLFVBQW9CLEVBQXBCLEtBQUEsS0FBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBcEIsY0FBb0IsRUFBcEIsSUFBb0I7Z0JBQTlDLElBQU0sZ0JBQWdCLFNBQUE7O2dCQUV2QixJQUFNLElBQUksR0FBRyxtQkFBbUIsR0FBRyxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxnQkFBZ0IsR0FBRyxHQUFHLEdBQUcsZ0JBQWdCLENBQUM7Z0JBQ3RHLElBQU0sbUJBQW1CLEdBQUcsSUFBSSxHQUFHLFdBQVcsQ0FBQztnQkFDL0MsSUFBTSxvQkFBb0IsR0FBRyxJQUFJLEdBQUcsV0FBVyxDQUFDO2dCQUNoRCxJQUFNLGdCQUFnQixHQUFHLElBQUksR0FBRyxVQUFVLENBQUM7O2dCQUUzQyxLQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FDaEIsbUJBQW1CLEVBQ25CLG9CQUFvQixFQUNwQixnQkFBZ0IsQ0FDbkIsQ0FBQzthQUNMO1NBQ0o7O0tBQ0o7SUFFUyw4QkFBUSxHQUFsQjtRQUFBLGlCQXNDQztRQXJDRyxJQUFJLENBQUMsUUFBUSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMscUNBQXFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwRyxJQUFJLENBQUMsUUFBUSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMscUNBQXFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRXhLLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUFFO1lBQ3RELEtBQStCLFVBQW9CLEVBQXBCLEtBQUEsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBcEIsY0FBb0IsRUFBcEIsSUFBb0I7Z0JBQTlDLElBQU0sZ0JBQWdCLFNBQUE7Z0JBQ3ZCLElBQU0sSUFBSSxHQUFHLG1CQUFtQixHQUFHLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLGdCQUFnQixHQUFHLEdBQUcsR0FBRyxnQkFBZ0IsQ0FBQztnQkFDdEcsSUFBTSxtQkFBbUIsR0FBRyxJQUFJLEdBQUcsV0FBVyxDQUFDO2dCQUMvQyxJQUFNLG9CQUFvQixHQUFHLElBQUksR0FBRyxXQUFXLENBQUM7Z0JBQ2hELElBQU0sZ0JBQWdCLEdBQUcsSUFBSSxHQUFHLFVBQVUsQ0FBQzs7Z0JBRTNDLElBQUksQ0FBQyxRQUFRLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNsRixJQUFJLENBQUMsUUFBUSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQ3RJO1NBQ0o7O1FBRUQsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbkUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsc0JBQXNCLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbkcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDOztRQUVoRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUM5QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUNoQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7UUFDckUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQzs7UUFFckMsS0FBbUIsVUFBb0IsRUFBcEIsS0FBQSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFwQixjQUFvQixFQUFwQixJQUFvQjtZQUFsQyxJQUFNLElBQUksU0FBQTtZQUNYLElBQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDN0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUMzRjs7UUFFRCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztRQUN4QixJQUFNLFlBQVksR0FBRztZQUNqQixLQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztTQUM3QixDQUFDO1FBQ0YsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ25ELElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQzs7UUFFbEQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO0tBQ3REO0lBRU8sNENBQXNCLEdBQTlCLFVBQStCLEtBQThCOztRQUV6RCxJQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN6RyxJQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsQ0FBQzs7UUFFckYsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztLQUNqRTtJQUVPLHdDQUFrQixHQUExQjs7UUFFSSxJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1lBQ3JDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBRXpCLElBQUksSUFBSSxDQUFDLGlCQUFpQixJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFO2dCQUNwRCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsQ0FBQyxDQUFDO2FBQzlCOztZQUdELEtBQStCLFVBQXlDLEVBQXpDLEtBQUEsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsRUFBekMsY0FBeUMsRUFBekMsSUFBeUM7Z0JBQW5FLElBQU0sa0JBQWdCLFNBQUE7Z0JBQ3ZCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsa0JBQWdCLENBQUMsQ0FBQzthQUNqRDtTQUNKOztRQUdELElBQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM1RSxJQUFNLGdCQUFnQixHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMzRCxJQUFNLGdCQUFnQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLGdCQUFnQixDQUFDLENBQUM7O1FBRXpFLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLENBQUM7O1FBRXhGLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDO0tBQy9DO0lBQ0wsa0JBQUM7Q0FBQSxDQTVJeUIsUUFBUSxHQTRJakM7Ozs7In0=