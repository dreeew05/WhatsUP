// Author: fiVe
// Description: Automate methods

import { GenerateAbout } from "./GenerateAbout.js";
import { GeneratePost } from "./GeneratePost.js";
import { GenerateProfileSearch } from "./GenerateProfileSearch.js";
import { GenerateThread } from "./GenerateThread.js";
import { SideNavBar } from "./SideNavbar.js";

export class FeedGenerator {

    constructor(mapAPI) {
        // GLOBAL VARIABLES
        this.hasThreadsArray = [];

        // PASSED VARIABLESS
        this.mapAPI = mapAPI;
    }

    getMapAPI() {
        return this.mapAPI;
    }

    getHasThreadsArray() {
        return this.hasThreadsArray;
    }

    appendToHasThreadsArray(obj) {
        this.getHasThreadsArray().push(obj);
    }

    generateProfile(jsonData) {
        const genProfile = new GenerateProfileSearch();

        for(let i = 0; i < jsonData.length; i++) {
            const profileID          = jsonData[i].profile_id,
                  profileName        = jsonData[i].profile_name,
                  profileImage       = jsonData[i].profile_image,
                  profileCategory    = jsonData[i].profile_category,
                  profileDescription = jsonData[i].profile_description;
            
            genProfile.generateProfile(profileImage, profileName, profileCategory, 
                                       profileDescription, profileID);
        }
    }

    initializeSideNavBar() {
        const sideNavBar = new SideNavBar();
        
        document.getElementById("hamburger-button").onclick = function() {
            sideNavBar.hamburgerToggler();
        };
    }

    generateDefaultPostThread(jsonData) {
        for(let i = 0; i < jsonData.length; i++) {
            const id              = jsonData[i].id,
                  profileID       = jsonData[i].profile_id,
                  profileName     = jsonData[i].profile_name,
                  profilePic      = jsonData[i].profile_pic,
                  dateTime        = jsonData[i].date_time, 
                  post            = jsonData[i].post, 
                  postMedia       = jsonData[i].post_media,
                  postCoordinates = jsonData[i].post_coordinates,
                  tags            = jsonData[i].tags,
                  hasThread       = jsonData[i].has_thread,
                  type            = jsonData[i].type,
                  threadPostID    = jsonData[i].thread_post_id;
            
            const generatePost = new GeneratePost(id, profileID, profileName, 
                                 profilePic, dateTime, post, postMedia, 
                                 postCoordinates, this.getMapAPI(), 
                                 tags, hasThread, type,
                                 threadPostID);
            
            generatePost.showDefault();

            if(generatePost.getThreadObject() != null) {
                this.appendToHasThreadsArray(generatePost.getThreadObject());
            }
        }
    }

    generatePost(objectData) {
        // TEST DATA [FINAL DATA MUST COME FROM THE DATABASE]
        const postID          = objectData.id,
              profileID       = objectData.profile_id,
              profileName     = objectData.profile_name,
              profilePic      = objectData.profile_pic,
              dateTime        = objectData.date_time,
              post            = objectData.post,
              postMedia       = objectData.post_media,
              postCoordinates = objectData.post_coordinates,
              tags            = objectData.tags;
        
        new GeneratePost(postID, profileID, profileName, profilePic, dateTime,
                        post, postMedia, postCoordinates, 
                        this.getMapAPI(), tags).showThreadView();
    }

    generateThread(jsonData) {
        // TEST DATA [FINAL DATA MUST COME FROM THE DATABASE]
        for(let i = 0; i < jsonData.length; i++) {
            let threadID        = jsonData[i].id,
                postID          = jsonData[i].post_id,
                profileName     = jsonData[i].profile_name,
                profilePic      = jsonData[i].profile_pic,
                dateTime        = jsonData[i].date_time,
                post            = jsonData[i].post,
                postMedia       = jsonData[i].post_media,
                postCoordinates = jsonData[i].post_coordinates,
                threadPostID    = jsonData[i].thread_post_id;

            new GenerateThread(threadID, postID, profileName, profilePic, 
                               dateTime, post, postMedia, postCoordinates, 
                               this.getMapAPI(),
                               threadPostID).createThread();
        }        
    }

    generateAbout(jsonData) {
        const profileName = jsonData[0].profile_name,
              displayPic  = jsonData[0].display_picture,
              bannerImage = jsonData[0].banner_image,
              details     = jsonData[0].details,
              category    = jsonData[0].category,
              contact     = jsonData[0].contact,
              socials     = jsonData[0].socials;
            
        new GenerateAbout(profileName, displayPic, bannerImage,
            details, category, contact, socials);
    }

}