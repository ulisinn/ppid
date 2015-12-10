/**
 * Created by ulrichsinn on 03/16/2015.
 */

export interface IPoint {
    x:number;
    y:number
}

export interface IPointDescription extends IPoint {
    where:string;
    description:Array<string>;
}

export interface IDataItem {
    frame:number;
    navLabel:string;
    navId:string;
    title:Array<string>;
    body:string;
    generalSigns:Array<string>;
    desktopPoints:Array<IPointDescription>;
    phonePoints:Array<IPointDescription>;
    imagePath:string;
    backgroundImage:HTMLImageElement;
    device:string;

}

export interface IDataVO {
    _dataItem:IDataItem;
}

export class DataVO {
    private _dataItem:IDataItem

    constructor(item:IDataItem) {
        this._dataItem = item;
    }

    get navLabel():string {
        return this._dataItem.navLabel;
    }

    get navId():string {
        return this._dataItem.navId;
    }

    get title():Array<string> {
        return this._dataItem.title;
    }

    get body():string {
        return this._dataItem.body;
    }

    get generalSigns():Array<string> {
        return this._dataItem.generalSigns;
    }

    get desktopPoints():Array<IPointDescription> {
        return this._dataItem.desktopPoints;
    }
    get phonePoints():Array<IPointDescription> {
        return this._dataItem.phonePoints;
    }

    set device(which:string) {
        this._dataItem.device = which;
    }

    get device():string {
        return this._dataItem.device
    }

    set imagePath(which:string) {
        this._dataItem.imagePath = which;
    }

    get imagePath():string {
        return this._dataItem.imagePath
    }
    set backgroundImage(which:HTMLImageElement) {
        this._dataItem.backgroundImage = which;
    }

    get backgroundImage():HTMLImageElement {
        return this._dataItem.backgroundImage
    }
}