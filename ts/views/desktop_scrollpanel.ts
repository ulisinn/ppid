/**
 * Created by ulrichsinn on 03/20/2015.
 */

import ScrollPanel = require("views/scrollpanel");

class DesktopScrollPanel extends ScrollPanel {


    protected buildScrollPanel() {
        this.defaultHeight = [1500, 1500, 1500, 1500, 1500, 1500, null];
        super.buildScrollPanel();
    }
}

export = DesktopScrollPanel;