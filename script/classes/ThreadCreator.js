import { Base64Converter } from "./Base64Converter.js";
import { TagLinkDataDriver } from "./TagLinkDataDriver.js";
import { CreateElement } from "./CreateElement.js";
import { BaseModalDisplay } from "./BaseModalDisplay.js";
import { ModifyEntries } from "./ModifyEntries.js";
import { DataSerializer } from "./DataSerializer.js";
import { SweetAlertFactory } from "./SweetAlertFactory.js";

export class ThreadCreator {

    constructor(postID, threadHolder) {
        // PASSED 
        this.postID       = postID;
        this.threadHolder = threadHolder;

        // GLOBAL
        this.mode              = 'thread';
        this.ytLinksDataDriver = new TagLinkDataDriver();
        this.mediaDriver       = new TagLinkDataDriver();
        this.base64Converter   = new Base64Converter(); 
        this.entryModifier     = new ModifyEntries(
            this.mode,
            this.getPostID()
        );
        this.dataSerializer    = new DataSerializer();
        this.sweetAlert        = new SweetAlertFactory();

        // METHODS
        this.displayThreadButton()
        this.displayThreadModal();

        // NEXT-STATE GLOBAL
        this.baseModalDisplay  = new BaseModalDisplay(
            this.mode, 
            this.mediaDriver, 
            this.ytLinksDataDriver,
            this.entryModifier,
            this.getPostID()
        );

        // NEXT-STATE METHODS
        this.addDisplayModals();
    }

    getPostID() {
        return this.postID;
    }

    getThreadHolder() {
        return this.threadHolder;
    }

    getDataArray() {
        return this.baseModalDisplay.getDataArray();
    }

    getOpenedButton() {
        return this.baseModalDisplay.getOpenedButton();
    }

    getGlobalID() {
        const idStringify = String(this.getPostID());
        return {
            'mediaModalID'   : 'thread-'.concat(idStringify).concat('-media-modal'),
            'ytModalID'     : 'thread-'.concat(idStringify).concat('-yt-modal'),
            'mapModalID'    : 'thread-'.concat(idStringify).concat('-map-modal'),
            'threadModalID' : 'thread-'.concat(idStringify).concat('-modal'),
            'threadBodyID'  : 'thread-'.concat(idStringify).concat('-modal-body'),
            'threadLabelID' : 'thread-'.concat(idStringify).concat('-modal-label'),
            'threadImageID' : 'thread-'.concat(idStringify).concat('-image-button'),
            'threadVideoID' : 'thread-'.concat(idStringify).concat('-video-button'),
            'threadYTID'    : 'thread-'.concat(idStringify).concat('-yt-button'),
            'threadLatID'   : 'thread-'.concat(idStringify).concat('-latitude-text-field-hidden'),
            'threadLngID'   : 'thread-'.concat(idStringify).concat('-longtitude-text-field-hidden')
        };
    }

    displayThreadButton() {

        const threadModalID = this.getGlobalID()['threadModalID'];

        let threadButton = new CreateElement("button", null, "create-thread-button")
                         .createElement();

        // SET ATTRIBUTE
        threadButton.setAttribute("type", "button");
        threadButton.setAttribute("data-bs-toggle", "modal");
        threadButton.setAttribute("data-bs-target", "#".concat(threadModalID));
        threadButton.textContent = "Add Thread";

        // APPEND CHILD
        this.getThreadHolder().appendChild(threadButton);
    }

