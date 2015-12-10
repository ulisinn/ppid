/**
 * Created by ulrichsinn on 03/20/2015.
 */

import ScrollPanel = require("views/scrollpanel");

class TabletScrollPanel extends ScrollPanel {

    protected buildScrollPanel() {
        this.defaultHeight = [400, 400, 800, 400, 1000, null];
        console.log("buildScrollPanel", this.defaultHeight);
        super.buildScrollPanel();
    }
}

export = TabletScrollPanel;