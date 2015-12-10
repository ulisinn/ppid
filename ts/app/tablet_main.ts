/**
 * Created by ulrichsinn on 03/19/2015.
 */

/// <reference path="../../typings/require.d.ts" />
/// <reference path="../../typings/d3/d3.d.ts" />
/// <reference path="../data/model.ts" />
/// <reference path="../views/canvas.ts" />
/// <reference path="../views/svg_panel.ts" />
/// <reference path="../views/tablet_scrollpanel.ts" />
/// <reference path="../navigation/tablet_nav.ts" />
/// <reference path="../animation/timeline.ts" />
/// <reference path="../app/main.ts" />
/// <reference path="../views/popup.ts" />
/// <reference path="../factory/device_type.ts" />

import MainApp = require("app/main");
import DataModel = require("data/model");
import TabletNav = require("navigation/tablet_nav");
import TabletScrollPanel = require("views/tablet_scrollpanel");
import Timeline = require("animation/timeline");
import PopUp = require("views/popup");
import Device = require("factory/device_type");
import PhoneBackgroundImage = require("views/phone_background_image");


class TabletApp extends MainApp {
    constructor(model:DataModel, evtDispatch:any) {
        super(model, evtDispatch);
    }

    run() {
        console.log("TABLET APP")
        super.run();
    }

    initNavigation() {
        this.nav = new TabletNav(d3.selectAll(".navItem"), this.eventDispatcher);
        super.initNavigation();
    }

    initCanvas() {
        this.horseCanvas = new PhoneBackgroundImage("horseCanvas", [this.horseImage, this.horseImageBlur], this.eventDispatcher);
    }

    initScrollPanel() {
        this.scrollPanel = new TabletScrollPanel(d3.selectAll(".scrollPanel"));
    }

    getCurrentWidth():number {
        return window.innerWidth
    }

    getCurrentHeight():number {
        return window.innerHeight
    }

    onNavClick(evt) {
        var id = evt.target.id.split("_");
        var mouseEvent:MouseEvent = evt._payload;

        if (evt.target.id.indexOf("magnifyingGlass") != -1 || evt.target.id.indexOf("textPanel_0_Body") != -1) {
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


    onOrientationChange(evt) {
        this.currentHeight = (evt) ? evt.currentTarget.innerHeight : window.innerHeight;
        this.currentWidth = (evt) ? evt.currentTarget.innerWidth : window.innerWidth;
        //console.log("onResize", this.currentHeight, this.currentWidth, screen.availHeight, screen.availWidth);
        this.horseCanvas.onResize(this.currentHeight, this.currentWidth);
        if (evt) {
            this.onScroll();
        }
        this.horseSvg.resetPlusSign();
        d3.select("#popupWrapper").classed("hidden", true).classed("visible", false);

    }

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

    createScrollScale() {
        var maxH = document.body.scrollHeight - window.innerHeight;
        this.scrollScale = d3.scale.linear().domain([0, maxH]).range([0, 1]);
    }

    /*    onPlusClick(evt) {
     var popUp = new PopUp(evt, this.eventDispatcher, d3.select("#popupWrapper"));
     d3.select("#popupWrapper").classed("hidden", false).classed("visible", true);
     }*/
}

export = TabletApp;