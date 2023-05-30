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
        this.ytLinksDataDriver = new TagLinkDataDriver();
        this.mediaDriver       = new TagLinkDataDriver();
        this.base64Converter   = new Base64Converter(); 
        this.entryModifier     = new ModifyEntries();
        this.dataSerializer    = new DataSerializer();
        this.sweetAlert        = new SweetAlertFactory();

        // METHODS
        this.displayThreadButton()
        this.displayThreadModal();

        // NEXT-STATE GLOBAL
        this.baseModalDisplay  = new BaseModalDisplay(
            'thread', 
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

    displayThreadButton() {
        let threadButton = new CreateElement("button", null, "create-thread-button")
                         .createElement();

        // SET ATTRIBUTE
        threadButton.setAttribute("type", "button");
        threadButton.setAttribute("data-bs-toggle", "modal");
        threadButton.setAttribute("data-bs-target", "#thread-modal");
        threadButton.textContent = "Add Thread";

        // APPEND CHILD
        this.getThreadHolder().appendChild(threadButton);
    }

    displayThreadModal() {

        let threadModal       = new CreateElement("div", "thread-modal", "modal fade")
                              .createElement(),
            modalDialog     = new CreateElement("div", null, "modal-dialog modal-dialog-centered modal-lg")
                              .createElement(),
            modalContent    = new CreateElement("div", "modal-content-create-thread", "modal-content")
                              .createElement(),
            modalHeader     = new CreateElement("div", null, "modal-header")
                              .createElement(),
            modalTitle      = new CreateElement("h3", "thread-modal-label", "modal-title")
                              .createElement(),
            closeButton     = new CreateElement("button", null, "btn-close")
                              .createElement(),
            modalBody       = new CreateElement("div", "thread-modal-body", "modal-body")
                              .createElement(),
            threadTextArea    = new CreateElement("textarea", String(this.getPostID()).concat('-text-area'),
                              "text-area").createElement(),
            mediaControl    = new CreateElement("div", "media-control", null)
                              .createElement(),
            mediaControlTxt = new CreateElement("div", "media-control-text", 
                              null).createElement(),
            mediaControlBtn = new CreateElement("div", "media-control-buttons",
                              null).createElement(),
            imageButton     = new CreateElement("button", "thread-image-button", "media-button")
                              .createElement(),
            imageIcon       = new CreateElement("i", null, "fa-solid fa-image")
                              .createElement(),
            videoButton     = new CreateElement("button", "thread-video-button", "media-button")
                              .createElement(),
            videoIcon       = new CreateElement("i", null, "fa-solid fa-video")
                              .createElement(), 
            ytButton        = new CreateElement("button", "thread-yt-button", "media-button")
                              .createElement(),
            ytIcon          = new CreateElement("i", null, "fa-brands fa-youtube")
                              .createElement(),
            mapButton       = new CreateElement("button", null, "media-button")
                              .createElement(),
            mapIcon         = new CreateElement("i", null, "fa-sharp fa-solid fa-location-dot")
                              .createElement(),
            mapCoordsHolder = new CreateElement("div", null, "map-coordinates-holder-hidden")
                              .createElement(),
            latFieldHidden  = new CreateElement("input", "thread-latitude-text-field-hidden", 
                              "thread-text-fields").createElement(),
            lngFieldHidden  = new CreateElement("input", "thread-longtitude-text-field-hidden",
                              "thread-text-fields").createElement(),
            modalFooter     = new CreateElement("div", null, "modal-footer")
                              .createElement(),
            threadButton    = new CreateElement("button", null, "save-button")
                              .createElement();
                
        // SET ATTRIBUTES
        threadModal.setAttribute("tabindex", "-1");
        threadModal.setAttribute("aria-labelledby", "thread-modal-label");
        threadModal.setAttribute("aria-hidden", "true");
        modalDialog.setAttribute("role", "document");
        modalTitle.textContent = "Create thread";
        closeButton.setAttribute("data-bs-dismiss", "modal");
        closeButton.setAttribute("aria-label", "Close");
        mediaControlTxt.textContent = "Add To Thread";
        threadButton.textContent = "Add Thread";
        threadButton.setAttribute("type", "submit");
        imageButton.setAttribute("type", "button");
        imageButton.setAttribute("data-bs-target", "#media-modal");
        imageButton.setAttribute("data-bs-toggle", "modal");
        imageButton.setAttribute("data-bs-dismiss", "modal");
        videoButton.setAttribute("type", "button");
        videoButton.setAttribute("data-bs-target", "#media-modal");
        videoButton.setAttribute("data-bs-toggle", "modal");
        videoButton.setAttribute("data-bs-dismiss", "modal");
        ytButton.setAttribute("type", "button");
        ytButton.setAttribute("data-bs-target", "#yt-modal");
        ytButton.setAttribute("data-bs-toggle", "modal");
        ytButton.setAttribute("data-bs-dismiss", "modal");
        mapButton.setAttribute("type", "button");
        mapButton.setAttribute("data-bs-target", "#map-modal");
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