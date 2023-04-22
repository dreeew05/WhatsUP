// Author: fiVe [G. Bulaong]
// Description: Generates Posts

import { GeneratePostMedia } from "./GeneratePostMedia.js";
import { CreateElement } from "./CreateElement.js";
import { GeneratePostTags } from "./GeneratePostTags.js";

export class GeneratePost {

    constructor(id, profileName, profilePic, dateTime, post, postMedia, 
                postMediaType, postCoordinates, mapAPI, tags, hasThread,
                type) {
        
        // PASSED VARIABLES
        this.id              = id;
        this.profileName     = profileName;
        this.profilePic      = profilePic;
        this.dateTime        = dateTime;
        this.post            = post;
        this.postMedia       = postMedia;
        this.postMediaType   = postMediaType;
        this.postCoordinates = postCoordinates;
        this.mapAPI          = mapAPI;
        this.tags            = tags;
        this.hasThread       = hasThread;
        this.type            = type;

        // GLOBAL VARIABLES
        this.threadObject = null;
    }

    getID() {
        return this.id;
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
    getPostCoordinates() {
        return this.postCoordinates;
    }
    getMapAPI() {
        return this.mapAPI;
    }
    getTags() {
        return this.tags;
    }
    getHasThread() {
        return this.hasThread;
    }
    getType() {
        return this.type;
    }
    getThreadObject() {
        return this.threadObject;
    }

    setThreadObject(threadObject) {
        this.threadObject = threadObject;
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
        new GeneratePostMedia(POST_HOLDER, this.getPostMediaType(), 
                              this.getPostMedia(), this.getPost());
    }

    createPostMap(POST_HOLDER) {
        let mapID         = "map-".concat(this.getID()),
            mapDiv        = new CreateElement("div", null, "map-div").createElement(),
            mapHolder     = new CreateElement("div", mapID, "map-holder").createElement(),
            mapTextHolder = new CreateElement("div", null, null).createElement(),
            mapText       = new CreateElement("p", null, "map-text").createElement();
        
        this.getMapAPI().loadAPI().then(() => {
            this.getMapAPI().createMap(mapID, this.getPostCoordinates().latitude, 
                                       this.getPostCoordinates().longtitude);
        });
        
        POST_HOLDER.appendChild(mapDiv);
        mapDiv.appendChild(mapTextHolder);
        mapTextHolder.appendChild(mapText);
        mapDiv.appendChild(mapHolder);

        mapText.textContent = "Map";

    }

    createPostTags(POST_HOLDER, TAGS) {
        new GeneratePostTags(POST_HOLDER, TAGS);
    }

    createPost(POST_HOLDER) {
        this.getPostsContainer().appendChild(POST_HOLDER);

        // ACCORDING TO ORDER OF PRECEDENCE

        this.createPostProfile(POST_HOLDER);
        this.createPostParagraph(POST_HOLDER);
        this.createPostImages(POST_HOLDER);

        if(this.getPostCoordinates() != null) {
            this.createPostMap(POST_HOLDER);
        }

        this.createPostTags(POST_HOLDER, this.getTags());
        // this.showThreadOption(POST_HOLDER);

        if(this.getHasThread() == true) {
            this.showThreadOption(POST_HOLDER);
        }
    }

    showThreadOption(POST_HOLDER) {
        let threadButtonDiv  = new CreateElement("div", null, 
                               "thread-button-holder").createElement(),
            showThreadButton = new CreateElement("button", null, 
                               "show-thread-button").createElement();
            
        // SET ATTRIBUTE
        showThreadButton.setAttribute("type", "button");
        showThreadButton.textContent = "Show Thread";

        POST_HOLDER.appendChild(threadButtonDiv);
        threadButtonDiv.appendChild(showThreadButton);

        // RETURN OBJECT
        let obj = {
            type : this.getType(),
            id : this.getID()
        }
        this.setThreadObject(obj);
    }

    showDefault() {
         let postHolder = new CreateElement("div", null, "container justify-content-center post-holder")
                          .createElement();

        this.createPost(postHolder);
    }

    showThreadView() {
        let postHolder = new CreateElement("div", "post-holder-" + this.getID(), 
                         "container justify-content-center post-holder")
                        .createElement(),
            headerDiv  = new CreateElement("div", "header-div", 
                         null).createElement(), 
            backButton = new CreateElement("button", "back-button", 
                         null).createElement(),
            backIcon   = new CreateElement("i", null, "fa fa-arrow-left")
                         .createElement(),
            threadText = new CreateElement("p", "thread-text", 
                         null).createElement();
        
        // SET ATTRIBUTE
        threadText.textContent = "Thread";
        backButton.setAttribute("type", "button");
        
        // APPENDCHILD
        postHolder.appendChild(headerDiv);
        headerDiv.appendChild(backButton);
        backButton.appendChild(backIcon);
        headerDiv.appendChild(threadText);
        this.createPost(postHolder);
 
    }

}