// Author: fiVe
// Description: Creates unique links for each thread button

export class PostThreadDataDriver {
    constructor(HAS_THREADS_ARRAY) {
        this.hasThreadsArray = HAS_THREADS_ARRAY;

        this.showThreadButton();
    }

    getHasThreadsArray() {
        return this.hasThreadsArray;
    }

    showThreadButton() {
        // HTML PHASE [NOT] FINAL
        const BASE_PATH = "http://127.0.0.1:5500/showPostThread.html",
              object    = this.getHasThreadsArray();

        let buttons = document.querySelectorAll(".show-thread-button");
        for(let i = 0; i < buttons.length; i++) {
            buttons[i].onclick = function() {

                let type   = object[i].type,
                    id     = object[i].id,
                    query  = "?type=" + type + "&id=" + id;

                window.location.href = BASE_PATH  + query;
            }
        }
    }
}