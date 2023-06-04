// Author: fiVe
// Description: JavaScript for ProfilePage

import { NavBarSectionDivider } from "./classes/NavBarSectionDivider.js";
import { FeedGenerator } from "./classes/FeedGenerator.js";
import { PostThreadDataDriver } from "./classes/PostThreadDataDriver.js";
import { NavBarFactory } from "./classes/NavBarFactory.js";
import { PostCreator } from "./classes/PostCreator.js";
import { GeneratePostMap } from "./classes/GeneratePostMap.js";
import { DataSerializer } from "./classes/DataSerializer.js";

class ProfilePage {

    constructor() {

        // GLOBAL VARIABLE
        this.logStatus = null;
        this.profileID = null;
        this.setLogStatus("admin");

        this.mapAPI         = new GeneratePostMap();
        this.dataSerializer = new DataSerializer();
        
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

    async initializePostFeedGenerator(aboutResponse) {
        const phpURL   = '/php/PostGetter.php',
              request  = {
                'mode' : 'profile',
                'profileID' : this.getProfileID()
              },
              response = await this.dataSerializer.postData(
                            request, phpURL
                         ),
            //   mapAPI        = new GeneratePostMap(),
              feedGenerator = new FeedGenerator(this.mapAPI);

        const threadResponse = await this.dataSerializer.postData(
            request, '/php/ThreadGetter.php'
        );
        
        // SAVE ALL POST AND THREAD TO A SINGLE ARRAY
        const all = [];

        for(let i = 0; i < response.length; i++) {
            all.push(response[i]);
        }

        for(let i = 0; i < threadResponse.length; i++) {
            all.push(threadResponse[i]);
        }

        // THEN SORT USING DATE_TIME
        all.sort(
            (a, b) => new Date(b.date_time) - new Date(a.date_time)
        );

        feedGenerator.generateAbout(aboutResponse);
        feedGenerator.initializeSideNavBar();
        feedGenerator.generateDefaultPostThread(all);
        
        new PostThreadDataDriver(
            feedGenerator.getHasThreadsArray()
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
            this.initializePostFeedGenerator(response);

        }
        else {
            window.location.href = "/index.html";
        }

    }

    initializePostButton() {
        if(this.getLogStatus() == "admin") {
            // new PostCreator();
            new PostCreator(
                document.getElementById('posts'),
                this.getProfileID(),
                this.mapAPI
            );
        }
    }

}

// DRIVER [PLEASE DO NOT MODFIY]
new ProfilePage();

