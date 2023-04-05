// Author: fiVe [G. Bulaong]
// Description: Generates Posts

import { GeneratePostImage } from "./GeneratePostImage.js";
import { CreateElement } from "./CreateElement.js";

export class GeneratePost {

    constructor(postID, profileName, profilePic, dateTime, post, postMedia, postMediaType, postMap) {
        this.postID        = postID;
        this.profileName   = profileName;
        this.profilePic    = profilePic;
        this.dateTime      = dateTime;
        this.post          = post;
        this.postMedia     = postMedia;
        this.postMediaType = postMediaType;
        this.postMap       = postMap;
    }

    getPostID() {
        return this.postID;
    }
    getPostsContainer() {
        let POSTS  = document.getElementById("posts");
        return POSTS;
    }
    getProfileName() {
        return this.profileName;
    }
    getProfilePic() {
        return this.profilePic;
    }
    getDateTime() {
        return this.dateTime;
    }
    getPost() {
        return this.post;
    }
    getPostMedia() {
        return this.postMedia;
    }
    getPostMediaType() {
        return this.postMediaType;
    }
    getPostMap() {
        return this.postMap;
    }

    createPostProfile(POST_HOLDER) {
        let newDiv      = new CreateElement("div", null, "post-profile").createElement(),
            textDiv     = new CreateElement("div", null, "profile-text-content").createElement(),
            profilePic  = new CreateElement("img", null, null).createElement(),
            profileName = new CreateElement("p", null, "profile-name").createElement(),
            dateTime    = new CreateElement("p", null, "date-time").createElement(),
            linkHolder  = new CreateElement("a", null, "profile-name-link-holder").createElement();

        let BASE_PATH = "../../assets/images/logos/";

        profilePic.setAttribute("src", BASE_PATH + this.getProfilePic());
        profilePic.setAttribute("alt", this.getProfilePic());

        profileName.textContent = this.getProfileName();
        dateTime.textContent    = this.getDateTime();
        
        linkHolder.setAttribute("href", "#")

        POST_HOLDER.appendChild(newDiv);
        newDiv.appendChild(profilePic);
        newDiv.appendChild(textDiv);
        textDiv.appendChild(linkHolder);
        linkHolder.appendChild(profileName);
        textDiv.appendChild(dateTime);
    }

    createPostParagraph(POST_HOLDER) {
        let newDiv = new CreateElement("div", null, "post-text").createElement(),
            text   = new CreateElement("p", null, null).createElement();

        text.textContent = this.getPost();
        POST_HOLDER.appendChild(newDiv);
        newDiv.appendChild(text);

    }

    createPostImages(POST_HOLDER) {
        new GeneratePostImage(POST_HOLDER, this.getPostMedia(), this.getPost());
    }

    createPost() {
        let postHolder = new CreateElement("div", "post-holder-" + this.getPostID(), "container justify-content-center post-holder").createElement();
        this.getPostsContainer().appendChild(postHolder);

        this.createPostProfile(postHolder);
        this.createPostParagraph(postHolder);
        this.createPostImages(postHolder);
    }

}