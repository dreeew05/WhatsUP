// Author: fiVe [G. Bulaong]
// Description: Generates the Images of the Post

import { CreateElement } from "./CreateElement.js";

export class GeneratePostMedia {

    constructor(POST_HOLDER, MEDIA_TYPE, FILENAMES, CAPTIONS) {
        this.POST_HOLDER = POST_HOLDER;
        this.MEDIA_TYPE  = MEDIA_TYPE;
        this.FILENAMES   = FILENAMES;
        this.CAPTIONS    = CAPTIONS;

        this.generateImage(this.getCount(), this.getFileNames(), this.getCaptions());
    }

    NEW_DIV       = '';
    NEW_DIV_NEXT  = '';
    CONTAINER_DIV = new CreateElement("div", null, "container-4").createElement();
    MEDIA_HOLDER  = new CreateElement("div", null, "media-holder").createElement();

    getPostHolder() {
        return this.POST_HOLDER;
    }

    getCount() {
        return this.getFileNames().length;
    }

    getMediaType() {
        return this.MEDIA_TYPE;
    }

    getFileNames() {
        return this.FILENAMES;
    }

    getCaptions() {
        return this.CAPTIONS;
    }

    getDiv() {
        return this.NEW_DIV;
    }

    setDiv(NEW_DIV) {
        this.NEW_DIV = NEW_DIV;
    } 

    getMediaHolder() {
        return this.MEDIA_HOLDER;
    }

    getContainerDiv() {
        return this.CONTAINER_DIV;
    }

    initializeImageHolder() {
        this.getMediaHolder().setAttribute("class", "container d-flex justify-content-center custom-container");
    }

    setLinkAttribute(DATATYPE, LINK, FILE_PATH, CAPTION) {
        if(DATATYPE == "iframe") {
            LINK.setAttribute("data-type", "iframe");
        }

        LINK.setAttribute("data-fancybox", "gallery");
        LINK.setAttribute("data-caption",  CAPTION);
        LINK.setAttribute("href", FILE_PATH);
    }

    setImageAttribute(IMG, FILE_NAME, FILE_PATH) {
        IMG.src = FILE_PATH;
        IMG.setAttribute("alt", FILE_NAME);
    }

    setVideoAttribute(VIDEO, FILE_PATH) {
        let source = new CreateElement("source", null, null).createElement();

        source.setAttribute("src", FILE_PATH);
        source.setAttribute("type", "video/mp4");

        VIDEO.appendChild(source);
    }

    setIframeAttribute(IFRAME, FILE_NAME, LINK) {
        // IFRAME.src = LINK;
        // IFRAME.title = FILE_NAME;
        IFRAME.setAttribute("src", LINK);
        IFRAME.setAttribute("title", FILE_NAME);
        IFRAME.setAttribute("allowfullscreen", "");
    }

    divLinkAppend(DIV, LINK, IMG) {
        DIV.appendChild(LINK);
        LINK.appendChild(IMG);
    }

    generateImage(count, filenames, captions) {
        this.initializeImageHolder();

        const BASE_IMAGE_PATH = "../../assets/images/",
              BASE_VIDEO_PATH = "../../assets/videos/";    

        for(let i = 0; i < count; i++) {
            let MEDIA_DIV  = new CreateElement("div", null, "media-div").createElement(),
                LINK       = new CreateElement("a", null, null).createElement(),
                IMG        = new CreateElement("img", null, null).createElement(),
                VIDEO      = new CreateElement("video", null, null).createElement(),
                FILE_PATH  = null,
                isPlayable = false;
            
            switch(this.getMediaType()) {
                case "image":
                    FILE_PATH = BASE_IMAGE_PATH.concat(filenames[i]);
                    this.setImageAttribute(IMG, filenames[i], FILE_PATH);
                    this.resizeBaseOnCount(count, i, IMG, isPlayable, MEDIA_DIV, LINK);
                    break;
                case "video":
                    FILE_PATH  = BASE_VIDEO_PATH.concat(filenames[i]);
                    isPlayable = true;
                    this.setVideoAttribute(VIDEO, FILE_PATH);
                    this.resizeBaseOnCount(count, i, VIDEO, isPlayable, MEDIA_DIV, LINK);
                    break;
                case "youtube":
                    let EMBED_LINK = filenames[i],
                    LINK_SPLIT     = EMBED_LINK.split("/"),
                    EMBED_CODE     = LINK_SPLIT[LINK_SPLIT.length - 1],
                    THUMBNAIL      = "https://img.youtube.com/vi/".concat(EMBED_CODE).concat("/maxresdefault.jpg");
                    FILE_PATH      = filenames[i];
                    isPlayable     = true;
                    this.setImageAttribute(IMG, filenames[i], THUMBNAIL);
                    this.resizeBaseOnCount(count, i, IMG, isPlayable, MEDIA_DIV, LINK);
                    break;
                default:
                    break;
            }

            this.setLinkAttribute(this.getMediaType(), LINK, FILE_PATH, captions);

        }
    }

