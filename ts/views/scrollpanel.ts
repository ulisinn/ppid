/**
 * Created by ulrichsinn on 03/20/2015.
 */

/// <reference path="../../typings/d3/d3.d.ts" />


import d3 = require('d3');


class ScrollPanel {
    protected allPanels;
    protected totalHeight:number = 0;
    protected scrollScale;
    protected defaultHeight:number[];


    constructor(selection) {
        this.allPanels = selection;
        this.buildScrollPanel()
    }

    protected buildScrollPanel() {
        var totalH = 0;
        this.totalHeight = 0;
        this.allPanels.each((d, i) => this.setPanelHeight(d, i, this.allPanels[0][i]));
    }

    protected setPanelHeight(d, i, el) {
        var id = el.id
        var h = this.defaultHeight[i];
        var totalH = this.totalHeight

        if (id != "scrollPanel_6" && h != null) {
            d3.select(el).style("height", function () {
                return h + "px";
            })
        } else {
            this.defaultHeight[i] = parseFloat(d3.select(el).style("height"));
        }

        d3.select(el).style("top", function () {
            var h = parseFloat(d3.select(this).style("height"))
            console.log("top", totalH)
            totalH += h;
            return totalH;
        });

        this.totalHeight = totalH;
    }


    onScroll(top:number, height:number):number {
        var maxH = height - window.innerHeight;
        this.scrollScale = d3.scale.linear().domain([0, maxH]).range([0, 1]);
        return this.scrollScale(top);
    }

    getPanelHeight():number[] {
        return this.defaultHeight;
    }
}

export = ScrollPanel;