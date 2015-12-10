/**
 * Created by ulrichsinn on 04/06/2015.
 */

import d3 = require('d3');
import createjs = require('createjs');
import CustomEvent = require("events/event");
import BackgroundImage = require("views/background_image");


class PhoneBackgroundImage extends BackgroundImage {

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
        var canvY = (canvH - h)/2 * -1;
        d3.select(canvas).style("left", canvX + "px");
        d3.select(canvas).style("top", canvY + "px");

        d3.selectAll(".background")
            .style("left", canvX + "px")
            .style("top", canvY + "px")
            .style("width", canvW + "px")
            .style("height", canvH + "px")
        this.eventDispatcher.onCanvasResize({x: canvX, y: canvY, width: canvW, height: canvH})
        console.log(canvX, canvY, "canvas onResize H", h, d3.select(canvas).style("height"), w, d3.select(canvas).style("width"));
    }

}

export = PhoneBackgroundImage;