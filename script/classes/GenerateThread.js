import { CreateElement } from "./CreateElement.js";
import { GeneratePost } from "./GeneratePost.js";

export class GenerateThread extends GeneratePost {
    constructor(threadID, postID, profileName, profilePic, dateTime, post, postMedia, postMediaType, postMap) {
        super(postID, profileName, profilePic, dateTime, post, postMedia, postMediaType, postMap);
        this.threadID = threadID;
    }

    getThreadID() {
        return this.threadID;
    }

    createThread(counter, arrLen) {
        let POST_HOLDER = document.getElementById("post-holder-" + super.getPostID());

        let THREAD_HOLDER = new CreateElement("div", null, "thread-holder" + this.getThreadID()).createElement();
        
        let line = new CreateElement("hr", null, "thread-divider").createElement();
        
        POST_HOLDER.appendChild(line);
        POST_HOLDER.appendChild(THREAD_HOLDER);

        super.createPostProfile(THREAD_HOLDER);
        super.createPostParagraph(THREAD_HOLDER);
        super.createPostImages(THREAD_HOLDER);
    }
}