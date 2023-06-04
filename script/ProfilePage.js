// Author: fiVe
// Description: JavaScript for ProfilePage

import { NavBarSectionDivider } from "./classes/NavBarSectionDivider.js";
import { FeedGenerator } from "./classes/FeedGenerator.js";
import { PostThreadDataDriver } from "./classes/PostThreadDataDriver.js";
import { NavBarFactory } from "./classes/NavBarFactory.js";
import { PostCreator } from "./classes/PostCreator.js";
import { GeneratePostMap } from "./classes/GeneratePostMap.js";
import { DataSerializer } from "./classes/DataSerializer.js";
import { SweetAlertFactory } from "./classes/SweetAlertFactory.js";

class ProfilePage {

    constructor() {

        // GLOBAL VARIABLE
        this.logStatus = null;
        this.profileID = null;
        // this.setLogStatus("admin");

        this.mapAPI         = new GeneratePostMap();
        this.dataSerializer = new DataSerializer();
        this.sweetAlert     = new SweetAlertFactory();
        
        this.getPostThreadStatus();
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

    getPostThreadStatus() {
        const url     = window.location.href,
              urlObj  = new URL(url),
              mode    = urlObj.searchParams.get('mode'),
              success = urlObj.searchParams.get('success');
              
        if(mode && success) {
            const modeTxt = mode.charAt(0).toUpperCase() + 
                            mode.slice(1).toLowerCase();
            switch(success) {
                case 'true':
                    this.sweetAlert.createAlertBox(
                        'Success!',
                         modeTxt.concat(' Has Been Created'),
                        'success',
                        'Okay'
                    );
                    break;
                case 'false':
                    this.sweetAlert.createAlertBox(
                        'Error!',
                        'An Error Occured While Creating '.concat(modeTxt),
                        'error',
                        'Okay'
                    );
                    break;
                default:
                    break;
            }
        }
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

            const userRequest = await this.dataSerializer.postData(
                null, '/php/UserGetter.php'
            );

            if(userRequest['userID'] == null) {
                this.setLogStatus("visitor");
            }
            else {
                this.setLogStatus("admin");
            }

            this.setProfileID(id);
            this.initializeNavBar();
            this.navBarSectionDividerImplementation();
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

