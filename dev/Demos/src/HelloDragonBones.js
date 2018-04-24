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
/**
 * How to use
 * 1. Load data.
 *
 * 2. Parse data.
 *    factory.parseDragonBonesData();
 *    factory.parseTextureAtlasData();
 *
 * 3. Build armature.
 *    armatureDisplay = factory.buildArmatureDisplay("armatureName");
 *
 * 4. Play animation.
 *    armatureDisplay.animation.play("animationName");
 *
 * 5. Add armature to stage.
 *    addChild(armatureDisplay);
 */
var HelloDragonBones = /** @class */ (function (_super) {
    __extends(HelloDragonBones, _super);
    function HelloDragonBones() {
        var _this = _super.call(this) || this;
        _this._resources.push(
        // "resource/mecha_1002_101d_show/mecha_1002_101d_show_ske.json",
        "resource/mecha_1002_101d_show/mecha_1002_101d_show_ske.dbbin", "resource/mecha_1002_101d_show/mecha_1002_101d_show_tex.json", "resource/mecha_1002_101d_show/mecha_1002_101d_show_tex.png");
        return _this;
    }
    HelloDragonBones.prototype._onStart = function () {
        var factory = dragonBones.PixiFactory.factory;
        // factory.parseDragonBonesData(this._pixiResource["resource/mecha_1002_101d_show/mecha_1002_101d_show_ske.json"].data);
        factory.parseDragonBonesData(this._pixiResources["resource/mecha_1002_101d_show/mecha_1002_101d_show_ske.dbbin"].data);
        factory.parseTextureAtlasData(this._pixiResources["resource/mecha_1002_101d_show/mecha_1002_101d_show_tex.json"].data, this._pixiResources["resource/mecha_1002_101d_show/mecha_1002_101d_show_tex.png"].texture);
        var armatureDisplay = factory.buildArmatureDisplay("mecha_1002_101d", "mecha_1002_101d_show");
        armatureDisplay.animation.play("idle");
        armatureDisplay.x = 0.0;
        armatureDisplay.y = 200.0;
        this.addChild(armatureDisplay);
    };
    return HelloDragonBones;
}(BaseDemo));

}());
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSGVsbG9EcmFnb25Cb25lcy50cyIsInNvdXJjZXMiOlsiSGVsbG9EcmFnb25Cb25lcy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEhvdyB0byB1c2VcbiAqIDEuIExvYWQgZGF0YS5cbiAqXG4gKiAyLiBQYXJzZSBkYXRhLlxuICogICAgZmFjdG9yeS5wYXJzZURyYWdvbkJvbmVzRGF0YSgpO1xuICogICAgZmFjdG9yeS5wYXJzZVRleHR1cmVBdGxhc0RhdGEoKTtcbiAqXG4gKiAzLiBCdWlsZCBhcm1hdHVyZS5cbiAqICAgIGFybWF0dXJlRGlzcGxheSA9IGZhY3RvcnkuYnVpbGRBcm1hdHVyZURpc3BsYXkoXCJhcm1hdHVyZU5hbWVcIik7XG4gKlxuICogNC4gUGxheSBhbmltYXRpb24uXG4gKiAgICBhcm1hdHVyZURpc3BsYXkuYW5pbWF0aW9uLnBsYXkoXCJhbmltYXRpb25OYW1lXCIpO1xuICpcbiAqIDUuIEFkZCBhcm1hdHVyZSB0byBzdGFnZS5cbiAqICAgIGFkZENoaWxkKGFybWF0dXJlRGlzcGxheSk7XG4gKi9cbmNsYXNzIEhlbGxvRHJhZ29uQm9uZXMgZXh0ZW5kcyBCYXNlRGVtbyB7XG4gICAgcHVibGljIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIHRoaXMuX3Jlc291cmNlcy5wdXNoKFxuICAgICAgICAgICAgLy8gXCJyZXNvdXJjZS9tZWNoYV8xMDAyXzEwMWRfc2hvdy9tZWNoYV8xMDAyXzEwMWRfc2hvd19za2UuanNvblwiLFxuICAgICAgICAgICAgXCJyZXNvdXJjZS9tZWNoYV8xMDAyXzEwMWRfc2hvdy9tZWNoYV8xMDAyXzEwMWRfc2hvd19za2UuZGJiaW5cIixcbiAgICAgICAgICAgIFwicmVzb3VyY2UvbWVjaGFfMTAwMl8xMDFkX3Nob3cvbWVjaGFfMTAwMl8xMDFkX3Nob3dfdGV4Lmpzb25cIixcbiAgICAgICAgICAgIFwicmVzb3VyY2UvbWVjaGFfMTAwMl8xMDFkX3Nob3cvbWVjaGFfMTAwMl8xMDFkX3Nob3dfdGV4LnBuZ1wiXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcHJvdGVjdGVkIF9vblN0YXJ0KCk6IHZvaWQge1xuICAgICAgICBjb25zdCBmYWN0b3J5ID0gZHJhZ29uQm9uZXMuUGl4aUZhY3RvcnkuZmFjdG9yeTtcbiAgICAgICAgLy8gZmFjdG9yeS5wYXJzZURyYWdvbkJvbmVzRGF0YSh0aGlzLl9waXhpUmVzb3VyY2VbXCJyZXNvdXJjZS9tZWNoYV8xMDAyXzEwMWRfc2hvdy9tZWNoYV8xMDAyXzEwMWRfc2hvd19za2UuanNvblwiXS5kYXRhKTtcbiAgICAgICAgZmFjdG9yeS5wYXJzZURyYWdvbkJvbmVzRGF0YSh0aGlzLl9waXhpUmVzb3VyY2VzW1wicmVzb3VyY2UvbWVjaGFfMTAwMl8xMDFkX3Nob3cvbWVjaGFfMTAwMl8xMDFkX3Nob3dfc2tlLmRiYmluXCJdLmRhdGEpO1xuICAgICAgICBmYWN0b3J5LnBhcnNlVGV4dHVyZUF0bGFzRGF0YSh0aGlzLl9waXhpUmVzb3VyY2VzW1wicmVzb3VyY2UvbWVjaGFfMTAwMl8xMDFkX3Nob3cvbWVjaGFfMTAwMl8xMDFkX3Nob3dfdGV4Lmpzb25cIl0uZGF0YSwgdGhpcy5fcGl4aVJlc291cmNlc1tcInJlc291cmNlL21lY2hhXzEwMDJfMTAxZF9zaG93L21lY2hhXzEwMDJfMTAxZF9zaG93X3RleC5wbmdcIl0udGV4dHVyZSk7XG5cbiAgICAgICAgY29uc3QgYXJtYXR1cmVEaXNwbGF5ID0gZmFjdG9yeS5idWlsZEFybWF0dXJlRGlzcGxheShcIm1lY2hhXzEwMDJfMTAxZFwiLCBcIm1lY2hhXzEwMDJfMTAxZF9zaG93XCIpO1xuICAgICAgICBhcm1hdHVyZURpc3BsYXkuYW5pbWF0aW9uLnBsYXkoXCJpZGxlXCIpO1xuXG4gICAgICAgIGFybWF0dXJlRGlzcGxheS54ID0gMC4wO1xuICAgICAgICBhcm1hdHVyZURpc3BsYXkueSA9IDIwMC4wO1xuICAgICAgICB0aGlzLmFkZENoaWxkKGFybWF0dXJlRGlzcGxheSk7XG4gICAgfVxufSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFpQkE7SUFBK0Isb0NBQVE7SUFDbkM7UUFBQSxZQUNJLGlCQUFPLFNBUVY7UUFORyxLQUFJLENBQUMsVUFBVSxDQUFDLElBQUk7O1FBRWhCLDhEQUE4RCxFQUM5RCw2REFBNkQsRUFDN0QsNERBQTRELENBQy9ELENBQUM7O0tBQ0w7SUFFUyxtQ0FBUSxHQUFsQjtRQUNJLElBQU0sT0FBTyxHQUFHLFdBQVcsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDOztRQUVoRCxPQUFPLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyw4REFBOEQsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3ZILE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLDZEQUE2RCxDQUFDLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsNERBQTRELENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUVsTixJQUFNLGVBQWUsR0FBRyxPQUFPLENBQUMsb0JBQW9CLENBQUMsaUJBQWlCLEVBQUUsc0JBQXNCLENBQUMsQ0FBQztRQUNoRyxlQUFlLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUV2QyxlQUFlLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztRQUN4QixlQUFlLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUMxQixJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0tBQ2xDO0lBQ0wsdUJBQUM7Q0FBQSxDQXpCOEIsUUFBUSxHQXlCdEM7Ozs7In0=