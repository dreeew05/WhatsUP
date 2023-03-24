// Author: fiVe [G. Bulaong]
// Description: Generates Posts

import { GeneratePostImage } from "./GeneratePostImage.js";
import { CreateDiv } from "./CreateDiv.js";

export class GeneratePost {

    constructor(profileName, profilePic, dateTime, post, postContent) {
        this.profileName = profileName;
        this.profilePic  = profilePic;
        this.dateTime    = dateTime;
        this.post        = post;
        this.postContent = postContent;

        this.createPost();
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

    getPostContent() {
        return this.postContent;
    }

    createPostProfile(POST_HOLDER) {
        let newDiv      = new CreateDiv(null, "post-profile").createDiv(),
            textDiv     = new CreateDiv(null, "profile-text-content").createDiv(),
            profilePic  = document.createElement("img"),
            profileName = document.createElement("p"),
            dateTime    = document.createElement("p");

        profilePic.setAttribute("src", this.getProfilePic());
        profilePic.setAttribute("alt", this.getProfilePic());

        profileName.textContent = this.getProfileName();
        dateTime.textContent    = this.getDateTime();

        profileName.setAttribute("class", "profile-name");
        dateTime.setAttribute("class", "date-time");

        POST_HOLDER.appendChild(newDiv);
        newDiv.appendChild(profilePic);
        newDiv.appendChild(textDiv);
        textDiv.appendChild(profileName);
        textDiv.appendChild(dateTime);
    }

    createPostParagraph(POST_HOLDER) {
        let newDiv = new CreateDiv(null, "post-text").createDiv(),
            text   = document.createElement("p");

        text.textContent = this.getPost();
        POST_HOLDER.appendChild(newDiv);
        newDiv.appendChild(text);

    }

    createPostImages(POST_HOLDER) {
        new GeneratePostImage(POST_HOLDER, this.getPostContent(), this.getPost());
    }

    createPost() {
        let newDiv = new CreateDiv("post-holder", "container justify-content-center").createDiv();
        this.getPostsContainer().appendChild(newDiv);

        this.createPostProfile(newDiv);
        this.createPostParagraph(newDiv);
        this.createPostImages(newDiv);
    }

}