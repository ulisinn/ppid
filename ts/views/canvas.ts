/**
 * Created by ulrichsinn on 03/19/2015.
 */

/// <reference path="../../typings/d3/d3.d.ts" />
/// <reference path="../../typings/easeljs/easeljs.d.ts" />

import d3 = require('d3');
import createjs = require('createjs');
import CustomEvent = require("events/event");


class HorseCanvas {
    private stage;
    private backgroundImage;
    private foregroundImage;
    private foregroundImageBlur;
    private backgroundRect;
    private foregroundRect;
    private canvasId;
    private currentHeight;
    private currentWidth;
    private imageWidth;
    private imageHeight;
    private eventDispatcher;

    constructor(id, backgroundImage, evtDispatch) {
        this.eventDispatcher = evtDispatch;
        this.canvasId = id;
        this.stage = new createjs.Stage(id);
        this.foregroundImage = new createjs.Bitmap(backgroundImage[0]);
        this.foregroundImageBlur = new createjs.Bitmap(backgroundImage[1]);
        this.addBackgroundImage();
        this.eventDispatcher.on("onBlurCanvas", (o) => this.onBlurCanvas(o));

    }

    handleTick(){
        this.stage.update();
        console.log("tick");
    }

    onBlurCanvas(o) {
        //console.log("onBlurCanvas",o);
        this.blurForeground(o)
    }

    blurForeground(val) {
        var blurScale = d3.scale.linear().domain([0, 30]).range([0, 1]);
        this.foregroundRect.alpha = blurScale(val / 2);
        this.foregroundImageBlur.alpha = blurScale(val);
        this.foregroundImage.alpha = 1 - blurScale(val);
        console.log(val, blurScale(val));
        //this.stage.update();

    }

    /*    blurForeground(val:number) {
     var blurScale = d3.scale.linear().domain([0, 30]).range([0, 0.5]);
     //console.log(val, blurScale(val));
     var blurFilter = new createjs.BlurFilter(val, val, 1);
     this.foregroundImage.filters = [blurFilter];
     var bounds = blurFilter.getBounds();

     this.foregroundImage.cache(0, 0, this.imageWidth, this.imageHeight);
     this.backgroundRect.alpha = blurScale(val);

     this.stage.update();
     }*/

    addBackgroundImage() {
        console.log("image loaded", this.foregroundImage.image.width)
        this.imageWidth = this.foregroundImage.image.width;
        this.imageHeight = this.foregroundImage.image.height;
        this.foregroundImage.cache(0, 0, this.imageWidth, this.imageHeight);
        this.backgroundImage = this.foregroundImage.clone(true)

        //this.blurForground(30);
        var graphics = new createjs.Graphics().beginFill("#000000").drawRect(0, 0, this.imageWidth, this.imageHeight);
        this.backgroundRect = new createjs.Shape(graphics);
        this.foregroundRect = new createjs.Shape(graphics);
        this.backgroundRect.alpha = 0.5;
        this.foregroundRect.alpha = 0;
        this.foregroundImageBlur.alpha = 0;

        this.stage.addChild(this.backgroundRect);
        this.stage.addChild(this.foregroundImage);
        this.stage.addChild(this.foregroundImageBlur);
        this.stage.addChild(this.foregroundRect);
        this.stage.update();

        this.eventDispatcher.onCanvasReady();
        createjs.Ticker.addEventListener("tick", () => this.handleTick());

    }

    onResize(h:number, w:number, deltaW?, deltaH?) {
        var scale = d3.scale.linear();
        //console.log("image", this.imageWidth, this.imageHeight, this.imageWidth / this.imageHeight, "screen", screen.availHeight, screen.availWidth)
        var aspectRatio = d3.scale.linear().domain([0, this.imageWidth / this.imageHeight]).range([0, 1]);
        this.currentHeight = h;
        this.currentWidth = w;
        var canvas = document.getElementById(this.canvasId)
        if (aspectRatio(w / h) > 1) {
            scale.domain([0, this.imageHeight]).range([0, 1])
            d3.select(canvas).style("width", w + "px")
            d3.select(canvas).style("height", h * aspectRatio(w / h) + "px")

        } else {
            d3.select(canvas).style("width", w / aspectRatio(w / h) + "px")
            d3.select(canvas).style("height", h + "px")

            scale.domain([0, this.imageWidth]).range([0, 1])

        }
        var canvH = parseInt(d3.select(canvas).style("height"));
        var canvW = parseInt(d3.select(canvas).style("width"));
        var canvX = (canvW - w) / 2 * -1;
        var canvY = (canvH - h) / 2 * -1;
        d3.select(canvas).style("left", canvX + "px");
        d3.select(canvas).style("top", canvY + "px");
        this.eventDispatcher.onCanvasResize({x: canvX, y: canvY, width: canvW, height: canvH})
        console.log(canvX, canvY, "canvas onResize H", h, d3.select(canvas).style("height"), w, d3.select(canvas).style("width"));
    }

    onScroll(top:number, height:number) {

    }
}

export = HorseCanvas;