// Author: fiVe
// Description: Parse Latitude and Longtitude Using OpenCage API

import { CreateElement } from "./CreateElement.js";

export class Geocode {
    constructor(mode) {
        this.mode       = mode;
        // GLOBAL VARIABLE
        this.latitude   = null;
        this.longtitude = null;

    }

    getMode() {
        return this.mode;
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

                let modalBodyID = null,
                    mapModeID   = null,
                    mapSearchID = null,
                    latID       = null,
                    lngID       = null;

                switch(this.getMode()) {
                    case 'post':
                        modalBodyID   = 'post-modal-body';
                        mapModeID     = 'display-map-post';
                        mapSearchID   = 'display-map-search'; 
                        latID         = 'latitude-text-field-hidden';
                        lngID         = 'longtitude-text-field-hidden';
                        break;
                    case 'thread':
                        modalBodyID   = 'thread-modal-body';
                        mapModeID     = 'display-map-thread';
                        mapSearchID   = 'thread-display-map-search'; 
                        latID         = 'thread-latitude-text-field-hidden';
                        lngID         = 'thread-longtitude-text-field-hidden';
                        break;
                    default:
                        break;
                } 

                const modalBody  = document.getElementById(modalBodyID),
                      divElement = document.querySelector('#'.concat(mapModeID));

                if(!divElement) {
                    // CREATE ELEMENTS
                    let displayMapInModal = new CreateElement("div", mapModeID,
                                                null).createElement(),
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
                        mapResult             = new CreateElement("div", "map-result", null)
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
                    mapAPI.createMap("map-result", latitude, longitude);
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