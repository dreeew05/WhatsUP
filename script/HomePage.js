// Author: Briana Adricula
// Description: JavaScript for HomePage [Index]

import { FeedGenerator } from "./classes/FeedGenerator.js";
import { PostThreadDataDriver } from "./classes/PostThreadDataDriver.js";
import { NavBarFactory } from "./classes/NavBarFactory.js";
import { GeneratePostMap } from "./classes/GeneratePostMap.js";
import { DataSerializer } from "./classes/DataSerializer.js";

class HomePage {

    constructor() {
        // GLOBAL VARIABLE
        this.logStatus      = null;
        this.mapAPI         = new GeneratePostMap();
        this.dataSerializer = new DataSerializer();

        this.initializeProfile();
        // this.initializeNavBar();
        // this.initializeFeedGenerator();
    }

    getLogStatus() {
        return this.logStatus;
    }

    setLogStatus(logStatus) {
        this.logStatus = logStatus;
    }

    async initializeProfile() {
        const userRequest = await this.dataSerializer.postData(
            null, '/php/UserGetter.php'
        );
        
        if(userRequest['userID'] == null) {
            this.setLogStatus("visitor");
        }
        else {
            this.setLogStatus("admin");
        }

        this.initializeNavBar();
        this.initializeFeedGenerator();
    }

    initializeNavBar() {
        new NavBarFactory("type2", this.getLogStatus());
    }

    async initializeFeedGenerator() {
        const feedGenerator = new FeedGenerator(this.mapAPI),
              phpURL        = '/php/PostGetter.php',
              request       = {
                'mode' : 'all',
              },
              response = await this.dataSerializer.postData(
                    request, phpURL
              );

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

        console.log(response);

        feedGenerator.initializeSideNavBar();
        feedGenerator.generateDefaultPostThread(all);
        
        new PostThreadDataDriver(feedGenerator.getHasThreadsArray());
    }

}

// DRIVER
new HomePage();