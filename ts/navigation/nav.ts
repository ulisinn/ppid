/**
 * Created by ulrichsinn on 03/20/2015.
 */

/// <reference path="../../typings/d3/d3.d.ts" />
/// <reference path="../../typings/greensock/greensock.d.ts" />

import d3 = require('d3');
import TweenMax = require('TweenMax');
import CustomEvent = require("events/event");


class Navigation {
    protected navItems;
    protected eventDispatcher;

    constructor(selection, evtDispatch:any) {
        this.eventDispatcher = evtDispatch;

        this.navItems = selection;
        this.navItems.on("click", () => this.onNavigationClick(d3.event));

    }

    onNavigationClick(evt:any) {
        var customEvent = new CustomEvent(CustomEvent.NAV_CLICK, evt.currentTarget);
        customEvent.payload = evt;
        //console.log("onNavigationClick", customEvent, evt.currentTarget);
        this.eventDispatcher.onNavClick(customEvent);
        var navItems = d3.selectAll(".navItem").classed("navBgColorSelected", false).classed("navBgColor", true);
        navItems.each(function () {
            if (this.id.indexOf(evt.currentTarget.id) != -1) {
                console.log("setCurrentState", evt.currentTarget.id, this.id);
                //d3.select(this).classed("navBgColorSelected", true).classed("navBgColor", false);
            }
        })
    }

    showNav() {

    }

    showMobileDropDown() {
        d3.select("#mobileDropdown").classed("hidden", false);
    }

    hideMobileDropDown() {
        console.log("HIDE MOBILE DROPDOWN")
        d3.select("#mobileDropdown").classed("hidden", true);
    }
}

export = Navigation;
