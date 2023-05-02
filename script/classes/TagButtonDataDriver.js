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

    removeFromTagsArray(index) {
        this.getTagsArray().splice(index, 1);
    }

}