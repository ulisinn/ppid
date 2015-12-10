/**
 * Created by ulrichsinn on 03/19/2015.
 */

/// <reference path="../../typings/require.d.ts" />
/// <reference path="../../typings/d3/d3.d.ts" />
/// <reference path="../data/model.ts" />
/// <reference path="../views/canvas.ts" />
/// <reference path="../views/svg_panel.ts" />
/// <reference path="../views/scrollpanel.ts" />
/// <reference path="../navigation/nav.ts" />
/// <reference path="../animation/timeline.ts" />
/// <reference path="../app/main.ts" />
/// <reference path="../views/popup.ts" />
/// <reference path="../factory/device_type.ts" />

import MainApp = require("app/main");
import DataModel = require("data/model");
import DesktopNav = require("navigation/desktop_nav");
import DeskTopScrollPanel = require("views/desktop_scrollpanel");
import Timeline = require("animation/timeline");
import PopUp = require("views/popup");
import Device = require("factory/device_type");
import BackgroundImage = require("views/background_image");


class DesktopApp extends MainApp {
    constructor(model:DataModel, evtDispatch:any) {
        super(model, evtDispatch);
    }

    run() {
        super.run();
    }

    initNavigation() {
        this.nav = new DesktopNav(d3.selectAll(".navItem"), this.eventDispatcher);
        super.initNavigation();
    }

    initCanvas() {
        this.horseCanvas = new BackgroundImage("horseCanvas", [this.horseImage, this.horseImageBlur], this.eventDispatcher);
    }


    initSvgPanel() {
        super.initSvgPanel();
        d3.select("#textPanel_0").attr("transform", "translate(170,80)");
        d3.select("#textPanel_4").attr("transform", "translate(-10,40)");
        d3.select("#earlySigns_header").attr("transform", "translate(-155,70)");
        d3.select("#advancedSigns_header").attr("transform", "translate(-110,70)");
    }

    initScrollPanel() {
        this.scrollPanel = new DeskTopScrollPanel(d3.selectAll(".scrollPanel"));
    }

    getCurrentWidth():number {
        return window.innerWidth
    }

    getCurrentHeight():number {
        return window.innerHeight
    }

    onNavClick(evt) {
        var mouseEvent:MouseEvent = evt._payload;
        var id = evt.target.id.split("_");

        if (evt.target.id.indexOf("magnifyingGlass") != -1 || evt.target.id.indexOf("textPanel_0_Body") != -1) {
            this.nav.hideMobileDropDown();
            this.scrollToSelection("_whatIsPpid")
            id = evt.target.id;
        } else if (evt.target.id.indexOf("Hamburger") != -1) {
            this.nav.showMobileDropDown();

        } else {
            this.nav.hideMobileDropDown();
            this.scrollToSelection("_" + id[1])
        }

        mouseEvent.stopPropagation();
    }


    onResize(evt?) {
        this.currentHeight = (evt) ? evt.currentTarget.innerHeight : window.innerHeight;
        this.currentWidth = (evt) ? evt.currentTarget.innerWidth : window.innerWidth;
        //console.log("onResize", this.currentHeight, this.currentWidth, screen.availHeight, screen.availWidth);
        this.horseCanvas.onResize(this.currentHeight, this.currentWidth);
        if (evt) {
            this.onScroll();
        }
    }

    createScrollScale() {
        var maxH = document.body.scrollHeight - window.innerHeight;
        this.scrollScale = d3.scale.linear().domain([0, maxH]).range([0, 1]);
    }

    /*    onPlusClick(evt) {
     var popUp = new PopUp(evt, this.eventDispatcher, d3.select("#popupWrapper"));
     d3.select("#popupWrapper").classed("hidden", false).classed("visible", true);
     }*/
}

export = DesktopApp;