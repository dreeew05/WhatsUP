import { DataSerializer } from "./DataSerializer.js";
import { LinkToThumbnail } from "./LinkToThumbnail.js";
import { SweetAlertFactory } from "./SweetAlertFactory.js"
import { CreateElement } from "./CreateElement.js";
import { ThumbnailFactory } from "./ThumbnailFactory.js";

export class ModifyEntries {

    constructor(mode, postID) {
        // PASSED
        this.mode             = mode;
        this.postID           = postID;

        // GLOBAL
        this.sweetAlert       = new SweetAlertFactory();
        this.dataSerializer   = new DataSerializer();
        this.linkToThumbnail  = new LinkToThumbnail() 
        this.thumbnailFactory = new ThumbnailFactory();
    }

    getMode() {
        return this.mode;
    }

    getPostID() {
        return this.postID;
    }

    getGlobalID() {
        const idStringify = String(this.getPostID());
        
        switch(this.getMode()) {
            case 'post':
                return {
                    'ytThumbnailID' : 'yt-thumbnails',
                    'ytModalBodyID' : 'yt-modal-body',
                    'mediaThumbnailID' : 'media-thumbnails',
                    'mediaModalBodyID' : 'media-modal-body'
                };
            case 'thread':
                return {
                    'ytThumbnailID' : 'thread-'.concat(idStringify)
                                       .concat('yt-thumbnails'),
                    'ytModalBodyID' : 'thread-'.concat(idStringify)
                                       .concat('yt-modal-body'),
                    'mediaThumbnailID' : 'thread-'.concat(idStringify)
                                          .concat('media-thumbnails'),
                    'mediaModalBodyID' : 'thread-'.concat(idStringify)
                                          .concat('media-modal-body')
                };
            default:
                break;
        }
    }

    modifyEntries(tagsDiv, textField, button, type, dataDriver, limit) {

        button.onclick = async () => {

            if(textField.value == "") {
                // USER ENTERS EMPTY STRING
                this.sweetAlert.createAlertBox(
                    'Error!', 
                    'Please Enter Something on the Textfield',
                    'error',
                    'Okay'
                );
                return;
            }

            switch(type) {
                case "link":
                    if(dataDriver.getTagsArray().length == limit) {
                        // ALERT USER THAT IT CAN'T INPUT ANYMORE
                        this.sweetAlert.createAlertBox(
                            'Error!',
                            'Cannot Add More than Four Links',
                            'error',
                            'Okay'
                        );
                        return;
                    }
                    
                    const phpURL  = '../../php/VerifyYoutubeLink.php',
                          urlData = {
                            url : textField.value
                          };
                    
                    (async() => {
                        const result = await this.dataSerializer.postData(urlData, phpURL);
                        if(result['result'] == true) {
                            this.generateButtons(tagsDiv, dataDriver, type, textField);
                            // console.log(this.ytLinkToThumbnail(dataDriver.getTagsArray()));
                            console.log(
                                this.linkToThumbnail.ytLinkToThumbnail(
                                    dataDriver.getTagsArray()
                                )
                            );
    
                            // THUMBNAIL VIEWER
                            this.addRemoveThumbnail("link", dataDriver);
                        }
                        else {
                            this.sweetAlert.createAlertBox(
                                'Error!',
                                'Invalid Link',
                                'error',
                                'Okay'
                            );
                        }
                    })();
                    break;
                case "media":
                    if(dataDriver.getTagsArray().length == limit) {
                        // ALERT USER THAT IT CAN'T INPUT ANYMORE
                        this.sweetAlert.createAlertBox(
                            'Error!',
                            'Cannot Add More than Four Media',
                            'error',
                            'Okay'
                        );
                        return;
                    }
                    this.generateButtons(tagsDiv, dataDriver, type, textField)
                    this.addRemoveThumbnail(type, dataDriver);
                    console.log(dataDriver.getTagsArray());
                    break;
                default:
                    this.generateButtons(tagsDiv, dataDriver, type, textField);
                    break;
            }
        }
    } 

