// Author: Briana Adricula
// Description: JavaScript for HomePage [Index]

import { FeedGenerator } from "./classes/FeedGenerator.js";
import { PostThreadDataDriver } from "./classes/PostThreadDataDriver.js";
import { NavBarFactory } from "./classes/NavBarFactory.js";
import { GeneratePostMap } from "./classes/GeneratePostMap.js";

// TEST DATA
import postsJSON from "../test/posts.json" assert { type: 'json' };
import threadJSON from "../test/threads.json" assert { type: 'json' };

class HomePage {

    constructor() {
        // GLOBAL VARIABLE
        this.mapAPI = new GeneratePostMap();

        this.initializeNavBar();
        this.initializeFeedGenerator();
    }

    initializeNavBar() {
        new NavBarFactory("type2", "visitor");
    }

    initializeFeedGenerator() {
        let feedGenerator = new FeedGenerator(this.mapAPI);

        // TEST DATA
        // POST + THREAD
        let all = postsJSON.concat(threadJSON);

        feedGenerator.initializeSideNavBar();
        feedGenerator.generateDefaultPostThread(all)
        
        new PostThreadDataDriver(feedGenerator.getHasThreadsArray());
    }

}

// DRIVER
new HomePage();