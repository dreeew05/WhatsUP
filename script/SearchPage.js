// Author: fiVe
// Description: JavaScript for SearchPage

import { SideNavBar } from "./classes/SideNavbar.js";
import { NavBarSectionDivider } from "./classes/NavBarSectionDivider.js";
import { GeneratePost } from "./classes/GeneratePost.js";

// TEST DATA
import postsJSON from "../test/posts.json" assert { type: 'json' };
import profileJSON from "../test/searchProfile.json" assert { type: 'json' };
import { GenerateProfileSearch } from "./classes/GenerateProfileSearch.js";

class SearchPage {

    constructor() {
        this.initializeSideNavBar();
        this.navBarSectionDividerImplementation();
        this.generatePost();
        this.generateProfile();
    }

    initializeSideNavBar() {
        let sideNavBar = new SideNavBar();
        
        document.getElementById("hamburger-button").onclick = function() {
            sideNavBar.hamburgerToggler();
        };
    }
    navBarSectionDividerImplementation() {
        const links       = document.querySelectorAll('.nav-item a'),
              ALL_DIV     = "all",
              POSTS_DIV   = "posts",
              PROFILE_DIV = "profile",
              CARD_DIVS = ["posts", "profile"];

        let nbsd = new NavBarSectionDivider(links, CARD_DIVS);

        document.getElementById("all-button").onclick = function() {
            nbsd.changeDiv(ALL_DIV);
        }
        document.getElementById("posts-button").onclick = function() {
            nbsd.changeDiv(POSTS_DIV);
        }
        document.getElementById("profile-button").onclick = function() {
            nbsd.changeDiv(PROFILE_DIV);
        }
    }
    generateProfile() {
        // TEST DATA [FINAL DATA MUST COME FROM THE DATABASE]

        let genProfile = new GenerateProfileSearch();

        for(let i = 0; i < profileJSON.length; i++) {
            let profileName        = profileJSON[i].profile_name,
                profileImage       = profileJSON[i].profile_image,
                profileCategory    = profileJSON[i].profile_category,
                profileDescription = profileJSON[i].profile_description;
            
            genProfile.generateProfile(profileImage, profileName, profileCategory, profileDescription);
        }
    }
    generatePost() {
        // TEST DATA [FINAL DATA MUST COME FROM THE DATABASE]
        for(let i = 0; i < postsJSON.length; i++) {
            let postID        = postsJSON[i].post_id,
                profileName   = postsJSON[i].profile_name,
                profilePic    = postsJSON[i].profile_pic,
                dateTime      = postsJSON[i].date_time,
                post          = postsJSON[i].post,
                postMedia     = postsJSON[i].post_media.file,
                postMediaType = postsJSON[i].post_media.type,
                postMap       = postsJSON[i].post_map;
            
            new GeneratePost(postID, profileName, profilePic, dateTime, post, postMedia, postMediaType, postMap).createPost();
        } 
    }

}

// DRIVER [PLEASE DO NOT MODFIY]
new SearchPage();