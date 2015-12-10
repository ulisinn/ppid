/**
 * Created by ulrichsinn on 03/16/2015.
 */
define(["require", "exports"], function (require, exports) {
    var DataVO = (function () {
        function DataVO(item) {
            this._dataItem = item;
        }
        Object.defineProperty(DataVO.prototype, "navLabel", {
            get: function () {
                return this._dataItem.navLabel;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataVO.prototype, "navId", {
            get: function () {
                return this._dataItem.navId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataVO.prototype, "title", {
            get: function () {
                return this._dataItem.title;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataVO.prototype, "body", {
            get: function () {
                return this._dataItem.body;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataVO.prototype, "generalSigns", {
            get: function () {
                return this._dataItem.generalSigns;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataVO.prototype, "desktopPoints", {
            get: function () {
                return this._dataItem.desktopPoints;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataVO.prototype, "phonePoints", {
            get: function () {
                return this._dataItem.phonePoints;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataVO.prototype, "device", {
            get: function () {
                return this._dataItem.device;
            },
            set: function (which) {
                this._dataItem.device = which;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataVO.prototype, "imagePath", {
            get: function () {
                return this._dataItem.imagePath;
            },
            set: function (which) {
                this._dataItem.imagePath = which;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DataVO.prototype, "backgroundImage", {
            get: function () {
                return this._dataItem.backgroundImage;
            },
            set: function (which) {
                this._dataItem.backgroundImage = which;
            },
            enumerable: true,
            configurable: true
        });
        return DataVO;
    })();
    exports.DataVO = DataVO;
});
//# sourceMappingURL=DataVO.js.map