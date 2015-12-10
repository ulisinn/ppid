/**
 * Created by ulrichsinn on 04/06/2015.
 */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'd3', "views/background_image"], function (require, exports, d3, BackgroundImage) {
    var PhoneBackgroundImage = (function (_super) {
        __extends(PhoneBackgroundImage, _super);
        function PhoneBackgroundImage() {
            _super.apply(this, arguments);
        }
        PhoneBackgroundImage.prototype.onResize = function (h, w, deltaW, deltaH) {
            var scale = d3.scale.linear();
            //console.log("image", this.imageWidth, this.imageHeight, this.imageWidth / this.imageHeight, "screen", screen.availHeight, screen.availWidth)
            var aspectRatio = d3.scale.linear().domain([0, this.imageWidth / this.imageHeight]).range([0, 1]);
            this.currentHeight = h;
            this.currentWidth = w;
            var canvas = document.getElementById(this.canvasId);
            if (aspectRatio(w / h) > 1) {
                scale.domain([0, this.imageHeight]).range([0, 1]);
                d3.select(canvas).style("width", w + "px");
                d3.select(canvas).style("height", h * aspectRatio(w / h) + "px");
            }
            else {
                d3.select(canvas).style("width", w / aspectRatio(w / h) + "px");
                d3.select(canvas).style("height", h + "px");
                scale.domain([0, this.imageWidth]).range([0, 1]);
            }
            var canvH = parseInt(d3.select(canvas).style("height"));
            var canvW = parseInt(d3.select(canvas).style("width"));
            var canvX = (canvW - w) / 2 * -1;
            var canvY = (canvH - h) / 2 * -1;
            d3.select(canvas).style("left", canvX + "px");
            d3.select(canvas).style("top", canvY + "px");
            d3.selectAll(".background").style("left", canvX + "px").style("top", canvY + "px").style("width", canvW + "px").style("height", canvH + "px");
            this.eventDispatcher.onCanvasResize({ x: canvX, y: canvY, width: canvW, height: canvH });
            console.log(canvX, canvY, "canvas onResize H", h, d3.select(canvas).style("height"), w, d3.select(canvas).style("width"));
        };
        return PhoneBackgroundImage;
    })(BackgroundImage);
    return PhoneBackgroundImage;
});
//# sourceMappingURL=phone_background_image.js.map