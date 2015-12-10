/**
 * Created by ulrichsinn on 03/19/2015.
 */
define(["require", "exports", 'd3', "data/model", "app/desktop_main", "app/tablet_main", "app/phone_main", "factory/device_type"], function (require, exports, d3, DataModel, DesktopApp, TabletApp, PhoneApp, Device) {
    var AppFactory = (function () {
        function AppFactory() {
            this.eventDispatcher = d3.dispatch("dispatchTrackingEvent", "onCanvasReady", "onDataLoaded", "onStateChanged", "onNavClick", "onBringPlusToFront", "onPlusClick", "onBlurCanvas", "onCanvasResize");
            AppFactory.WHICH_DEVICE = this.findDevice(Device);
            this.dataModel = new DataModel(this.eventDispatcher);
        }
        AppFactory.prototype.onDataLoaded = function (evt) {
            switch (AppFactory.WHICH_DEVICE) {
                case 0 /* PHONE */:
                    this.main = new PhoneApp(this.dataModel, this.eventDispatcher);
                    break;
                case 1 /* TABLET */:
                    //this.main = new TabletApp(this.dataModel, this.eventDispatcher);
                    this.main = new TabletApp(this.dataModel, this.eventDispatcher);
                    break;
                case 2 /* DESKTOP */:
                    this.main = new DesktopApp(this.dataModel, this.eventDispatcher);
                    break;
            }
            this.main.run();
        };
        AppFactory.prototype.run = function () {
            var _this = this;
            this.eventDispatcher.on("onDataLoaded", function (evt) { return _this.onDataLoaded(evt); });
            switch (AppFactory.WHICH_DEVICE) {
                case 0 /* PHONE */:
                    this.dataModel.loadData(AppFactory.JSON_PATH, AppFactory.IMAGE_PATH_PHONE, Device[0]);
                    break;
                case 1 /* TABLET */:
                    this.dataModel.loadData(AppFactory.JSON_PATH, AppFactory.IMAGE_PATH_DESKTOP, Device[1]);
                    break;
                case 2 /* DESKTOP */:
                    this.dataModel.loadData(AppFactory.JSON_PATH, AppFactory.IMAGE_PATH_DESKTOP, Device[2]);
                    break;
            }
            console.log("AppFactory run", AppFactory.WHICH_DEVICE);
        };
        AppFactory.prototype.findDevice = function (Device) {
            if (this.isTouchDevice() && this.getAvailableScreen().width <= 480) {
                console.log("PHONE", screen.availHeight, screen.availWidth);
                return Device.PHONE;
            }
            else if (this.isTouchDevice() && this.getAvailableScreen().width > 480) {
                return Device.TABLET;
            }
            else {
                return Device.DESKTOP;
            }
        };
        AppFactory.prototype.isTouchDevice = function () {
            return true == ("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch);
        };
        AppFactory.prototype.getAvailableScreen = function () {
            if (this.isTouchDevice()) {
                return { width: screen.availWidth, height: screen.availHeight };
            }
            return { width: window.innerWidth, height: window.innerHeight };
        };
        AppFactory.IMAGE_PATH_DESKTOP = ["images/BigHorse-2.jpg", "images/BigHorse-2-blur.jpg"];
        AppFactory.IMAGE_PATH_PHONE = ["images/BigHorse-2c.jpg", "images/BigHorse-2c-blur.jpg"];
        AppFactory.JSON_PATH = "./json/data.json";
        return AppFactory;
    })();
    return AppFactory;
});
//# sourceMappingURL=AppFactory.js.map