    resizeBaseOnCount(count, counter, MEDIA, isPlayable, MEDIA_DIV, LINK) {

        let newDiv   = null,
            playIcon = new CreateElement("i", null, "fa-solid fa-play").createElement();
        
        if(isPlayable == true) {
            LINK.appendChild(playIcon);
        } 

        switch(count) {
            case 1:
                MEDIA.setAttribute("class", "img-fluid");
                this.getPostHolder().appendChild(this.getMediaHolder());
                this.getMediaHolder().appendChild(MEDIA_DIV);
                MEDIA_DIV.appendChild(LINK);
                LINK.appendChild(MEDIA);
                break;
            case 2:
                newDiv = new CreateElement("div", null, "medium-media");
                if(counter == 0) {
                    this.setDiv(newDiv.createElement());   
                }
                MEDIA.setAttribute("class", "medium-media");
                this.getPostHolder().appendChild(this.getMediaHolder());
                this.getMediaHolder().appendChild(this.getDiv());
                this.getDiv().appendChild(MEDIA_DIV);
                this.divLinkAppend(MEDIA_DIV, LINK, MEDIA);
                break;
            case 3:
                newDiv = new CreateElement("div", null, "small-media-2");
                switch(counter) {
                    case 0:
                        MEDIA.setAttribute("class", "big-media");
                        this.getPostHolder().appendChild(this.getMediaHolder());
                        this.getMediaHolder().appendChild(MEDIA_DIV);
                        MEDIA_DIV.appendChild(LINK)
                        LINK.appendChild(MEDIA);
                        break;
                    case 1:
                        this.setDiv(newDiv.createElement());
                        MEDIA.setAttribute("class", "small-media");
                        // MEDIA.setAttribute("style", "padding-bottom: 0rem;");
                        this.getPostHolder().appendChild(this.getMediaHolder());
                        this.getMediaHolder().appendChild(this.getDiv());
                        this.getDiv().appendChild(MEDIA_DIV);
                        this.divLinkAppend(MEDIA_DIV, LINK, MEDIA)
                        break;
                    case 2:
                        MEDIA.setAttribute("class", "small-media");
                        this.getDiv().appendChild(MEDIA_DIV);
                        this.divLinkAppend(MEDIA_DIV, LINK, MEDIA)
                        break;
                    default:
                        break;
                }
                break;
            case 4:
                let rowDiv = new CreateElement("div", null, "row"),
                    colDiv = new CreateElement("div", null, "col");
                switch(counter % 2) {
                    case 0:
                        this.setDiv(rowDiv.createElement());
                        colDiv = colDiv.createElement();
                        MEDIA.setAttribute("style", "padding-bottom: 0.5rem;");
                        this.getPostHolder().appendChild(this.getMediaHolder());
                        this.getMediaHolder().appendChild(this.getContainerDiv());
                        this.getContainerDiv().appendChild(this.getDiv());
                        this.getDiv().appendChild(colDiv);
                        colDiv.appendChild(MEDIA_DIV);
                        this.divLinkAppend(MEDIA_DIV, LINK, MEDIA);
                        break;
                    case 1:
                        colDiv = colDiv.createElement();
                        this.getDiv().appendChild(colDiv);
                        colDiv.appendChild(MEDIA_DIV)
                        this.divLinkAppend(MEDIA_DIV, LINK, MEDIA);
                        break;
                    default:
                        break;
                    }
                break;
            default:
                break;
        }
    }
}