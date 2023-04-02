// Author: w3Resource
// Description: Converts Integer to its English Word [For Bootstrap Purposes]

export class IntegerToEnglishWord {
    convertInteger(num){
        const singleDigit = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"],
              tens        = ["Ten", "Eleven", "Twelve", "Thirteen", "Fouteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"],
              twentyUp    = ["Twenty", "Thirthy", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];

        let englishWord = null,
            remainder   = 0;

        if(num < 10) {
            englishWord = singleDigit[num];
        }
        else if (9 < num && num < 20) {
            num = num % 10;
            englishWord = tens[num];
        }
        else {
            remainder   = singleDigit[num % 10];
            englishWord = twentyUp[(num - num % 10) / 10 - 2] + remainder;
        }
        return englishWord;
    } 
}