// Author: fiVe
// Description: JavaScript for ProfilePage

import { NavBarSectionDivider } from "./classes/NavBarSectionDivider.js";
import { FeedGenerator } from "./classes/FeedGenerator.js";

// TEST DATA
import postsJSON from "../test/posts.json" assert { type: 'json' };
import threadJSON from "../test/threads.json" assert { type: 'json' };
import aboutJSON from "../test/about.json" assert { type: 'json' };

class ProfilePage {

    constructor() {
        this.navBarSectionDividerImplementation();
        this.initializeFeedGenerator();
        this.showThreadButton();

        // GLOBAL VARIABLE
        this.hasThreadsArray = [];

    }

    getHasThreadsArray() {
        return this.hasThreadsArray;
    }
    
    setThreadsArray(threadsArray) {
        this.hasThreadsArray = threadsArray;
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
        let feedGenerator = new FeedGenerator();

        // TEST DATA
        // POST + THREAD
        let all = postsJSON.concat(threadJSON);

        feedGenerator.initializeSideNavBar();
        // feedGenerator.generatePost(postsJSON);
        // feedGenerator.generateThread(threadJSON);
        feedGenerator.generateDefaultPostThread(all)
        feedGenerator.generateAbout(aboutJSON);
        
        this.setThreadsArray(feedGenerator.getHasThreadsArray());
    }

    showThreadButton() {
        // HTML PHASE [NOT] FINAL
        const BASE_PATH = "http://127.0.0.1:5500/showPostThread.html",
              object    = this.getHasThreadsArray();

        let buttons = document.querySelectorAll(".show-thread-button");
        for(let i = 0; i < buttons.length; i++) {
            buttons[i].onclick = function() {

                let type  = object[i].type,
                    id    = object[i].id,
                    query = "?type=" + type + "&id=" + id;

                window.location.href = BASE_PATH + query;
            }
        }
    }

}

// DRIVER [PLEASE DO NOT MODFIY]
new ProfilePage();

