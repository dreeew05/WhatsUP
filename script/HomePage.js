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
        this.mapAPI         = new GeneratePostMap();
        this.dataSerializer = new DataSerializer();

        this.initializeNavBar();
        this.initializeFeedGenerator();
    }

    initializeNavBar() {
        new NavBarFactory("type2", "visitor");
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

        feedGenerator.initializeSideNavBar();
        feedGenerator.generateDefaultPostThread(response);
        
        new PostThreadDataDriver(feedGenerator.getHasThreadsArray());
    }

}

// DRIVER
new HomePage();