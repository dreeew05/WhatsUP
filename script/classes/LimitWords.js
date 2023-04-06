// Author: fiVe
// Description: Limit word count

export class LimitWords {

    constructor(PARAGRAPH, WORD_COUNT) {
        this.PARAGRAPH  = PARAGRAPH;
        this.WORD_COUNT = WORD_COUNT;
    }

    getParagraph() {
        return this.PARAGRAPH;
    }
    getWordCount() {
        return this.WORD_COUNT;
    }
    setParagraph(PARAGRAPH) {
        this.PARAGRAPH = PARAGRAPH;
    }

    getLimitWords() {
        var words = this.getParagraph().split(' ');
        
        if(words.length > this.getWordCount()) {
            words = words.slice(0, this.getWordCount());
            this.setParagraph(words.join(' ') + "...");
        }

        return this.getParagraph();
    }

}