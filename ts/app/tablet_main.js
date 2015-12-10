/**
 * Created by ulrichsinn on 03/19/2015.
 */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "app/main", "navigation/tablet_nav", "views/tablet_scrollpanel", "views/phone_background_image"], function (require, exports, MainApp, TabletNav, TabletScrollPanel, PhoneBackgroundImage) {
    var TabletApp = (function (_super) {
        __extends(TabletApp, _super);
        function TabletApp(model, evtDispatch) {
            _super.call(this, model, evtDispatch);
        }
        TabletApp.prototype.run = function () {
            console.log("TABLET APP");
            _super.prototype.run.call(this);
        };
        TabletApp.prototype.initNavigation = function () {
            this.nav = new TabletNav(d3.selectAll(".navItem"), this.eventDispatcher);
            _super.prototype.initNavigation.call(this);
        };
        TabletApp.prototype.initCanvas = function () {
            this.horseCanvas = new PhoneBackgroundImage("horseCanvas", [this.horseImage, this.horseImageBlur], this.eventDispatcher);
        };
        TabletApp.prototype.initScrollPanel = function () {
            this.scrollPanel = new TabletScrollPanel(d3.selectAll(".scrollPanel"));
        };
        TabletApp.prototype.getCurrentWidth = function () {
            return window.innerWidth;
        };
        TabletApp.prototype.getCurrentHeight = function () {
            return window.innerHeight;
        };
        TabletApp.prototype.onNavClick = function (evt) {
            var id = evt.target.id.split("_");
            var mouseEvent = evt._payload;
            if (evt.target.id.indexOf("magnifyingGlass") != -1 || evt.target.id.indexOf("textPanel_0_Body") != -1) {
                this.scrollToSelection("_whatIsPpid");
                id = evt.target.id;
            }
            else if (evt.target.id.indexOf("Hamburger") != -1) {
                this.nav.showMobileDropDown();
            }
            else {
                this.nav.hideMobileDropDown();
                this.scrollToSelection("_" + id[1]);
            }
            mouseEvent.stopPropagation();
        };
        TabletApp.prototype.onOrientationChange = function (evt) {
            this.currentHeight = (evt) ? evt.currentTarget.innerHeight : window.innerHeight;
            this.currentWidth = (evt) ? evt.currentTarget.innerWidth : window.innerWidth;
            //console.log("onResize", this.currentHeight, this.currentWidth, screen.availHeight, screen.availWidth);
            this.horseCanvas.onResize(this.currentHeight, this.currentWidth);
            if (evt) {
                this.onScroll();
            }
            this.horseSvg.resetPlusSign();
            d3.select("#popupWrapper").classed("hidden", true).classed("visible", false);
        };
        /*
            onResize(evt?) {
                this.currentHeight = (evt) ? evt.currentTarget.innerHeight : window.innerHeight;
                this.currentWidth = (evt) ? evt.currentTarget.innerWidth : window.innerWidth;
                //console.log("onResize", this.currentHeight, this.currentWidth, screen.availHeight, screen.availWidth);
                this.horseCanvas.onResize(this.currentHeight, this.currentWidth);
                if (evt) {
                    this.onScroll();
                }
            }
        */
        TabletApp.prototype.createScrollScale = function () {
            var maxH = document.body.scrollHeight - window.innerHeight;
            this.scrollScale = d3.scale.linear().domain([0, maxH]).range([0, 1]);
        };
        return TabletApp;
    })(MainApp);
    return TabletApp;
});
//# sourceMappingURL=tablet_main.js.map