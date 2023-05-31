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
import { DataSerializer } from "./classes/DataSerializer.js";

class ProfilePage {

    constructor() {

        // GLOBAL VARIABLE
        this.logStatus = null;
        this.profileID = null;
        this.setLogStatus("admin");

        this.dataSerializer = new DataSerializer();
        this.mapAPI         = new GeneratePostMap();
        this.feedGenerator  = new FeedGenerator(this.mapAPI);
        
        this.initializeNavBar();
        this.navBarSectionDividerImplementation();
        this.initializeProfile();
    }

    getLogStatus() {
        return this.logStatus;
    }

    getProfileID() {
        return this.profileID;
    }

    setProfileID(profileID) {
        this.profileID = profileID;
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

    initializePostFeedGenerator() {
        // TEST DATA
        // POST + THREAD
        let all = postsJSON.concat(threadJSON);

        this.feedGenerator.initializeSideNavBar();
        this.feedGenerator.generateDefaultPostThread(all);
        
        new PostThreadDataDriver(
            this.feedGenerator.getHasThreadsArray()
        );
    }

    async initializeProfile() {
        const header = window.location.href;

        if(header.includes("id")) {
            const link     = header.split("?"),
                  query    = link[1].split("="),
                  id       = query[1],
                  request  = {
                    'id' : id
                  },
                  phpURL   = '/php/AboutGetter.php',
                  response = await this.dataSerializer.postData(
                                request, phpURL
                             );
            
            this.setProfileID(id);
            this.initializePostButton();
            this.feedGenerator.generateAbout(
                response
            );
            this.initializePostFeedGenerator();

        }

    }

    initializePostButton() {
        console.log(this.getProfileID());
        if(this.getLogStatus() == "admin") {
            // new PostCreator();
            new PostCreator(
                document.getElementById('posts'),
                this.getProfileID(),
            );
        }
    }

}

// DRIVER [PLEASE DO NOT MODFIY]
new ProfilePage();

