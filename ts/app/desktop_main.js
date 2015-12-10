/**
 * Created by ulrichsinn on 03/19/2015.
 */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "app/main", "navigation/desktop_nav", "views/desktop_scrollpanel", "views/background_image"], function (require, exports, MainApp, DesktopNav, DeskTopScrollPanel, BackgroundImage) {
    var DesktopApp = (function (_super) {
        __extends(DesktopApp, _super);
        function DesktopApp(model, evtDispatch) {
            _super.call(this, model, evtDispatch);
        }
        DesktopApp.prototype.run = function () {
            _super.prototype.run.call(this);
        };
        DesktopApp.prototype.initNavigation = function () {
            this.nav = new DesktopNav(d3.selectAll(".navItem"), this.eventDispatcher);
            _super.prototype.initNavigation.call(this);
        };
        DesktopApp.prototype.initCanvas = function () {
            this.horseCanvas = new BackgroundImage("horseCanvas", [this.horseImage, this.horseImageBlur], this.eventDispatcher);
        };
        DesktopApp.prototype.initSvgPanel = function () {
            _super.prototype.initSvgPanel.call(this);
            d3.select("#textPanel_0").attr("transform", "translate(170,80)");
            d3.select("#textPanel_4").attr("transform", "translate(-10,40)");
            d3.select("#earlySigns_header").attr("transform", "translate(-155,70)");
            d3.select("#advancedSigns_header").attr("transform", "translate(-110,70)");
        };
        DesktopApp.prototype.initScrollPanel = function () {
            this.scrollPanel = new DeskTopScrollPanel(d3.selectAll(".scrollPanel"));
        };
        DesktopApp.prototype.getCurrentWidth = function () {
            return window.innerWidth;
        };
        DesktopApp.prototype.getCurrentHeight = function () {
            return window.innerHeight;
        };
        DesktopApp.prototype.onNavClick = function (evt) {
            var mouseEvent = evt._payload;
            var id = evt.target.id.split("_");
            if (evt.target.id.indexOf("magnifyingGlass") != -1 || evt.target.id.indexOf("textPanel_0_Body") != -1) {
                this.nav.hideMobileDropDown();
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
        DesktopApp.prototype.onResize = function (evt) {
            this.currentHeight = (evt) ? evt.currentTarget.innerHeight : window.innerHeight;
            this.currentWidth = (evt) ? evt.currentTarget.innerWidth : window.innerWidth;
            //console.log("onResize", this.currentHeight, this.currentWidth, screen.availHeight, screen.availWidth);
            this.horseCanvas.onResize(this.currentHeight, this.currentWidth);
            if (evt) {
                this.onScroll();
            }
        };
        DesktopApp.prototype.createScrollScale = function () {
            var maxH = document.body.scrollHeight - window.innerHeight;
            this.scrollScale = d3.scale.linear().domain([0, maxH]).range([0, 1]);
        };
        return DesktopApp;
    })(MainApp);
    return DesktopApp;
});
//# sourceMappingURL=desktop_main.js.map