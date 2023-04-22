// Author: Briana Adricula
// Description: JavaScript for HomePage [Index]

import { FeedGenerator } from "./classes/FeedGenerator.js";
import { PostThreadDataDriver } from "./classes/PostThreadDataDriver.js";
import { NavBarFactory } from "./classes/NavBarFactory.js";

// TEST DATA
import postsJSON from "../test/posts.json" assert { type: 'json' };
import threadJSON from "../test/threads.json" assert { type: 'json' };
import aboutJSON from "../test/about.json" assert { type: 'json' };

class HomePage {

    constructor() {
        this.initializeNavBar();
        this.initializeFeedGenerator();
    }

    initializeNavBar() {
        new NavBarFactory("type2", "visitor");
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
        
        new PostThreadDataDriver(feedGenerator.getHasThreadsArray());
    }

}

// DRIVER
new HomePage();