/**
 * Created by ulrichsinn on 03/20/2015.
 */
define(["require", "exports", 'd3'], function (require, exports, d3) {
    var ScrollPanel = (function () {
        function ScrollPanel(selection) {
            this.totalHeight = 0;
            this.allPanels = selection;
            this.buildScrollPanel();
        }
        ScrollPanel.prototype.buildScrollPanel = function () {
            var _this = this;
            var totalH = 0;
            this.totalHeight = 0;
            this.allPanels.each(function (d, i) { return _this.setPanelHeight(d, i, _this.allPanels[0][i]); });
        };
        ScrollPanel.prototype.setPanelHeight = function (d, i, el) {
            var id = el.id;
            var h = this.defaultHeight[i];
            var totalH = this.totalHeight;
            if (id != "scrollPanel_6" && h != null) {
                d3.select(el).style("height", function () {
                    return h + "px";
                });
            }
            else {
                this.defaultHeight[i] = parseFloat(d3.select(el).style("height"));
            }
            d3.select(el).style("top", function () {
                var h = parseFloat(d3.select(this).style("height"));
                console.log("top", totalH);
                totalH += h;
                return totalH;
            });
            this.totalHeight = totalH;
        };
        ScrollPanel.prototype.onScroll = function (top, height) {
            var maxH = height - window.innerHeight;
            this.scrollScale = d3.scale.linear().domain([0, maxH]).range([0, 1]);
            return this.scrollScale(top);
        };
        ScrollPanel.prototype.getPanelHeight = function () {
            return this.defaultHeight;
        };
        return ScrollPanel;
    })();
    return ScrollPanel;
});
//# sourceMappingURL=scrollpanel.js.map