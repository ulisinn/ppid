/**
 * Created by ulrichsinn on 03/20/2015.
 */

/// <reference path="../../typings/require.d.ts" />
/// <reference path="../../typings/d3/d3.d.ts" />
/// <reference path="../../typings/easeljs/easeljs.d.ts" />
/// <reference path="../events/event.ts" />

import d3 = require('d3');
import TweenMax = require('TweenMax');
import CustomEvent = require("events/event");

class HorseSvg {
    protected eventDispatcher;
    protected advancedPlusIcon;
    protected earlyPlusIcon;
    protected frontMost:string;
    protected earlyPlusIconPulsing:boolean = false;
    protected advancedPlusIconPulsing:boolean = false;
    protected earlyPlusTimeline;
    protected advancePlusTimeline;

    constructor(selection, evtDispatch) {
        this.eventDispatcher = evtDispatch;
        this.eventDispatcher.on("onCanvasResize", () => {
            selection.style("left", arguments[0].x + "px")
            selection.style("top", arguments[0].y + "px")
            selection.style("width", arguments[0].width + "px")
            selection.style("height", arguments[0].height + "px")
        })

        console.log("HORSECANVAS")
        d3.select("#textPanel_0_Body").on("click", () => this.onClick(d3.event))
    }

    onResize(obj) {
        //
    }

    resetPlusSign() {
        d3.selectAll(".plusVertical").classed("hidden", false);
    }

    dispatchPlusClick(d, i, evt) {
        //console.log("dispatchPlusClick", evt)
        var customEvt = new CustomEvent(CustomEvent.PLUS_CLICK);
        customEvt.payload = {originalEvent: evt, data: d};
        this.eventDispatcher.onPlusClick(customEvt);
    }

    createPlusSigns(obj, selection, fill, whichDevice:string) {
        var points = obj;
        var owner = this;
        var selectedGroup;

        var selectedGroup = selection.selectAll("g.plusSign")
            .data(points)
            .enter()
            .append("g")
            .attr("class", "plusSign")
            .attr("transform", function (d, i) {
                d.whichDevice = whichDevice;
                var x = d.location.x;
                var y = d.location.y;
                return "translate(" + x + "," + y + ")";
            })
            .attr("opacity", 0)
            .on("click", function (d, i) {
                d3.selectAll(".plusVertical").classed("hidden", false);
                var evt = d3.event;
                var sel = d3.select(this);
                sel.selectAll(".plusVertical").classed("hidden", true);
                owner.dispatchPlusClick(d, i, evt)
            });

        selectedGroup.each(function (d, i) {
                var group = this;
                var innerGroup = d3.select(this).append("g");
                innerGroup.attr("transform", function (d, i) {
                    return (whichDevice == "DESKTOP") ? "scale(0.35)" : "scale(1)";
                });
                innerGroup.append("circle")
                    .attr("opacity", 0)
                    .attr("stroke", "none")
                    .attr("fill", "#fff")
                    .style("filter", "url(#blurFilter)")
                    .attr("cx", "0")
                    .attr("cy", "0")
                    .attr("r", function (d, i) {
                        return (whichDevice == "DESKTOP") ? 40 : 40;
                    })
                    .classed("plusCirclePuls", true)
                    .attr("id", function (d, j) {
                        if (selection[0][0].id == "svg_advancedSigns") {
                            return "advancedSignPuls_" + i
                        } else {
                            return "earlySignPuls_" + i

                        }
                    })

                innerGroup.append("circle")
                    .attr("opacity", 1)
                    .attr("stroke", "none")
                    .attr("fill", "#fff")
                    .style("filter", "url(#blurFilter)")
                    .attr("cx", "0")
                    .attr("cy", "0")
                    .attr("r", function (d, i) {
                        return (whichDevice == "DESKTOP") ? 20 : 20;
                    })
                    .classed("plusCircleBlur", true);

                innerGroup.append("circle")
                    .attr("fill", "none")
                    .attr("stroke", "#B8BABC")
                    .attr("stroke-width", "3")
                    //.attr("fill", fill)
                    .attr("cx", "0")
                    .attr("cy", "0")
                    .attr("r", function (d, i) {
                        return (whichDevice == "DESKTOP") ? 16 : 16;
                    })
                    .classed("plusCircleOuter", true);

                innerGroup.append("circle")
                    .attr("fill", "#dedfdf")
                    //.attr("fill", fill)
                    .attr("cx", "0")
                    .attr("cy", "0")
                    .attr("r", function (d, i) {
                        return (whichDevice == "DESKTOP") ? 10 : 10;
                    })
                    .classed("plusCircle", true);

                innerGroup.append("rect")
                    .attr("fill", "#0071BB")
                    .attr("x", function (d, i) {
                        return (whichDevice == "DESKTOP") ? -5 : -5;
                    })
                    .attr("y", function (d, i) {
                        return (whichDevice == "DESKTOP") ? -1.5 : -1.5;
                    })
                    .attr("width", function (d, i) {
                        return (whichDevice == "DESKTOP") ? 10 : 10;
                    })
                    .attr("height", function (d, i) {
                        return (whichDevice == "DESKTOP") ? 3 : 3;
                    })
                    .classed("plusHorizontal", true);

                innerGroup.append("rect")
                    .attr("fill", "#0071BB")
                    .attr("y", function (d, i) {
                        return (whichDevice == "DESKTOP") ? -5 : -5;
                    })
                    .attr("x", function (d, i) {
                        return (whichDevice == "DESKTOP") ? -1.5 : -1.5;
                    })
                    .attr("height", function (d, i) {
                        return (whichDevice == "DESKTOP") ? 10 : 10;
                    })
                    .attr("width", function (d, i) {
                        return (whichDevice == "DESKTOP") ? 3 : 3;
                    })
                    .classed("plusVertical", true);
            }
        )

        if (selection[0][0].id == "svg_advancedSigns") {
            this.advancedPlusIcon = selectedGroup
        } else {
            this.earlyPlusIcon = selectedGroup

        }

        console.log("createEarlySignsSvg", this.earlyPlusIcon, this.advancedPlusIcon)

    }


