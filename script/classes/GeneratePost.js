// Author: fiVe [G. Bulaong]
// Description: Generates Posts

import { GeneratePostMedia } from "./GeneratePostMedia.js";
import { CreateElement } from "./CreateElement.js";
import { GeneratePostTags } from "./GeneratePostTags.js";
import { ThreadCreator } from "./ThreadCreator.js";
import { DataSerializer } from "./DataSerializer.js";

export class GeneratePost {

    constructor(id, profileID, profileName, profilePic, dateTime, post, postMedia, 
                postCoordinates, mapAPI, tags, hasThread, type, threadPostID) {
        
        // PASSED VARIABLES
        this.id              = id;
        this.profileID       = profileID;
        this.profileName     = profileName;
        this.profilePic      = profilePic;
        this.dateTime        = dateTime;
        this.post            = post;
        this.postMedia       = postMedia;
        this.postCoordinates = postCoordinates;
        this.mapAPI          = mapAPI;
        this.tags            = tags;
        this.hasThread       = hasThread;
        this.type            = type;
        this.threadPostID    = threadPostID;

        // GLOBAL VARIABLES
        this.threadObject   = null;
        this.dataSerializer = new DataSerializer();  
    }

    getID() {
        return this.id;
    }
    getProfileID() {
        return this.profileID;
    }
    getPostsContainer() {
        return document.getElementById("posts");
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
    getThreadPostID() {
        return this.threadPostID;
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

        const BASE_PATH = "../../assets/images/profiles/";

        profilePic.setAttribute("src", BASE_PATH + this.getProfilePic());
        profilePic.setAttribute("alt", this.getProfilePic());

        profileName.textContent = this.getProfileName();
        dateTime.textContent    = this.getDateTime();
        
        const LINK = "/profilePage.html?id=".concat(this.getProfileID());

        linkHolder.setAttribute("href", LINK);

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

        if(this.getPostMedia() != null) {
            const mediaType = this.getPostMedia()['type'],
                  mediaFile = this.getPostMedia()['file'];

            new GeneratePostMedia(
                POST_HOLDER,
                mediaType,
                mediaFile,
                this.getPost()
            );
        }
    }

    createPostMap(POST_HOLDER) {
        let mapID         = "map-".concat(this.getID()),
            mapDiv        = new CreateElement("div", null, "map-div").createElement(),
            mapHolder     = new CreateElement("div", mapID, "map-holder").createElement(),
            mapTextHolder = new CreateElement("div", null, null).createElement(),
            mapText       = new CreateElement("p", null, "map-text").createElement();

        const latitude = parseFloat(
            this.getPostCoordinates()['latitude']
        );
        const longtitude = parseFloat(
            this.getPostCoordinates()['longtitude']
        );

        this.getMapAPI().loadAPI().then(() => {
            this.getMapAPI().createMap(
                mapID, 
                latitude,
                longtitude
            );
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

    async createPost(POST_HOLDER) {
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

        const response = await this.getThreadID(),
              threadID = parseInt(response['maxID']) + 1;

        let postID = null;

        switch(this.getType()) {
            case 'post':
                postID = this.getID();
                break;
            case 'thread':
                postID = this.getThreadPostID();
                break;
            default:
                break;
        }

        // TO GENERATE DIFFERENT IDs
        let randNum = Math.floor((Math.random() * 100000) + 1);

        const url    = window.location.href,
              urlObj = new URL(url),
              id     = urlObj.searchParams.get('id'),
              path   = urlObj.pathname,
              page   = path.substring(path.lastIndexOf('/') + 1);
        const userVerify = await this.dataSerializer.postData(
            null, '/php/UserGetter.php'
        );
        const userID = userVerify['userID'];

        if(page == 'profilePage.html' &&
            userID == id) {
                new ThreadCreator(
                    postID, 
                    POST_HOLDER,
                    this.mapAPI,
                    threadID + randNum
                );
        }
    }

    async getThreadID() {
        const phpURL = '/php/IDGetter.php';
        const request = {
            'type' : 'thread'
        };
        return await this.dataSerializer.postData(
            request, phpURL
        )

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