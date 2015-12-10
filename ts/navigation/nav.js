/**
 * Created by ulrichsinn on 03/20/2015.
 */
define(["require", "exports", 'd3', "events/event"], function (require, exports, d3, CustomEvent) {
    var Navigation = (function () {
        function Navigation(selection, evtDispatch) {
            var _this = this;
            this.eventDispatcher = evtDispatch;
            this.navItems = selection;
            this.navItems.on("click", function () { return _this.onNavigationClick(d3.event); });
        }
        Navigation.prototype.onNavigationClick = function (evt) {
            var customEvent = new CustomEvent(CustomEvent.NAV_CLICK, evt.currentTarget);
            customEvent.payload = evt;
            //console.log("onNavigationClick", customEvent, evt.currentTarget);
            this.eventDispatcher.onNavClick(customEvent);
            var navItems = d3.selectAll(".navItem").classed("navBgColorSelected", false).classed("navBgColor", true);
            navItems.each(function () {
                if (this.id.indexOf(evt.currentTarget.id) != -1) {
                    console.log("setCurrentState", evt.currentTarget.id, this.id);
                }
            });
        };
        Navigation.prototype.showNav = function () {
        };
        Navigation.prototype.showMobileDropDown = function () {
            d3.select("#mobileDropdown").classed("hidden", false);
        };
        Navigation.prototype.hideMobileDropDown = function () {
            console.log("HIDE MOBILE DROPDOWN");
            d3.select("#mobileDropdown").classed("hidden", true);
        };
        return Navigation;
    })();
    return Navigation;
});
//# sourceMappingURL=nav.js.map