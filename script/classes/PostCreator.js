// Author: fiVe
// Description: Create Posts [Admin Priveleges]

import { Base64Converter } from "./Base64Converter.js";
import { TagLinkDataDriver } from "./TagLinkDataDriver.js";
import { CreateElement } from "./CreateElement.js";
import { ModifyEntries } from "./ModifyEntries.js";
import { BaseModalDisplay } from "./BaseModalDisplay.js";
import { DataSerializer } from "./DataSerializer.js";

export class PostCreator {
    
    constructor(postHolder, profileID, mapAPI) {
        // PASSED
        this.postHolder = postHolder;
        this.profileID  = profileID;
        this.mapAPI     = mapAPI;

        // GLOBAL
        this.mode              = 'post';
        this.tagsDataDriver    = new TagLinkDataDriver();
        this.ytLinksDataDriver = new TagLinkDataDriver();
        this.mediaDriver       = new TagLinkDataDriver();
        this.base64Converter   = new Base64Converter();
        this.entryModifier     = new ModifyEntries(this.mode);
        this.dataSerializer    = new DataSerializer();

        // METHODS
        this.displayPostButton()
        this.displayPostModal();

        // NEXT-STATE GLOBAL
        this.baseModalDisplay  = new BaseModalDisplay(
            this.mode, 
            this.mediaDriver, 
            this.ytLinksDataDriver,
            this.entryModifier,
            this.mapAPI
        );

        // NEXT-STATE METHODS
        this.addDisplayModals();

    }

    getPostHolder() {
        return this.postHolder;
    }

    getProfileID() {
        return this.profileID;
    }

    getDataArray() {
        return this.baseModalDisplay.getDataArray();
    }

    getOpenedButton() {
        return this.baseModalDisplay.getOpenedButton();
    }

    displayPostButton() {        
        let postButton = new CreateElement("button", "create-post-button", null).createElement();

        // SET ATTRIBUTE
        postButton.setAttribute("type", "button");
        postButton.setAttribute("data-bs-toggle", "modal");
        postButton.setAttribute("data-bs-target", "#post-modal");
        postButton.textContent = "Create Post";

        // APPEND CHILD
        this.getPostHolder().appendChild(postButton);

    }

