// Author: fiVe
// Description: Parse Latitude and Longtitude Using OpenCage API

export class Geocode {
    constructor(QUERY) {
        // PASSED VALUE
        this.QUERY = QUERY;

        // GLOBAL VARIABLE
        this.latitude   = null;
        this.longtitude = null;

        // METHODS
        this.getCoordinates();
    }

    getQuery() {
        return this.QUERY;
    }

    getLatitude() {
        return this.latitude;
    }
    getLongtitude() {
        return this.longtitude;
    }
    setLatitude(latitude) {
        this.latitude = latitude;
    }
    setLongtitude(longitude) {
        this.longtitude = longitude;
    }

    getCoordinates() {
        var API_KEY = '55e81b28eee541ffac95c63f56699c5a';

        // reverse geocoding example (coordinates to address)
        // var latitude = '52.3877830';
        // var longitude = '9.7334394';
        // var query = latitude + ',' + longitude;

        // forward geocoding example (address to coordinate)
        // var query = 'University of the Philippines - Visayas';
        // note: query needs to be URI encoded (see below)

        var query = "University of the Philippines - Visayas";

        var API_URL = 'https://api.opencagedata.com/geocode/v1/json'

        var REQUEST_URL = API_URL
            + '?'
            + 'key=' + API_KEY
            + '&q=' + encodeURIComponent(query)
            + '&pretty=1'
            + '&no_annotations=1';

        // see full list of required and optional parameters:
        // https://opencagedata.com/api#forward

        var request = new XMLHttpRequest();
        request.open('GET', REQUEST_URL, true);

        request.onload = function() {
            // see full list of possible response codes:
            // https://opencagedata.com/api#codes

            if(request.status === 200) {
                // Success!
                var data = JSON.parse(request.responseText);
                localStorage.setItem('latitude', data.results[0].geometry.lat);
                localStorage.setItem('longtitude', data.results[0].geometry.lng);
            } 
            else if(request.status <= 500) {
                // We reached our target server, but it returned an error
                console.log("unable to geocode! Response code: " + request.status);
                var data = JSON.parse(request.responseText);
                console.log('error msg: ' + data.status.message);
            } 
            else {
                console.log("server error");
            }
        };

        this.setLatitude(localStorage.getItem('latitude'));
        this.setLongtitude(localStorage.getItem('longtitude'));

        request.onerror = function() {
            // There was a connection error of some sort
            console.log("unable to connect to server");
        };

        request.send();  // make the request
    }
}