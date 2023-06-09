import { LinkToThumbnail } from "./LinkToThumbnail.js";
import { CreateElement } from "./CreateElement.js";

export class ModalOptions {

    constructor(mode, mediaDriver, ytDriver, entryModifier, 
        postID) {
        // PASSED
        this.mode            = mode;
        this.mediaDriver     = mediaDriver;
        this.ytDriver        = ytDriver;
        this.entryModifier   = entryModifier;
        this.postID          = postID;
        // GLOBAL
        this.openedButton    = null;
        this.dataArray       = null;
        this.linkToThumbnail = new LinkToThumbnail();

        // METHODS
        this.clickMediaButtons();
    }

    getPostID() {
        return this.postID;
    }

    getMode() {
        return this.mode;
    }

    getOpenedButton() {
        return this.openedButton;
    }

    setOpenedButton(openedButton) {
        this.openedButton = openedButton;
    }

    getDataArray() {
        return this.dataArray;
    }

    getGlobalID() {
        const idStringify = String(this.getPostID());
        
        switch(this.getMode()) {
            case 'post':
                return {
                    'modalBodyID'   : 'post-modal-body',
                    'modeElementID' : 'post-thumbnails',
                    'contentsID'    : 'post-media-contents',
                };
            case 'thread':
                return {
                    'modalBodyID'   : 'thread-'.concat(idStringify)
                                       .concat('-modal-body'),
                    'modeElementID' : 'thread-'.concat(idStringify)
                                      .concat('-thumbnails'),
                    'contentsID'    : 'thread-'.concat(idStringify)
                                      .concat('-media-contents')
                };
            default:
                break;
        }
    }

    setDataArray(dataArray) {
        this.dataArray = dataArray;
    }

    clickMediaButtons() {

        const ids         = this.determineButtonMode(),
              imageButton = document.getElementById(ids[0]),
              videoButton = document.getElementById(ids[1]),
              ytButton    = document.getElementById(ids[2]); 

        imageButton.onclick = () => {
            this.setOpenedButton("image");
        }
        videoButton.onclick = () => {
            this.setOpenedButton("video");
        }
        ytButton.onclick = () => {
            this.setOpenedButton("youtube");
        }
    }

    determineButtonMode() {
        let butttonIDs = [];

        const idStringify   = String(this.getPostID()),
              threadImageID = 'thread-'.concat(idStringify).concat('-image-button'),
              threadVideoID = 'thread-'.concat(idStringify).concat('-video-button'),
              threadYTID    = 'thread-'.concat(idStringify).concat('-yt-button'); 

        switch(this.getMode()) {
            case 'post':
                butttonIDs = [
                    'image-button',
                    'video-button',
                    'yt-button'
                ];
                break;
            case 'thread':
                butttonIDs = [
                    threadImageID,
                    threadVideoID,
                    threadYTID
                ];
                break;
            default:
                break;
        }
        return butttonIDs;
    }

    saveThumbnails() {

        const ids         = this.determineButtonMode(),
              imageButton = document.getElementById(ids[0]),
              videoButton = document.getElementById(ids[1]),
              ytButton    = document.getElementById(ids[2]); 

        switch(this.getOpenedButton()) {
            case "image":
                if(this.mediaDriver.getCounter() != 0) {
                    if(!imageButton.classList.contains('active')) {
                        imageButton.className += " active";
                    }
                    videoButton.disabled = true;
                    ytButton.disabled    = true;
                    videoButton.removeAttribute("data-bs-toggle");
                    videoButton.removeAttribute("data-bs-dismiss");
                    ytButton.removeAttribute("data-bs-toggle");
                    ytButton.removeAttribute("data-bs-dismiss");
                    this.setDataArray(this.mediaDriver);
                    this.showThumbnailToModeModal(
                        this.mediaDriver.getTagsArray()
                    );
                }
                break;
            case "video":
                if(this.mediaDriver.getCounter() != 0) {
                    if(!videoButton.classList.contains('active')) {
                        videoButton.className += " active";
                    }
                    imageButton.disabled = true;
                    ytButton.disabled    = true;
                    imageButton.removeAttribute("data-bs-toggle");
                    imageButton.removeAttribute("data-bs-dismiss");
                    ytButton.removeAttribute("data-bs-toggle");
                    ytButton.removeAttribute("data-bs-dismiss");
                    this.setDataArray(this.mediaDriver);
                    this.showThumbnailToModeModal(
                        this.mediaDriver.getTagsArray()
                    );
                }
                break;
            case "youtube":
                console.log(this.ytDriver.getCounter());
                if(this.ytDriver.getCounter() != 0) {
                    if(!ytButton.classList.contains('active')) {
                        ytButton.className += " active";
                    }
                    imageButton.disabled = true;
                    videoButton.disabled = true;
                    imageButton.removeAttribute("data-bs-toggle");
                    imageButton.removeAttribute("data-bs-dismiss");
                    videoButton.removeAttribute("data-bs-toggle");
                    videoButton.removeAttribute("data-bs-dismiss");
                    this.setDataArray(this.ytDriver);
                    let ytThumbnailsArray = this.linkToThumbnail.ytLinkToThumbnail(
                        this.ytDriver.getTagsArray()
                    );
                    this.showThumbnailToModeModal(ytThumbnailsArray);
                }
                break;
            default:
                break;
        }
    }

