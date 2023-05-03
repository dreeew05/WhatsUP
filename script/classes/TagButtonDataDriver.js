// Author: fiVe
// Description: Data driver for the creation of tags

export class TagButtonDataDriver {

    constructor() {
        // GLOBAL VARIABLES
        this.tagsArray = [];
        this.counter   = 0;
    }

    getCounter() {
        return this.counter;
    }

    incrementCounter() {
        this.counter++;
    }

    decrementCounter() {
        this.counter--;
    }

    getTagsArray() {
        return this.tagsArray;
    }

    appendToTagsArray(entry) {
        this.getTagsArray().push(entry);
    }

    removeFromTagsArray(entry) {
        let entryIndex = this.getTagsArray().indexOf(entry);
        this.getTagsArray().splice(entryIndex - 1, 1);
    }

}