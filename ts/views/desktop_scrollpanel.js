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
    var DesktopScrollPanel = (function (_super) {
        __extends(DesktopScrollPanel, _super);
        function DesktopScrollPanel() {
            _super.apply(this, arguments);
        }
        DesktopScrollPanel.prototype.buildScrollPanel = function () {
            this.defaultHeight = [1500, 1500, 1500, 1500, 1500, 1500, null];
            _super.prototype.buildScrollPanel.call(this);
        };
        return DesktopScrollPanel;
    })(ScrollPanel);
    return DesktopScrollPanel;
});
//# sourceMappingURL=desktop_scrollpanel.js.map