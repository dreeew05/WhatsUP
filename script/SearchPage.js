// Author: fiVe
// Description: JavaScript for SearchPage

import { NavBarSectionDivider } from "./classes/NavBarSectionDivider.js";
import { FeedGenerator } from "./classes/FeedGenerator.js";
import { NavBarFactory } from "./classes/NavBarFactory.js";
import { GeneratePostMap } from "./classes/GeneratePostMap.js";
import { DataSerializer } from "./classes/DataSerializer.js";
import { PostThreadDataDriver } from "./classes/PostThreadDataDriver.js";

class SearchPage {

    constructor() {
        // GLOBAL VARIABLE
        this.mapAPI         = new GeneratePostMap();
        this.dataSerializer = new DataSerializer();

        this.initializeNavBar();
        this.navBarSectionDividerImplementation();
        this.getData();   
    }

    initializeNavBar() {
        new NavBarFactory("type1", "visitor");
    }

    navBarSectionDividerImplementation() {
        const links       = document.querySelectorAll('.nav-item a'),
              ALL_DIV     = "all",
              POSTS_DIV   = "posts",
              PROFILE_DIV = "profile",
              CARD_DIVS   = ["posts", "profile"];

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

    async getData() {
        const url    = window.location.href,
              urlObj = new URL(url),
              search = urlObj.searchParams.get('search');

        const allPostTags = await this.dataSerializer.postData(
            {
                'tag' : search,
            },
            '/php/TagSearch.php'
        );

        const postData    = [],
              profiles    = [],
              profileData = [];

        const searchProfile = await this.dataSerializer.postData(
            {
                'mode'    : 'profile',
                'profile' : search
            },
            '/php/ProfileGetter.php'
        );

        for(let i = 0; i < searchProfile.length; i++) {
            profileData.push(searchProfile[i]);
        }

        console.log(searchProfile);
        // console.log(allPostTags);
        for(let i = 0; i < allPostTags.length; i++) {
            // console.log(allPostTags[i]['post_id']);
            const getPost = await this.dataSerializer.postData(
                {   
                    'mode' : 'tagPost',
                    'id'   : allPostTags[i]['post_id']
                },
                '/php/PostGetter.php'
            );
            postData.push(getPost[0]);
            // console.log(getPost[0]);
            profiles.push(getPost[0]['profile_id'])
        }
        const profileSet = new Set(profiles);
        for(const id of profileSet) {
            // console.log(id)
            const getProfile = await this.dataSerializer.postData(
                {
                    'mode' : 'tag',
                    'id'   : id
                },
                '/php/ProfileGetter.php'
            );
            console.log(getProfile[0]);
            // profileData.push(getProfile[0]);
            const arrayContains = profileData.some(
                obj => Object.values(obj).includes(
                    getProfile[0]['profile_name']
                )
            );

            if(!arrayContains) {
                profileData.push(getProfile[0]);
            }
        }
        console.log(profileData);
        this.initializeFeedGenerator(profileData, postData);
    }

    initializeFeedGenerator(profileData, postData) {
        let feedGenerator = new FeedGenerator(this.mapAPI);
        
        feedGenerator.initializeSideNavBar();
        feedGenerator.generateProfile(profileData);
        feedGenerator.generateDefaultPostThread(postData);

        new PostThreadDataDriver(
            feedGenerator.getHasThreadsArray()
        );
    }

}

// DRIVER [PLEASE DO NOT MODFIY]
new SearchPage();