    createAdvanceSignsSvg(obj) {
        var advancedSignsSelection
    }

    bringToFront(which:string) {
        if (!which) {
            return;
        }

        if (this.frontMost == which) {
            return
        } else {
            this.frontMost = which;
        }
        var bringToFront = d3.select(which);
        var circleWrapper = d3.select("#circleWrapper");
        var frontMost = circleWrapper.selectAll(".circleContainer")[0][1]
        if (frontMost.id != bringToFront.attr("id")) {
            bringToFront.node().parentElement.appendChild(bringToFront.node());
            this.resetPlusSign()
        }
        console.log("bringToFront", which, this.frontMost)
    }

    onStateChanged(state:string) {
        this.hideAllHotSpots();

        if (state == "_advancedSigns") {
            this.advancedPlusIconPulsing = true;
            this.earlyPlusIconPulsing = false;
            this.animateSigns(this.advancedPlusIcon, 60);
        } else {
            this.advancedPlusIconPulsing = false;
            this.earlyPlusIconPulsing = true;
            this.animateSigns(this.earlyPlusIcon, 120);
        }
    }

    animateSigns(selection, delay) {
        var owner = this;
        selection.each(function (d, i) {
            var x = d.location.x;
            var yEnd = d.location.y;
            var yStart = d.location.y + 130;
            //console.log("animateEarlySigns", d, i)
            d3.select(this)
                .transition()
                .delay(i * delay)
                .duration(600)
                .attr("opacity", 1)
                .attr("transform", "translate(" + x + "," + yEnd + ")")
                .each("end", function (d, i) {
                    var puls = d3.select(this).select(".plusCirclePuls")
                    owner.startPulse(puls, d, i)
                })

        })
    }

    startPulse(puls, d, i) {
        var id = puls[0][0].id;
        var the_el = puls[0][0];
        var owner = this;
        //console.log("startPulse", id)
        pulse();
        function pulse() {
            if (id.indexOf("early") != -1 && owner.earlyPlusIconPulsing == false) {
                return
            }
            if (id.indexOf("advanced") != -1 && owner.advancedPlusIconPulsing == false) {
                return
            }
            //console.log(" --- pulse", id)

            TweenMax.to(the_el, 1, {
                delay: Math.random(),
                attr: {
                    opacity: 0.4
                }, onComplete: function () {
                    //console.log(" ----- pulse", id)

                    TweenMax.to(the_el, 1, {
                        delay: Math.random(),
                        attr: {
                            opacity: 0
                        }, onComplete: function () {
                            pulse()
                        }
                    })
                }
            })
        }
    }

    hideAllHotSpots() {
        this.earlyPlusIcon.each(function (d, i) {
            var x = d.location.x;
            var yEnd = d.location.y;
            var yStart = d.location.y + 100;
            //console.log("animateEarlySigns", d, i)
            d3.select(this).attr("transform", "translate(" + x + "," + yStart + ")")
                .attr("opacity", 0)
        })

        this.advancedPlusIcon.each(function (d, i) {
            var x = d.location.x;
            var yEnd = d.location.y;
            var yStart = d.location.y + 100;
            //console.log("animateEarlySigns", d, i)
            d3.select(this).attr("transform", "translate(" + x + "," + yStart + ")")
                .attr("opacity", 0)
        })
    }

    onClick(evt) {
        console.log("textPanel_0_Body click");
        var customEvent = new CustomEvent(CustomEvent.NAV_CLICK, evt.currentTarget);
        customEvent.payload = evt;
        //console.log("onNavigationClick", customEvent, evt.currentTarget);
        this.eventDispatcher.onNavClick(customEvent);
    }
}

export = HorseSvg;