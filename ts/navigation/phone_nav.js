/**
 * Created by ulrichsinn on 03/20/2015.
 */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", 'd3', "navigation/nav"], function (require, exports, d3, Navigation) {
    var PhoneNav = (function (_super) {
        __extends(PhoneNav, _super);
        function PhoneNav() {
            _super.apply(this, arguments);
        }
        PhoneNav.prototype.showNav = function () {
            this.navItems.each(function (d, i) {
                var item = this;
                d3.select(item).classed("hidden", false);
            });
        };
        return PhoneNav;
    })(Navigation);
    return PhoneNav;
});
//# sourceMappingURL=phone_nav.js.map