/**
 * Created by ulrichsinn on 03/20/2015.
 */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'd3', 'TweenMax', "navigation/nav"], function (require, exports, d3, TweenMax, Navigation) {
    var DesktopNav = (function (_super) {
        __extends(DesktopNav, _super);
        function DesktopNav() {
            _super.apply(this, arguments);
        }
        DesktopNav.prototype.showNav = function () {
            this.navItems.each(function (d, i) {
                var item = this;
                d3.select(item).classed("hidden", false);
                TweenMax.set(item, { opacity: 0, y: "+=20" });
                TweenMax.to(item, 0.5, { opacity: 1, y: "-=20", delay: i * 0.3 });
            });
        };
        return DesktopNav;
    })(Navigation);
    return DesktopNav;
});
//# sourceMappingURL=desktop_nav.js.map