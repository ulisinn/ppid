/**
 * Created by ulrichsinn on 03/21/2015.
 */

/// <reference path="../../typings/d3/d3.d.ts" />
/// <reference path="../../typings/greensock/greensock.d.ts" />

import d3 = require('d3');
import TweenMax = require('TweenMax');
import CustomEvent = require("events/event");


class MaginfyingGlass {
    private eventDispatcher;
    private id:string;
    private selection;

    constructor(id, sel, evtDispatch) {
        this.eventDispatcher = evtDispatch;
        this.selection = sel;
        this.id = id;

        this.selection.select("#magnifyingGlass").on("click", () => this.onClick(d3.event));

    }

    init() {
        this.selection.classed("hidden", false);
        TweenMax.to(this.id, 2, {opacity: 1, delay: 0.2})
    }

    show() {
        this.selection.classed("hidden", false);

    }

    hide() {
        this.selection.classed("hidden", true);

    }

    onClick(evt) {
        console.log("mag click");
        var customEvent = new CustomEvent(CustomEvent.NAV_CLICK, evt.currentTarget);
        customEvent.payload = evt;
        //console.log("onNavigationClick", customEvent, evt.currentTarget);
        this.eventDispatcher.onNavClick(customEvent);
    }
}

export = MaginfyingGlass