    addRemoveThumbnail(type, dataDriver) {

        let elementID  = null,
            parentID   = null,
            parentDiv  = null,
            divElement = null;

        switch(type) {
            case "link":
                elementID  = this.getGlobalID()['ytThumbnailID'];
                parentID   = this.getGlobalID()['ytModalBodyID'];
                parentDiv  = document.getElementById(parentID);
                divElement = document.querySelector(
                    '#'.concat(elementID)
                );
                if(divElement) {
                    divElement.remove();
                }
                this.createThumbnailViewer(
                    elementID, parentDiv,
                    this.linkToThumbnail.ytLinkToThumbnail(
                        dataDriver.getTagsArray()
                    )
                );
                break;
            case "media":
                elementID  = this.getGlobalID()['mediaThumbnailID'];
                parentID   = this.getGlobalID()['mediaModalBodyID'];
                parentDiv  = document.getElementById(parentID);
                divElement = document.querySelector(
                    '#'.concat(elementID)
                );
                if(divElement) {
                    divElement.remove();
                }
                this.createThumbnailViewer(
                    elementID, parentDiv,
                    dataDriver.getTagsArray()
                );
                break;
            default:
                break;
        }
    }

    createThumbnailViewer(elementID, parentDiv, thumbnailArray) {
        // CREATE ELEMENT
        let newDivElement = new CreateElement("div", elementID,
                            'thumbnail-div-holder').createElement();

        parentDiv.appendChild(newDivElement);
        // MEDIA MODAL
        this.thumbnailFactory.generateThumbnail(thumbnailArray, 
            newDivElement);

    }

    generateButtons(tagsDiv, dataDriver, type, entry) {
        // ADD COUNTER FOR ID REFERENCE
        dataDriver.incrementCounter();

        let classTag = null;

        if(type == "link" || type == "media") {
            classTag = "media-tag-buttons";
        }
        else {
            classTag = "tag-buttons";
        }

        let tagButtonID  = type + "-" + dataDriver.getCounter(),
            removeBtnID  = "remove-" + type + "-" + dataDriver.getCounter(),
            tagButtons   = new CreateElement("div", tagButtonID, classTag)
                        .createElement(),
            tagButton    = new CreateElement("div", null, "tag-button")
                        .createElement(),
            removeButton = new CreateElement("button", removeBtnID, "remove-tag")
                        .createElement(),
            removeIcon   = new CreateElement("i", null, "fa-sharp fa-solid fa-xmark")
                        .createElement();
        
        // SET ATTRIBUTE
        // tagButton.textContent = entry.value;
        switch(type) {
            case "media":
                let fileSplit = entry.value.split("\\"),
                    fileName  = fileSplit[fileSplit.length - 1];
                tagButton.textContent = fileName;
                break;
            default:
                tagButton.textContent = entry.value;
                break;
        }
        removeButton.setAttribute("type", "button");

        // APPEND CHILD
        tagsDiv.appendChild(tagButtons);
        tagButtons.appendChild(tagButton);
        tagButton.appendChild(removeButton);
        removeButton.appendChild(removeIcon);   

        // ADD ITEM TO ARRAY
        switch(type) {
            case "media":
                entry = URL.createObjectURL(entry.files[0]);
                break;
            default:
                entry = entry.value;
                break;
        }

        const blob = entry;

        // this.base64Converter.convertToBase64(blob);

        // console.log(blob);
        // this.base64Converter.convertToBase64(blob)
        
        dataDriver.appendToTagsArray(entry);

        // REMOVING ENTRY
        removeButton.onclick = () => {
            document.getElementById(tagButtonID).remove();
            dataDriver.decrementCounter();
            dataDriver.removeFromTagsArray(entry);

            this.addRemoveThumbnail(type, dataDriver);
            console.log(dataDriver.getTagsArray());
        }
    }
}