/**
 * Created by ulrichsinn on 03/18/2015.
 */
define(["require", "exports", 'd3', 'TweenMax'], function (require, exports, d3, TweenMax) {
    var PopUp = (function () {
        function PopUp(customEvt, evtDispatch, selection) {
            var _this = this;
            this.eventDispatcher = evtDispatch;
            this._data = customEvt.payload.data.callout;
            for (var i = 0; i < this._data.length; i++) {
                this._data[i].position = customEvt.payload.data.position;
            }
            this._whichDevice = customEvt.payload.data.whichDevice;
            this._mouseEvent = customEvt.payload.originalEvent;
            this._popupInner = selection.select("#popupInner");
            this._popupOuter = selection.select("#popupOuter");
            this._popupOuter.data(this._data);
            switch (this._whichDevice) {
                case "DESKTOP":
                    this.createDesktopPopUp(this._popupInner, this._popupOuter);
                    break;
                case "TABLET":
                    if (this.getDeviceOrientation() == "portrait") {
                        this.createPhonePopUp(this._popupInner, this._popupOuter);
                    }
                    else {
                        this.createDesktopPopUp(this._popupInner, this._popupOuter);
                    }
                    break;
                case "PHONE":
                    if (this.getDeviceOrientation() == "portrait") {
                        this.createPhonePopUp(this._popupInner, this._popupOuter);
                    }
                    else {
                        this.createDesktopPopUp(this._popupInner, this._popupOuter);
                    }
                    console.log("getDeviceOrientation()", this.getDeviceOrientation());
                    break;
            }
            var howMany = this._data.length;
            if (howMany > 1) {
                this.addPanelButtons(this._popupInner);
            }
            selection.select("#popupOuter").style("opacity", 0);
            setTimeout(function () { return _this.setPosition(selection, _this._mouseEvent); }, 200);
        }
        PopUp.prototype.createDesktopPopUp = function (popupInner, selection) {
            var popupHeight = 239, popupWidth = 392, popupContent;
            this._popupWidth = popupWidth;
            selection.style({ width: popupWidth + "px", height: popupHeight + "px", overflow: "hidden" });
            popupInner.selectAll("div").remove();
            popupInner.selectAll("div.popupContent").data(this._data).enter().append("div").classed("popupContent", true);
            popupContent = d3.selectAll(".popupContent");
            popupContent.each(function (d, i) {
                //console.log("popupInner", i, d);
                var currentPanel = d3.select(this);
                currentPanel.attr("id", "popupPanel_" + i).style({
                    position: "absolute",
                    top: "0",
                    left: popupWidth * i + "px"
                });
                currentPanel.append("img").attr("src", function (d, i) {
                    return d.image;
                }).style({
                    position: "absolute",
                    top: 0,
                    left: 0
                }).on("click", function (d, i) {
                    d3.event.stopPropagation();
                });
                currentPanel.append("div").style({
                    position: "absolute",
                    top: "70px",
                    left: "218px",
                    width: "160px"
                }).html(function (d, i) {
                    return d.description;
                });
            });
        };
        PopUp.prototype.createPhonePopUp = function (popupInner, selection) {
            var popupHeight = 360, popupWidth = 255, popupContent;
            this._popupWidth = popupWidth;
            selection.style({ width: popupWidth + "px", height: popupHeight + "px", overflow: "hidden" });
            popupInner.selectAll("div").remove();
            popupInner.selectAll("div.popupContent").data(this._data).enter().append("div").classed("popupContent", true);
            popupContent = d3.selectAll(".popupContent");
            selection.style({ left: "10%", width: popupWidth + "px", height: popupHeight + "px", overflow: "hidden" });
            popupInner.selectAll("div").remove();
            popupInner.selectAll("div.popupContent").data(this._data).enter().append("div").classed("popupContent", true);
            popupContent = d3.selectAll(".popupContent");
            popupContent.each(function (d, i) {
                //console.log("popupInner", i, d);
                var currentPanel = d3.select(this);
                currentPanel.attr("id", "popupPanel_" + i).style({
                    position: "absolute",
                    top: "0",
                    left: popupWidth * i + "px"
                });
                currentPanel.append("img").attr("src", function (d, i) {
                    return d.image;
                }).style({
                    position: "absolute",
                    top: 0,
                    left: 0
                }).on("click", function (d, i) {
                    d3.event.stopPropagation();
                });
                currentPanel.append("div").style({
                    position: "absolute",
                    top: "230px",
                    left: "1em",
                    width: "220px"
                }).html(function (d, i) {
                    return d.description;
                });
            });
        };
        PopUp.prototype.addPanelButtons = function (popupInner) {
            var buttonWrapper = popupInner.append("div");
            var panelButton = buttonWrapper.selectAll("div.popupPanelSelection");
            var owner = this;
            panelButton.data(this._data).enter().append("div").attr("id", function (d, i) {
                return "selectPanelBtn_" + i;
            }).classed("popupPanelSelection", true).classed("selected", function (d, i) {
                return (i == 0) ? true : false;
            }).on("click", function (d, i) {
                panelButton.classed("selected", false);
                var currentClick = i;
                var isSelected = d3.select(this).classed("selected");
                if (isSelected) {
                    console.log("do nothing");
                }
                else {
                    d3.selectAll(".popupPanelSelection").each(function (d, j) {
                        var btn = d3.select(this);
                        if (j === currentClick) {
                            btn.classed("selected", true);
                            owner.slidePanel(this.id, j);
                        }
                        else {
                            btn.classed("selected", false);
                        }
                    });
                }
                d3.event.stopPropagation();
            });
        };
        PopUp.prototype.slidePanel = function (id, index) {
            switch (index) {
                case 0:
                    TweenMax.to("#popupPanel_0", 0.3, { x: "+=" + this._popupWidth });
                    TweenMax.to("#popupPanel_1", 0.3, { x: "+=" + this._popupWidth });
                    break;
                case 1:
                    TweenMax.to("#popupPanel_0", 0.3, { x: "-=" + this._popupWidth });
                    TweenMax.to("#popupPanel_1", 0.3, { x: "-=" + this._popupWidth });
                    break;
            }
        };
        PopUp.prototype.setPosition = function (selection, mouseEvent) {
            var whichDevice = this._whichDevice, left = mouseEvent.clientX, top = mouseEvent.clientY, popupContent = selection.select("#popupOuter")[0][0], h = popupContent.clientHeight, orientation = this.getDeviceOrientation(), data = selection.select("#popupOuter").datum();
            if (data.position == "right") {
                left = left - this._popupWidth - 30;
            }
            //console.log(whichDevice, popupContent, h, "set PopUp Position", top, left, mouseEvent);
            selection.select("#popupOuter").style("top", function (d, i) {
                var topPos = (whichDevice == "DESKTOP" || whichDevice == "TABLET") ? top - h + "px" : (orientation == "portrait") ? "15%" : "9%";
                return topPos;
            }).style("left", function (d, i) {
                var leftPos = (whichDevice == "DESKTOP" || whichDevice == "TABLET") ? left + 15 + "px" : (orientation == "portrait") ? "10%" : "15%";
                return leftPos;
            });
            TweenMax.to(popupContent, 0.3, { opacity: 1 });
        };
        PopUp.prototype.getDeviceOrientation = function () {
            if (Math.abs(window.orientation) === 90) {
                return "landscape";
            }
            else {
                return "portrait";
            }
        };
        return PopUp;
    })();
    return PopUp;
});
//# sourceMappingURL=popup.js.map