    displayThreadModal() {

        const threadModalID = this.getGlobalID()['threadModalID'],
              threadBodyID  = this.getGlobalID()['threadBodyID'],
              threadLabelID = this.getGlobalID()['threadLabelID'],
              threadImageID = this.getGlobalID()['threadImageID'],
              threadVideoID = this.getGlobalID()['threadVideoID'],
              threadYTID    = this.getGlobalID()['threadYTID'],
              threadLatID   = this.getGlobalID()['threadLatID'],
              threadLngID   = this.getGlobalID()['threadLngID'],
              mediaModalID  = this.getGlobalID()['mediaModalID'],
              ytModalID     = this.getGlobalID()['ytModalID'],
              mapModalID    = this.getGlobalID()['mapModalID'];

        let threadModal       = new CreateElement("div", threadModalID, "modal fade")
                              .createElement(),
            modalDialog     = new CreateElement("div", null, "modal-dialog modal-dialog-centered modal-lg")
                              .createElement(),
            modalContent    = new CreateElement("div", null, "modal-content")
                              .createElement(),
            modalHeader     = new CreateElement("div", null, "modal-header")
                              .createElement(),
            modalTitle      = new CreateElement("h3", threadLabelID, "modal-title")
                              .createElement(),
            closeButton     = new CreateElement("button", null, "btn-close")
                              .createElement(),
            modalBody       = new CreateElement("div", threadBodyID, "modal-body")
                              .createElement(),
            threadTextArea  = new CreateElement("textarea", null, "text-area")
                              .createElement(),
            mediaControl    = new CreateElement("div", null, "media-control")
                              .createElement(),
            mediaControlTxt = new CreateElement("div", null, "media-control-text")
                              .createElement(),
            mediaControlBtn = new CreateElement("div", null, "media-control-buttons")
                              .createElement(),
            imageButton     = new CreateElement("button", threadImageID, "media-button")
                              .createElement(),
            imageIcon       = new CreateElement("i", null, "fa-solid fa-image")
                              .createElement(),
            videoButton     = new CreateElement("button", threadVideoID, "media-button")
                              .createElement(),
            videoIcon       = new CreateElement("i", null, "fa-solid fa-video")
                              .createElement(), 
            ytButton        = new CreateElement("button", threadYTID, "media-button")
                              .createElement(),
            ytIcon          = new CreateElement("i", null, "fa-brands fa-youtube")
                              .createElement(),
            mapButton       = new CreateElement("button", null, "media-button")
                              .createElement(),
            mapIcon         = new CreateElement("i", null, "fa-sharp fa-solid fa-location-dot")
                              .createElement(),
            mapCoordsHolder = new CreateElement("div", null, "map-coordinates-holder-hidden")
                              .createElement(),
            latFieldHidden  = new CreateElement("input", threadLatID, "thread-text-fields hidden")
                              .createElement(),
            lngFieldHidden  = new CreateElement("input", threadLngID, "thread-text-fields hidden")
                              .createElement(),
            modalFooter     = new CreateElement("div", null, "modal-footer")
                              .createElement(),
            threadButton    = new CreateElement("button", null, "save-button")
                              .createElement();
                
        // SET ATTRIBUTES
        threadModal.setAttribute("tabindex", "-1");
        threadModal.setAttribute("aria-labelledby", threadLabelID);
        threadModal.setAttribute("aria-hidden", "true");
        modalDialog.setAttribute("role", "document");
        modalTitle.textContent = "Create thread";
        closeButton.setAttribute("data-bs-dismiss", "modal");
        closeButton.setAttribute("aria-label", "Close");
        mediaControlTxt.textContent = "Add To Thread";
        threadButton.textContent = "Add Thread";
        threadButton.setAttribute("type", "submit");
        imageButton.setAttribute("type", "button");
        imageButton.setAttribute("data-bs-target", "#".concat(mediaModalID));
        imageButton.setAttribute("data-bs-toggle", "modal");
        imageButton.setAttribute("data-bs-dismiss", "modal");
        videoButton.setAttribute("type", "button");
        videoButton.setAttribute("data-bs-target", "#".concat(mediaModalID));
        videoButton.setAttribute("data-bs-toggle", "modal");
        videoButton.setAttribute("data-bs-dismiss", "modal");
        ytButton.setAttribute("type", "button");
        ytButton.setAttribute("data-bs-target", "#".concat(ytModalID));
        ytButton.setAttribute("data-bs-toggle", "modal");
        ytButton.setAttribute("data-bs-dismiss", "modal");
        mapButton.setAttribute("type", "button");
        mapButton.setAttribute("data-bs-target", "#".concat(mapModalID));
        mapButton.setAttribute("data-bs-toggle", "modal");
        mapButton.setAttribute("data-bs-dismiss", "modal");
        latFieldHidden.setAttribute("type", "text");
        latFieldHidden.disabled = true;
        // latFieldHidden.style.visibility = "hidden";
        lngFieldHidden.setAttribute("type", "text");
        lngFieldHidden.disabled = true;
        // lngFieldHidden.style.visibility = "hidden";

        // APPEND CHILD
        this.getThreadHolder().appendChild(threadModal);
        threadModal.appendChild(modalDialog);
        modalDialog.appendChild(modalContent);
        modalContent.appendChild(modalHeader);
        modalHeader.appendChild(modalTitle);
        modalHeader.appendChild(closeButton);
        modalContent.appendChild(modalBody);
        modalBody.appendChild(threadTextArea);
        modalBody.appendChild(mediaControl);
        mediaControl.appendChild(mediaControlTxt);
        mediaControl.appendChild(mediaControlBtn);
        mediaControlBtn.appendChild(imageButton);
        imageButton.appendChild(imageIcon);
        mediaControlBtn.appendChild(videoButton);
        videoButton.appendChild(videoIcon);
        mediaControlBtn.appendChild(ytButton);
        ytButton.appendChild(ytIcon);
        mediaControlBtn.appendChild(mapButton);
        modalBody.appendChild(mapCoordsHolder);
        mapCoordsHolder.appendChild(latFieldHidden);
        mapCoordsHolder.appendChild(lngFieldHidden);
        mapButton.appendChild(mapIcon);
        modalContent.appendChild(modalFooter);
        modalFooter.appendChild(threadButton);

        threadButton.onclick = async() => {
            const phpURL   = null,
                  contents = {
                        'profileID' : 1048,
                        'postID' : this.getPostID(),
                        'postContent' : threadTextArea.value,
                        'coordinates' : {
                            'latitude' : latFieldHidden.value,
                            'longtitude' : lngFieldHidden.value
                        },
                        'media' : null
                  }

            if(this.getDataArray() != null && 
                this.getDataArray().getTagsArray().length != 0) {

                switch(this.getOpenedButton()) {
                    case 'image':
                        // FALLS THROUGH
                    case 'video':
                        contents['media'] = {
                            'type' : this.getOpenedButton(),
                            'data' : await this.base64Converter.blobReader(
                                        this.getDataArray().getTagsArray()
                                    )
                        }
                        break;
                    case 'youtube':
                        contents['media'] = {
                            'type' : this.getOpenedButton(),
                            'data' : this.getDataArray().getTagsArray()
                        }
                        break;
                    default:
                        break;
                }
            }

            console.log(contents);
        }

    }

    addDisplayModals() {
        this.baseModalDisplay.displayMapModal(
            this.getThreadHolder()
        );
        this.baseModalDisplay.displayMediaModal(
            this.getThreadHolder(),
            this.mediaDriver
        );
        this.baseModalDisplay.displayYoutubeModal(
            this.getThreadHolder(),
            this.ytLinksDataDriver
        );
    }

}