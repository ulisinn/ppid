/**
 * Created by ulrichsinn on 03/19/2015.
 */
define(["require", "exports", 'd3', "views/svg_panel", "animation/timeline", "views/magnifying_glass", "views/popup"], function (require, exports, d3, HorseSvg, Timeline, MagnifyingGlass, PopUp) {
    var MainApp = (function () {
        function MainApp(model, evtDispatch) {
            this.percentScrolled = 0;
            this.eventDispatcher = evtDispatch;
            this.horseImage = model.getHorseImage();
            this.horseImageBlur = model.getHorseImageBlur();
            this.dataModel = model;
        }
        MainApp.prototype.run = function () {
            this.addEventListener();
            this.initNavigation();
            this.initCanvas();
            this.initSvgPanel();
            this.initScrollPanel();
            this.initMagnifyingGlass();
            this.createScrollScale();
            this.initTimeline();
            this.showCanvas();
            this.showMagnifyingGlass();
        };
        MainApp.prototype.initNavigation = function () {
            var _this = this;
            d3.select("#wrapper").on("click", function () { return _this.nav.hideMobileDropDown(); });
        };
        MainApp.prototype.initCanvas = function () {
            // overridden in sub classes
        };
        MainApp.prototype.initSvgPanel = function () {
            console.log("main initSvgPanel");
            this.horseSvg = new HorseSvg(d3.select("#horseSvg"), this.eventDispatcher);
            var earlySigns = this.dataModel.getSvgPoints(2);
            var advancedSigns = this.dataModel.getSvgPoints(3);
            this.horseSvg.createPlusSigns(earlySigns, d3.select("#svg_earlySigns"), "#ff0000", this.dataModel.getDevice());
            this.horseSvg.createPlusSigns(advancedSigns, d3.select("#svg_advancedSigns"), "#0000ff", this.dataModel.getDevice());
        };
        MainApp.prototype.initScrollPanel = function () {
            // overridden in sub classes
        };
        MainApp.prototype.initMagnifyingGlass = function () {
            this.magnifyingGlass = new MagnifyingGlass("#magnifierWrapper", d3.select("#magnifierWrapper"), this.eventDispatcher);
        };
        MainApp.prototype.initTimeline = function () {
            this.timeLine = new Timeline(this.eventDispatcher, this.scrollPanel.getPanelHeight(), this.scrollScale, this.dataModel.getDevice());
        };
        MainApp.prototype.showCanvas = function () {
            this.horseCanvas.onResize(this.getCurrentHeight(), this.getCurrentWidth());
            d3.select("#horseCanvasWrapper").transition().duration(1500).style("opacity", function () {
                return 1;
            });
        };
        MainApp.prototype.showMagnifyingGlass = function () {
            this.magnifyingGlass.init();
        };
        MainApp.prototype.addEventListener = function () {
            var _this = this;
            console.log("MainApp addEventListener");
            this.eventDispatcher.on("onStateChanged", function (evt) { return _this.onStateChanged(evt); });
            this.eventDispatcher.on("onCanvasReady", function (evt) { return _this.onCanvasReady(evt); });
            this.eventDispatcher.on("onNavClick", function (evt) { return _this.onNavClick(evt); });
            this.eventDispatcher.on("onPlusClick", function (evt) { return _this.onPlusClick(evt); });
            this.eventDispatcher.on("onBringPlusToFront", function (evt) { return _this.onBringPlusToFront(evt); });
            window.addEventListener("orientationchange", function (evt) { return _this.onOrientationChange(evt); });
            window.addEventListener("resize", function (evt) { return _this.onResize(evt); });
            window.addEventListener("scroll", function (evt) { return _this.onScroll(evt); });
            var horseSvg = this.horseSvg;
            d3.select("#popupWrapper").on("click", function () { return _this.closePopUp(); });
        };
        MainApp.prototype.closePopUp = function () {
            this.horseSvg.resetPlusSign();
            d3.select("#popupWrapper").classed("visible", false).classed("hidden", true);
        };
        MainApp.prototype.onCanvasReady = function (evt) {
            console.log("onCanvasReady");
            d3.select("#wrapper").classed("hidden", false);
            this.nav.showNav();
        };
        MainApp.prototype.onStateChanged = function (state) {
            if (state == this.currentState) {
                return;
            }
            this.currentState = state;
            console.log("onStateChanged", this.currentState);
            if (this.currentState != "_home") {
                this.magnifyingGlass.hide();
            }
            else {
                this.magnifyingGlass.show();
            }
            var navItems = d3.selectAll(".navItem").classed("navBgColorSelected", false).classed("navBgColor", true);
            navItems.each(function () {
                //console.log(this.id)
                if (this.id.indexOf(state) != -1) {
                    d3.select(this).classed("navBgColorSelected", true).classed("navBgColor", false);
                }
            });
            if (this.currentState == "_home") {
                d3.select("#textPanel_0").style("display", "block");
            }
            else {
                d3.select("#textPanel_0").style("display", "none");
            }
            switch (this.currentState) {
                case "_advancedSigns":
                    this.horseSvg.onStateChanged(this.currentState);
                    break;
                case "_earlySigns":
                    this.horseSvg.onStateChanged(this.currentState);
                    break;
                default:
                    this.horseSvg.hideAllHotSpots();
            }
        };
        MainApp.prototype.onBringPlusToFront = function (which) {
            this.horseSvg.bringToFront(which);
        };
        MainApp.prototype.onNavClick = function (evt) {
            // overridden in sub classes
        };
        MainApp.prototype.scrollToSelection = function (id) {
            this.timeLine.scrollToPosition(id);
        };
        MainApp.prototype.onPlusClick = function (evt) {
            var popUp = new PopUp(evt, this.eventDispatcher, d3.select("#popupWrapper"));
            d3.select("#popupWrapper").classed("hidden", false).classed("visible", true);
        };
        MainApp.prototype.onOrientationChange = function (evt) {
            console.log("onOrientationChange");
        };
        MainApp.prototype.onResize = function (evt) {
            console.log("onResize");
        };
        MainApp.prototype.onScroll = function (evt) {
            var scrollTop = Math.max(d3.select("body").property("scrollTop"), d3.select("html").property("scrollTop"));
            this.timeLine.updateTimeLine(scrollTop);
            d3.select("#popupWrapper").classed("hidden", true);
        };
        MainApp.prototype.getCurrentWidth = function () {
            return 0;
        };
        MainApp.prototype.getCurrentHeight = function () {
            return 0;
        };
        MainApp.prototype.createScrollScale = function () {
            // overridden in sub classes
        };
        return MainApp;
    })();
    return MainApp;
});
//# sourceMappingURL=main.js.map