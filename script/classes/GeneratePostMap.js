// Author: fiVe
// Description: Generates Map

export class GeneratePostMap {
    constructor(POST_ID, LATITUDE, LONGTITUDE) {
        // PASSED VARIABLES
        this.POST_ID    = POST_ID;
        this.LATITUDE   = LATITUDE;
        this.LONGTITUDE = LONGTITUDE;

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


    getPostID() {
        return this.POST_ID;
    }

    getLatitude() {
        return this.LATITUDE;
    }

    getLongtitude() {
        return this.LONGTITUDE;
    }

    getMapOptions() {
        const options = {
            zoom : 17, 
            center : {
                lat : this.getLatitude(), 
                lng : this.getLongtitude() 
            }
        }
        return options;
    }

    createMarker(MAP) {
        new google.maps.Marker({
            position : {
                lat : this.getLatitude(),
                lng : this.getLongtitude()
            },
            map : MAP
        });
    }

    createMap() {
        let map = new google.maps.Map(document.getElementById(this.getPostID()), this.getMapOptions());
        this.createMarker(map);
    }
}