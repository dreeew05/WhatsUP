// Author: fiVe
// Description: JavaScript for SearchPage

import { SideNavBar } from "./classes/SideNavbar.js";
import { NavBarSectionDivider } from "./classes/NavBarSectionDivider.js";
import { GeneratePost } from "./classes/GeneratePost.js";

// TEST DATA
import postsJSON from "../test/posts.json" assert { type: 'json' };

class SearchPage {

    constructor() {
        this.initializeSideNavBar();
        // this.navBarSectionDividerImplementation();
        this.generatePost();
    }

    initializeSideNavBar() {
        let sideNavBar = new SideNavBar();
        
        document.getElementById("hamburger-button").onclick = function() {
            sideNavBar.hamburgerToggler();
        };
    }
    navBarSectionDividerImplementation() {
        const links     = document.querySelectorAll('.nav-item a'),
              ABOUT_DIV = "about", 
              HOME_DIV  = "posts",
              CARD_DIVS = ["posts", "about"];
        let nbsd = new NavBarSectionDivider(links, CARD_DIVS);

        document.getElementById("about-button").onclick = function() {
            nbsd.changeDiv(ABOUT_DIV);
        }
        document.getElementById("home-button").onclick = function() {
            nbsd.changeDiv(HOME_DIV);
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