    displayPostModal() {

        let postModal       = new CreateElement("div", "post-modal", "modal fade")
                              .createElement(),
            modalDialog     = new CreateElement("div", null, "modal-dialog modal-dialog-centered modal-lg")
                              .createElement(),
            modalContent    = new CreateElement("div", "modal-content-create-post", "modal-content")
                              .createElement(),
            modalHeader     = new CreateElement("div", null, "modal-header")
                              .createElement(),
            modalTitle      = new CreateElement("h3", "post-modal-label", "modal-title")
                              .createElement(),
            closeButton     = new CreateElement("button", null, "btn-close")
                              .createElement(),
            modalBody       = new CreateElement("div", "post-modal-body", "modal-body")
                              .createElement(),
            postTextArea    = new CreateElement("textarea", null, "text-area")
                              .createElement(),
            tagsDiv         = new CreateElement("div", "tags-div", null)
                              .createElement(),
            tagsText        = new CreateElement("div", "tag-text", null)
                              .createElement(),
            addTag          = new CreateElement("div", "add-tag", null)
                              .createElement(),
            addTagTextField = new CreateElement("input", "tag-text-field", "text-fields")
                              .createElement(),
            addTagButton    = new CreateElement("button", "add-tag-button", null)
                              .createElement(),
            plusSign        = new CreateElement("i", null, "fa-sharp fa-solid fa-plus")
                              .createElement(),
            mediaControl    = new CreateElement("div", null, "media-control")
                              .createElement(),
            mediaControlTxt = new CreateElement("div", null, "media-control-text") 
                              .createElement(),
            mediaControlBtn = new CreateElement("div", null, "media-control-buttons")
                              .createElement(),
            imageButton     = new CreateElement("button", "image-button", "media-button")
                              .createElement(),
            imageIcon       = new CreateElement("i", null, "fa-solid fa-image")
                              .createElement(),
            videoButton     = new CreateElement("button", "video-button", "media-button")
                              .createElement(),
            videoIcon       = new CreateElement("i", null, "fa-solid fa-video")
                              .createElement(), 
            ytButton        = new CreateElement("button", "yt-button", "media-button")
                              .createElement(),
            ytIcon          = new CreateElement("i", null, "fa-brands fa-youtube")
                              .createElement(),
            mapButton       = new CreateElement("button", null, "media-button")
                              .createElement(),
            mapIcon         = new CreateElement("i", null, "fa-sharp fa-solid fa-location-dot")
                              .createElement(),
            mapCoordsHolder = new CreateElement("div", null, "map-coordinates-holder-hidden")
                              .createElement(),
            latFieldHidden  = new CreateElement("input", "latitude-text-field-hidden", 
                              "text-fields").createElement(),
            lngFieldHidden  = new CreateElement("input", "longtitude-text-field-hidden",
                              "text-fields").createElement(),
            modalFooter     = new CreateElement("div", null, "modal-footer")
                              .createElement(),
            postButton      = new CreateElement("button", null, "save-button")
                              .createElement();
                
        // SET ATTRIBUTES
        postModal.setAttribute("tabindex", "-1");
        postModal.setAttribute("aria-labelledby", "post-modal-label");
        postModal.setAttribute("aria-hidden", "true");
        modalDialog.setAttribute("role", "document");
        modalTitle.textContent = "Create Post";
        closeButton.setAttribute("data-bs-dismiss", "modal");
        closeButton.setAttribute("aria-label", "Close");
        tagsText.textContent = "Tags";
        addTagTextField.setAttribute("type", "text");
        addTagButton.setAttribute("type", "submit");
        mediaControlTxt.textContent = "Add To Post";
        postButton.textContent = "Post";
        postButton.setAttribute("type", "submit");
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
        this.getPostHolder().appendChild(postModal);
        postModal.appendChild(modalDialog);
        modalDialog.appendChild(modalContent);
        modalContent.appendChild(modalHeader);
        modalHeader.appendChild(modalTitle);
        modalHeader.appendChild(closeButton);
        modalContent.appendChild(modalBody);
        modalBody.appendChild(postTextArea);
        modalBody.appendChild(tagsDiv);
        tagsDiv.appendChild(tagsText);
        tagsDiv.appendChild(addTag);
        addTag.appendChild(addTagTextField);
        addTag.appendChild(addTagButton);
        addTagButton.appendChild(plusSign);
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
        modalFooter.appendChild(postButton);

        // MODIFY TAGS 
        this.entryModifier.modifyEntries(
            tagsDiv, addTagTextField, addTagButton, "tag",
            this.tagsDataDriver, null
        ); 

        // ACTION WHEN POST BUTTON IS CLICKED
        postButton.onclick = async() => {
            // console.log(latFieldHidden.value);
            // console.log(lngFieldHidden.value);

            const phpURL  = "/php/AddPostThread.php",
                  contents = {
                        'action' : 'post',
                        'profileID' : this.getProfileID(),
                        'postContent' : postTextArea.value,
                        'tags' : this.tagsDataDriver.getTagsArray(),
                        'coordinates' : {
                            'latitude' : latFieldHidden.value,
                            'longtitude' : lngFieldHidden.value
                        },
                        'media' : null
                  }; 

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

            const response = await this.dataSerializer.postData(
                contents, phpURL
            );

            console.log(response);

            const BASE_LINK = 'http://whatsup.gg/profilePage.html?id=';

            switch(response['success']) {
                case 'true':
                    window.location.href = BASE_LINK.concat(
                        this.getProfileID().concat(
                            '&mode=post&succes=true'
                        )
                    )
                    break;
                case 'false':
                    window.location.href = BASE_LINK.concat(
                        this.getProfileID().concat(
                            '&mode=post&succes=false'
                        )
                    )
                    break;
                default:
                    break;
            }

        }

    }

    addDisplayModals() {
        this.baseModalDisplay.displayMapModal(
            this.getPostHolder()
        );
        this.baseModalDisplay.displayMediaModal(
            this.getPostHolder(),
            this.mediaDriver
        );
        this.baseModalDisplay.displayYoutubeModal(
            this.getPostHolder(),
            this.ytLinksDataDriver
        );
    }

}