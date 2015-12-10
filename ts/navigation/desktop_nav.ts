/**
 * Created by ulrichsinn on 03/20/2015.
 */

/// <reference path="../navigation/nav.ts" />
/// <reference path="../../typings/d3/d3.d.ts" />
/// <reference path="../../typings/greensock/greensock.d.ts" />

import d3 = require('d3');
import TweenMax = require('TweenMax');
import CustomEvent = require("events/event");
import Navigation = require("navigation/nav");
import ScrollPanel = require("views/scrollpanel");


class DesktopNav extends Navigation {

    showNav() {
        this.navItems.each(function (d, i) {
            var item = this;
            d3.select(item).classed("hidden", false);
            TweenMax.set(item, {opacity: 0, y: "+=20"});
            TweenMax.to(item, 0.5, {opacity: 1, y: "-=20", delay: i * 0.3})
        })
    }
}

export = DesktopNav;