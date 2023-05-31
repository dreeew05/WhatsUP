// Author: fiVe
// Description: Parse Latitude and Longtitude Using OpenCage API

import { CreateElement } from "./CreateElement.js";

export class Geocode {
    constructor(mode, postID) {
        this.mode       = mode;
        this.postID     = postID;
        // GLOBAL VARIABLE
        this.latitude   = null;
        this.longtitude = null;

    }

    getMode() {
        return this.mode;
    }

    getPostID() {
        return this.postID;
    }

    getGlobalID() {
        const idStringify = String(this.getPostID());
        return {
            'threadBodyID' : 'thread-'.concat(idStringify)
                             .concat('-modal-body'),
            'threadLatID'  : 'thread-'.concat(idStringify)
                             .concat('-latitude-text-field-hidden'),
            'threadLngID'  : 'thread-'.concat(idStringify)
                             .concat('-longtitude-text-field-hidden'),
            'mapModeID'    : 'display-map-thread-'.concat(idStringify),
            'mapSearchID'  : 'thread-'.concat(idStringify)
                             .concat('-display-map-search'),
            'mapResultID'  : 'thread-'.concat(idStringify)
                             .concat('-map-result')
        };
    }

    displayMap(QUERY, mapAPI, elementID) {
        let API_KEY = '55e81b28eee541ffac95c63f56699c5a';

        // reverse geocoding example (coordinates to address)
        // let latitude = '52.3877830';
        // let longitude = '9.7334394';
        // let query = latitude + ',' + longitude;

        // forward geocoding example (address to coordinate)
        // let query = 'University of the Philippines - Visayas';
        // note: query needs to be URI encoded (see below)

        let API_URL = 'https://api.opencagedata.com/geocode/v1/json'

        let REQUEST_URL = API_URL
            + '?'
            + 'key=' + API_KEY
            + '&q=' + encodeURIComponent(QUERY)
            + '&pretty=1'
            + '&no_annotations=1';

        // see full list of required and optional parameters:
        // https://opencagedata.com/api#forward

        let request = new XMLHttpRequest();
        request.open('GET', REQUEST_URL, true);

        request.onload = () => {
            // see full list of possible response codes:
            // https://opencagedata.com/api#codes

            if(request.status === 200) {
                // Success!
                let data      = JSON.parse(request.responseText),
                    latitude  = data.results[0].geometry.lat,
                    longitude = data.results[0].geometry.lng;
                
                // MAP MODAL
                mapAPI.loadAPI().then(() => {
                    mapAPI.createMap(elementID, latitude, longitude);
                });

                // const threadBodyID = this.getGlobalID()['threadBodyID'],
                //       threadLatID  = this.getGlobalID()['threadLatID'],
                //       threadLngID  = this.getGlobalID()['threadLngID'];

                let modalBodyID = null,
                    mapModeID   = null,
                    mapSearchID = null,
                    latID       = null,
                    lngID       = null,
                    mapResultID = null;

                switch(this.getMode()) {
                    case 'post':
                        modalBodyID   = 'post-modal-body';
                        mapModeID     = 'display-map-post';
                        mapSearchID   = 'display-map-search'; 
                        latID         = 'latitude-text-field-hidden';
                        lngID         = 'longtitude-text-field-hidden';
                        mapResultID   = 'map-result';
                        break;
                    case 'thread':
                        modalBodyID   = this.getGlobalID()['threadBodyID'];
                        mapModeID     = this.getGlobalID()['mapModeID'];
                        mapSearchID   = this.getGlobalID()['mapSearchID']; 
                        latID         = this.getGlobalID()['threadLatID'];
                        lngID         = this.getGlobalID()['threadLngID'];
                        mapResultID   = this.getGlobalID()['mapResultID'];
                        break;
                    default:
                        break;
                } 

                const modalBody  = document.getElementById(modalBodyID),
                      divElement = document.querySelector('#'.concat(mapModeID));

                if(!divElement) {
                    // CREATE ELEMENTS
                    let displayMapInModal = new CreateElement("div", mapModeID,
                                                'map-modal-display').createElement(),
                        mapHeader             = new CreateElement("div", "map-header", null)
                                                .createElement(),
                        mapHeaderText         = new CreateElement("div", "map-header-text", null)
                                                .createElement(),
                        mapHeaderClose        = new CreateElement("div", "map-header-close", null)
                                                .createElement(),
                        closeMap              = new CreateElement("button", "remove-map", null)
                                                .createElement(),
                        closeMapIcon          = new CreateElement("i", null, "fa-solid fa-xmark")
                                                .createElement(),
                        mapResult             = new CreateElement("div", mapResultID, 'map-result')
                                                .createElement();
                    
                    // SET ATTRIBUTE
                    mapHeaderText.textContent = "Map";
                    closeMap.setAttribute("type", "button");

                    // APPEND CHILD
                    modalBody.appendChild(displayMapInModal);
                    displayMapInModal.appendChild(mapHeader);
                    mapHeader.appendChild(mapHeaderText);
                    mapHeader.appendChild(mapHeaderClose);
                    mapHeaderClose.appendChild(closeMap);
                    closeMap.appendChild(closeMapIcon);
                    displayMapInModal.appendChild(mapResult);

                    // ACTION WHEN CLOSE BUTTON IS CLICKED
                    closeMap.onclick = () => {

                        const mapPost     = document.getElementById(mapModeID),
                              mapSearch   = document.getElementById(mapModeID),
                              latTxtField = document.getElementById(latID),
                              lngTxtField = document.getElementById(lngID);
                        
                        // REMOVE MAP AND CLEAR COORDINATES
                        mapPost.remove();
                        mapSearch.remove();
                        latTxtField.value = "";
                        lngTxtField.value = "";
                    }
                }

                mapAPI.loadAPI().then(() => {
                    mapAPI.createMap(mapResultID, latitude, longitude);
                });

                // PUT LATITUDE AND LONGTITUDE TO HIDDEN TEXT FIELDS
                const latTextField = document.getElementById(latID),
                      lngTextField = document.getElementById(lngID);
                
                latTextField.value = latitude;
                lngTextField.value = longitude;
            } 
            else if(request.status <= 500) {
                // We reached our target server, but it returned an error
                console.log("Unable to Geocode! Response Code: " + request.status);
                let data = JSON.parse(request.responseText);
                console.log('Error Message: ' + data.status.message);
            } 
            else {
                console.log("Server Error");
            }
        };

        request.onerror = function() {
            // There was a connection error of some sort
            console.log("Unable to Connect to Server");
        };

        request.send();  // make the request
    }
}