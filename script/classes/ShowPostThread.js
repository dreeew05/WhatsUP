// Author: fiVe
// Description: Show Threads for the Particular Post

import { FeedGenerator } from "./FeedGenerator.js";

// TEST DATA
import postsJSON from "../../test/posts.json" assert { type: 'json' };
import threadJSON from "../../test/threads.json" assert { type: 'json' };

class ShowPostThread {
    constructor() {
        // TEST DATA
        this.postID      = null;
        this.threadID    = null;
        this.postObject  = null;
        this.threadArray = [];

        this.getData(); //TEST DATA
        
        this.initializeFeedGenerator();
        this.goBack();
    }

    // TEST DATA
    // SAMPLE. NOT PART OF FINAL
    // PASSED OBJECT MUST COME FROM SQL 
    // VISUALIZATION PURPOSES THROUGH JSON
    // [START]
    getData() {
        let locationHeader = window.location.search,
            type           = null,
            id             = null;

        locationHeader = locationHeader.split("&");
        type           = locationHeader[0].split("=")[1],
        id             = locationHeader[1].split("=")[1];

        if(type == "post") {
            this.getPostData(id);
        }
        else {
            this.getPostIDFromThreads(id);
        }

    }

    getPostObject() {
        return this.postObject;
    }

    setPostObject(obj) {
        this.postObject = obj;
    }

    getThreadsArray() {
        return this.threadArray;
    }

    getPostData(id) {
        for(let i = 0; i <  postsJSON.length; i++){
            if(postsJSON[i].id == id) {
                this.setPostObject(postsJSON[i]);
                break;
            }
        }
        for(let i = 0; i < threadJSON.length; i++) {
            if(threadJSON[i].post_id == id) {
                this.getThreadsArray().push(threadJSON[i]);
            }
        }
    }

    getPostIDFromThreads(id) {
        for(let i = 0; i < threadJSON.length; i++) {
            if(threadJSON[i].id = id) {
                this.getPostData(threadJSON[i].post_id);
                break;
            }
        }
    }
    // [END]

    initializeFeedGenerator() {
        let feedGenerator = new FeedGenerator();
        // console.log(this.getThreadsArray())
        // console.log(this.getPostObject())

        feedGenerator.initializeSideNavBar();
        // TEST DATA
        feedGenerator.generatePost(this.getPostObject());
        feedGenerator.generateThread(this.getThreadsArray());
    }

    goBack() {
        let backButton = document.getElementById("back-button");

        backButton.onclick = function() {
            window.history.back();
        }
    }

}

new ShowPostThread();