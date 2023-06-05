// Author: fiVe
// Description: Generate Threads

import { CreateElement } from "./CreateElement.js";
import { GeneratePost } from "./GeneratePost.js";

export class GenerateThread extends GeneratePost {
    constructor(threadID, postID, profileName, profilePic, dateTime, 
                post, postMedia, postCoordinates, mapAPI,
                threadPostID) {

        super(postID, null, profileName, profilePic, dateTime, post, postMedia, 
              postCoordinates, mapAPI, null, null, null, threadPostID);

        this.threadID     = threadID;
        this.threadPostID = threadPostID;
    }

    getThreadID() {
        return this.threadID;
    }

    getThreadPostID() {
        return this.threadPostID;
    }

    createThread() {
        let POST_HOLDER = document.getElementById("post-holder-" 
                          + this.getThreadPostID());

        let THREAD_HOLDER = new CreateElement("div", "thread-holder-" 
                            + this.getThreadID(), null).createElement();
        
        let line = new CreateElement("hr", null, 
                   "thread-divider").createElement();
        
        POST_HOLDER.appendChild(line);
        POST_HOLDER.appendChild(THREAD_HOLDER);

        super.createPostProfile(THREAD_HOLDER);
        super.createPostParagraph(THREAD_HOLDER);
        super.createPostImages(THREAD_HOLDER);

        if(super.getPostCoordinates() != null) {
            super.createPostMap(POST_HOLDER);
        }
    }
}