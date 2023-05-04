// Author: fiVe
// Description: Parse Latitude and Longtitude Using OpenCage API

import { CreateElement } from "./CreateElement.js";

export class Geocode {
    constructor() {
        // GLOBAL VARIABLE
        this.latitude   = null;
        this.longtitude = null;

    }

    // getQuery() {
    //     return this.QUERY;
    // }

    // getLatitude() {
    //     return this.latitude;
    // }
    // getLongtitude() {
    //     return this.longtitude;
    // }
    // setLatitude(latitude) {
    //     this.latitude = latitude;
    // }
    // setLongtitude(longitude) {
    //     this.longtitude = longitude;
    // }

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

        request.onload = function() {
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

                // CREATE POST MODAL
                const modalBody      = document.getElementById("post-modal-body"),
                      elementPostID  = "display-map-post",
                      divElement     = document.querySelector('#'.concat(elementPostID));
                if(!divElement) {
                    console.log(modalBody);
                    let displayMapInPostModal = new CreateElement("div", elementPostID,
                                                null).createElement();
                    modalBody.appendChild(displayMapInPostModal);
                }

                mapAPI.loadAPI().then(() => {
                    mapAPI.createMap(elementPostID, latitude, longitude);
                });
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

        // this.setLatitude(sessionStorage.getItem('latitude'));
        // this.setLongtitude(sessionStorage.getItem('longtitude'));

        request.onerror = function() {
            // There was a connection error of some sort
            console.log("Unable to Connect to Server");
        };

        request.send();  // make the request
    }
}