    showThumbnailToModeModal(imagesArray) {

        const modalBodyID    = this.getGlobalID()['modalBodyID'],
              modeElementID  = this.getGlobalID()['modeElementID'],
              contentsID     = this.getGlobalID()['contentsID'],
              modalBody      = document.getElementById(modalBodyID),
              divElement     = document.querySelector('#'.concat(modeElementID));

        if(!divElement) {
            let postThumbnails   = new CreateElement("div", modeElementID, 
                                   "main-modal-thumbnails")
                                   .createElement(),
                thumbnailHeader  = new CreateElement("div", "thumbnail-header")
                                   .createElement(),
                thumbnailText    = new CreateElement("div", "thumbnail-header-text",
                                   null).createElement(),
                closeThumbnail   = new CreateElement("div", "thumbnail-header-close",
                                   null).createElement(),
                closeButton      = new CreateElement("button", "remove-thumbnail",
                                   null).createElement(),
                closeButtonIcon  = new CreateElement("i", null, "fa-solid fa-xmark")
                                   .createElement(),
                thumbnailContent = new CreateElement("div", contentsID, null)
                                   .createElement();
                
                // SET ATTRIBUTE
                thumbnailText.textContent = "Media";
                closeThumbnail.setAttribute("type", "button");

                // APPEND CHILD 
                modalBody.appendChild(postThumbnails);
                postThumbnails.appendChild(thumbnailHeader);
                thumbnailHeader.appendChild(thumbnailText);
                thumbnailHeader.appendChild(closeThumbnail);
                closeThumbnail.appendChild(closeButton);
                closeButton.appendChild(closeButtonIcon);
                postThumbnails.appendChild(thumbnailContent);

                closeButton.onclick = () => {
                    postThumbnails.remove();
                    this.freeButtons();
                }
        }
        else {
            document.getElementById(contentsID).remove();
            let content = new CreateElement("div", contentsID, null).createElement();
            document.getElementById(modeElementID).appendChild(content);
        }
        this.entryModifier.createThumbnailViewer(
            contentsID, 
            document.getElementById(modeElementID),
            imagesArray
        );
    }

    freeButtons() {
        const ids         = this.determineButtonMode(),
              imageButton = document.getElementById(ids[0]),
              videoButton = document.getElementById(ids[1]),
              ytButton    = document.getElementById(ids[2]); 

        // ENABLE BUTTONS
        imageButton.removeAttribute("disabled");
        videoButton.removeAttribute("disabled");
        ytButton.removeAttribute("disabled");

        // ACCESS MODAL
        imageButton.setAttribute("data-bs-toggle", "modal");
        imageButton.setAttribute("data-bs-dismiss", "modal");
        videoButton.setAttribute("data-bs-toggle", "modal");
        videoButton.setAttribute("data-bs-dismiss", "modal");
        ytButton.setAttribute("data-bs-toggle", "modal");
        ytButton.setAttribute("data-bs-dismiss", "modal");

        // REMOVE ACTIVE STATUS
        const buttons = document.getElementsByClassName("media-button");
        for(let i = 0; i < buttons.length; i++) {
            buttons[i].classList.remove("active");
        }

        // REMOVE EXISTING TAG BUTTONS
        const tagButtons = document.querySelectorAll('.media-tag-buttons');
        tagButtons.forEach(element => element.remove());

        // REMOVE THUMBNAILS
        const thumbnailDivHolders = document.querySelectorAll('.thumbnail-div-holder');
        thumbnailDivHolders.forEach(element => element.remove());

        this.mediaDriver.emptyCounter();
        this.mediaDriver.emptyTagsArray();
        this.ytDriver.emptyCounter();
        this.ytDriver.emptyTagsArray();

        // CLEAR DATA ARRAY
        this.setDataArray(null);
    }

}