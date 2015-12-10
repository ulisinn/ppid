/// <reference path="DataVO.ts" />
/// <reference path="../events/event.ts" />
/// <reference path="../../typings/d3/d3.d.ts" />


import vo = require("DataVO");
import d3 = require('d3');
import CustomEvent = require("events/event");


class DataModel {
    private rawData;
    private currentSelection:vo.IDataItem;
    private coll:Array<vo.IDataItem>;
    private panelPosition:Array<number>;
    private eventDispatcher;
    private _horseImage:HTMLImageElement;
    private _horseImageBlur:HTMLImageElement;
    private _device:string;
    private _imgPath:string[];


    constructor(evtDispatch) {
        this.eventDispatcher = evtDispatch;
        this.panelPosition = [];
    }


    setPanelPosition(i:number, top:number) {
        this.panelPosition[i] = top;
    }

    getHorseImage():HTMLImageElement {
        return this._horseImage;
    }

    getHorseImageBlur():HTMLImageElement {
        return this._horseImageBlur;
    }

    getScrollTop(index:number):number {
        var pos = this.panelPosition[index]
        return pos;
    }

    loadData(jsonPath:string, imgPath:string[], device:string) {
        this.coll = [];
        this._device = device;
        this._imgPath = imgPath;
        d3.json(jsonPath, (error, data) => {
            this.setData(error, data)
            this.loadHorseImage(imgPath)
        })
    }

    setData(error, data) {
        this.rawData = data;
        this.rawData.forEach((item, i)=> {
            var _item:vo.IDataItem = item;
            this.coll.push(_item)
        })

    }

    loadHorseImage() {
        this._horseImage = new Image()
        this._horseImage.onload = () => this.loadBlurHorseImage();
        this._horseImage.src = this._imgPath[0];
    }

    loadBlurHorseImage() {
        this._horseImageBlur = new Image()
        this._horseImageBlur.onload = () => this.dataReady();
        this._horseImageBlur.src = this._imgPath[1];
    }

    dataReady() {
        var evt:CustomEvent = new CustomEvent(CustomEvent.DATA_LOADED);
        evt.payload = {img: [this._horseImage, this._horseImageBlur]};
        this.eventDispatcher.onDataLoaded(evt);
    }

    getSvgPoints(index:number) {
        var points:any[];
        var item:vo.IDataItem;
        if (this.coll && this.coll[index]) {
            item = this.coll[index]
        } else {
            throw ("can't get item");
        }

        switch (this._device) {
            case "DESKTOP":
                points = item.desktopPoints;
                break;
            case "PHONE":
                points = item.phonePoints;
                break
            case"TABLET":
                points = item.desktopPoints;
                break;
        }

        return points;
    }

    getCurrentSelectionFromId(id) {
        var selectedItem = null;
        this.coll.forEach((item, i) => {
            if (id.indexOf(item.navId) != -1) {
                selectedItem = item;
            }
        })

        return selectedItem
    }

    getDevice():string {
        return this._device;
    }
}

export = DataModel;