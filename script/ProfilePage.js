//Author: fiVe
//Description: JavaScript for ProfilePage

import { NavBarSectionDivider } from "./classes/NavBarSectionDivider.js";
import { SideNavBar } from "./classes/SideNavbar.js";
import { GeneratePost } from "./classes/GeneratePost.js";
import { GenerateThread } from "./classes/GenerateThread.js";

// TEST DATA
import postsJSON from "../test/posts.json" assert { type: 'json' };
import threadJSON from "../test/threads.json" assert { type: 'json' };

class ProfilePage {

    constructor() {
        this.navBarSectionDividerImplementation();
        this.generatePost();
        this.initializeSideNavBar();
    }
    navBarSectionDividerImplementation() {
        const links     = document.querySelectorAll('.nav-item a'),
              ABOUT_DIV = "about", 
              HOME_DIV  = "home";
        
        let nbsd = new NavBarSectionDivider(links);

        document.getElementById("about-button").onclick = function() {
            nbsd.changeDiv(ABOUT_DIV);
        }
        document.getElementById("home-button").onclick = function() {
            nbsd.changeDiv(HOME_DIV);
        }
    }
    initializeSideNavBar() {
        let sideNavBar = new SideNavBar();
        
        document.getElementById("hamburger-button").onclick = function() {
            sideNavBar.hamburgerToggler();
        };
    }
    generatePost() {
        // TEST DATA [FINAL DATA MUST COME FROM THE DATABASE]
        
        // POST
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

        // THREAD   
        for(let i = 0; i < threadJSON.length; i++) {
            let threadID      = threadJSON[i].thread_id,
                postID        = threadJSON[i].post_id,
                profileName   = threadJSON[i].profile_name,
                profilePic    = threadJSON[i].profile_pic,
                dateTime      = threadJSON[i].date_time,
                post          = threadJSON[i].post,
                postMedia     = threadJSON[i].post_media.file,
                postMediaType = threadJSON[i].post_media.type,
                postMap       = threadJSON[i].post_map; 

            new GenerateThread(threadID, postID, profileName, profilePic, dateTime, post, postMedia, postMediaType, postMap).createThread();
        }        

    }
}

// DRIVER [PLEASE DO NOT MODFIY]
new ProfilePage();

