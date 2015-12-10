/**
 * Created by ulrichsinn on 03/21/2015.
 */
define(["require", "exports", 'd3', 'TweenMax', "events/event"], function (require, exports, d3, TweenMax, CustomEvent) {
    var MaginfyingGlass = (function () {
        function MaginfyingGlass(id, sel, evtDispatch) {
            var _this = this;
            this.eventDispatcher = evtDispatch;
            this.selection = sel;
            this.id = id;
            this.selection.select("#magnifyingGlass").on("click", function () { return _this.onClick(d3.event); });
        }
        MaginfyingGlass.prototype.init = function () {
            this.selection.classed("hidden", false);
            TweenMax.to(this.id, 2, { opacity: 1, delay: 0.2 });
        };
        MaginfyingGlass.prototype.show = function () {
            this.selection.classed("hidden", false);
        };
        MaginfyingGlass.prototype.hide = function () {
            this.selection.classed("hidden", true);
        };
        MaginfyingGlass.prototype.onClick = function (evt) {
            console.log("mag click");
            var customEvent = new CustomEvent(CustomEvent.NAV_CLICK, evt.currentTarget);
            customEvent.payload = evt;
            //console.log("onNavigationClick", customEvent, evt.currentTarget);
            this.eventDispatcher.onNavClick(customEvent);
        };
        return MaginfyingGlass;
    })();
    return MaginfyingGlass;
});
//# sourceMappingURL=magnifying_glass.js.map