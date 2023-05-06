// Author: fiVe
// Description: JavaScript for ProfilePage

import { NavBarSectionDivider } from "./classes/NavBarSectionDivider.js";
import { FeedGenerator } from "./classes/FeedGenerator.js";
import { PostThreadDataDriver } from "./classes/PostThreadDataDriver.js";
import { NavBarFactory } from "./classes/NavBarFactory.js";
import { PostCreator } from "./classes/PostCreator.js";
import { GeneratePostMap } from "./classes/GeneratePostMap.js";

// TEST DATA
import postsJSON from "../test/posts.json" assert { type: 'json' };
import threadJSON from "../test/threads.json" assert { type: 'json' };
import aboutJSON from "../test/about.json" assert { type: 'json' };

class ProfilePage {

    constructor() {

        // GLOBAL VARIABLE
        this.logStatus = null;
        this.setLogStatus("admin");
        this.mapAPI = new GeneratePostMap();
        
        this.initializePostButton();
        this.initializeNavBar();
        this.navBarSectionDividerImplementation();
        this.initializeFeedGenerator();

    }

    getLogStatus() {
        return this.logStatus;
    }

    setLogStatus(logStatus) {
        this.logStatus = logStatus;
    }

    initializeNavBar() {
        new NavBarFactory("type1", this.getLogStatus());
    }

    navBarSectionDividerImplementation() {
        const links     = document.querySelectorAll('.nav-item a'),
              ABOUT_DIV = "about", 
              HOME_DIV  = "posts",
              CARD_DIVS = ["posts", "about"];

        let nbsd = new NavBarSectionDivider(links, CARD_DIVS);

        nbsd.defaultViewProfilePage();

        document.getElementById("about-button").onclick = function() {
            nbsd.changeDiv(ABOUT_DIV);
        }
        document.getElementById("home-button").onclick = function() {
            nbsd.changeDiv(HOME_DIV);
        }
    }

    initializeFeedGenerator() {
        let feedGenerator = new FeedGenerator(this.mapAPI);

        // TEST DATA
        // POST + THREAD
        let all = postsJSON.concat(threadJSON);

        feedGenerator.initializeSideNavBar();
        // feedGenerator.generatePost(postsJSON);
        // feedGenerator.generateThread(threadJSON);
        feedGenerator.generateDefaultPostThread(all);
        feedGenerator.generateAbout(aboutJSON);
        
        new PostThreadDataDriver(feedGenerator.getHasThreadsArray());
    }

    initializePostButton() {
        if(this.getLogStatus() == "admin") {
            new PostCreator();
        }
    }

}

// DRIVER [PLEASE DO NOT MODFIY]
new ProfilePage();

