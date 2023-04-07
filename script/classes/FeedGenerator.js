// Author: fiVe
// Description: Automate methods

import { GenerateAbout } from "./GenerateAbout.js";
import { GeneratePost } from "./GeneratePost.js";
import { GenerateProfileSearch } from "./GenerateProfileSearch.js";
import { GenerateThread } from "./GenerateThread.js";
import { SideNavBar } from "./SideNavbar.js";

export class FeedGenerator {

    generatePost(jsonData) {
        for(let i = 0; i < jsonData.length; i++) {
            let postID        = jsonData[i].post_id,
                profileName   = jsonData[i].profile_name,
                profilePic    = jsonData[i].profile_pic,
                dateTime      = jsonData[i].date_time,
                post          = jsonData[i].post,
                postMedia     = jsonData[i].post_media.file,
                postMediaType = jsonData[i].post_media.type,
                postMap       = jsonData[i].post_map;
            
            new GeneratePost(postID, profileName, profilePic, dateTime, post, postMedia, postMediaType, postMap).createPost();
        } 
    }

    generateProfile(jsonData) {
        let genProfile = new GenerateProfileSearch();

        for(let i = 0; i < jsonData.length; i++) {
            let profileName        = jsonData[i].profile_name,
                profileImage       = jsonData[i].profile_image,
                profileCategory    = jsonData[i].profile_category,
                profileDescription = jsonData[i].profile_description;
            
            genProfile.generateProfile(profileImage, profileName, profileCategory, profileDescription);
        }
    }

    initializeSideNavBar() {
        let sideNavBar = new SideNavBar();
        
        document.getElementById("hamburger-button").onclick = function() {
            sideNavBar.hamburgerToggler();
        };
    }

    generateThread(jsonData) {
        // TEST DATA [FINAL DATA MUST COME FROM THE DATABASE]
        for(let i = 0; i < jsonData.length; i++) {
            let threadID      = jsonData[i].thread_id,
                postID        = jsonData[i].post_id,
                profileName   = jsonData[i].profile_name,
                profilePic    = jsonData[i].profile_pic,
                dateTime      = jsonData[i].date_time,
                post          = jsonData[i].post,
                postMedia     = jsonData[i].post_media.file,
                postMediaType = jsonData[i].post_media.type,
                postMap       = jsonData[i].post_map; 

            new GenerateThread(threadID, postID, profileName, profilePic, dateTime, post, postMedia, postMediaType, postMap).createThread();
        }        
    }

    generateAbout(jsonData) {
        let profileName = jsonData[0].profile_name,
            details     = jsonData[0].details,
            category    = jsonData[0].category,
            contact     = jsonData[0].contact,
            socials     = jsonData[0].socials;
        new GenerateAbout(profileName, details, category, contact, socials);
    }

}