import { GeneratePost } from "./GeneratePost.js";

export class GenerateThread extends GeneratePost {
    constructor(id, profileName, profilePic, dateTime, post, postMedia, postMediaType, postMap) {
        super(id, profileName, profilePic, dateTime, post, postMedia, postMediaType, postMap)
    }
    createThread() {
        let POST_HOLDER = document.getElementById("post-holder-" + super.getId());
        
        super.createPostProfile(POST_HOLDER);
        super.createPostParagraph(POST_HOLDER);
        super.createPostImages(POST_HOLDER);
    }
}