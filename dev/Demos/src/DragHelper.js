(function () {
'use strict';

var DragHelper = /** @class */ (function () {
    function DragHelper() {
        this._helpPoint = new PIXI.Point();
        this._dragOffset = new PIXI.Point();
        this._dragDisplayObject = null;
    }
    DragHelper.getInstance = function () {
        return DragHelper._instance;
    };
    DragHelper.prototype.enableDrag = function (displayObject) {
        displayObject.interactive = true;
        displayObject.addListener("touchstart", this._dragHandler, this);
        displayObject.addListener("touchend", this._dragHandler, this);
        displayObject.addListener("mousedown", this._dragHandler, this);
        displayObject.addListener("mouseup", this._dragHandler, this);
    };
    DragHelper.prototype.disableDrag = function (displayObject) {
        displayObject.removeListener("touchstart", this._dragHandler, this);
        displayObject.removeListener("touchend", this._dragHandler, this);
        displayObject.removeListener("mousedown", this._dragHandler, this);
        displayObject.removeListener("mouseup", this._dragHandler, this);
    };
    DragHelper.prototype._dragHandler = function (event) {
        switch (event.type) {
            case "touchstart":
            case "mousedown":
                if (this._dragDisplayObject) {
                    return;
                }
                this._dragDisplayObject = event.target;
                var armatureDisplay = this._dragDisplayObject.parent;
                var bone = armatureDisplay.armature.getBoneByDisplay(this._dragDisplayObject);
                if (bone) {
                    this._helpPoint.x = event.data.global.x;
                    this._helpPoint.y = event.data.global.y;
                    armatureDisplay.toLocal(this._helpPoint, this.stage, this._helpPoint);
                    if (bone.offsetMode !== dragonBones.OffsetMode.Override) {
                        bone.offsetMode = dragonBones.OffsetMode.Override;
                        bone.offset.x = bone.global.x;
                        bone.offset.y = bone.global.y;
                    }
                    this._dragOffset.x = bone.offset.x - this._helpPoint.x;
                    this._dragOffset.y = bone.offset.y - this._helpPoint.y;
                    this.stage.addListener("touchmove", this._dragHandler, this);
                    this.stage.addListener("mousemove", this._dragHandler, this);
                }
                break;
            case "touchend":
            case "mouseup":
                if (this._dragDisplayObject) {
                    this.stage.removeListener("touchmove", this._dragHandler, this);
                    this.stage.removeListener("mousemove", this._dragHandler, this);
                    this._dragDisplayObject = null;
                }
                break;
            case "touchmove":
            case "mousemove":
                if (this._dragDisplayObject) {
                    var armatureDisplay_1 = this._dragDisplayObject.parent;
                    var bone_1 = armatureDisplay_1.armature.getBoneByDisplay(this._dragDisplayObject);
                    if (bone_1) {
                        this._helpPoint.x = event.data.global.x;
                        this._helpPoint.y = event.data.global.y;
                        armatureDisplay_1.toLocal(this._helpPoint, this.stage, this._helpPoint);
                        bone_1.offset.x = this._helpPoint.x + this._dragOffset.x;
                        bone_1.offset.y = this._helpPoint.y + this._dragOffset.y;
                        bone_1.invalidUpdate();
                    }
                }
                break;
        }
    };
    DragHelper._instance = new DragHelper();
    return DragHelper;
}());

}());
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRHJhZ0hlbHBlci50cyIsInNvdXJjZXMiOlsiRHJhZ0hlbHBlci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBEcmFnSGVscGVyIHtcbiAgICBwcml2YXRlIHN0YXRpYyBfaW5zdGFuY2U6IERyYWdIZWxwZXIgPSBuZXcgRHJhZ0hlbHBlcigpO1xuICAgIHB1YmxpYyBzdGF0aWMgZ2V0SW5zdGFuY2UoKTogRHJhZ0hlbHBlciB7XG4gICAgICAgIHJldHVybiBEcmFnSGVscGVyLl9pbnN0YW5jZTtcbiAgICB9XG5cbiAgICBwdWJsaWMgc3RhZ2U6IFBJWEkuRGlzcGxheU9iamVjdDtcblxuICAgIHByaXZhdGUgcmVhZG9ubHkgX2hlbHBQb2ludDogUElYSS5Qb2ludCA9IG5ldyBQSVhJLlBvaW50KCk7XG4gICAgcHJpdmF0ZSByZWFkb25seSBfZHJhZ09mZnNldDogUElYSS5Qb2ludCA9IG5ldyBQSVhJLlBvaW50KCk7XG4gICAgcHJpdmF0ZSBfZHJhZ0Rpc3BsYXlPYmplY3Q6IFBJWEkuRGlzcGxheU9iamVjdCB8IG51bGwgPSBudWxsO1xuXG4gICAgcHVibGljIGVuYWJsZURyYWcoZGlzcGxheU9iamVjdDogUElYSS5EaXNwbGF5T2JqZWN0KTogdm9pZCB7XG4gICAgICAgIGRpc3BsYXlPYmplY3QuaW50ZXJhY3RpdmUgPSB0cnVlO1xuICAgICAgICBkaXNwbGF5T2JqZWN0LmFkZExpc3RlbmVyKFwidG91Y2hzdGFydFwiLCB0aGlzLl9kcmFnSGFuZGxlciwgdGhpcyk7XG4gICAgICAgIGRpc3BsYXlPYmplY3QuYWRkTGlzdGVuZXIoXCJ0b3VjaGVuZFwiLCB0aGlzLl9kcmFnSGFuZGxlciwgdGhpcyk7XG4gICAgICAgIGRpc3BsYXlPYmplY3QuYWRkTGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgdGhpcy5fZHJhZ0hhbmRsZXIsIHRoaXMpO1xuICAgICAgICBkaXNwbGF5T2JqZWN0LmFkZExpc3RlbmVyKFwibW91c2V1cFwiLCB0aGlzLl9kcmFnSGFuZGxlciwgdGhpcyk7XG4gICAgfVxuXG4gICAgcHVibGljIGRpc2FibGVEcmFnKGRpc3BsYXlPYmplY3Q6IFBJWEkuRGlzcGxheU9iamVjdCk6IHZvaWQge1xuICAgICAgICBkaXNwbGF5T2JqZWN0LnJlbW92ZUxpc3RlbmVyKFwidG91Y2hzdGFydFwiLCB0aGlzLl9kcmFnSGFuZGxlciwgdGhpcyk7XG4gICAgICAgIGRpc3BsYXlPYmplY3QucmVtb3ZlTGlzdGVuZXIoXCJ0b3VjaGVuZFwiLCB0aGlzLl9kcmFnSGFuZGxlciwgdGhpcyk7XG4gICAgICAgIGRpc3BsYXlPYmplY3QucmVtb3ZlTGlzdGVuZXIoXCJtb3VzZWRvd25cIiwgdGhpcy5fZHJhZ0hhbmRsZXIsIHRoaXMpO1xuICAgICAgICBkaXNwbGF5T2JqZWN0LnJlbW92ZUxpc3RlbmVyKFwibW91c2V1cFwiLCB0aGlzLl9kcmFnSGFuZGxlciwgdGhpcyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfZHJhZ0hhbmRsZXIoZXZlbnQ6IFBJWEkuaW50ZXJhY3Rpb24uSW50ZXJhY3Rpb25FdmVudCk6IHZvaWQge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LnR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgXCJ0b3VjaHN0YXJ0XCI6XG4gICAgICAgICAgICBjYXNlIFwibW91c2Vkb3duXCI6XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2RyYWdEaXNwbGF5T2JqZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLl9kcmFnRGlzcGxheU9iamVjdCA9IGV2ZW50LnRhcmdldCBhcyBQSVhJLkRpc3BsYXlPYmplY3Q7XG5cbiAgICAgICAgICAgICAgICBjb25zdCBhcm1hdHVyZURpc3BsYXkgPSB0aGlzLl9kcmFnRGlzcGxheU9iamVjdC5wYXJlbnQgYXMgZHJhZ29uQm9uZXMuUGl4aUFybWF0dXJlRGlzcGxheTtcbiAgICAgICAgICAgICAgICBjb25zdCBib25lID0gYXJtYXR1cmVEaXNwbGF5LmFybWF0dXJlLmdldEJvbmVCeURpc3BsYXkodGhpcy5fZHJhZ0Rpc3BsYXlPYmplY3QpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGJvbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faGVscFBvaW50LnggPSBldmVudC5kYXRhLmdsb2JhbC54O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9oZWxwUG9pbnQueSA9IGV2ZW50LmRhdGEuZ2xvYmFsLnk7XG4gICAgICAgICAgICAgICAgICAgIGFybWF0dXJlRGlzcGxheS50b0xvY2FsKHRoaXMuX2hlbHBQb2ludCwgdGhpcy5zdGFnZSwgdGhpcy5faGVscFBvaW50KTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoYm9uZS5vZmZzZXRNb2RlICE9PSBkcmFnb25Cb25lcy5PZmZzZXRNb2RlLk92ZXJyaWRlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBib25lLm9mZnNldE1vZGUgPSBkcmFnb25Cb25lcy5PZmZzZXRNb2RlLk92ZXJyaWRlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYm9uZS5vZmZzZXQueCA9IGJvbmUuZ2xvYmFsLng7XG4gICAgICAgICAgICAgICAgICAgICAgICBib25lLm9mZnNldC55ID0gYm9uZS5nbG9iYWwueTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2RyYWdPZmZzZXQueCA9IGJvbmUub2Zmc2V0LnggLSB0aGlzLl9oZWxwUG9pbnQueDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZHJhZ09mZnNldC55ID0gYm9uZS5vZmZzZXQueSAtIHRoaXMuX2hlbHBQb2ludC55O1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhZ2UuYWRkTGlzdGVuZXIoXCJ0b3VjaG1vdmVcIiwgdGhpcy5fZHJhZ0hhbmRsZXIsIHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YWdlLmFkZExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsIHRoaXMuX2RyYWdIYW5kbGVyLCB0aGlzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgXCJ0b3VjaGVuZFwiOlxuICAgICAgICAgICAgY2FzZSBcIm1vdXNldXBcIjpcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fZHJhZ0Rpc3BsYXlPYmplY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFnZS5yZW1vdmVMaXN0ZW5lcihcInRvdWNobW92ZVwiLCB0aGlzLl9kcmFnSGFuZGxlciwgdGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhZ2UucmVtb3ZlTGlzdGVuZXIoXCJtb3VzZW1vdmVcIiwgdGhpcy5fZHJhZ0hhbmRsZXIsIHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9kcmFnRGlzcGxheU9iamVjdCA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIFwidG91Y2htb3ZlXCI6XG4gICAgICAgICAgICBjYXNlIFwibW91c2Vtb3ZlXCI6XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2RyYWdEaXNwbGF5T2JqZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGFybWF0dXJlRGlzcGxheSA9IHRoaXMuX2RyYWdEaXNwbGF5T2JqZWN0LnBhcmVudCBhcyBkcmFnb25Cb25lcy5QaXhpQXJtYXR1cmVEaXNwbGF5O1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBib25lID0gYXJtYXR1cmVEaXNwbGF5LmFybWF0dXJlLmdldEJvbmVCeURpc3BsYXkodGhpcy5fZHJhZ0Rpc3BsYXlPYmplY3QpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChib25lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9oZWxwUG9pbnQueCA9IGV2ZW50LmRhdGEuZ2xvYmFsLng7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9oZWxwUG9pbnQueSA9IGV2ZW50LmRhdGEuZ2xvYmFsLnk7XG4gICAgICAgICAgICAgICAgICAgICAgICBhcm1hdHVyZURpc3BsYXkudG9Mb2NhbCh0aGlzLl9oZWxwUG9pbnQsIHRoaXMuc3RhZ2UsIHRoaXMuX2hlbHBQb2ludCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBib25lLm9mZnNldC54ID0gdGhpcy5faGVscFBvaW50LnggKyB0aGlzLl9kcmFnT2Zmc2V0Lng7XG4gICAgICAgICAgICAgICAgICAgICAgICBib25lLm9mZnNldC55ID0gdGhpcy5faGVscFBvaW50LnkgKyB0aGlzLl9kcmFnT2Zmc2V0Lnk7XG4gICAgICAgICAgICAgICAgICAgICAgICBib25lLmludmFsaWRVcGRhdGUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbn0iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUE7SUFBQTtRQVFxQixlQUFVLEdBQWUsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDMUMsZ0JBQVcsR0FBZSxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNwRCx1QkFBa0IsR0FBOEIsSUFBSSxDQUFDO0tBNEVoRTtJQXBGaUIsc0JBQVcsR0FBekI7UUFDSSxPQUFPLFVBQVUsQ0FBQyxTQUFTLENBQUM7S0FDL0I7SUFRTSwrQkFBVSxHQUFqQixVQUFrQixhQUFpQztRQUMvQyxhQUFhLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztRQUNqQyxhQUFhLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ2pFLGFBQWEsQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDL0QsYUFBYSxDQUFDLFdB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