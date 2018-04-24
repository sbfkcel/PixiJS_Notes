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
var coreElement;
(function (coreElement) {
    var Game = /** @class */ (function (_super) {
        __extends(Game, _super);
        function Game() {
            var _this = _super.call(this) || this;
            _this._left = false;
            _this._right = false;
            _this._bullets = [];
            _this._resources.push("resource/mecha_1502b/mecha_1502b_ske.json", "resource/mecha_1502b/mecha_1502b_tex.json", "resource/mecha_1502b/mecha_1502b_tex.png", "resource/skin_1502b/skin_1502b_ske.json", "resource/skin_1502b/skin_1502b_tex.json", "resource/skin_1502b/skin_1502b_tex.png", "resource/weapon_1000/weapon_1000_ske.json", "resource/weapon_1000/weapon_1000_tex.json", "resource/weapon_1000/weapon_1000_tex.png");
            return _this;
        }
        Game.prototype._onStart = function () {
            Game.GROUND = this.stageHeight * 0.5 - 150.0;
            Game.instance = this;
            //
            this.interactive = true;
            this.addListener('touchstart', this._touchHandler, this);
            this.addListener('touchend', this._touchHandler, this);
            this.addListener('touchmove', this._touchHandler, this);
            this.addListener('mousedown', this._touchHandler, this);
            this.addListener('mouseup', this._touchHandler, this);
            this.addListener('mousemove', this._touchHandler, this);
            PIXI.ticker.shared.add(this._enterFrameHandler, this);
            document.addEventListener("keydown", this._keyHandler);
            document.addEventListener("keyup", this._keyHandler);
            //
            this.createText("Press W/A/S/D to move. Press Q/E/SPACE to switch weapons and skin. Touch to aim and fire.");
            //
            var factory = dragonBones.PixiFactory.factory;
            factory.parseDragonBonesData(this._pixiResources["resource/mecha_1502b/mecha_1502b_ske.json"].data);
            factory.parseTextureAtlasData(this._pixiResources["resource/mecha_1502b/mecha_1502b_tex.json"].data, this._pixiResources["resource/mecha_1502b/mecha_1502b_tex.png"].texture);
            factory.parseDragonBonesData(this._pixiResources["resource/skin_1502b/skin_1502b_ske.json"].data);
            factory.parseTextureAtlasData(this._pixiResources["resource/skin_1502b/skin_1502b_tex.json"].data, this._pixiResources["resource/skin_1502b/skin_1502b_tex.png"].texture);
            factory.parseDragonBonesData(this._pixiResources["resource/weapon_1000/weapon_1000_ske.json"].data);
            factory.parseTextureAtlasData(this._pixiResources["resource/weapon_1000/weapon_1000_tex.json"].data, this._pixiResources["resource/weapon_1000/weapon_1000_tex.png"].texture);
            //
            this._player = new Mecha();
        };
        Game.prototype._touchHandler = function (event) {
            this._player.aim(event.data.global.x - this.x, event.data.global.y - this.y);
            if (event.type === 'touchstart' || event.type === 'mousedown') {
                this._player.attack(true);
            }
            else if (event.type === 'touchend' || event.type === 'mouseup') {
                this._player.attack(false);
            }
        };
        Game.prototype._keyHandler = function (event) {
            var isDown = event.type === "keydown";
            switch (event.keyCode) {
                case 37:
                case 65:
                    Game.instance._left = isDown;
                    Game.instance._updateMove(-1);
                    break;
                case 39:
                case 68:
                    Game.instance._right = isDown;
                    Game.instance._updateMove(1);
                    break;
                case 38:
                case 87:
                    if (isDown) {
                        Game.instance._player.jump();
                    }
                    break;
                case 83:
                case 40:
                    Game.instance._player.squat(isDown);
                    break;
                case 81:
                    if (isDown) {
                        Game.instance._player.switchWeaponR();
                    }
                    break;
                case 69:
                    if (isDown) {
                        Game.instance._player.switchWeaponL();
                    }
                    break;
                case 32:
                    if (isDown) {
                        Game.instance._player.switchSkin();
                    }
                    break;
            }
        };
        Game.prototype._enterFrameHandler = function (deltaTime) {
            if (this._player) {
                this._player.update();
            }
            var i = this._bullets.length;
            while (i--) {
                var bullet = this._bullets[i];
                if (bullet.update()) {
                    this._bullets.splice(i, 1);
                }
            }
        };
        Game.prototype._updateMove = function (dir) {
            if (this._left && this._right) {
                this._player.move(dir);
            }
            else if (this._left) {
                this._player.move(-1);
            }
            else if (this._right) {
                this._player.move(1);
            }
            else {
                this._player.move(0);
            }
        };
        Game.prototype.addBullet = function (bullet) {
            this._bullets.push(bullet);
        };
        Game.G = 0.6;
        return Game;
    }(BaseDemo));
    coreElement.Game = Game;
    var Mecha = /** @class */ (function () {
        function Mecha() {
            this._isJumpingA = false;
            this._isSquating = false;
            this._isAttackingA = false;
            this._isAttackingB = false;
            this._weaponRIndex = 0;
            this._weaponLIndex = 0;
            this._skinIndex = 0;
            this._faceDir = 1;
            this._aimDir = 0;
            this._moveDir = 0;
            this._aimRadian = 0.0;
            this._speedX = 0.0;
            this._speedY = 0.0;
            this._aimState = null;
            this._walkState = null;
            this._attackState = null;
            this._target = new PIXI.Point();
            this._helpPoint = new PIXI.Point();
            this._armatureDisplay = dragonBones.PixiFactory.factory.buildArmatureDisplay("mecha_1502b");
            this._armatureDisplay.x = 0.0;
            this._armatureDisplay.y = Game.GROUND;
            this._armature = this._armatureDisplay.armature;
            this._armature.eventDispatcher.addEvent(dragonBones.EventObject.FADE_IN_COMPLETE, this._animationEventHandler, this);
            this._armature.eventDispatcher.addEvent(dragonBones.EventObject.FADE_OUT_COMPLETE, this._animationEventHandler, this);
            this._armature.eventDispatcher.addEvent(dragonBones.EventObject.COMPLETE, this._animationEventHandler, this);
            // Get weapon childArmature.
            this._weaponL = this._armature.getSlot("weapon_l").childArmature;
            this._weaponR = this._armature.getSlot("weapon_r").childArmature;
            this._weaponL.eventDispatcher.addEvent(dragonBones.EventObject.FRAME_EVENT, this._frameEventHandler, this);
            this._weaponR.eventDispatcher.addEvent(dragonBones.EventObject.FRAME_EVENT, this._frameEventHandler, this);
            Game.instance.addChild(this._armatureDisplay);
            this._updateAnimation();
        }
        Mecha.prototype.move = function (dir) {
            if (this._moveDir === dir) {
                return;
            }
            this._moveDir = dir;
            this._updateAnimation();
        };
        Mecha.prototype.jump = function () {
            if (this._isJumpingA) {
                return;
            }
            this._isJumpingA = true;
            this._armature.animation.fadeIn("jump_1", -1.0, -1, 0, Mecha.NORMAL_ANIMATION_GROUP).resetToPose = false;
            this._walkState = null;
        };
        Mecha.prototype.squat = function (isSquating) {
            if (this._isSquating === isSquating) {
                return;
            }
            this._isSquating = isSquating;
            this._updateAnimation();
        };
        Mecha.prototype.attack = function (isAttacking) {
            if (this._isAttackingA === isAttacking) {
                return;
            }
            this._isAttackingA = isAttacking;
        };
        Mecha.prototype.switchWeaponL = function () {
            this._weaponL.eventDispatcher.removeEvent(dragonBones.EventObject.FRAME_EVENT, this._frameEventHandler, this);
            this._weaponLIndex++;
            this._weaponLIndex %= Mecha.WEAPON_L_LIST.length;
            var weaponName = Mecha.WEAPON_L_LIST[this._weaponLIndex];
            this._weaponL = dragonBones.PixiFactory.factory.buildArmature(weaponName);
            this._armature.getSlot("weapon_l").childArmature = this._weaponL;
            this._weaponL.eventDispatcher.addEvent(dragonBones.EventObject.FRAME_EVENT, this._frameEventHandler, this);
        };
        Mecha.prototype.switchWeaponR = function () {
            this._weaponR.eventDispatcher.removeEvent(dragonBones.EventObject.FRAME_EVENT, this._frameEventHandler, this);
            this._weaponRIndex++;
            this._weaponRIndex %= Mecha.WEAPON_R_LIST.length;
            var weaponName = Mecha.WEAPON_R_LIST[this._weaponRIndex];
            this._weaponR = dragonBones.PixiFactory.factory.buildArmature(weaponName);
            this._armature.getSlot("weapon_r").childArmature = this._weaponR;
            this._weaponR.eventDispatcher.addEvent(dragonBones.EventObject.FRAME_EVENT, this._frameEventHandler, this);
        };
        Mecha.prototype.switchSkin = function () {
            this._skinIndex++;
            this._skinIndex %= Mecha.SKINS.length;
            var skinName = Mecha.SKINS[this._skinIndex];
            var skinData = dragonBones.PixiFactory.factory.getArmatureData(skinName).defaultSkin;
            dragonBones.PixiFactory.factory.replaceSkin(this._armature, skinData, false, ["weapon_l", "weapon_r"]);
        };
        Mecha.prototype.aim = function (x, y) {
            this._target.x = x;
            this._target.y = y;
        };
        Mecha.prototype.update = function () {
            this._updatePosition();
            this._updateAim();
            this._updateAttack();
        };
        Mecha.prototype._animationEventHandler = function (event) {
            switch (event.type) {
                case dragonBones.EventObject.FADE_IN_COMPLETE:
                    if (event.animationState.name === "jump_1") {
                        this._speedY = -Mecha.JUMP_SPEED;
                        if (this._moveDir !== 0) {
                            if (this._moveDir * this._faceDir > 0) {
                                this._speedX = Mecha.MAX_MOVE_SPEED_FRONT * this._faceDir;
                            }
                            else {
                                this._speedX = -Mecha.MAX_MOVE_SPEED_BACK * this._faceDir;
                            }
                        }
                        this._armature.animation.fadeIn("jump_2", -1.0, -1, 0, Mecha.NORMAL_ANIMATION_GROUP).resetToPose = false;
                    }
                    break;
                case dragonBones.EventObject.FADE_OUT_COMPLETE:
                    if (event.animationState.name === "attack_01") {
                        this._isAttackingB = false;
                        this._attackState = null;
                    }
                    break;
                case dragonBones.EventObject.COMPLETE:
                    if (event.animationState.name === "jump_4") {
                        this._isJumpingA = false;
                        this._updateAnimation();
                    }
                    break;
            }
        };
        Mecha.prototype._frameEventHandler = function (event) {
            if (event.name === "fire") {
                this._helpPoint.x = event.bone.global.x;
                this._helpPoint.y = event.bone.global.y;
                event.armature.display.toGlobal(this._helpPoint, this._helpPoint);
                this._helpPoint.x -= Game.instance.x;
                this._helpPoint.y -= Game.instance.y;
                this._fire(this._helpPoint);
            }
        };
        Mecha.prototype._fire = function (firePoint) {
            var radian = this._faceDir < 0 ? Math.PI - this._aimRadian : this._aimRadian;
            var bullet = new Bullet("bullet_01", "fire_effect_01", radian + Math.random() * 0.02 - 0.01, 40, firePoint);
            Game.instance.addBullet(bullet);
        };
        Mecha.prototype._updateAnimation = function () {
            if (this._isJumpingA) {
                return;
            }
            if (this._isSquating) {
                this._speedX = 0;
                this._armature.animation.fadeIn("squat", -1.0, -1, 0, Mecha.NORMAL_ANIMATION_GROUP).resetToPose = false;
                this._walkState = null;
                return;
            }
            if (this._moveDir === 0) {
                this._speedX = 0;
                this._armature.animation.fadeIn("idle", -1.0, -1, 0, Mecha.NORMAL_ANIMATION_GROUP).resetToPose = false;
                this._walkState = null;
            }
            else {
                if (this._walkState === null) {
                    this._walkState = this._armature.animation.fadeIn("walk", -1.0, -1, 0, Mecha.NORMAL_ANIMATION_GROUP);
                    this._walkState.resetToPose = false;
                }
                if (this._moveDir * this._faceDir > 0) {
                    this._walkState.timeScale = Mecha.MAX_MOVE_SPEED_FRONT / Mecha.NORMALIZE_MOVE_SPEED;
                }
                else {
                    this._walkState.timeScale = -Mecha.MAX_MOVE_SPEED_BACK / Mecha.NORMALIZE_MOVE_SPEED;
                }
                if (this._moveDir * this._faceDir > 0) {
                    this._speedX = Mecha.MAX_MOVE_SPEED_FRONT * this._faceDir;
                }
                else {
                    this._speedX = -Mecha.MAX_MOVE_SPEED_BACK * this._faceDir;
                }
            }
        };
        Mecha.prototype._updatePosition = function () {
            if (this._speedX !== 0.0) {
                this._armatureDisplay.x += this._speedX;
                if (this._armatureDisplay.x < -Game.instance.stageWidth * 0.5) {
                    this._armatureDisplay.x = -Game.instance.stageWidth * 0.5;
                }
                else if (this._armatureDisplay.x > Game.instance.stageWidth * 0.5) {
                    this._armatureDisplay.x = Game.instance.stageWidth * 0.5;
                }
            }
            if (this._speedY !== 0.0) {
                if (this._speedY < 5.0 && this._speedY + Game.G >= 5.0) {
                    this._armature.animation.fadeIn("jump_3", -1.0, -1, 0, Mecha.NORMAL_ANIMATION_GROUP).resetToPose = false;
                }
                this._speedY += Game.G;
                this._armatureDisplay.y += this._speedY;
                if (this._armatureDisplay.y > Game.GROUND) {
                    this._armatureDisplay.y = Game.GROUND;
                    this._speedY = 0.0;
                    this._armature.animation.fadeIn("jump_4", -1.0, -1, 0, Mecha.NORMAL_ANIMATION_GROUP).resetToPose = false;
                }
            }
        };
        Mecha.prototype._updateAim = function () {
            this._faceDir = this._target.x > this._armatureDisplay.x ? 1 : -1;
            if (this._armatureDisplay.armature.flipX !== this._faceDir < 0) {
                this._armatureDisplay.armature.flipX = !this._armatureDisplay.armature.flipX;
                if (this._moveDir !== 0) {
                    this._updateAnimation();
                }
            }
            var aimOffsetY = this._armature.getBone("chest").global.y * this._armatureDisplay.scale.y;
            if (this._faceDir > 0) {
                this._aimRadian = Math.atan2(this._target.y - this._armatureDisplay.y - aimOffsetY, this._target.x - this._armatureDisplay.x);
            }
            else {
                this._aimRadian = Math.PI - Math.atan2(this._target.y - this._armatureDisplay.y - aimOffsetY, this._target.x - this._armatureDisplay.x);
                if (this._aimRadian > Math.PI) {
                    this._aimRadian -= Math.PI * 2.0;
                }
            }
            var aimDir = 0;
            if (this._aimRadian > 0.0) {
                aimDir = -1;
            }
            else {
                aimDir = 1;
            }
            if (this._aimState === null || this._aimDir !== aimDir) {
                this._aimDir = aimDir;
                // Animation mixing.
                if (this._aimDir >= 0) {
                    this._aimState = this._armature.animation.fadeIn("aim_up", -1.0, -1, 0, Mecha.AIM_ANIMATION_GROUP);
                }
                else {
                    this._aimState = this._armature.animation.fadeIn("aim_down", -1.0, -1, 0, Mecha.AIM_ANIMATION_GROUP);
                }
                this._aimState.resetToPose = false;
            }
            this._aimState.weight = Math.abs(this._aimRadian / Math.PI * 2);
            this._armature.invalidUpdate();
        };
        Mecha.prototype._updateAttack = function () {
            if (!this._isAttackingA || this._isAttackingB) {
                return;
            }
            this._isAttackingB = true;
            this._attackState = this._armature.animation.fadeIn("attack_01", -1.0, -1, 0, Mecha.ATTACK_ANIMATION_GROUP);
            this._attackState.resetToPose = false;
            this._attackState.autoFadeOutTime = 0.1;
        };
        Mecha.JUMP_SPEED = 20;
        Mecha.NORMALIZE_MOVE_SPEED = 3.6;
        Mecha.MAX_MOVE_SPEED_FRONT = Mecha.NORMALIZE_MOVE_SPEED * 1.4;
        Mecha.MAX_MOVE_SPEED_BACK = Mecha.NORMALIZE_MOVE_SPEED * 1.0;
        Mecha.NORMAL_ANIMATION_GROUP = "normal";
        Mecha.AIM_ANIMATION_GROUP = "aim";
        Mecha.ATTACK_ANIMATION_GROUP = "attack";
        Mecha.WEAPON_L_LIST = ["weapon_1502b_l", "weapon_1005", "weapon_1005b", "weapon_1005c", "weapon_1005d", "weapon_1005e"];
        Mecha.WEAPON_R_LIST = ["weapon_1502b_r", "weapon_1005", "weapon_1005b", "weapon_1005c", "weapon_1005d"];
        Mecha.SKINS = ["mecha_1502b", "skin_a", "skin_b", "skin_c"];
        return Mecha;
    }());
    var Bullet = /** @class */ (function () {
        function Bullet(armatureName, effectArmatureName, radian, speed, position) {
            this._speedX = 0.0;
            this._speedY = 0.0;
            this._effecDisplay = null;
            this._speedX = Math.cos(radian) * speed;
            this._speedY = Math.sin(radian) * speed;
            this._armatureDisplay = dragonBones.PixiFactory.factory.buildArmatureDisplay(armatureName);
            this._armatureDisplay.x = position.x + Math.random() * 2 - 1;
            this._armatureDisplay.y = position.y + Math.random() * 2 - 1;
            this._armatureDisplay.rotation = radian;
            if (effectArmatureName !== null) {
                this._effecDisplay = dragonBones.PixiFactory.factory.buildArmatureDisplay(effectArmatureName);
                this._effecDisplay.rotation = radian;
                this._effecDisplay.x = this._armatureDisplay.x;
                this._effecDisplay.y = this._armatureDisplay.y;
                this._effecDisplay.scale.x = 1.0 + Math.random() * 1.0;
                this._effecDisplay.scale.y = 1.0 + Math.random() * 0.5;
                if (Math.random() < 0.5) {
                    this._effecDisplay.scale.y *= -1.0;
                }
                Game.instance.addChild(this._effecDisplay);
                this._effecDisplay.animation.play("idle");
            }
            Game.instance.addChild(this._armatureDisplay);
            this._armatureDisplay.animation.play("idle");
        }
        Bullet.prototype.update = function () {
            this._armatureDisplay.x += this._speedX;
            this._armatureDisplay.y += this._speedY;
            if (this._armatureDisplay.x < -Game.instance.stageWidth * 0.5 - 100.0 || this._armatureDisplay.x > Game.instance.stageWidth * 0.5 + 100.0 ||
                this._armatureDisplay.y < -Game.instance.stageHeight * 0.5 - 100.0 || this._armatureDisplay.y > Game.instance.stageHeight * 0.5 + 100.0) {
                Game.instance.removeChild(this._armatureDisplay);
                this._armatureDisplay.dispose();
                if (this._effecDisplay !== null) {
                    Game.instance.removeChild(this._effecDisplay);
                    this._effecDisplay.dispose();
                }
                return true;
            }
            return false;
        };
        return Bullet;
    }());
})(coreElement || (coreElement = {}));

}());
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29yZUVsZW1lbnQudHMiLCJzb3VyY2VzIjpbIkNvcmVFbGVtZW50LnRzIl0sInNvdXJjZXNDb250ZW50IjpbIm5hbWVzcGFjZSBjb3JlRWxlbWVudCB7XG4gICAgdHlwZSBQb2ludFR5cGUgPSBQSVhJLlBvaW50O1xuICAgIHR5cGUgQXJtYXR1cmVEaXNwbGF5VHlwZSA9IGRyYWdvbkJvbmVzLlBpeGlBcm1hdHVyZURpc3BsYXk7XG4gICAgdHlwZSBFdmVudFR5cGUgPSBkcmFnb25Cb25lcy5FdmVudE9iamVjdDtcblxuICAgIGV4cG9ydCBjbGFzcyBHYW1lIGV4dGVuZHMgQmFzZURlbW8ge1xuICAgICAgICBwdWJsaWMgc3RhdGljIEdST1VORDogbnVtYmVyO1xuICAgICAgICBwdWJsaWMgc3RhdGljIEc6IG51bWJlciA9IDAuNjtcbiAgICAgICAgcHVibGljIHN0YXRpYyBpbnN0YW5jZTogR2FtZTtcblxuICAgICAgICBwcml2YXRlIF9sZWZ0OiBib29sZWFuID0gZmFsc2U7XG4gICAgICAgIHByaXZhdGUgX3JpZ2h0OiBib29sZWFuID0gZmFsc2U7XG4gICAgICAgIHByaXZhdGUgX3BsYXllcjogTWVjaGE7XG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgX2J1bGxldHM6IEFycmF5PEJ1bGxldD4gPSBbXTtcblxuICAgICAgICBwdWJsaWMgY29uc3RydWN0b3IoKSB7XG4gICAgICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgICAgICB0aGlzLl9yZXNvdXJjZXMucHVzaChcbiAgICAgICAgICAgICAgICBcInJlc291cmNlL21lY2hhXzE1MDJiL21lY2hhXzE1MDJiX3NrZS5qc29uXCIsXG4gICAgICAgICAgICAgICAgXCJyZXNvdXJjZS9tZWNoYV8xNTAyYi9tZWNoYV8xNTAyYl90ZXguanNvblwiLFxuICAgICAgICAgICAgICAgIFwicmVzb3VyY2UvbWVjaGFfMTUwMmIvbWVjaGFfMTUwMmJfdGV4LnBuZ1wiLFxuICAgICAgICAgICAgICAgIFwicmVzb3VyY2Uvc2tpbl8xNTAyYi9za2luXzE1MDJiX3NrZS5qc29uXCIsXG4gICAgICAgICAgICAgICAgXCJyZXNvdXJjZS9za2luXzE1MDJiL3NraW5fMTUwMmJfdGV4Lmpzb25cIixcbiAgICAgICAgICAgICAgICBcInJlc291cmNlL3NraW5fMTUwMmIvc2tpbl8xNTAyYl90ZXgucG5nXCIsXG4gICAgICAgICAgICAgICAgXCJyZXNvdXJjZS93ZWFwb25fMTAwMC93ZWFwb25fMTAwMF9za2UuanNvblwiLFxuICAgICAgICAgICAgICAgIFwicmVzb3VyY2Uvd2VhcG9uXzEwMDAvd2VhcG9uXzEwMDBfdGV4Lmpzb25cIixcbiAgICAgICAgICAgICAgICBcInJlc291cmNlL3dlYXBvbl8xMDAwL3dlYXBvbl8xMDAwX3RleC5wbmdcIlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByb3RlY3RlZCBfb25TdGFydCgpOiB2b2lkIHtcbiAgICAgICAgICAgIEdhbWUuR1JPVU5EID0gdGhpcy5zdGFnZUhlaWdodCAqIDAuNSAtIDE1MC4wO1xuICAgICAgICAgICAgR2FtZS5pbnN0YW5jZSA9IHRoaXM7XG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgdGhpcy5pbnRlcmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmFkZExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgdGhpcy5fdG91Y2hIYW5kbGVyLCB0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuYWRkTGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy5fdG91Y2hIYW5kbGVyLCB0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuYWRkTGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMuX3RvdWNoSGFuZGxlciwgdGhpcyk7XG4gICAgICAgICAgICB0aGlzLmFkZExpc3RlbmVyKCdtb3VzZWRvd24nLCB0aGlzLl90b3VjaEhhbmRsZXIsIHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5hZGRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuX3RvdWNoSGFuZGxlciwgdGhpcyk7XG4gICAgICAgICAgICB0aGlzLmFkZExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLl90b3VjaEhhbmRsZXIsIHRoaXMpO1xuICAgICAgICAgICAgUElYSS50aWNrZXIuc2hhcmVkLmFkZCh0aGlzLl9lbnRlckZyYW1lSGFuZGxlciwgdGhpcyk7XG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCB0aGlzLl9rZXlIYW5kbGVyKTtcbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCB0aGlzLl9rZXlIYW5kbGVyKTtcbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVRleHQoXCJQcmVzcyBXL0EvUy9EIHRvIG1vdmUuIFByZXNzIFEvRS9TUEFDRSB0byBzd2l0Y2ggd2VhcG9ucyBhbmQgc2tpbi4gVG91Y2ggdG8gYWltIGFuZCBmaXJlLlwiKTtcbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICBjb25zdCBmYWN0b3J5ID0gZHJhZ29uQm9uZXMuUGl4aUZhY3RvcnkuZmFjdG9yeTtcbiAgICAgICAgICAgIGZhY3RvcnkucGFyc2VEcmFnb25Cb25lc0RhdGEodGhpcy5fcGl4aVJlc291cmNlc1tcInJlc291cmNlL21lY2hhXzE1MDJiL21lY2hhXzE1MDJiX3NrZS5qc29uXCJdLmRhdGEpO1xuICAgICAgICAgICAgZmFjdG9yeS5wYXJzZVRleHR1cmVBdGxhc0RhdGEodGhpcy5fcGl4aVJlc291cmNlc1tcInJlc291cmNlL21lY2hhXzE1MDJiL21lY2hhXzE1MDJiX3RleC5qc29uXCJdLmRhdGEsIHRoaXMuX3BpeGlSZXNvdXJjZXNbXCJyZXNvdXJjZS9tZWNoYV8xNTAyYi9tZWNoYV8xNTAyYl90ZXgucG5nXCJdLnRleHR1cmUpO1xuICAgICAgICAgICAgZmFjdG9yeS5wYXJzZURyYWdvbkJvbmVzRGF0YSh0aGlzLl9waXhpUmVzb3VyY2VzW1wicmVzb3VyY2Uvc2tpbl8xNTAyYi9za2luXzE1MDJiX3NrZS5qc29uXCJdLmRhdGEpO1xuICAgICAgICAgICAgZmFjdG9yeS5wYXJzZVRleHR1cmVBdGxhc0RhdGEodGhpcy5fcGl4aVJlc291cmNlc1tcInJlc291cmNlL3NraW5fMTUwMmIvc2tpbl8xNTAyYl90ZXguanNvblwiXS5kYXRhLCB0aGlzLl9waXhpUmVzb3VyY2VzW1wicmVzb3VyY2Uvc2tpbl8xNTAyYi9za2luXzE1MDJiX3RleC5wbmdcIl0udGV4dHVyZSk7XG4gICAgICAgICAgICBmYWN0b3J5LnBhcnNlRHJhZ29uQm9uZXNEYXRhKHRoaXMuX3BpeGlSZXNvdXJjZXNbXCJyZXNvdXJjZS93ZWFwb25fMTAwMC93ZWFwb25fMTAwMF9za2UuanNvblwiXS5kYXRhKTtcbiAgICAgICAgICAgIGZhY3RvcnkucGFyc2VUZXh0dXJlQXRsYXNEYXRhKHRoaXMuX3BpeGlSZXNvdXJjZXNbXCJyZXNvdXJjZS93ZWFwb25fMTAwMC93ZWFwb25fMTAwMF90ZXguanNvblwiXS5kYXRhLCB0aGlzLl9waXhpUmVzb3VyY2VzW1wicmVzb3VyY2Uvd2VhcG9uXzEwMDAvd2VhcG9uXzEwMDBfdGV4LnBuZ1wiXS50ZXh0dXJlKTtcbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICB0aGlzLl9wbGF5ZXIgPSBuZXcgTWVjaGEoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX3RvdWNoSGFuZGxlcihldmVudDogUElYSS5pbnRlcmFjdGlvbi5JbnRlcmFjdGlvbkV2ZW50KTogdm9pZCB7XG4gICAgICAgICAgICB0aGlzLl9wbGF5ZXIuYWltKGV2ZW50LmRhdGEuZ2xvYmFsLnggLSB0aGlzLngsIGV2ZW50LmRhdGEuZ2xvYmFsLnkgLSB0aGlzLnkpO1xuXG4gICAgICAgICAgICBpZiAoZXZlbnQudHlwZSA9PT0gJ3RvdWNoc3RhcnQnIHx8IGV2ZW50LnR5cGUgPT09ICdtb3VzZWRvd24nKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcGxheWVyLmF0dGFjayh0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGV2ZW50LnR5cGUgPT09ICd0b3VjaGVuZCcgfHwgZXZlbnQudHlwZSA9PT0gJ21vdXNldXAnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcGxheWVyLmF0dGFjayhmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF9rZXlIYW5kbGVyKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgICAgICAgICBjb25zdCBpc0Rvd24gPSBldmVudC50eXBlID09PSBcImtleWRvd25cIjtcbiAgICAgICAgICAgIHN3aXRjaCAoZXZlbnQua2V5Q29kZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgMzc6XG4gICAgICAgICAgICAgICAgY2FzZSA2NTpcbiAgICAgICAgICAgICAgICAgICAgR2FtZS5pbnN0YW5jZS5fbGVmdCA9IGlzRG93bjtcbiAgICAgICAgICAgICAgICAgICAgR2FtZS5pbnN0YW5jZS5fdXBkYXRlTW92ZSgtMSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAzOTpcbiAgICAgICAgICAgICAgICBjYXNlIDY4OlxuICAgICAgICAgICAgICAgICAgICBHYW1lLmluc3RhbmNlLl9yaWdodCA9IGlzRG93bjtcbiAgICAgICAgICAgICAgICAgICAgR2FtZS5pbnN0YW5jZS5fdXBkYXRlTW92ZSgxKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlIDM4OlxuICAgICAgICAgICAgICAgIGNhc2UgODc6XG4gICAgICAgICAgICAgICAgICAgIGlmIChpc0Rvd24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIEdhbWUuaW5zdGFuY2UuX3BsYXllci5qdW1wKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlIDgzOlxuICAgICAgICAgICAgICAgIGNhc2UgNDA6XG4gICAgICAgICAgICAgICAgICAgIEdhbWUuaW5zdGFuY2UuX3BsYXllci5zcXVhdChpc0Rvd24pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgODE6XG4gICAgICAgICAgICAgICAgICAgIGlmIChpc0Rvd24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIEdhbWUuaW5zdGFuY2UuX3BsYXllci5zd2l0Y2hXZWFwb25SKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlIDY5OlxuICAgICAgICAgICAgICAgICAgICBpZiAoaXNEb3duKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBHYW1lLmluc3RhbmNlLl9wbGF5ZXIuc3dpdGNoV2VhcG9uTCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAzMjpcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzRG93bikge1xuICAgICAgICAgICAgICAgICAgICAgICAgR2FtZS5pbnN0YW5jZS5fcGxheWVyLnN3aXRjaFNraW4oKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX2VudGVyRnJhbWVIYW5kbGVyKGRlbHRhVGltZTogbnVtYmVyKTogdm9pZCB7IC8vIE1ha2Ugc3VyZSBnYW1lIHVwZGF0ZSBiZWZvcmUgZHJhZ29uQm9uZXMgdXBkYXRlLlxuICAgICAgICAgICAgaWYgKHRoaXMuX3BsYXllcikge1xuICAgICAgICAgICAgICAgIHRoaXMuX3BsYXllci51cGRhdGUoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IGkgPSB0aGlzLl9idWxsZXRzLmxlbmd0aDtcbiAgICAgICAgICAgIHdoaWxlIChpLS0pIHtcbiAgICAgICAgICAgICAgICBjb25zdCBidWxsZXQgPSB0aGlzLl9idWxsZXRzW2ldO1xuICAgICAgICAgICAgICAgIGlmIChidWxsZXQudXBkYXRlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYnVsbGV0cy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfdXBkYXRlTW92ZShkaXI6IG51bWJlcik6IHZvaWQge1xuICAgICAgICAgICAgaWYgKHRoaXMuX2xlZnQgJiYgdGhpcy5fcmlnaHQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9wbGF5ZXIubW92ZShkaXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5fbGVmdCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3BsYXllci5tb3ZlKC0xKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuX3JpZ2h0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcGxheWVyLm1vdmUoMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9wbGF5ZXIubW92ZSgwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBhZGRCdWxsZXQoYnVsbGV0OiBCdWxsZXQpOiB2b2lkIHtcbiAgICAgICAgICAgIHRoaXMuX2J1bGxldHMucHVzaChidWxsZXQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xhc3MgTWVjaGEge1xuICAgICAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBKVU1QX1NQRUVEOiBudW1iZXIgPSAyMDtcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgTk9STUFMSVpFX01PVkVfU1BFRUQ6IG51bWJlciA9IDMuNjtcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgTUFYX01PVkVfU1BFRURfRlJPTlQ6IG51bWJlciA9IE1lY2hhLk5PUk1BTElaRV9NT1ZFX1NQRUVEICogMS40O1xuICAgICAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBNQVhfTU9WRV9TUEVFRF9CQUNLOiBudW1iZXIgPSBNZWNoYS5OT1JNQUxJWkVfTU9WRV9TUEVFRCAqIDEuMDtcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgTk9STUFMX0FOSU1BVElPTl9HUk9VUDogc3RyaW5nID0gXCJub3JtYWxcIjtcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgQUlNX0FOSU1BVElPTl9HUk9VUDogc3RyaW5nID0gXCJhaW1cIjtcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgQVRUQUNLX0FOSU1BVElPTl9HUk9VUDogc3RyaW5nID0gXCJhdHRhY2tcIjtcbiAgICAgICAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgV0VBUE9OX0xfTElTVDogQXJyYXk8c3RyaW5nPiA9IFtcIndlYXBvbl8xNTAyYl9sXCIsIFwid2VhcG9uXzEwMDVcIiwgXCJ3ZWFwb25fMTAwNWJcIiwgXCJ3ZWFwb25fMTAwNWNcIiwgXCJ3ZWFwb25fMTAwNWRcIiwgXCJ3ZWFwb25fMTAwNWVcIl07XG4gICAgICAgIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IFdFQVBPTl9SX0xJU1Q6IEFycmF5PHN0cmluZz4gPSBbXCJ3ZWFwb25fMTUwMmJfclwiLCBcIndlYXBvbl8xMDA1XCIsIFwid2VhcG9uXzEwMDViXCIsIFwid2VhcG9uXzEwMDVjXCIsIFwid2VhcG9uXzEwMDVkXCJdO1xuICAgICAgICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBTS0lOUzogQXJyYXk8c3RyaW5nPiA9IFtcIm1lY2hhXzE1MDJiXCIsIFwic2tpbl9hXCIsIFwic2tpbl9iXCIsIFwic2tpbl9jXCJdO1xuXG4gICAgICAgIHByaXZhdGUgX2lzSnVtcGluZ0E6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAgICAgcHJpdmF0ZSBfaXNTcXVhdGluZzogYm9vbGVhbiA9IGZhbHNlO1xuICAgICAgICBwcml2YXRlIF9pc0F0dGFja2luZ0E6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAgICAgcHJpdmF0ZSBfaXNBdHRhY2tpbmdCOiBib29sZWFuID0gZmFsc2U7XG4gICAgICAgIHByaXZhdGUgX3dlYXBvblJJbmRleDogbnVtYmVyID0gMDtcbiAgICAgICAgcHJpdmF0ZSBfd2VhcG9uTEluZGV4OiBudW1iZXIgPSAwO1xuICAgICAgICBwcml2YXRlIF9za2luSW5kZXg6IG51bWJlciA9IDA7XG4gICAgICAgIHByaXZhdGUgX2ZhY2VEaXI6IG51bWJlciA9IDE7XG4gICAgICAgIHByaXZhdGUgX2FpbURpcjogbnVtYmVyID0gMDtcbiAgICAgICAgcHJpdmF0ZSBfbW92ZURpcjogbnVtYmVyID0gMDtcbiAgICAgICAgcHJpdmF0ZSBfYWltUmFkaWFuOiBudW1iZXIgPSAwLjA7XG4gICAgICAgIHByaXZhdGUgX3NwZWVkWDogbnVtYmVyID0gMC4wO1xuICAgICAgICBwcml2YXRlIF9zcGVlZFk6IG51bWJlciA9IDAuMDtcbiAgICAgICAgcHJpdmF0ZSBfYXJtYXR1cmU6IGRyYWdvbkJvbmVzLkFybWF0dXJlO1xuICAgICAgICBwcml2YXRlIF9hcm1hdHVyZURpc3BsYXk6IEFybWF0dXJlRGlzcGxheVR5cGU7XG4gICAgICAgIHByaXZhdGUgX3dlYXBvbkw6IGRyYWdvbkJvbmVzLkFybWF0dXJlO1xuICAgICAgICBwcml2YXRlIF93ZWFwb25SOiBkcmFnb25Cb25lcy5Bcm1hdHVyZTtcbiAgICAgICAgcHJpdmF0ZSBfYWltU3RhdGU6IGRyYWdvbkJvbmVzLkFuaW1hdGlvblN0YXRlIHwgbnVsbCA9IG51bGw7XG4gICAgICAgIHByaXZhdGUgX3dhbGtTdGF0ZTogZHJhZ29uQm9uZXMuQW5pbWF0aW9uU3RhdGUgfCBudWxsID0gbnVsbDtcbiAgICAgICAgcHJpdmF0ZSBfYXR0YWNrU3RhdGU6IGRyYWdvbkJvbmVzLkFuaW1hdGlvblN0YXRlIHwgbnVsbCA9IG51bGw7XG4gICAgICAgIHByaXZhdGUgcmVhZG9ubHkgX3RhcmdldDogUG9pbnRUeXBlID0gbmV3IFBJWEkuUG9pbnQoKTtcbiAgICAgICAgcHJpdmF0ZSByZWFkb25seSBfaGVscFBvaW50OiBQb2ludFR5cGUgPSBuZXcgUElYSS5Qb2ludCgpO1xuXG4gICAgICAgIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgICAgIHRoaXMuX2FybWF0dXJlRGlzcGxheSA9IGRyYWdvbkJvbmVzLlBpeGlGYWN0b3J5LmZhY3RvcnkuYnVpbGRBcm1hdHVyZURpc3BsYXkoXCJtZWNoYV8xNTAyYlwiKTtcbiAgICAgICAgICAgIHRoaXMuX2FybWF0dXJlRGlzcGxheS54ID0gMC4wO1xuICAgICAgICAgICAgdGhpcy5fYXJtYXR1cmVEaXNwbGF5LnkgPSBHYW1lLkdST1VORDtcbiAgICAgICAgICAgIHRoaXMuX2FybWF0dXJlID0gdGhpcy5fYXJtYXR1cmVEaXNwbGF5LmFybWF0dXJlO1xuICAgICAgICAgICAgdGhpcy5fYXJtYXR1cmUuZXZlbnREaXNwYXRjaGVyLmFkZEV2ZW50KGRyYWdvbkJvbmVzLkV2ZW50T2JqZWN0LkZBREVfSU5fQ09NUExFVEUsIHRoaXMuX2FuaW1hdGlvbkV2ZW50SGFuZGxlciwgdGhpcyk7XG4gICAgICAgICAgICB0aGlzLl9hcm1hdHVyZS5ldmVudERpc3BhdGNoZXIuYWRkRXZlbnQoZHJhZ29uQm9uZXMuRXZlbnRPYmplY3QuRkFERV9PVVRfQ09NUExFVEUsIHRoaXMuX2FuaW1hdGlvbkV2ZW50SGFuZGxlciwgdGhpcyk7XG4gICAgICAgICAgICB0aGlzLl9hcm1hdHVyZS5ldmVudERpc3BhdGNoZXIuYWRkRXZlbnQoZHJhZ29uQm9uZXMuRXZlbnRPYmplY3QuQ09NUExFVEUsIHRoaXMuX2FuaW1hdGlvbkV2ZW50SGFuZGxlciwgdGhpcyk7XG5cbiAgICAgICAgICAgIC8vIEdldCB3ZWFwb24gY2hpbGRBcm1hdHVyZS5cbiAgICAgICAgICAgIHRoaXMuX3dlYXBvbkwgPSB0aGlzLl9hcm1hdHVyZS5nZXRTbG90KFwid2VhcG9uX2xcIikuY2hpbGRBcm1hdHVyZTtcbiAgICAgICAgICAgIHRoaXMuX3dlYXBvblIgPSB0aGlzLl9hcm1hdHVyZS5nZXRTbG90KFwid2VhcG9uX3JcIikuY2hpbGRBcm1hdHVyZTtcbiAgICAgICAgICAgIHRoaXMuX3dlYXBvbkwuZXZlbnREaXNwYXRjaGVyLmFkZEV2ZW50KGRyYWdvbkJvbmVzLkV2ZW50T2JqZWN0LkZSQU1FX0VWRU5ULCB0aGlzLl9mcmFtZUV2ZW50SGFuZGxlciwgdGhpcyk7XG4gICAgICAgICAgICB0aGlzLl93ZWFwb25SLmV2ZW50RGlzcGF0Y2hlci5hZGRFdmVudChkcmFnb25Cb25lcy5FdmVudE9iamVjdC5GUkFNRV9FVkVOVCwgdGhpcy5fZnJhbWVFdmVudEhhbmRsZXIsIHRoaXMpO1xuXG4gICAgICAgICAgICBHYW1lLmluc3RhbmNlLmFkZENoaWxkKHRoaXMuX2FybWF0dXJlRGlzcGxheSk7XG4gICAgICAgICAgICB0aGlzLl91cGRhdGVBbmltYXRpb24oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBtb3ZlKGRpcjogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgICAgICBpZiAodGhpcy5fbW92ZURpciA9PT0gZGlyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl9tb3ZlRGlyID0gZGlyO1xuICAgICAgICAgICAgdGhpcy5fdXBkYXRlQW5pbWF0aW9uKCk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMganVtcCgpOiB2b2lkIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9pc0p1bXBpbmdBKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl9pc0p1bXBpbmdBID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuX2FybWF0dXJlLmFuaW1hdGlvbi5mYWRlSW4oXG4gICAgICAgICAgICAgICAgXCJqdW1wXzFcIiwgLTEuMCwgLTEsXG4gICAgICAgICAgICAgICAgMCwgTWVjaGEuTk9STUFMX0FOSU1BVElPTl9HUk9VUFxuICAgICAgICAgICAgKS5yZXNldFRvUG9zZSA9IGZhbHNlO1xuXG4gICAgICAgICAgICB0aGlzLl93YWxrU3RhdGUgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHNxdWF0KGlzU3F1YXRpbmc6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9pc1NxdWF0aW5nID09PSBpc1NxdWF0aW5nKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl9pc1NxdWF0aW5nID0gaXNTcXVhdGluZztcbiAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUFuaW1hdGlvbigpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIGF0dGFjayhpc0F0dGFja2luZzogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICAgICAgaWYgKHRoaXMuX2lzQXR0YWNraW5nQSA9PT0gaXNBdHRhY2tpbmcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX2lzQXR0YWNraW5nQSA9IGlzQXR0YWNraW5nO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHN3aXRjaFdlYXBvbkwoKTogdm9pZCB7XG4gICAgICAgICAgICB0aGlzLl93ZWFwb25MLmV2ZW50RGlzcGF0Y2hlci5yZW1vdmVFdmVudChkcmFnb25Cb25lcy5FdmVudE9iamVjdC5GUkFNRV9FVkVOVCwgdGhpcy5fZnJhbWVFdmVudEhhbmRsZXIsIHRoaXMpO1xuXG4gICAgICAgICAgICB0aGlzLl93ZWFwb25MSW5kZXgrKztcbiAgICAgICAgICAgIHRoaXMuX3dlYXBvbkxJbmRleCAlPSBNZWNoYS5XRUFQT05fTF9MSVNULmxlbmd0aDtcbiAgICAgICAgICAgIGNvbnN0IHdlYXBvbk5hbWUgPSBNZWNoYS5XRUFQT05fTF9MSVNUW3RoaXMuX3dlYXBvbkxJbmRleF07XG4gICAgICAgICAgICB0aGlzLl93ZWFwb25MID0gZHJhZ29uQm9uZXMuUGl4aUZhY3RvcnkuZmFjdG9yeS5idWlsZEFybWF0dXJlKHdlYXBvbk5hbWUpO1xuICAgICAgICAgICAgdGhpcy5fYXJtYXR1cmUuZ2V0U2xvdChcIndlYXBvbl9sXCIpLmNoaWxkQXJtYXR1cmUgPSB0aGlzLl93ZWFwb25MO1xuICAgICAgICAgICAgdGhpcy5fd2VhcG9uTC5ldmVudERpc3BhdGNoZXIuYWRkRXZlbnQoZHJhZ29uQm9uZXMuRXZlbnRPYmplY3QuRlJBTUVfRVZFTlQsIHRoaXMuX2ZyYW1lRXZlbnRIYW5kbGVyLCB0aGlzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBzd2l0Y2hXZWFwb25SKCk6IHZvaWQge1xuICAgICAgICAgICAgdGhpcy5fd2VhcG9uUi5ldmVudERpc3BhdGNoZXIucmVtb3ZlRXZlbnQoZHJhZ29uQm9uZXMuRXZlbnRPYmplY3QuRlJBTUVfRVZFTlQsIHRoaXMuX2ZyYW1lRXZlbnRIYW5kbGVyLCB0aGlzKTtcblxuICAgICAgICAgICAgdGhpcy5fd2VhcG9uUkluZGV4Kys7XG4gICAgICAgICAgICB0aGlzLl93ZWFwb25SSW5kZXggJT0gTWVjaGEuV0VBUE9OX1JfTElTVC5sZW5ndGg7XG4gICAgICAgICAgICBjb25zdCB3ZWFwb25OYW1lID0gTWVjaGEuV0VBUE9OX1JfTElTVFt0aGlzLl93ZWFwb25SSW5kZXhdO1xuICAgICAgICAgICAgdGhpcy5fd2VhcG9uUiA9IGRyYWdvbkJvbmVzLlBpeGlGYWN0b3J5LmZhY3RvcnkuYnVpbGRBcm1hdHVyZSh3ZWFwb25OYW1lKTtcbiAgICAgICAgICAgIHRoaXMuX2FybWF0dXJlLmdldFNsb3QoXCJ3ZWFwb25fclwiKS5jaGlsZEFybWF0dXJlID0gdGhpcy5fd2VhcG9uUjtcbiAgICAgICAgICAgIHRoaXMuX3dlYXBvblIuZXZlbnREaXNwYXRjaGVyLmFkZEV2ZW50KGRyYWdvbkJvbmVzLkV2ZW50T2JqZWN0LkZSQU1FX0VWRU5ULCB0aGlzLl9mcmFtZUV2ZW50SGFuZGxlciwgdGhpcyk7XG4gICAgICAgIH1cblxuICAgICAgICBwdWJsaWMgc3dpdGNoU2tpbigpOiB2b2lkIHtcbiAgICAgICAgICAgIHRoaXMuX3NraW5JbmRleCsrO1xuICAgICAgICAgICAgdGhpcy5fc2tpbkluZGV4ICU9IE1lY2hhLlNLSU5TLmxlbmd0aDtcbiAgICAgICAgICAgIGNvbnN0IHNraW5OYW1lID0gTWVjaGEuU0tJTlNbdGhpcy5fc2tpbkluZGV4XTtcbiAgICAgICAgICAgIGNvbnN0IHNraW5EYXRhID0gZHJhZ29uQm9uZXMuUGl4aUZhY3RvcnkuZmFjdG9yeS5nZXRBcm1hdHVyZURhdGEoc2tpbk5hbWUpLmRlZmF1bHRTa2luO1xuICAgICAgICAgICAgZHJhZ29uQm9uZXMuUGl4aUZhY3RvcnkuZmFjdG9yeS5yZXBsYWNlU2tpbih0aGlzLl9hcm1hdHVyZSwgc2tpbkRhdGEsIGZhbHNlLCBbXCJ3ZWFwb25fbFwiLCBcIndlYXBvbl9yXCJdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBhaW0oeDogbnVtYmVyLCB5OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgICAgIHRoaXMuX3RhcmdldC54ID0geDtcbiAgICAgICAgICAgIHRoaXMuX3RhcmdldC55ID0geTtcbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyB1cGRhdGUoKTogdm9pZCB7XG4gICAgICAgICAgICB0aGlzLl91cGRhdGVQb3NpdGlvbigpO1xuICAgICAgICAgICAgdGhpcy5fdXBkYXRlQWltKCk7XG4gICAgICAgICAgICB0aGlzLl91cGRhdGVBdHRhY2soKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX2FuaW1hdGlvbkV2ZW50SGFuZGxlcihldmVudDogRXZlbnRUeXBlKTogdm9pZCB7XG4gICAgICAgICAgICBzd2l0Y2ggKGV2ZW50LnR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlIGRyYWdvbkJvbmVzLkV2ZW50T2JqZWN0LkZBREVfSU5fQ09NUExFVEU6XG4gICAgICAgICAgICAgICAgICAgIGlmIChldmVudC5hbmltYXRpb25TdGF0ZS5uYW1lID09PSBcImp1bXBfMVwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zcGVlZFkgPSAtTWVjaGEuSlVNUF9TUEVFRDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX21vdmVEaXIgIT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5fbW92ZURpciAqIHRoaXMuX2ZhY2VEaXIgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3NwZWVkWCA9IE1lY2hhLk1BWF9NT1ZFX1NQRUVEX0ZST05UICogdGhpcy5fZmFjZURpcjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3NwZWVkWCA9IC1NZWNoYS5NQVhfTU9WRV9TUEVFRF9CQUNLICogdGhpcy5fZmFjZURpcjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2FybWF0dXJlLmFuaW1hdGlvbi5mYWRlSW4oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJqdW1wXzJcIiwgLTEuMCwgLTEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgMCwgTWVjaGEuTk9STUFMX0FOSU1BVElPTl9HUk9VUFxuICAgICAgICAgICAgICAgICAgICAgICAgKS5yZXNldFRvUG9zZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSBkcmFnb25Cb25lcy5FdmVudE9iamVjdC5GQURFX09VVF9DT01QTEVURTpcbiAgICAgICAgICAgICAgICAgICAgaWYgKGV2ZW50LmFuaW1hdGlvblN0YXRlLm5hbWUgPT09IFwiYXR0YWNrXzAxXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2lzQXR0YWNraW5nQiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fYXR0YWNrU3RhdGUgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSBkcmFnb25Cb25lcy5FdmVudE9iamVjdC5DT01QTEVURTpcbiAgICAgICAgICAgICAgICAgICAgaWYgKGV2ZW50LmFuaW1hdGlvblN0YXRlLm5hbWUgPT09IFwianVtcF80XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2lzSnVtcGluZ0EgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3VwZGF0ZUFuaW1hdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcHJpdmF0ZSBfZnJhbWVFdmVudEhhbmRsZXIoZXZlbnQ6IEV2ZW50VHlwZSk6IHZvaWQge1xuICAgICAgICAgICAgaWYgKGV2ZW50Lm5hbWUgPT09IFwiZmlyZVwiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5faGVscFBvaW50LnggPSBldmVudC5ib25lLmdsb2JhbC54O1xuICAgICAgICAgICAgICAgIHRoaXMuX2hlbHBQb2ludC55ID0gZXZlbnQuYm9uZS5nbG9iYWwueTtcbiAgICAgICAgICAgICAgICAoZXZlbnQuYXJtYXR1cmUuZGlzcGxheSBhcyBBcm1hdHVyZURpc3BsYXlUeXBlKS50b0dsb2JhbCh0aGlzLl9oZWxwUG9pbnQsIHRoaXMuX2hlbHBQb2ludCk7XG4gICAgICAgICAgICAgICAgdGhpcy5faGVscFBvaW50LnggLT0gR2FtZS5pbnN0YW5jZS54O1xuICAgICAgICAgICAgICAgIHRoaXMuX2hlbHBQb2ludC55IC09IEdhbWUuaW5zdGFuY2UueTtcbiAgICAgICAgICAgICAgICB0aGlzLl9maXJlKHRoaXMuX2hlbHBQb2ludCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF9maXJlKGZpcmVQb2ludDogUG9pbnRUeXBlKTogdm9pZCB7XG4gICAgICAgICAgICBjb25zdCByYWRpYW4gPSB0aGlzLl9mYWNlRGlyIDwgMCA/IE1hdGguUEkgLSB0aGlzLl9haW1SYWRpYW4gOiB0aGlzLl9haW1SYWRpYW47XG4gICAgICAgICAgICBjb25zdCBidWxsZXQgPSBuZXcgQnVsbGV0KFwiYnVsbGV0XzAxXCIsIFwiZmlyZV9lZmZlY3RfMDFcIiwgcmFkaWFuICsgTWF0aC5yYW5kb20oKSAqIDAuMDIgLSAwLjAxLCA0MCwgZmlyZVBvaW50KTtcbiAgICAgICAgICAgIEdhbWUuaW5zdGFuY2UuYWRkQnVsbGV0KGJ1bGxldCk7XG4gICAgICAgIH1cblxuICAgICAgICBwcml2YXRlIF91cGRhdGVBbmltYXRpb24oKTogdm9pZCB7XG4gICAgICAgICAgICBpZiAodGhpcy5faXNKdW1waW5nQSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuX2lzU3F1YXRpbmcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zcGVlZFggPSAwO1xuICAgICAgICAgICAgICAgIHRoaXMuX2FybWF0dXJlLmFuaW1hdGlvbi5mYWRlSW4oXG4gICAgICAgICAgICAgICAgICAgIFwic3F1YXRcIiwgLTEuMCwgLTEsXG4gICAgICAgICAgICAgICAgICAgIDAsIE1lY2hhLk5PUk1BTF9BTklNQVRJT05fR1JPVVBcbiAgICAgICAgICAgICAgICApLnJlc2V0VG9Qb3NlID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICB0aGlzLl93YWxrU3RhdGUgPSBudWxsO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuX21vdmVEaXIgPT09IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zcGVlZFggPSAwO1xuICAgICAgICAgICAgICAgIHRoaXMuX2FybWF0dXJlLmFuaW1hdGlvbi5mYWRlSW4oXG4gICAgICAgICAgICAgICAgICAgIFwiaWRsZVwiLCAtMS4wLCAtMSwgMCxcbiAgICAgICAgICAgICAgICAgICAgTWVjaGEuTk9STUFMX0FOSU1BVElPTl9HUk9VUFxuICAgICAgICAgICAgICAgICkucmVzZXRUb1Bvc2UgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIHRoaXMuX3dhbGtTdGF0ZSA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fd2Fsa1N0YXRlID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3dhbGtTdGF0ZSA9IHRoaXMuX2FybWF0dXJlLmFuaW1hdGlvbi5mYWRlSW4oXG4gICAgICAgICAgICAgICAgICAgICAgICBcIndhbGtcIiwgLTEuMCwgLTEsXG4gICAgICAgICAgICAgICAgICAgICAgICAwLCBNZWNoYS5OT1JNQUxfQU5JTUFUSU9OX0dST1VQXG4gICAgICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fd2Fsa1N0YXRlLnJlc2V0VG9Qb3NlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX21vdmVEaXIgKiB0aGlzLl9mYWNlRGlyID4gMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl93YWxrU3RhdGUudGltZVNjYWxlID0gTWVjaGEuTUFYX01PVkVfU1BFRURfRlJPTlQgLyBNZWNoYS5OT1JNQUxJWkVfTU9WRV9TUEVFRDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3dhbGtTdGF0ZS50aW1lU2NhbGUgPSAtTWVjaGEuTUFYX01PVkVfU1BFRURfQkFDSyAvIE1lY2hhLk5PUk1BTElaRV9NT1ZFX1NQRUVEO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9tb3ZlRGlyICogdGhpcy5fZmFjZURpciA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3BlZWRYID0gTWVjaGEuTUFYX01PVkVfU1BFRURfRlJPTlQgKiB0aGlzLl9mYWNlRGlyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc3BlZWRYID0gLU1lY2hhLk1BWF9NT1ZFX1NQRUVEX0JBQ0sgKiB0aGlzLl9mYWNlRGlyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX3VwZGF0ZVBvc2l0aW9uKCk6IHZvaWQge1xuICAgICAgICAgICAgaWYgKHRoaXMuX3NwZWVkWCAhPT0gMC4wKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fYXJtYXR1cmVEaXNwbGF5LnggKz0gdGhpcy5fc3BlZWRYO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9hcm1hdHVyZURpc3BsYXkueCA8IC1HYW1lLmluc3RhbmNlLnN0YWdlV2lkdGggKiAwLjUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYXJtYXR1cmVEaXNwbGF5LnggPSAtR2FtZS5pbnN0YW5jZS5zdGFnZVdpZHRoICogMC41O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLl9hcm1hdHVyZURpc3BsYXkueCA+IEdhbWUuaW5zdGFuY2Uuc3RhZ2VXaWR0aCAqIDAuNSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9hcm1hdHVyZURpc3BsYXkueCA9IEdhbWUuaW5zdGFuY2Uuc3RhZ2VXaWR0aCAqIDAuNTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLl9zcGVlZFkgIT09IDAuMCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLl9zcGVlZFkgPCA1LjAgJiYgdGhpcy5fc3BlZWRZICsgR2FtZS5HID49IDUuMCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9hcm1hdHVyZS5hbmltYXRpb24uZmFkZUluKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJqdW1wXzNcIiwgLTEuMCwgLTEsIDBcbiAgICAgICAgICAgICAgICAgICAgICAgICwgTWVjaGEuTk9STUFMX0FOSU1BVElPTl9HUk9VUFxuICAgICAgICAgICAgICAgICAgICApLnJlc2V0VG9Qb3NlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5fc3BlZWRZICs9IEdhbWUuRztcbiAgICAgICAgICAgICAgICB0aGlzLl9hcm1hdHVyZURpc3BsYXkueSArPSB0aGlzLl9zcGVlZFk7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fYXJtYXR1cmVEaXNwbGF5LnkgPiBHYW1lLkdST1VORCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9hcm1hdHVyZURpc3BsYXkueSA9IEdhbWUuR1JPVU5EO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zcGVlZFkgPSAwLjA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2FybWF0dXJlLmFuaW1hdGlvbi5mYWRlSW4oXG4gICAgICAgICAgICAgICAgICAgICAgICBcImp1bXBfNFwiLCAtMS4wLCAtMSxcbiAgICAgICAgICAgICAgICAgICAgICAgIDAsIE1lY2hhLk5PUk1BTF9BTklNQVRJT05fR1JPVVBcbiAgICAgICAgICAgICAgICAgICAgKS5yZXNldFRvUG9zZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX3VwZGF0ZUFpbSgpOiB2b2lkIHtcbiAgICAgICAgICAgIHRoaXMuX2ZhY2VEaXIgPSB0aGlzLl90YXJnZXQueCA+IHRoaXMuX2FybWF0dXJlRGlzcGxheS54ID8gMSA6IC0xO1xuICAgICAgICAgICAgaWYgKHRoaXMuX2FybWF0dXJlRGlzcGxheS5hcm1hdHVyZS5mbGlwWCAhPT0gdGhpcy5fZmFjZURpciA8IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9hcm1hdHVyZURpc3BsYXkuYXJtYXR1cmUuZmxpcFggPSAhdGhpcy5fYXJtYXR1cmVEaXNwbGF5LmFybWF0dXJlLmZsaXBYO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX21vdmVEaXIgIT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdXBkYXRlQW5pbWF0aW9uKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBhaW1PZmZzZXRZID0gdGhpcy5fYXJtYXR1cmUuZ2V0Qm9uZShcImNoZXN0XCIpLmdsb2JhbC55ICogdGhpcy5fYXJtYXR1cmVEaXNwbGF5LnNjYWxlLnk7XG4gICAgICAgICAgICBpZiAodGhpcy5fZmFjZURpciA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9haW1SYWRpYW4gPSBNYXRoLmF0YW4yKHRoaXMuX3RhcmdldC55IC0gdGhpcy5fYXJtYXR1cmVEaXNwbGF5LnkgLSBhaW1PZmZzZXRZLCB0aGlzLl90YXJnZXQueCAtIHRoaXMuX2FybWF0dXJlRGlzcGxheS54KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX2FpbVJhZGlhbiA9IE1hdGguUEkgLSBNYXRoLmF0YW4yKHRoaXMuX3RhcmdldC55IC0gdGhpcy5fYXJtYXR1cmVEaXNwbGF5LnkgLSBhaW1PZmZzZXRZLCB0aGlzLl90YXJnZXQueCAtIHRoaXMuX2FybWF0dXJlRGlzcGxheS54KTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fYWltUmFkaWFuID4gTWF0aC5QSSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9haW1SYWRpYW4gLT0gTWF0aC5QSSAqIDIuMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBhaW1EaXIgPSAwO1xuICAgICAgICAgICAgaWYgKHRoaXMuX2FpbVJhZGlhbiA+IDAuMCkge1xuICAgICAgICAgICAgICAgIGFpbURpciA9IC0xO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgYWltRGlyID0gMTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuX2FpbVN0YXRlID09PSBudWxsIHx8IHRoaXMuX2FpbURpciAhPT0gYWltRGlyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fYWltRGlyID0gYWltRGlyO1xuXG4gICAgICAgICAgICAgICAgLy8gQW5pbWF0aW9uIG1peGluZy5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fYWltRGlyID49IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYWltU3RhdGUgPSB0aGlzLl9hcm1hdHVyZS5hbmltYXRpb24uZmFkZUluKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJhaW1fdXBcIiwgLTEuMCwgLTEsXG4gICAgICAgICAgICAgICAgICAgICAgICAwLCBNZWNoYS5BSU1fQU5JTUFUSU9OX0dST1VQXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9haW1TdGF0ZSA9IHRoaXMuX2FybWF0dXJlLmFuaW1hdGlvbi5mYWRlSW4oXG4gICAgICAgICAgICAgICAgICAgICAgICBcImFpbV9kb3duXCIsIC0xLjAsIC0xLFxuICAgICAgICAgICAgICAgICAgICAgICAgMCwgTWVjaGEuQUlNX0FOSU1BVElPTl9HUk9VUFxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuX2FpbVN0YXRlLnJlc2V0VG9Qb3NlID0gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX2FpbVN0YXRlLndlaWdodCA9IE1hdGguYWJzKHRoaXMuX2FpbVJhZGlhbiAvIE1hdGguUEkgKiAyKTtcbiAgICAgICAgICAgIHRoaXMuX2FybWF0dXJlLmludmFsaWRVcGRhdGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHByaXZhdGUgX3VwZGF0ZUF0dGFjaygpOiB2b2lkIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5faXNBdHRhY2tpbmdBIHx8IHRoaXMuX2lzQXR0YWNraW5nQikge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5faXNBdHRhY2tpbmdCID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuX2F0dGFja1N0YXRlID0gdGhpcy5fYXJtYXR1cmUuYW5pbWF0aW9uLmZhZGVJbihcbiAgICAgICAgICAgICAgICBcImF0dGFja18wMVwiLCAtMS4wLCAtMSxcbiAgICAgICAgICAgICAgICAwLCBNZWNoYS5BVFRBQ0tfQU5JTUFUSU9OX0dST1VQXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICB0aGlzLl9hdHRhY2tTdGF0ZS5yZXNldFRvUG9zZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5fYXR0YWNrU3RhdGUuYXV0b0ZhZGVPdXRUaW1lID0gMC4xO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xhc3MgQnVsbGV0IHtcbiAgICAgICAgcHJpdmF0ZSBfc3BlZWRYOiBudW1iZXIgPSAwLjA7XG4gICAgICAgIHByaXZhdGUgX3NwZWVkWTogbnVtYmVyID0gMC4wO1xuXG4gICAgICAgIHByaXZhdGUgX2FybWF0dXJlRGlzcGxheTogQXJtYXR1cmVEaXNwbGF5VHlwZTtcbiAgICAgICAgcHJpdmF0ZSBfZWZmZWNEaXNwbGF5OiBBcm1hdHVyZURpc3BsYXlUeXBlIHwgbnVsbCA9IG51bGw7XG5cbiAgICAgICAgcHVibGljIGNvbnN0cnVjdG9yKGFybWF0dXJlTmFtZTogc3RyaW5nLCBlZmZlY3RBcm1hdHVyZU5hbWU6IHN0cmluZyB8IG51bGwsIHJhZGlhbjogbnVtYmVyLCBzcGVlZDogbnVtYmVyLCBwb3NpdGlvbjogUG9pbnRUeXBlKSB7XG4gICAgICAgICAgICB0aGlzLl9zcGVlZFggPSBNYXRoLmNvcyhyYWRpYW4pICogc3BlZWQ7XG4gICAgICAgICAgICB0aGlzLl9zcGVlZFkgPSBNYXRoLnNpbihyYWRpYW4pICogc3BlZWQ7XG5cbiAgICAgICAgICAgIHRoaXMuX2FybWF0dXJlRGlzcGxheSA9IGRyYWdvbkJvbmVzLlBpeGlGYWN0b3J5LmZhY3RvcnkuYnVpbGRBcm1hdHVyZURpc3BsYXkoYXJtYXR1cmVOYW1lKTtcbiAgICAgICAgICAgIHRoaXMuX2FybWF0dXJlRGlzcGxheS54ID0gcG9zaXRpb24ueCArIE1hdGgucmFuZG9tKCkgKiAyIC0gMTtcbiAgICAgICAgICAgIHRoaXMuX2FybWF0dXJlRGlzcGxheS55ID0gcG9zaXRpb24ueSArIE1hdGgucmFuZG9tKCkgKiAyIC0gMTtcbiAgICAgICAgICAgIHRoaXMuX2FybWF0dXJlRGlzcGxheS5yb3RhdGlvbiA9IHJhZGlhbjtcblxuICAgICAgICAgICAgaWYgKGVmZmVjdEFybWF0dXJlTmFtZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2VmZmVjRGlzcGxheSA9IGRyYWdvbkJvbmVzLlBpeGlGYWN0b3J5LmZhY3RvcnkuYnVpbGRBcm1hdHVyZURpc3BsYXkoZWZmZWN0QXJtYXR1cmVOYW1lKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9lZmZlY0Rpc3BsYXkucm90YXRpb24gPSByYWRpYW47XG4gICAgICAgICAgICAgICAgdGhpcy5fZWZmZWNEaXNwbGF5LnggPSB0aGlzLl9hcm1hdHVyZURpc3BsYXkueDtcbiAgICAgICAgICAgICAgICB0aGlzLl9lZmZlY0Rpc3BsYXkueSA9IHRoaXMuX2FybWF0dXJlRGlzcGxheS55O1xuICAgICAgICAgICAgICAgIHRoaXMuX2VmZmVjRGlzcGxheS5zY2FsZS54ID0gMS4wICsgTWF0aC5yYW5kb20oKSAqIDEuMDtcbiAgICAgICAgICAgICAgICB0aGlzLl9lZmZlY0Rpc3BsYXkuc2NhbGUueSA9IDEuMCArIE1hdGgucmFuZG9tKCkgKiAwLjU7XG5cbiAgICAgICAgICAgICAgICBpZiAoTWF0aC5yYW5kb20oKSA8IDAuNSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9lZmZlY0Rpc3BsYXkuc2NhbGUueSAqPSAtMS4wO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIEdhbWUuaW5zdGFuY2UuYWRkQ2hpbGQodGhpcy5fZWZmZWNEaXNwbGF5KTtcbiAgICAgICAgICAgICAgICB0aGlzLl9lZmZlY0Rpc3BsYXkuYW5pbWF0aW9uLnBsYXkoXCJpZGxlXCIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBHYW1lLmluc3RhbmNlLmFkZENoaWxkKHRoaXMuX2FybWF0dXJlRGlzcGxheSk7XG4gICAgICAgICAgICB0aGlzLl9hcm1hdHVyZURpc3BsYXkuYW5pbWF0aW9uLnBsYXkoXCJpZGxlXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHVwZGF0ZSgpOiBib29sZWFuIHtcbiAgICAgICAgICAgIHRoaXMuX2FybWF0dXJlRGlzcGxheS54ICs9IHRoaXMuX3NwZWVkWDtcbiAgICAgICAgICAgIHRoaXMuX2FybWF0dXJlRGlzcGxheS55ICs9IHRoaXMuX3NwZWVkWTtcblxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIHRoaXMuX2FybWF0dXJlRGlzcGxheS54IDwgLUdhbWUuaW5zdGFuY2Uuc3RhZ2VXaWR0aCAqIDAuNSAtIDEwMC4wIHx8IHRoaXMuX2FybWF0dXJlRGlzcGxheS54ID4gR2FtZS5pbnN0YW5jZS5zdGFnZVdpZHRoICogMC41ICsgMTAwLjAgfHxcbiAgICAgICAgICAgICAgICB0aGlzLl9hcm1hdHVyZURpc3BsYXkueSA8IC1HYW1lLmluc3RhbmNlLnN0YWdlSGVpZ2h0ICogMC41IC0gMTAwLjAgfHwgdGhpcy5fYXJtYXR1cmVEaXNwbGF5LnkgPiBHYW1lLmluc3RhbmNlLnN0YWdlSGVpZ2h0ICogMC41ICsgMTAwLjBcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIEdhbWUuaW5zdGFuY2UucmVtb3ZlQ2hpbGQodGhpcy5fYXJtYXR1cmVEaXNwbGF5KTtcbiAgICAgICAgICAgICAgICB0aGlzLl9hcm1hdHVyZURpc3BsYXkuZGlzcG9zZSgpO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuX2VmZmVjRGlzcGxheSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBHYW1lLmluc3RhbmNlLnJlbW92ZUNoaWxkKHRoaXMuX2VmZmVjRGlzcGxheSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2VmZmVjRGlzcGxheS5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbn0iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBLElBQVUsV0FBVyxDQXdpQnBCO0FBeGlCRCxXQUFVLFdBQVc7SUFLakI7UUFBMEIsd0JBQVE7UUFVOUI7WUFBQSxZQUNJLGlCQUFPLFNBYVY7WUFuQk8sV0FBSyxHQUFZLEtBQUssQ0FBQztZQUN2QixZQUFNLEdBQVksS0FBSyxDQUFDO1lBRWYsY0FBUSxHQUFrQixFQUFFLENBQUM7WUFLMUMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQ2hCLDJDQUEyQyxFQUMzQywyQ0FBMkMsRUFDM0MsMENBQTBDLEVBQzFDLHlDQUF5QyxFQUN6Qyx5Q0FBeUMsRUFDekMsd0NBQXdDLEVBQ3hDLDJDQUEyQyxFQUMzQywyQ0FBMkMsRUFDM0MsMENBQTBDLENBQzdDLENBQUM7O1NBQ0w7UUFFUyx1QkFBUSxHQUFsQjtZQUNJLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFdBQVcsR0FBRyxHQUFHLEdBQUcsS0FBSyxDQUFDO1lBQzdDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDOztZQUVyQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztZQUN4QixJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3pELElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDdkQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUN4RCxJQUFJLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3hELElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDdEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUN4RCxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3RELFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3ZELFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDOztZQUVyRCxJQUFJLENBQUMsVUFBVSxDQUFDLDJGQUEyRixDQUFDLENBQUM7O1lBRTdHLElBQU0sT0FBTyxHQUFHLFdBQVcsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDO1lBQ2hELE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLDJDQUEyQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDcEcsT0FBTyxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsMkNBQTJDLENBQUMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQywwQ0FBMEMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzlLLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLHlDQUF5QyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbEcsT0FBTyxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMseUNBQXlDLENBQUMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzFLLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLDJDQUEyQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDcEcsT0FBTyxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsMkNBQTJDLENBQUMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLGNBQWMsQ0FBQywwQ0FBMEMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDOztZQUU5SyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksS0FBSyxFQUFFLENBQUM7U0FDOUI7UUFFTyw0QkFBYSxHQUFyQixVQUFzQixLQUF3QztZQUMxRCxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBRTdFLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxZQUFZLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxXQUFXLEVBQUU7Z0JBQzNELElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQzdCO2lCQUNJLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxVQUFVLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxTQUFTLEVBQUU7Z0JBQzVELElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQzlCO1NBQ0o7UUFFTywwQkFBVyxHQUFuQixVQUFvQixLQUFvQjtZQUNwQyxJQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsSUFBSSxLQUFLLFNBQVMsQ0FBQztZQUN4QyxRQUFRLEtBQUssQ0FBQyxPQUFPO2dCQUNqQixLQUFLLEVBQUUsQ0FBQztnQkFDUixLQUFLLEVBQUU7b0JBQ0gsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDO29CQUM3QixJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUM5QixNQUFNO2dCQUVWLEtBQUssRUFBRSxDQUFDO2dCQUNSLEtBQUssRUFBRTtvQkFDSCxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7b0JBQzlCLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUM3QixNQUFNO2dCQUVWLEtBQUssRUFBRSxDQUFDO2dCQUNSLEtBQUssRUFBRTtvQkFDSCxJQUFJLE1BQU0sRUFBRTt3QkFDUixJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztxQkFDaEM7b0JBQ0QsTUFBTTtnQkFFVixLQUFLLEVBQUUsQ0FBQztnQkFDUixLQUFLLEVBQUU7b0JBQ0gsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUNwQyxNQUFNO2dCQUVWLEtBQUssRUFBRTtvQkFDSCxJQUFJLE1BQU0sRUFBRTt3QkFDUixJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxhQUFhLEVBQUUsQ0FBQztxQkFDekM7b0JBQ0QsTUFBTTtnQkFFVixLQUFLLEVBQUU7b0JBQ0gsSUFBSSxNQUFNLEVBQUU7d0JBQ1IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLENBQUM7cUJBQ3pDO29CQUNELE1BQU07Z0JBRVYsS0FBSyxFQUFFO29CQUNILElBQUksTUFBTSxFQUFFO3dCQUNSLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxDQUFDO3FCQUN0QztvQkFDRCxNQUFNO2FBQ2I7U0FDSjtRQUVPLGlDQUFrQixHQUExQixVQUEyQixTQUFpQjtZQUN4QyxJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQ2QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQzthQUN6QjtZQUVELElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDO1lBQzdCLE9BQU8sQ0FBQyxFQUFFLEVBQUU7Z0JBQ1IsSUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDaEMsSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFLEVBQUU7b0JBQ2pCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztpQkFDOUI7YUFDSjtTQUNKO1FBRU8sMEJBQVcsR0FBbkIsVUFBb0IsR0FBVztZQUMzQixJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDM0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDMUI7aUJBQ0ksSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNqQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3pCO2lCQUNJLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtnQkFDbEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDeEI7aUJBQ0k7Z0JBQ0QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDeEI7U0FDSjtRQUVNLHdCQUFTLEdBQWhCLFVBQWlCLE1BQWM7WUFDM0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDOUI7UUE3SWEsTUFBQyxHQUFXLEdBQUcsQ0FBQztRQThJbEMsV0FBQztLQUFBLENBaEp5QixRQUFRLEdBZ0pqQztJQWhKWSxnQkFBSSxPQWdKaEIsQ0FBQTtJQUVEO1FBbUNJO1lBdkJRLGdCQUFXLEdBQVksS0FBSyxDQUFDO1lBQzdCLGdCQUFXLEdBQVksS0FBSyxDQUFDO1lBQzdCLGtCQUFhLEdBQVksS0FBSyxDQUFDO1lBQy9CLGtCQUFhLEdBQVksS0FBSyxDQUFDO1lBQy9CLGtCQUFhLEdBQVcsQ0FBQyxDQUFDO1lBQzFCLGtCQUFhLEdBQVcsQ0FBQyxDQUFDO1lBQzFCLGVBQVUsR0FBVyxDQUFDLENBQUM7WUFDdkIsYUFBUSxHQUFXLENBQUMsQ0FBQztZQUNyQixZQUFPLEdBQVcsQ0FBQyxDQUFDO1lBQ3BCLGFBQVEsR0FBVyxDQUFDLENBQUM7WUFDckIsZUFBVSxHQUFXLEdBQUcsQ0FBQztZQUN6QixZQUFPLEdBQVcsR0FBRyxDQUFDO1lBQ3RCLFlBQU8sR0FBVyxHQUFHLENBQUM7WUFLdEIsY0FBUyxHQUFzQyxJQUFJLENBQUM7WUFDcEQsZUFBVSxHQUFzQyxJQUFJLENBQUM7WUFDckQsaUJBQVksR0FBc0MsSUFBSSxDQUFDO1lBQzlDLFlBQU8sR0FBYyxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUN0QyxlQUFVLEdBQWMsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7WUFHdEQsSUFBSSxDQUFDLGdCQUFnQixHQUFHLFdBQVcsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLG9CQUFvQixDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQzVGLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBQzlCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztZQUN0QyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUM7WUFDaEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLHNCQUFzQixFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3JILElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUN0SCxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLHNCQUFzQixFQUFFLElBQUksQ0FBQyxDQUFDOztZQUc3RyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLGFBQWEsQ0FBQztZQUNqRSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLGFBQWEsQ0FBQztZQUNqRSxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixFQUFFLElBQUksQ0FBQyxDQUFDO1lBQzNHLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFFM0csSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDOUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7U0FDM0I7UUFFTSxvQkFBSSxHQUFYLFVBQVksR0FBVztZQUNuQixJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssR0FBRyxFQUFFO2dCQUN2QixPQUFPO2FBQ1Y7WUFFRCxJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQztZQUNwQixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztTQUMzQjtRQUVNLG9CQUFJLEdBQVg7WUFDSSxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7Z0JBQ2xCLE9BQU87YUFDVjtZQUVELElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDO1lBQ3hCLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FDM0IsUUFBUSxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLEVBQUUsS0FBSyxDQUFDLHNCQUFzQixDQUNsQyxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7WUFFdEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7U0FDMUI7UUFFTSxxQkFBSyxHQUFaLFVBQWEsVUFBbUI7WUFDNUIsSUFBSSxJQUFJLENBQUMsV0FBVyxLQUFLLFVBQVUsRUFBRTtnQkFDakMsT0FBTzthQUNWO1lBRUQsSUFBSSxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUM7WUFDOUIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7U0FDM0I7UUFFTSxzQkFBTSxHQUFiLFVBQWMsV0FBb0I7WUFDOUIsSUFBSSxJQUFJLENBQUMsYUFBYSxLQUFLLFdBQVcsRUFBRTtnQkFDcEMsT0FBTzthQUNWO1lBRUQsSUFBSSxDQUFDLGFBQWEsR0FBRyxXQUFXLENBQUM7U0FDcEM7UUFFTSw2QkFBYSxHQUFwQjtZQUNJLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFFOUcsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQ3JCLElBQUksQ0FBQyxhQUFhLElBQUksS0FBSyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUM7WUFDakQsSUFBTSxVQUFVLEdBQUcsS0FBSyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDM0QsSUFBSSxDQUFDLFFBQVEsR0FBRyxXQUFXLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDMUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7WUFDakUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUM5RztRQUVNLDZCQUFhLEdBQXBCO1lBQ0ksSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxJQUFJLENBQUMsQ0FBQztZQUU5RyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7WUFDckIsSUFBSSxDQUFDLGFBQWEsSUFBSSxLQUFLLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQztZQUNqRCxJQUFNLFVBQVUsR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUMzRCxJQUFJLENBQUMsUUFBUSxHQUFHLFdBQVcsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUMxRSxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUNqRSxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixFQUFFLElBQUksQ0FBQyxDQUFDO1NBQzlHO1FBRU0sMEJBQVUsR0FBakI7WUFDSSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDbEIsSUFBSSxDQUFDLFVBQVUsSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztZQUN0QyxJQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUM5QyxJQUFNLFFBQVEsR0FBRyxXQUFXLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUMsV0FBVyxDQUFDO1lBQ3ZGLFdBQVcsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQyxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQztTQUMxRztRQUVNLG1CQUFHLEdBQVYsVUFBVyxDQUFTLEVBQUUsQ0FBUztZQUMzQixJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3RCO1FBRU0sc0JBQU0sR0FBYjtZQUNJLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUN2QixJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7WUFDbEIsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1NBQ3hCO1FBRU8sc0NBQXNCLEdBQTlCLFVBQStCLEtBQWdCO1lBQzNDLFFBQVEsS0FBSyxDQUFDLElBQUk7Z0JBQ2QsS0FBSyxXQUFXLENBQUMsV0FBVyxDQUFDLGdCQUFnQjtvQkFDekMsSUFBSSxLQUFLLENBQUMsY0FBYyxDQUFDLElBQUksS0FBSyxRQUFRLEVBQUU7d0JBQ3hDLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDO3dCQUVqQyxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssQ0FBQyxFQUFFOzRCQUNyQixJQUFJLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLEVBQUU7Z0NBQ25DLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7NkJBQzdEO2lDQUNJO2dDQUNELElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQzs2QkFDN0Q7eUJBQ0o7d0JBRUQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUMzQixRQUFRLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQ2xCLENBQUMsRUFBRSxLQUFLLENBQUMsc0JBQXNCLENBQ2xDLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztxQkFDekI7b0JBQ0QsTUFBTTtnQkFFVixLQUFLLFdBQVcsQ0FBQyxXQUFXLENBQUMsaUJBQWlCO29CQUMxQyxJQUFJLEtBQUssQ0FBQyxjQUFjLENBQUMsSUFBSSxLQUFLLFdBQVcsRUFBRTt3QkFDM0MsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7d0JBQzNCLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO3FCQUM1QjtvQkFDRCxNQUFNO2dCQUVWLEtBQUssV0FBVyxDQUFDLFdBQVcsQ0FBQyxRQUFRO29CQUNqQyxJQUFJLEtBQUssQ0FBQyxjQUFjLENBQUMsSUFBSSxLQUFLLFFBQVEsRUFBRTt3QkFDeEMsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7d0JBQ3pCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO3FCQUMzQjtvQkFDRCxNQUFNO2FBQ2I7U0FDSjtRQUVPLGtDQUFrQixHQUExQixVQUEyQixLQUFnQjtZQUN2QyxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssTUFBTSxFQUFFO2dCQUN2QixJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ3hDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFDdkMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxPQUErQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztnQkFDM0YsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUNyQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUMvQjtTQUNKO1FBRU8scUJBQUssR0FBYixVQUFjLFNBQW9CO1lBQzlCLElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1lBQy9FLElBQU0sTUFBTSxHQUFHLElBQUksTUFBTSxDQUFDLFdBQVcsRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLElBQUksR0FBRyxJQUFJLEVBQUUsRUFBRSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQzlHLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ25DO1FBRU8sZ0NBQWdCLEdBQXhCO1lBQ0ksSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO2dCQUNsQixPQUFPO2FBQ1Y7WUFFRCxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7Z0JBQ2xCLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDO2dCQUNqQixJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQzNCLE9BQU8sRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFDakIsQ0FBQyxFQUFFLEtBQUssQ0FBQyxzQkFBc0IsQ0FDbEMsQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO2dCQUV0QixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQztnQkFDdkIsT0FBTzthQUNWO1lBRUQsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLENBQUMsRUFBRTtnQkFDckIsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7Z0JBQ2pCLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FDM0IsTUFBTSxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFDbkIsS0FBSyxDQUFDLHNCQUFzQixDQUMvQixDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7Z0JBRXRCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO2FBQzFCO2lCQUNJO2dCQUNELElBQUksSUFBSSxDQUFDLFVBQVUsS0FBSyxJQUFJLEVBQUU7b0JBQzFCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUM3QyxNQUFNLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQ2hCLENBQUMsRUFBRSxLQUFLLENBQUMsc0JBQXNCLENBQ2xDLENBQUM7b0JBRUYsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO2lCQUN2QztnQkFFRCxJQUFJLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLEVBQUU7b0JBQ25DLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxvQkFBb0IsR0FBRyxLQUFLLENBQUMsb0JBQW9CLENBQUM7aUJBQ3ZGO3FCQUNJO29CQUNELElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxHQUFHLENBQUMsS0FBSyxDQUFDLG1CQUFtQixHQUFHLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQztpQkFDdkY7Z0JBRUQsSUFBSSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxFQUFFO29CQUNuQyxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxvQkFBb0IsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO2lCQUM3RDtxQkFDSTtvQkFDRCxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7aUJBQzdEO2FBQ0o7U0FDSjtRQUVPLCtCQUFlLEdBQXZCO1lBQ0ksSUFBSSxJQUFJLENBQUMsT0FBTyxLQUFLLEdBQUcsRUFBRTtnQkFDdEIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDO2dCQUN4QyxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsR0FBRyxHQUFHLEVBQUU7b0JBQzNELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUM7aUJBQzdEO3FCQUNJLElBQUksSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsR0FBRyxHQUFHLEVBQUU7b0JBQy9ELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDO2lCQUM1RDthQUNKO1lBRUQsSUFBSSxJQUFJLENBQUMsT0FBTyxLQUFLLEdBQUcsRUFBRTtnQkFDdEIsSUFBSSxJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsSUFBSSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxDQUFDLElBQUksR0FBRyxFQUFFO29CQUNwRCxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQzNCLFFBQVEsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQ25CLEtBQUssQ0FBQyxzQkFBc0IsQ0FDakMsQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO2lCQUN6QjtnQkFFRCxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQztnQkFFeEMsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUU7b0JBQ3ZDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztvQkFDdEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxHQUFHLENBQUM7b0JBQ25CLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FDM0IsUUFBUSxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLEVBQUUsS0FBSyxDQUFDLHNCQUFzQixDQUNsQyxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7aUJBQ3pCO2FBQ0o7U0FDSjtRQUVPLDBCQUFVLEdBQWxCO1lBQ0ksSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNsRSxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxFQUFFO2dCQUM1RCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDO2dCQUU3RSxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssQ0FBQyxFQUFFO29CQUNyQixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztpQkFDM0I7YUFDSjtZQUVELElBQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDNUYsSUFBSSxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsRUFBRTtnQkFDbkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLEdBQUcsVUFBVSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNqSTtpQkFDSTtnQkFDRCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxHQUFHLFVBQVUsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hJLElBQUksSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsRUFBRSxFQUFFO29CQUMzQixJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDO2lCQUNwQzthQUNKO1lBRUQsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDO1lBQ2YsSUFBSSxJQUFJLENBQUMsVUFBVSxHQUFHLEdBQUcsRUFBRTtnQkFDdkIsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO2FBQ2Y7aUJBQ0k7Z0JBQ0QsTUFBTSxHQUFHLENBQUMsQ0FBQzthQUNkO1lBRUQsSUFBSSxJQUFJLENBQUMsU0FBUyxLQUFLLElBQUksSUFBSSxJQUFJLENBQUMsT0FBTyxLQUFLLE1BQU0sRUFBRTtnQkFDcEQsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7O2dCQUd0QixJQUFJLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxFQUFFO29CQUNuQixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FDNUMsUUFBUSxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUNsQixDQUFDLEVBQUUsS0FBSyxDQUFDLG1CQUFtQixDQUMvQixDQUFDO2lCQUNMO3FCQUNJO29CQUNELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUM1QyxVQUFVLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLEVBQ3BCLENBQUMsRUFBRSxLQUFLLENBQUMsbUJBQW1CLENBQy9CLENBQUM7aUJBQ0w7Z0JBRUQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO2FBQ3RDO1lBRUQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDaEUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUNsQztRQUVPLDZCQUFhLEdBQXJCO1lBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtnQkFDM0MsT0FBTzthQUNWO1lBRUQsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUM7WUFDMUIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQy9DLFdBQVcsRUFBRSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsRUFDckIsQ0FBQyxFQUFFLEtBQUssQ0FBQyxzQkFBc0IsQ0FDbEMsQ0FBQztZQUVGLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztZQUN0QyxJQUFJLENBQUMsWUFBWSxDQUFDLGVBQWUsR0FBRyxHQUFHLENBQUM7U0FDM0M7UUFuVnVCLGdCQUFVLEdBQVcsRUFBRSxDQUFDO1FBQ3hCLDBCQUFvQixHQUFXLEdBQUcsQ0FBQztRQUNuQywwQkFBb0IsR0FBVyxLQUFLLENBQUMsb0JBQW9CLEdBQUcsR0FBRyxDQUFDO1FBQ2hFLHlCQUFtQixHQUFXLEtBQUssQ0FBQyxvQkFBb0IsR0FBRyxHQUFHLENBQUM7UUFDL0QsNEJBQXNCLEdBQVcsUUFBUSxDQUFDO1FBQzFDLHlCQUFtQixHQUFXLEtBQUssQ0FBQztRQUNwQyw0QkFBc0IsR0FBVyxRQUFRLENBQUM7UUFDMUMsbUJBQWEsR0FBa0IsQ0FBQyxnQkFBZ0IsRUFBRSxhQUFhLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFDakksbUJBQWEsR0FBa0IsQ0FBQyxnQkFBZ0IsRUFBRSxhQUFhLEVBQUUsY0FBYyxFQUFFLGNBQWMsRUFBRSxjQUFjLENBQUMsQ0FBQztRQUNqSCxXQUFLLEdBQWtCLENBQUMsYUFBYSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUM7UUEyVWpHLFlBQUM7S0FBQSxJQUFBO0lBRUQ7UUFPSSxnQkFBbUIsWUFBb0IsRUFBRSxrQkFBaUMsRUFBRSxNQUFjLEVBQUUsS0FBYSxFQUFFLFFBQW1CO1lBTnRILFlBQU8sR0FBVyxHQUFHLENBQUM7WUFDdEIsWUFBTyxHQUFXLEdBQUcsQ0FBQztZQUd0QixrQkFBYSxHQUErQixJQUFJLENBQUM7WUFHckQsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEtBQUssQ0FBQztZQUN4QyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsS0FBSyxDQUFDO1lBRXhDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxXQUFXLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUMzRixJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDN0QsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzdELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDO1lBRXhDLElBQUksa0JBQWtCLEtBQUssSUFBSSxFQUFFO2dCQUM3QixJQUFJLENBQUMsYUFBYSxHQUFHLFdBQVcsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLG9CQUFvQixDQUFDLGtCQUFrQixDQUFDLENBQUM7Z0JBQzlGLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQztnQkFDckMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztnQkFDL0MsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztnQkFDL0MsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsR0FBRyxDQUFDO2dCQUN2RCxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxHQUFHLENBQUM7Z0JBRXZELElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLEdBQUcsRUFBRTtvQkFDckIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO2lCQUN0QztnQkFFRCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7Z0JBQzNDLElBQUksQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUM3QztZQUVELElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQzlDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ2hEO1FBRU0sdUJBQU0sR0FBYjtZQUNJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUN4QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUM7WUFFeEMsSUFDSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEdBQUcsR0FBRyxHQUFHLEtBQUssSUFBSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxHQUFHLEdBQUcsR0FBRyxLQUFLO2dCQUNySSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEdBQUcsR0FBRyxHQUFHLEtBQUssSUFBSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxHQUFHLEdBQUcsR0FBRyxLQUFLLEVBQ3pJO2dCQUNFLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO2dCQUNqRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBRWhDLElBQUksSUFBSSxDQUFDLGFBQWEsS0FBSyxJQUFJLEVBQUU7b0JBQzdCLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztvQkFDOUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztpQkFDaEM7Z0JBRUQsT0FBTyxJQUFJLENBQUM7YUFDZjtZQUVELE9BQU8sS0FBSyxDQUFDO1NBQ2hCO1FBQ0wsYUFBQztLQUFBLElBQUE7Q0FDSixFQXhpQlMsV0FBVyxLQUFYLFdBQVcsUUF3aUJwQjs7OzsifQ==