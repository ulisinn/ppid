/**
 * Created by ulrichsinn on 03/20/2015.
 */
define(["require", "exports", 'TweenMax', 'd3'], function (require, exports, TweenMax, d3) {
    var TimelineLabel = (function () {
        function TimelineLabel(name, top, timestamp) {
            this.name = name;
            this.top = top;
            this.timestamp = timestamp;
            //
        }
        return TimelineLabel;
    })();
    var SCROLL_DIRECTION;
    (function (SCROLL_DIRECTION) {
        SCROLL_DIRECTION[SCROLL_DIRECTION["UP"] = 0] = "UP";
        SCROLL_DIRECTION[SCROLL_DIRECTION["DOWN"] = 1] = "DOWN";
    })(SCROLL_DIRECTION || (SCROLL_DIRECTION = {}));
    var Label;
    (function (Label) {
        Label[Label["_home"] = 0] = "_home";
        Label[Label["_whatIsPpid"] = 1] = "_whatIsPpid";
        Label[Label["_earlyInsert"] = 2] = "_earlyInsert";
        Label[Label["_earlySigns"] = 3] = "_earlySigns";
        Label[Label["_advancedSigns"] = 4] = "_advancedSigns";
        Label[Label["_askVet"] = 5] = "_askVet";
        Label[Label["_treatment"] = 6] = "_treatment";
    })(Label || (Label = {}));
    var Timeline = (function () {
        function Timeline(evtDispatch, panelHeight, scrollScale, whichDevice) {
            this._tlLength = 60;
            this._currentTime = 0;
            this._currentBlur = 0;
            this._blurObj = { blur: 0 };
            this._dummyObj = { blur: 0 };
            this._label = [];
            this.currentLabel = "_home";
            this._currentScrollPosition = 0;
            this._fadeTime = 2;
            this.eventDispatcher = evtDispatch;
            this._scrollScale = scrollScale;
            this.createTimelineLabel(panelHeight);
            this._whichDevice = whichDevice;
            this.startApp();
        }
        Timeline.prototype.startApp = function () {
            this._tl = new TimelineMax({
                paused: true
            });
            this._blurTl = new TimelineMax();
            this._blurTl.to(this._blurObj, this._fadeTime, { blur: 30 }, this._label[1].timestamp - this._fadeTime);
            this._blurTl.to(this._blurObj, this._fadeTime, { blur: 0 }, this._label[1].timestamp + 2);
            this._blurTl.to(this._blurObj, this._fadeTime, { blur: 30 }, this._label[2].timestamp - this._fadeTime);
            this._blurTl.to(this._blurObj, this._fadeTime, { blur: 0 }, this._label[2].timestamp + 2);
            this._blurTl.to(this._blurObj, this._fadeTime, { blur: 30 }, this._label[5].timestamp - this._fadeTime);
            this._blurTl.to(this._blurObj, this._fadeTime, { blur: 0 }, this._label[5].timestamp + 2);
            this._tl.set("#textPanel_1_Header", { opacity: 0 });
            this._tl.set("#textPanel_1_Body", { opacity: 0 });
            this._tl.set("#textPanel_2_Header", { opacity: 0 });
            this._tl.set("#textPanel_2_Body", { opacity: 0 });
            this._tl.set("#textPanel_3_Header", { opacity: 0 });
            this._tl.set("#textPanel_3_Body", { opacity: 0 });
            this._tl.set("#textPanel_4_Header", { opacity: 0 });
            this._tl.set("#textPanel_4_Body", { opacity: 0 });
            this._tl.set("#svg_earlySigns", { opacity: 0 });
            this._tl.add(this._blurTl, 0);
            this._tl.add(this._label[0].name, this._label[0].timestamp);
            this._tl.add(this._label[1].name, this._label[1].timestamp);
            this._tl.add(this._label[2].name, this._label[2].timestamp);
            this._tl.add(this._label[3].name, this._label[3].timestamp);
            this._tl.add(this._label[4].name, this._label[4].timestamp);
            this._tl.add(this._label[5].name, this._label[5].timestamp);
            this._tl.add(this._label[6].name, this._label[6].timestamp);
            this._tl.to("#textPanel_0_Header", this._fadeTime, { opacity: 0 }, 1);
            this._tl.to("#textPanel_0_Body", this._fadeTime, { opacity: 0 }, 1);
            this._tl.to("#magnifyingGlass", this._fadeTime, { opacity: 0 }, 1);
            this._tl.to("#textPanel_1_Header", this._fadeTime, { opacity: 1 }, this._label[1].timestamp - this._fadeTime);
            this._tl.to("#textPanel_1_Body", this._fadeTime, { opacity: 1 }, this._label[1].timestamp - this._fadeTime);
            this._tl.to("#textPanel_1_Header", this._fadeTime, { opacity: 0 }, this._label[1].timestamp + 2);
            this._tl.to("#textPanel_1_Body", this._fadeTime, { opacity: 0 }, this._label[1].timestamp + 2);
            this._tl.to("#textPanel_2_Header", this._fadeTime, { opacity: 1 }, this._label[2].timestamp - this._fadeTime);
            this._tl.to("#textPanel_2_Body", this._fadeTime, { opacity: 1 }, this._label[2].timestamp - this._fadeTime);
            this._tl.to("#textPanel_2_Header", this._fadeTime, { opacity: 0 }, this._label[2].timestamp + 2);
            this._tl.to("#textPanel_2_Body", this._fadeTime, { opacity: 0 }, this._label[2].timestamp + 2);
            //this._tl.to("#svg_earlySigns", this._fadeTime, {opacity: 1}, this._label[2].timestamp + 3);
            this._tl.to("#earlySigns_header", this._fadeTime, { opacity: (this._whichDevice == "PHONE") ? 1 : 1 }, this._label[3].timestamp - this._fadeTime / 2);
            this._tl.to("#svg_earlySigns", this._fadeTime / 10, { opacity: 1 }, this._label[3].timestamp - this._fadeTime);
            this._tl.to("#earlySigns_header", this._fadeTime / 2, { opacity: 0 }, this._label[4].timestamp - this._fadeTime);
            this._tl.to("#svg_earlySigns", this._fadeTime / 10, { opacity: 0 }, this._label[4].timestamp - this._fadeTime);
            this._tl.to("#advancedSigns_header", this._fadeTime / 2, { opacity: (this._whichDevice == "PHONE") ? 1 : 1 }, this._label[4].timestamp - this._fadeTime / 2);
            this._tl.to("#svg_advancedSigns", this._fadeTime / 10, { opacity: 1 }, this._label[4].timestamp - this._fadeTime / 2);
            this._tl.to("#svg_advancedSigns", this._fadeTime, { opacity: 0 }, this._label[5].timestamp - this._fadeTime * 2);
            this._tl.to("#advancedSigns_header", this._fadeTime, { opacity: 0 }, this._label[5].timestamp - this._fadeTime * 2);
            this._tl.to("#textPanel_4_Header", this._fadeTime, { opacity: 1 }, this._label[5].timestamp - this._fadeTime);
            this._tl.to("#textPanel_4_Body", this._fadeTime, { opacity: 1 }, this._label[5].timestamp - this._fadeTime);
            this._tl.to("#textPanel_4_Header", this._fadeTime, { opacity: 0 }, this._label[5].timestamp + 2);
            this._tl.to("#textPanel_4_Body", this._fadeTime, { opacity: 0 }, this._label[5].timestamp + 2);
            this._tl.to("#prascendLogoDesktop", this._fadeTime * 2, { opacity: 1 }, this._label[6].timestamp - this._fadeTime * 2);
            this._tl.to(this._dummyObj, 1, { blur: 30 }, 49);
        };
        Timeline.prototype.updateTimeLine = function (val) {
            var duration = 60;
            this._currentScrollPosition = val;
            var rangeArr = [0, this._totalHeight];
            var tlScale = d3.scale.linear().range([0, duration]).domain([0, this._totalHeight]);
            this._tl.seek(tlScale(val));
            this.setCurrentTime(this._tl.time());
            if (this._blurObj.blur != this._currentBlur) {
                //console.log("updateTimeLine", this._blurObj.blur);
                this._currentBlur = this._blurObj.blur;
                this.eventDispatcher.onBlurCanvas(this._currentBlur);
            }
            if (this._currentTime > this._label[4].timestamp - this._fadeTime / 2) {
                this.eventDispatcher.onBringPlusToFront("#svg_advancedSigns");
            }
            else {
                this.eventDispatcher.onBringPlusToFront("#svg_earlySigns");
            }
            if (this._tl.currentLabel() != this.currentLabel) {
                this.setCurrentLabel(this._tl.currentLabel());
            }
            //console.log("currentLabel to: ", this._tl.currentLabel(), this._tl.time());
        };
        Timeline.prototype.setCurrentTime = function (n) {
            if (n > this._currentTime) {
                this._scrollDirection = 1 /* DOWN */;
            }
            else {
                this._scrollDirection = 0 /* UP */;
            }
            this._currentTime = n;
        };
        Timeline.prototype.setCurrentLabel = function (lbl) {
            if (lbl == "null") {
                return;
            }
            //console.log(lbl);
            this.currentLabel = lbl;
            this.eventDispatcher.onStateChanged(lbl);
        };
        Timeline.prototype.createTimelineLabel = function (panelHeight) {
            var h = 0;
            this._totalHeight = panelHeight.reduce(function (prev, next) {
                return prev + next;
            });
            var _labelTimeScale = d3.scale.linear().domain([0, this._totalHeight]).range([0, this._tlLength]);
            for (var i = 0; i <= panelHeight.length; i++) {
                var label = new TimelineLabel(Label[i], h, _labelTimeScale(h));
                h += panelHeight[i];
                this._label[i] = label;
            }
        };
        Timeline.prototype.scrollToPosition = function (label) {
            var selectedLabel = this.findScrollToLabel(label), body = d3.select("body"), html = d3.select("html"), newPos = selectedLabel.top, scrollObj = { currentPos: this._currentScrollPosition }, deltaScroll = newPos - this._currentScrollPosition, _scrollTime = this.getScrollToTime(deltaScroll);
            TweenMax.to(scrollObj, _scrollTime, {
                currentPos: newPos,
                onUpdate: function () {
                    //this._currentScrollPosition = scrollObj.currentPos;
                    body.property("scrollTop", scrollObj.currentPos);
                    html.property("scrollTop", scrollObj.currentPos);
                    //console.log("this._currentScrollPosition", this._currentScrollPosition)
                }
            });
        };
        Timeline.prototype.getScrollToTime = function (deltaScroll) {
            var timeScale = d3.scale.linear().domain([0, document.body.scrollHeight]).range([0, 1]);
            return Math.abs(timeScale(deltaScroll)) * 10;
        };
        Timeline.prototype.findScrollToLabel = function (id) {
            switch (id) {
                case Label[0]:
                    return this._label[0];
                    break;
                case Label[1]:
                    return this._label[1];
                    break;
                case Label[2]:
                    return this._label[2];
                    break;
                case Label[3]:
                    return this._label[3];
                    break;
                case Label[4]:
                    return this._label[4];
                    break;
                case Label[5]:
                    return this._label[5];
                    break;
                case Label[6]:
                    return this._label[6];
                    break;
                default:
                    return this._label[0];
            }
        };
        return Timeline;
    })();
    return Timeline;
});
//# sourceMappingURL=timeline.js.map