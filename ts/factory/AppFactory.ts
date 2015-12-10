/**
 * Created by ulrichsinn on 03/19/2015.
 */

/// <reference path="../../typings/require.d.ts" />
/// <reference path="../../typings/d3/d3.d.ts" />
/// <reference path="../data/model.ts" />
/// <reference path="../app/main.ts" />

import d3 = require('d3');
import DataModel = require("data/model");
import MainApp = require("app/main");
import DesktopApp = require("app/desktop_main");
import TabletApp = require("app/tablet_main");
import PhoneApp = require("app/phone_main");
import CustomEvent = require("events/event");
import DataVO = require("data/DataVO");
import Device = require("factory/device_type");


class AppFactory {
    static IMAGE_PATH_DESKTOP = ["images/BigHorse-2.jpg", "images/BigHorse-2-blur.jpg"];
    static IMAGE_PATH_PHONE = ["images/BigHorse-2c.jpg", "images/BigHorse-2c-blur.jpg"];
    static JSON_PATH = "./json/data.json";
    static WHICH_DEVICE:number;

    private eventDispatcher = d3.dispatch(
        "dispatchTrackingEvent",
        "onCanvasReady",
        "onDataLoaded",
        "onStateChanged",
        "onNavClick",
        "onBringPlusToFront",
        "onPlusClick",
        "onBlurCanvas",
        "onCanvasResize")

    private dataModel:DataModel;
    private horseImage:HTMLImageElement;
    private main:MainApp;

    constructor() {
        AppFactory.WHICH_DEVICE = this.findDevice(Device);
        this.dataModel = new DataModel(this.eventDispatcher);

    }

    onDataLoaded(evt:CustomEvent) {
        switch (AppFactory.WHICH_DEVICE) {
            case Device.PHONE:
                this.main = new PhoneApp(this.dataModel, this.eventDispatcher);
                break;
            case Device.TABLET:
                //this.main = new TabletApp(this.dataModel, this.eventDispatcher);
                this.main = new TabletApp(this.dataModel, this.eventDispatcher);
                break;
            case Device.DESKTOP:
                this.main = new DesktopApp(this.dataModel, this.eventDispatcher);
                break;
        }
        this.main.run();
    }

    run() {
        this.eventDispatcher.on("onDataLoaded", (evt) => this.onDataLoaded(evt));
        switch (AppFactory.WHICH_DEVICE) {
            case Device.PHONE:
                this.dataModel.loadData(AppFactory.JSON_PATH, AppFactory.IMAGE_PATH_PHONE, Device[0]);
                break;
            case Device.TABLET:
                this.dataModel.loadData(AppFactory.JSON_PATH, AppFactory.IMAGE_PATH_DESKTOP, Device[1]);
                break;
            case Device.DESKTOP:
                this.dataModel.loadData(AppFactory.JSON_PATH, AppFactory.IMAGE_PATH_DESKTOP, Device[2]);
                break;
        }

        console.log("AppFactory run", AppFactory.WHICH_DEVICE);
    }

    findDevice(Device):number {

        if (this.isTouchDevice() && this.getAvailableScreen().width <= 480) {
            console.log("PHONE", screen.availHeight, screen.availWidth)
            return Device.PHONE
        } else if (this.isTouchDevice() && this.getAvailableScreen().width > 480) {
            return Device.TABLET
        } else {
            return Device.DESKTOP
        }
    }

    isTouchDevice():boolean {
        return true == ("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch);
    }

    getAvailableScreen() {
        if (this.isTouchDevice()) {
            return {width: screen.availWidth, height: screen.availHeight};
        }
        return {width: window.innerWidth, height: window.innerHeight}
    }
}

export = AppFactory;