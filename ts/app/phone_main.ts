/**
 * Created by ulrichsinn on 03/19/2015.
 */

/// <reference path="../../typings/require.d.ts" />
/// <reference path="../../typings/d3/d3.d.ts" />
/// <reference path="../data/model.ts" />
/// <reference path="../views/canvas.ts" />
/// <reference path="../views/svg_panel.ts" />
/// <reference path="../views/phone_background_image.ts" />
/// <reference path="../views/scrollpanel.ts" />
/// <reference path="../navigation/nav.ts" />
/// <reference path="../animation/timeline.ts" />
/// <reference path="../app/main.ts" />
/// <reference path="../factory/device_type.ts" />

import MainApp = require("app/main");
import DataModel = require("data/model");
import PhonepNav = require("navigation/phone_nav");
import PhoneScrollPanel = require("views/phone_scrollpanel");
import Timeline = require("animation/timeline");
import Device = require("factory/device_type");
import PhoneBackgroundImage = require("views/phone_background_image");


class PhoneApp extends MainApp {
    constructor(model:DataModel, evtDispatch:any) {
        super(model, evtDispatch);
    }

    run() {
        console.log("PhoneApp run")
        super.run();
    }

    initNavigation() {
        console.log("PhoneApp initNavigation");
        this.nav = new PhonepNav(d3.select("#mobileNav").selectAll(".navItem"), this.eventDispatcher);
        super.initNavigation();
    }

    initCanvas() {
        this.horseCanvas = new PhoneBackgroundImage("horseCanvas", [this.horseImage, this.horseImageBlur], this.eventDispatcher);
    }

    initSvgPanel() {
        super.initSvgPanel();
        console.log("PhoneApp initSvgPanel")
        d3.select("#textPanel_0").attr("transform", "translate(40,-20)");
        d3.select("#textPanel_1").attr("transform", "translate(10,-70)");
        d3.select("#textPanel_2").attr("transform", "translate(10,-70)");
        d3.select("#textPanel_4").attr("transform", "translate(10,-70)");
        var panel1Copy:string[] = ["Pituitary Pars Intermedia Dysfunction (PPID)",
            "formerly known as Equine Cushing’s Disease,",
            "causes the horse's pituitary gland, which utilizes",
            "hormones to control body functions, to work",
            "overtime – leading to a variety of problems."];

        var tspan = d3.select("#textPanel_1_Body").selectAll("tspan")
            .data(panel1Copy)

        tspan.each(function (d, i) {
            d3.select(this).text(d);
        })
    }

    initScrollPanel() {
        this.scrollPanel = new PhoneScrollPanel(d3.selectAll(".scrollPanel"));
    }

    onNavClick(evt) {
        var id = evt.target.id.split("_");
        var mouseEvent:MouseEvent = evt._payload;

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
        //console.log("onNavClick", id)
        mouseEvent.stopPropagation();

    }

    //onScroll() {
    //    // needs override
    //}

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


    createScrollScale() {
        var maxH = document.body.scrollHeight - screen.availHeight;
        this.scrollScale = d3.scale.linear().domain([0, maxH]).range([0, 1]);
    }

    getCurrentWidth():number {
        return screen.availWidth
    }

    getCurrentHeight():number {
        return screen.availHeight
    }
}

export = PhoneApp;