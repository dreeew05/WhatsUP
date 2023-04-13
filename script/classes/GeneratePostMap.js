// Author: fiVe
// Description: Generates Map

export class GeneratePostMap {
    constructor() {
        if(!window._GeneratePostMap) {
            this.callbackName = '_GeneratePostMap.loadMap';
            window._GeneratePostMap = this;
            window._GeneratePostMap.loadMap = this.loadMap.bind(this);
        }
    }

    loadAPI() {
        const API_KEY = 'AIzaSyBFRtTDAI3dRawEUMBCVQBsXYWBlGZg61U';
        if(!this.promise) {
            this.promise = new Promise(resolve => {
                this.resolve = resolve;
                if(typeof window.google === 'undefined') {
                    const script = document.createElement('script');
                    script.src = `//maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=${this.callbackName}`;
                    script.async = true;
                    document.body.append(script);
                }
                else {
                    this.resolve();
                }
            });
        }
        return this.promise;
    }

    loadMap() {
        if(this.resolve) {
            this.resolve();
        }
    }

    getMapOptions(LATITUDE, LONGTITUDE) {
        const options = {
            zoom : 17, 
            center : {
                lat : LATITUDE, 
                lng : LONGTITUDE 
            }
        }
        return options;
    }

    createMarker(MAP, LATITUDE, LONGTITUDE) {
        new google.maps.Marker({
            position : {
                lat : LATITUDE,
                lng : LONGTITUDE
            },
            map : MAP
        });
    }

    createMap(POST_ID, LATITUDE, LONGTITUDE) {
        let map = new google.maps.Map(document.getElementById(POST_ID), this.getMapOptions(LATITUDE, LONGTITUDE));
        this.createMarker(map, LATITUDE, LONGTITUDE);
    }
}