// Author: fiVe
// Description: JavaScript for SuperAdminAcount

import { NavBarFactory } from "./classes/NavBarFactory.js";

class SuperAdminAcount {

    constructor() {
        this.initializeNavBar();
    }

    initializeNavBar() {
        new NavBarFactory("type3", "admin");
    }

}

// DRIVER
new SuperAdminAcount();