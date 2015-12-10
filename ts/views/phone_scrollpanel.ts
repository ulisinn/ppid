/**
 * Created by ulrichsinn on 03/20/2015.
 */

import ScrollPanel = require("views/scrollpanel");

class PhoneScrollPanel extends ScrollPanel {


    protected buildScrollPanel() {
        this.defaultHeight = [400, 600, 400, 400, 400, 800, null];
        super.buildScrollPanel();
    }
}

export = PhoneScrollPanel;