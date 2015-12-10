/**
 * Created by ulrichsinn on 03/16/2015.
 */
define(["require", "exports"], function (require, exports) {
    var CustomEvent = (function () {
        function CustomEvent(t, tgt) {
            this._type = null;
            this._target = null;
            this._payload = null;
            this._type = t;
            if (tgt) {
                this._target = tgt;
            }
        }
        Object.defineProperty(CustomEvent.prototype, "type", {
            get: function () {
                return this._type;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CustomEvent.prototype, "target", {
            get: function () {
                return this._target;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(CustomEvent.prototype, "payload", {
            get: function () {
                if (this._payload) {
                    return this._payload;
                }
                return null;
            },
            set: function (o) {
                if (o) {
                    this._payload = o;
                }
            },
            enumerable: true,
            configurable: true
        });
        CustomEvent.DATA_LOADED = "CustomEvent.DATA_LOADED";
        CustomEvent.CANVAS_LOADED = "CustomEvent.CANVAS_LOADED";
        CustomEvent.NAV_CLICK = "CustomEvent.NAV_CLICK";
        CustomEvent.PLUS_CLICK = "CustomEvent.PLUS_CLICK";
        CustomEvent.CANVAS_BLUR = "CustomEvent.CANVAS_BLUR";
        return CustomEvent;
    })();
    return CustomEvent;
});
//# sourceMappingURL=event.js.map