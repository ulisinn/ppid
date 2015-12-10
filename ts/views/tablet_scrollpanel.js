/**
 * Created by ulrichsinn on 03/20/2015.
 */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "views/scrollpanel"], function (require, exports, ScrollPanel) {
    var TabletScrollPanel = (function (_super) {
        __extends(TabletScrollPanel, _super);
        function TabletScrollPanel() {
            _super.apply(this, arguments);
        }
        TabletScrollPanel.prototype.buildScrollPanel = function () {
            this.defaultHeight = [400, 400, 800, 400, 1000, null];
            console.log("buildScrollPanel", this.defaultHeight);
            _super.prototype.buildScrollPanel.call(this);
        };
        return TabletScrollPanel;
    })(ScrollPanel);
    return TabletScrollPanel;
});
//# sourceMappingURL=tablet_scrollpanel.js.map