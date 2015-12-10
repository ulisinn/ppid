/**
 * Created by ulrichsinn on 03/19/2015.
 */

/// <reference path="../../typings/require.d.ts" />
/// <reference path="../../typings/d3/d3.d.ts" />
/// <reference path="../data/model.ts" />
/// <reference path="../views/canvas.ts" />
/// <reference path="../views/background_image.ts" />
/// <reference path="../views/svg_panel.ts" />
/// <reference path="../views/scrollpanel.ts" />
/// <reference path="../views/magnifying_glass.ts" />
/// <reference path="../navigation/nav.ts" />
/// <reference path="../animation/timeline.ts" />
/// <reference path="../factory/device_type.ts" />

import d3 = require('d3');
import DataModel = require("data/model");
import Navigation = require("navigation/nav");
import BackgroundImage = require("views/background_image");
import HorseSvg = require("views/svg_panel");
import ScrollPanel = require("views/scrollpanel");
import Timeline = require("animation/timeline");
import MagnifyingGlass = require("views/magnifying_glass");
import PopUp = require("views/popup");
import Device = require("factory/device_type");


interface I_MainApp {

}

class MainApp implements I_MainApp {
    protected eventDispatcher:any;
    protected horseImage:HTMLImageElement;
    protected horseImageBlur:HTMLImageElement;
    protected dataModel:DataModel;
    protected nav:Navigation;
    protected horseCanvas:BackgroundImage;
    protected horseSvg:HorseSvg;
    protected magnifyingGlass:MagnifyingGlass;
    protected scrollPanel:ScrollPanel;
    protected currentWidth:number;
    protected currentHeight:number;
    protected scrollScale:any;
    protected percentScrolled:number = 0;
    protected timeLine:Timeline;
    protected currentState:string;


    constructor(model:DataModel, evtDispatch:any) {
        this.eventDispatcher = evtDispatch;
        this.horseImage = model.getHorseImage();
        this.horseImageBlur = model.getHorseImageBlur();
        this.dataModel = model;
    }

    run() {
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
    }

    initNavigation() {
        d3.select("#wrapper").on("click", ()=> this.nav.hideMobileDropDown())
    }

    initCanvas() {
        // overridden in sub classes
    }

    initSvgPanel() {
        console.log("main initSvgPanel")

        this.horseSvg = new HorseSvg(d3.select("#horseSvg"), this.eventDispatcher);
        var earlySigns = this.dataModel.getSvgPoints(2);
        var advancedSigns = this.dataModel.getSvgPoints(3);
        this.horseSvg.createPlusSigns(earlySigns, d3.select("#svg_earlySigns"), "#ff0000", this.dataModel.getDevice());
        this.horseSvg.createPlusSigns(advancedSigns, d3.select("#svg_advancedSigns"), "#0000ff", this.dataModel.getDevice());
    }

    initScrollPanel() {
        // overridden in sub classes
    }

    initMagnifyingGlass() {
        this.magnifyingGlass = new MagnifyingGlass("#magnifierWrapper", d3.select("#magnifierWrapper"), this.eventDispatcher)
    }

    initTimeline() {
        this.timeLine = new Timeline(this.eventDispatcher, this.scrollPanel.getPanelHeight(), this.scrollScale, this.dataModel.getDevice());
    }

    showCanvas() {
        this.horseCanvas.onResize(this.getCurrentHeight(), this.getCurrentWidth());

        d3.select("#horseCanvasWrapper").transition()
            .duration(1500)
            .style("opacity", function () {
                return 1;
            })
    }

    showMagnifyingGlass() {
        this.magnifyingGlass.init();
    }

    addEventListener() {
        console.log("MainApp addEventListener");
        this.eventDispatcher.on("onStateChanged", (evt)=> this.onStateChanged(evt));
        this.eventDispatcher.on("onCanvasReady", (evt)=> this.onCanvasReady(evt));
        this.eventDispatcher.on("onNavClick", (evt)=> this.onNavClick(evt));
        this.eventDispatcher.on("onPlusClick", (evt)=> this.onPlusClick(evt));
        this.eventDispatcher.on("onBringPlusToFront", (evt)=> this.onBringPlusToFront(evt));

        window.addEventListener("orientationchange", (evt)=> this.onOrientationChange(evt));
        window.addEventListener("resize", (evt)=> this.onResize(evt));
        window.addEventListener("scroll", (evt)=> this.onScroll(evt));

        var horseSvg = this.horseSvg;
        d3.select("#popupWrapper").on("click", () => this.closePopUp())
    }

    closePopUp() {
        this.horseSvg.resetPlusSign();
        d3.select("#popupWrapper")
            .classed("visible", false)
            .classed("hidden", true);
    }

    onCanvasReady(evt?) {
        console.log("onCanvasReady");
        d3.select("#wrapper").classed("hidden", false);
        this.nav.showNav()
    }

    onStateChanged(state:string) {
        if (state == this.currentState) {
            return
        }
        this.currentState = state;
        console.log("onStateChanged", this.currentState);
        if (this.currentState != "_home") {
            this.magnifyingGlass.hide()
        } else {
            this.magnifyingGlass.show()

        }

        var navItems = d3.selectAll(".navItem").classed("navBgColorSelected", false).classed("navBgColor", true);
        navItems.each(function () {
            //console.log(this.id)
            if (this.id.indexOf(state) != -1) {
                d3.select(this).classed("navBgColorSelected", true).classed("navBgColor", false);
            }
        });

        if(this.currentState ==  "_home"){
            d3.select("#textPanel_0").style("display","block")
        }else{
            d3.select("#textPanel_0").style("display","none")

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
    }

    onBringPlusToFront(which:string) {
        this.horseSvg.bringToFront(which)
    }

    onNavClick(evt) {
        // overridden in sub classes
    }

    scrollToSelection(id:string) {
        this.timeLine.scrollToPosition(id);
    }

    onPlusClick(evt) {
        var popUp = new PopUp(evt, this.eventDispatcher, d3.select("#popupWrapper"));
        d3.select("#popupWrapper").classed("hidden", false).classed("visible", true);
    }

    onOrientationChange(evt) {
        console.log("onOrientationChange");
    }

    onResize(evt?) {
        console.log("onResize");
    }

    onScroll(evt?) {
        var scrollTop = Math.max(d3.select("body").property("scrollTop"), d3.select("html").property("scrollTop"))
        this.timeLine.updateTimeLine(scrollTop);
        d3.select("#popupWrapper").classed("hidden", true)

    }

    getCurrentWidth():number {
        return 0;
    }

    getCurrentHeight():number {
        return 0;
    }

    createScrollScale() {
        // overridden in sub classes
    }
}

export = MainApp