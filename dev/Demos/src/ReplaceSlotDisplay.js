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
var ReplaceSlotDisplay = /** @class */ (function (_super) {
    __extends(ReplaceSlotDisplay, _super);
    function ReplaceSlotDisplay() {
        var _this = _super.call(this) || this;
        _this._leftWeaponIndex = 0;
        _this._rightWeaponIndex = 0;
        _this._factory = dragonBones.PixiFactory.factory;
        _this._resources.push("resource/mecha_1004d_show/mecha_1004d_show_ske.json", "resource/mecha_1004d_show/mecha_1004d_show_tex.json", "resource/mecha_1004d_show/mecha_1004d_show_tex.png", "resource/weapon_1004_show/weapon_1004_show_ske.json", "resource/weapon_1004_show/weapon_1004_show_tex.json", "resource/weapon_1004_show/weapon_1004_show_tex.png");
        return _this;
    }
    ReplaceSlotDisplay.prototype._onStart = function () {
        var _this = this;
        this._factory.parseDragonBonesData(this._pixiResources["resource/mecha_1004d_show/mecha_1004d_show_ske.json"].data);
        this._factory.parseTextureAtlasData(this._pixiResources["resource/mecha_1004d_show/mecha_1004d_show_tex.json"].data, this._pixiResources["resource/mecha_1004d_show/mecha_1004d_show_tex.png"].texture);
        this._factory.parseDragonBonesData(this._pixiResources["resource/weapon_1004_show/weapon_1004_show_ske.json"].data);
        this._factory.parseTextureAtlasData(this._pixiResources["resource/weapon_1004_show/weapon_1004_show_tex.json"].data, this._pixiResources["resource/weapon_1004_show/weapon_1004_show_tex.png"].texture);
        //
        this._armatureDisplay = this._factory.buildArmatureDisplay("mecha_1004d");
        this._armatureDisplay.animation.play();
        //
        this._armatureDisplay.x = 100.0;
        this._armatureDisplay.y = 200.0;
        this.addChild(this._armatureDisplay);
        //
        this.interactive = true;
        var touchHandler = function (event) {
            var localX = event.data.global.x - _this.x;
            if (localX < -150.0) {
                _this._replaceDisplay(-1);
            }
            else if (localX > 150.0) {
                _this._replaceDisplay(1);
            }
            else {
                _this._replaceDisplay(0);
            }
        };
        this.addListener("touchstart", touchHandler, this);
        this.addListener("mousedown", touchHandler, this);
        //
        this.createText("Touch screen left / center / right to relace slot display.");
    };
    ReplaceSlotDisplay.prototype._replaceDisplay = function (type) {
        if (type === -1) {
            this._rightWeaponIndex++;
            this._rightWeaponIndex %= ReplaceSlotDisplay.WEAPON_RIGHT_LIST.length;
            var displayName = ReplaceSlotDisplay.WEAPON_RIGHT_LIST[this._rightWeaponIndex];
            this._factory.replaceSlotDisplay("weapon_1004_show", "weapon", "weapon_r", displayName, this._armatureDisplay.armature.getSlot("weapon_hand_r"));
        }
        else if (type === 1) {
            this._leftWeaponIndex++;
            this._leftWeaponIndex %= 5;
            this._armatureDisplay.armature.getSlot("weapon_hand_l").displayIndex = this._leftWeaponIndex;
        }
        else {
            var logoSlot = this._armatureDisplay.armature.getSlot("logo");
            if (logoSlot.display === this._logoText) {
                logoSlot.display = logoSlot.rawDisplay;
            }
            else {
                if (!this._logoText) {
                    this._logoText = new PIXI.Text();
                    this._logoText.text = "Core Element";
                    this._logoText.pivot.x = this._logoText.width * 0.5;
                    this._logoText.pivot.y = this._logoText.height * 0.5;
                }
                logoSlot.display = this._logoText;
            }
        }
    };
    ReplaceSlotDisplay.WEAPON_RIGHT_LIST = ["weapon_1004_r", "weapon_1004b_r", "weapon_1004c_r", "weapon_1004d_r", "weapon_1004e_r"];
    return ReplaceSlotDisplay;
}(BaseDemo));

}());
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVwbGFjZVNsb3REaXNwbGF5LnRzIiwic291cmNlcyI6WyJSZXBsYWNlU2xvdERpc3BsYXkudHMiXSwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgUmVwbGFjZVNsb3REaXNwbGF5IGV4dGVuZHMgQmFzZURlbW8ge1xuICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IFdFQVBPTl9SSUdIVF9MSVNUOiBzdHJpbmdbXSA9IFtcIndlYXBvbl8xMDA0X3JcIiwgXCJ3ZWFwb25fMTAwNGJfclwiLCBcIndlYXBvbl8xMDA0Y19yXCIsIFwid2VhcG9uXzEwMDRkX3JcIiwgXCJ3ZWFwb25fMTAwNGVfclwiXTtcblxuICAgIHByaXZhdGUgX2xlZnRXZWFwb25JbmRleDogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIF9yaWdodFdlYXBvbkluZGV4OiBudW1iZXIgPSAwO1xuICAgIHByaXZhdGUgcmVhZG9ubHkgX2ZhY3Rvcnk6IGRyYWdvbkJvbmVzLlBpeGlGYWN0b3J5ID0gZHJhZ29uQm9uZXMuUGl4aUZhY3RvcnkuZmFjdG9yeTtcbiAgICBwcml2YXRlIF9hcm1hdHVyZURpc3BsYXk6IGRyYWdvbkJvbmVzLlBpeGlBcm1hdHVyZURpc3BsYXk7XG4gICAgcHJpdmF0ZSBfbG9nb1RleHQ6IFBJWEkuVGV4dDtcblxuICAgIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICB0aGlzLl9yZXNvdXJjZXMucHVzaChcbiAgICAgICAgICAgIFwicmVzb3VyY2UvbWVjaGFfMTAwNGRfc2hvdy9tZWNoYV8xMDA0ZF9zaG93X3NrZS5qc29uXCIsXG4gICAgICAgICAgICBcInJlc291cmNlL21lY2hhXzEwMDRkX3Nob3cvbWVjaGFfMTAwNGRfc2hvd190ZXguanNvblwiLFxuICAgICAgICAgICAgXCJyZXNvdXJjZS9tZWNoYV8xMDA0ZF9zaG93L21lY2hhXzEwMDRkX3Nob3dfdGV4LnBuZ1wiLFxuICAgICAgICAgICAgXCJyZXNvdXJjZS93ZWFwb25fMTAwNF9zaG93L3dlYXBvbl8xMDA0X3Nob3dfc2tlLmpzb25cIixcbiAgICAgICAgICAgIFwicmVzb3VyY2Uvd2VhcG9uXzEwMDRfc2hvdy93ZWFwb25fMTAwNF9zaG93X3RleC5qc29uXCIsXG4gICAgICAgICAgICBcInJlc291cmNlL3dlYXBvbl8xMDA0X3Nob3cvd2VhcG9uXzEwMDRfc2hvd190ZXgucG5nXCJcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBwcm90ZWN0ZWQgX29uU3RhcnQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2ZhY3RvcnkucGFyc2VEcmFnb25Cb25lc0RhdGEodGhpcy5fcGl4aVJlc291cmNlc1tcInJlc291cmNlL21lY2hhXzEwMDRkX3Nob3cvbWVjaGFfMTAwNGRfc2hvd19za2UuanNvblwiXS5kYXRhKTtcbiAgICAgICAgdGhpcy5fZmFjdG9yeS5wYXJzZVRleHR1cmVBdGxhc0RhdGEodGhpcy5fcGl4aVJlc291cmNlc1tcInJlc291cmNlL21lY2hhXzEwMDRkX3Nob3cvbWVjaGFfMTAwNGRfc2hvd190ZXguanNvblwiXS5kYXRhLCB0aGlzLl9waXhpUmVzb3VyY2VzW1wicmVzb3VyY2UvbWVjaGFfMTAwNGRfc2hvdy9tZWNoYV8xMDA0ZF9zaG93X3RleC5wbmdcIl0udGV4dHVyZSk7XG4gICAgICAgIHRoaXMuX2ZhY3RvcnkucGFyc2VEcmFnb25Cb25lc0RhdGEodGhpcy5fcGl4aVJlc291cmNlc1tcInJlc291cmNlL3dlYXBvbl8xMDA0X3Nob3cvd2VhcG9uXzEwMDRfc2hvd19za2UuanNvblwiXS5kYXRhKTtcbiAgICAgICAgdGhpcy5fZmFjdG9yeS5wYXJzZVRleHR1cmVBdGxhc0RhdGEodGhpcy5fcGl4aVJlc291cmNlc1tcInJlc291cmNlL3dlYXBvbl8xMDA0X3Nob3cvd2VhcG9uXzEwMDRfc2hvd190ZXguanNvblwiXS5kYXRhLCB0aGlzLl9waXhpUmVzb3VyY2VzW1wicmVzb3VyY2Uvd2VhcG9uXzEwMDRfc2hvdy93ZWFwb25fMTAwNF9zaG93X3RleC5wbmdcIl0udGV4dHVyZSk7XG4gICAgICAgIC8vXG4gICAgICAgIHRoaXMuX2FybWF0dXJlRGlzcGxheSA9IHRoaXMuX2ZhY3RvcnkuYnVpbGRBcm1hdHVyZURpc3BsYXkoXCJtZWNoYV8xMDA0ZFwiKTtcbiAgICAgICAgdGhpcy5fYXJtYXR1cmVEaXNwbGF5LmFuaW1hdGlvbi5wbGF5KCk7XG4gICAgICAgIC8vXG4gICAgICAgIHRoaXMuX2FybWF0dXJlRGlzcGxheS54ID0gMTAwLjA7XG4gICAgICAgIHRoaXMuX2FybWF0dXJlRGlzcGxheS55ID0gMjAwLjA7XG4gICAgICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5fYXJtYXR1cmVEaXNwbGF5KTtcbiAgICAgICAgLy9cbiAgICAgICAgdGhpcy5pbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIGNvbnN0IHRvdWNoSGFuZGxlciA9IChldmVudDogUElYSS5pbnRlcmFjdGlvbi5JbnRlcmFjdGlvbkV2ZW50KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBsb2NhbFggPSBldmVudC5kYXRhLmdsb2JhbC54IC0gdGhpcy54O1xuICAgICAgICAgICAgaWYgKGxvY2FsWCA8IC0xNTAuMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3JlcGxhY2VEaXNwbGF5KC0xKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGxvY2FsWCA+IDE1MC4wKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVwbGFjZURpc3BsYXkoMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZXBsYWNlRGlzcGxheSgwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5hZGRMaXN0ZW5lcihcInRvdWNoc3RhcnRcIiwgdG91Y2hIYW5kbGVyLCB0aGlzKTtcbiAgICAgICAgdGhpcy5hZGRMaXN0ZW5lcihcIm1vdXNlZG93blwiLCB0b3VjaEhhbmRsZXIsIHRoaXMpO1xuICAgICAgICAvL1xuICAgICAgICB0aGlzLmNyZWF0ZVRleHQoXCJUb3VjaCBzY3JlZW4gbGVmdCAvIGNlbnRlciAvIHJpZ2h0IHRvIHJlbGFjZSBzbG90IGRpc3BsYXkuXCIpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3JlcGxhY2VEaXNwbGF5KHR5cGU6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBpZiAodHlwZSA9PT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuX3JpZ2h0V2VhcG9uSW5kZXgrKztcbiAgICAgICAgICAgIHRoaXMuX3JpZ2h0V2VhcG9uSW5kZXggJT0gUmVwbGFjZVNsb3REaXNwbGF5LldFQVBPTl9SSUdIVF9MSVNULmxlbmd0aDtcbiAgICAgICAgICAgIGNvbnN0IGRpc3BsYXlOYW1lID0gUmVwbGFjZVNsb3REaXNwbGF5LldFQVBPTl9SSUdIVF9MSVNUW3RoaXMuX3JpZ2h0V2VhcG9uSW5kZXhdO1xuICAgICAgICAgICAgdGhpcy5fZmFjdG9yeS5yZXBsYWNlU2xvdERpc3BsYXkoXCJ3ZWFwb25fMTAwNF9zaG93XCIsIFwid2VhcG9uXCIsIFwid2VhcG9uX3JcIiwgZGlzcGxheU5hbWUsIHRoaXMuX2FybWF0dXJlRGlzcGxheS5hcm1hdHVyZS5nZXRTbG90KFwid2VhcG9uX2hhbmRfclwiKSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZSA9PT0gMSkge1xuICAgICAgICAgICAgdGhpcy5fbGVmdFdlYXBvbkluZGV4Kys7XG4gICAgICAgICAgICB0aGlzLl9sZWZ0V2VhcG9uSW5kZXggJT0gNTtcbiAgICAgICAgICAgIHRoaXMuX2FybWF0dXJlRGlzcGxheS5hcm1hdHVyZS5nZXRTbG90KFwid2VhcG9uX2hhbmRfbFwiKS5kaXNwbGF5SW5kZXggPSB0aGlzLl9sZWZ0V2VhcG9uSW5kZXg7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBsb2dvU2xvdCA9IHRoaXMuX2FybWF0dXJlRGlzcGxheS5hcm1hdHVyZS5nZXRTbG90KFwibG9nb1wiKTtcbiAgICAgICAgICAgIGlmIChsb2dvU2xvdC5kaXNwbGF5ID09PSB0aGlzLl9sb2dvVGV4dCkge1xuICAgICAgICAgICAgICAgIGxvZ29TbG90LmRpc3BsYXkgPSBsb2dvU2xvdC5yYXdEaXNwbGF5O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9sb2dvVGV4dCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9sb2dvVGV4dCA9IG5ldyBQSVhJLlRleHQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9nb1RleHQudGV4dCA9IFwiQ29yZSBFbGVtZW50XCI7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvZ29UZXh0LnBpdm90LnggPSB0aGlzLl9sb2dvVGV4dC53aWR0aCAqIDAuNTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9nb1RleHQucGl2b3QueSA9IHRoaXMuX2xvZ29UZXh0LmhlaWdodCAqIDAuNTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbG9nb1Nsb3QuZGlzcGxheSA9IHRoaXMuX2xvZ29UZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUE7SUFBaUMsc0NBQVE7SUFTckM7UUFBQSxZQUNJLGlCQUFPLFNBVVY7UUFqQk8sc0JBQWdCLEdBQVcsQ0FBQyxDQUFDO1FBQzdCLHVCQUFpQixHQUFXLENBQUMsQ0FBQztRQUNyQixjQUFRLEdBQTRCLFdBQVcsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDO1FBT2pGLEtBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUNoQixxREFBcUQsRUFDckQscURBQXFELEVBQ3JELG9EQUFvRCxFQUNwRCxxREFBcUQsRUFDckQscURBQXFELEVBQ3JELG9EQUFvRCxDQUN2RCxDQUFDOztLQUNMO0lBRVMscUNBQVEsR0FBbEI7UUFBQSxpQkE4QkM7UUE3QkcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLHFEQUFxRCxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDcEgsSUFBSSxDQUFDLFFBQVEsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLHFEQUFxRCxDQUFDLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsb0RBQW9ELENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN4TSxJQUFJLENBQUMsUUFBUSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMscURBQXFELENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwSCxJQUFJLENBQUMsUUFBUSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMscURBQXFELENBQUMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyxvREFBb0QsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDOztRQUV4TSxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUMxRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDOztRQUV2QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUNoQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUNoQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDOztRQUVyQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztRQUN4QixJQUFNLFlBQVksR0FBRyxVQUFDLEtBQXdDO1lBQzFELElBQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxLQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzVDLElBQUksTUFBTSxHQUFHLENBQUMsS0FBSyxFQUFFO2dCQUNqQixLQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDNUI7aUJBQ0ksSUFBSSxNQUFNLEdBQUcsS0FBSyxFQUFFO2dCQUNyQixLQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQzNCO2lCQUNJO2dCQUNELEtBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDM0I7U0FDSixDQUFDO1FBQ0YsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLEVBQUUsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ25ELElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQzs7UUFFbEQsSUFBSSxDQUFDLFVBQVUsQ0FBQyw0REFBNEQsQ0FBQyxDQUFDO0tBQ2pGO0lBRU8sNENBQWUsR0FBdkIsVUFBd0IsSUFBWTtRQUNoQyxJQUFJLElBQUksS0FBSyxDQUFDLENBQUMsRUFBRTtZQUNiLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxpQkFBaUIsSUFBSSxrQkFBa0IsQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUM7WUFDdEUsSUFBTSxXQUFXLEdBQUcsa0JBQWtCLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7WUFDakYsSUFBSSxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxrQkFBa0IsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO1NBQ3BKO2FBQ0ksSUFBSSxJQUFJLEtBQUssQ0FBQyxFQUFFO1lBQ2pCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBQ3hCLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxDQUFDLENBQUM7WUFDM0IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztTQUNoRzthQUNJO1lBQ0QsSUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDaEUsSUFBSSxRQUFRLENBQUMsT0FBTyxLQUFLLElBQUksQ0FBQyxTQUFTLEVBQUU7Z0JBQ3JDLFFBQVEsQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLFVBQVUsQ0FBQzthQUMxQztpQkFDSTtnQkFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRTtvQkFDakIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztvQkFDakMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUcsY0FBYyxDQUFDO29CQUNyQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO29CQUNwRCxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO2lCQUN4RDtnQkFDRCxRQUFRLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7YUFDckM7U0FDSjtLQUNKO0lBaEZ1QixvQ0FBaUIsR0FBYSxDQUFDLGVBQWUsRUFBRSxnQkFBZ0IsRUFBRSxnQkFBZ0IsRUFBRSxnQkFBZ0IsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO0lBaUZwSix5QkFBQztDQUFBLENBbEZnQyxRQUFRLEdBa0Z4Qzs7OzsifQ==