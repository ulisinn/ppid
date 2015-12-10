/**
 * Created by ulrichsinn on 03/19/2015.
 */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "app/main", "navigation/phone_nav", "views/phone_scrollpanel", "views/phone_background_image"], function (require, exports, MainApp, PhonepNav, PhoneScrollPanel, PhoneBackgroundImage) {
    var PhoneApp = (function (_super) {
        __extends(PhoneApp, _super);
        function PhoneApp(model, evtDispatch) {
            _super.call(this, model, evtDispatch);
        }
        PhoneApp.prototype.run = function () {
            console.log("PhoneApp run");
            _super.prototype.run.call(this);
        };
        PhoneApp.prototype.initNavigation = function () {
            console.log("PhoneApp initNavigation");
            this.nav = new PhonepNav(d3.select("#mobileNav").selectAll(".navItem"), this.eventDispatcher);
            _super.prototype.initNavigation.call(this);
        };
        PhoneApp.prototype.initCanvas = function () {
            this.horseCanvas = new PhoneBackgroundImage("horseCanvas", [this.horseImage, this.horseImageBlur], this.eventDispatcher);
        };
        PhoneApp.prototype.initSvgPanel = function () {
            _super.prototype.initSvgPanel.call(this);
            console.log("PhoneApp initSvgPanel");
            d3.select("#textPanel_0").attr("transform", "translate(40,-20)");
            d3.select("#textPanel_1").attr("transform", "translate(10,-70)");
            d3.select("#textPanel_2").attr("transform", "translate(10,-70)");
            d3.select("#textPanel_4").attr("transform", "translate(10,-70)");
            var panel1Copy = ["Pituitary Pars Intermedia Dysfunction (PPID)", "formerly known as Equine Cushing’s Disease,", "causes the horse's pituitary gland, which utilizes", "hormones to control body functions, to work", "overtime – leading to a variety of problems."];
            var tspan = d3.select("#textPanel_1_Body").selectAll("tspan").data(panel1Copy);
            tspan.each(function (d, i) {
                d3.select(this).text(d);
            });
        };
        PhoneApp.prototype.initScrollPanel = function () {
            this.scrollPanel = new PhoneScrollPanel(d3.selectAll(".scrollPanel"));
        };
        PhoneApp.prototype.onNavClick = function (evt) {
            var id = evt.target.id.split("_");
            var mouseEvent = evt._payload;
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
            //console.log("onNavClick", id)
            mouseEvent.stopPropagation();
        };
        //onScroll() {
        //    // needs override
        //}
        PhoneApp.prototype.onOrientationChange = function (evt) {
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
        PhoneApp.prototype.createScrollScale = function () {
            var maxH = document.body.scrollHeight - screen.availHeight;
            this.scrollScale = d3.scale.linear().domain([0, maxH]).range([0, 1]);
        };
        PhoneApp.prototype.getCurrentWidth = function () {
            return screen.availWidth;
        };
        PhoneApp.prototype.getCurrentHeight = function () {
            return screen.availHeight;
        };
        return PhoneApp;
    })(MainApp);
    return PhoneApp;
});
//# sourceMappingURL=phone_main.js.map