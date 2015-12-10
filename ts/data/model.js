/// <reference path="DataVO.ts" />
/// <reference path="../events/event.ts" />
/// <reference path="../../typings/d3/d3.d.ts" />
define(["require", "exports", 'd3', "events/event"], function (require, exports, d3, CustomEvent) {
    var DataModel = (function () {
        function DataModel(evtDispatch) {
            this.eventDispatcher = evtDispatch;
            this.panelPosition = [];
        }
        DataModel.prototype.setPanelPosition = function (i, top) {
            this.panelPosition[i] = top;
        };
        DataModel.prototype.getHorseImage = function () {
            return this._horseImage;
        };
        DataModel.prototype.getHorseImageBlur = function () {
            return this._horseImageBlur;
        };
        DataModel.prototype.getScrollTop = function (index) {
            var pos = this.panelPosition[index];
            return pos;
        };
        DataModel.prototype.loadData = function (jsonPath, imgPath, device) {
            var _this = this;
            this.coll = [];
            this._device = device;
            this._imgPath = imgPath;
            d3.json(jsonPath, function (error, data) {
                _this.setData(error, data);
                _this.loadHorseImage(imgPath);
            });
        };
        DataModel.prototype.setData = function (error, data) {
            var _this = this;
            this.rawData = data;
            this.rawData.forEach(function (item, i) {
                var _item = item;
                _this.coll.push(_item);
            });
        };
        DataModel.prototype.loadHorseImage = function () {
            var _this = this;
            this._horseImage = new Image();
            this._horseImage.onload = function () { return _this.loadBlurHorseImage(); };
            this._horseImage.src = this._imgPath[0];
        };
        DataModel.prototype.loadBlurHorseImage = function () {
            var _this = this;
            this._horseImageBlur = new Image();
            this._horseImageBlur.onload = function () { return _this.dataReady(); };
            this._horseImageBlur.src = this._imgPath[1];
        };
        DataModel.prototype.dataReady = function () {
            var evt = new CustomEvent(CustomEvent.DATA_LOADED);
            evt.payload = { img: [this._horseImage, this._horseImageBlur] };
            this.eventDispatcher.onDataLoaded(evt);
        };
        DataModel.prototype.getSvgPoints = function (index) {
            var points;
            var item;
            if (this.coll && this.coll[index]) {
                item = this.coll[index];
            }
            else {
                throw ("can't get item");
            }
            switch (this._device) {
                case "DESKTOP":
                    points = item.desktopPoints;
                    break;
                case "PHONE":
                    points = item.phonePoints;
                    break;
                case "TABLET":
                    points = item.desktopPoints;
                    break;
            }
            return points;
        };
        DataModel.prototype.getCurrentSelectionFromId = function (id) {
            var selectedItem = null;
            this.coll.forEach(function (item, i) {
                if (id.indexOf(item.navId) != -1) {
                    selectedItem = item;
                }
            });
            return selectedItem;
        };
        DataModel.prototype.getDevice = function () {
            return this._device;
        };
        return DataModel;
    })();
    return DataModel;
});
//# sourceMappingURL=model.js.map