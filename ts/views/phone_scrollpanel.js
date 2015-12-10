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
    var PhoneScrollPanel = (function (_super) {
        __extends(PhoneScrollPanel, _super);
        function PhoneScrollPanel() {
            _super.apply(this, arguments);
        }
        PhoneScrollPanel.prototype.buildScrollPanel = function () {
            this.defaultHeight = [400, 600, 400, 400, 400, 800, null];
            _super.prototype.buildScrollPanel.call(this);
        };
        return PhoneScrollPanel;
    })(ScrollPanel);
    return PhoneScrollPanel;
});
//# sourceMappingURL=phone_scrollpanel.js.map