/**
 * Created by ulrichsinn on 03/23/2015.
 */
define(["require", "exports"], function (require, exports) {
    var Device;
    (function (Device) {
        Device[Device["PHONE"] = 0] = "PHONE";
        Device[Device["TABLET"] = 1] = "TABLET";
        Device[Device["DESKTOP"] = 2] = "DESKTOP";
    })(Device || (Device = {}));
    return Device;
});
//# sourceMappingURL=device_type.js.map