//Author: fiVe
//Description: JavaScript for ProfilePage

import { NavBarSectionDivider } from "./classes/NavBarSectionDivider.js";
import { SideNavBar } from "./classes/SideNavbar.js";
import { GeneratePost } from "./classes/GeneratePost.js";
import { GenerateThread } from "./classes/GenerateThread.js";

// TEST DATA
import postsJSON from "../test/posts.json" assert { type: 'json' };
console.log(postsJSON);

class ProfilePage {

    constructor() {
        this.navBarSectionDividerImplementation();
        this.generatePost();
        this.initializeSideNavBar();
    }
    navBarSectionDividerImplementation() {
        const links  = document.querySelectorAll('.nav-item a');
        new NavBarSectionDivider(links);
    }
    initializeSideNavBar() {
        let sideNavBar = new SideNavBar();
        
        document.getElementById("hamburger-button").onclick = function() {
            sideNavBar.hamburgerToggler();
        };
    }
    generatePost() {
        // TEST DATA [FINAL DATA MUST COME FROM THE DATABASE]
        
        for(let i = 0; i < postsJSON.length; i++) {
            let postID        = postsJSON[i].id,
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
new ProfilePage();

