// Author: fiVe
// Description: Show Threads for the Particular Post

import { FeedGenerator } from "./FeedGenerator.js";
import { NavBarFactory } from "./NavBarFactory.js";
import { GeneratePostMap } from "./GeneratePostMap.js";
import { DataSerializer } from "./DataSerializer.js";

class ShowPostThread {
    constructor() {
        // GLOBAL VARIABLE
        this.postData       = null;
        this.threadData     = null;
        this.mapAPI         = new GeneratePostMap();
        this.dataSerializer = new DataSerializer();

        // METHODS
        this.initializeNavBar();
        this.initializeContent();
    }

    getPostData() {
        return this.postData;
    }

    getThreadData() {
        return this.threadData;
    }

    setPostData(postData) {
        this.postData = postData;
    }

    setThreadData(threadData) {
        this.threadData = threadData;
    }

    async initializeContent() {
        const url    = window.location.href,
              urlObj = new URL(url),
              type   = urlObj.searchParams.get('type'),
              id     = urlObj.searchParams.get('id');

        if(type && id) {
            const request = {
                'mode' : null,
                'id'   : id
            }
            let postResponse,
                threadResponse;

            const postPhpURL   = '/php/PostGetter.php',
                  threadPhpURL = '/php/ThreadGetter.php',
                  idReqPhpURL  = '/php/IDGetter.php';

            if(type == 'thread') {
                const idRequest = {
                    'type' : 'getPostID',
                    'id'   : id
                };
                const idResponse = await this.dataSerializer.postData(
                    idRequest, idReqPhpURL
                );
                request.id = idResponse.maxID;
            }

            request.mode = 'showPost';
            postResponse = await this.dataSerializer.postData(
                request, postPhpURL
            );
            request.mode = 'showThread';
            threadResponse = await this.dataSerializer.postData(
                request, threadPhpURL
            );

            this.setPostData(postResponse[0]);
            this.setThreadData(threadResponse);
        }
        this.initializeFeedGenerator();
        this.scrollIntoID(type, id);
        this.goBack();

    }

    initializeNavBar() {
        new NavBarFactory("type1", "visitor");
    }

    scrollIntoID(TYPE, ID) {
        const goToID   = TYPE + "-holder-" + ID;

        document.getElementById(goToID).scrollIntoView({
            behavior : "smooth"
        });
    }

    initializeFeedGenerator() {
        const feedGenerator = new FeedGenerator(this.mapAPI);

        feedGenerator.generatePost(
            this.getPostData()
        );
        feedGenerator.generateThread(
            this.getThreadData()
        );
        
    }

    goBack() {
        let backButton = document.getElementById("back-button");

        backButton.onclick = function() {
            window.history.back();
        }
    }

}

new ShowPostThread();