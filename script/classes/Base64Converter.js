export class Base64Converter {

    async convertToBase64(blob) {
        try {
            const response     = await fetch(blob),
                  blobData     = await response.blob(),
                  base64String = await new Promise(
                        (resolve, reject) => {
                            const reader = new FileReader();
                            reader.onload = function(event) {
                                resolve(event.target.result);
                            };
                            reader.onerror = function(error) {
                                reject(error);
                            };
                            reader.readAsDataURL(blobData);
                        }
                  ); 
                  return base64String;
        }
        catch(error) {
            console.log('Error Fetching Blob', error);
            throw error;
        }
    } 

    async blobReader(blobArray) {
        for(let i = 0; i < blobArray.length; i++) {
            blobArray[i] = await this.convertToBase64(
                blobArray[i]
            );
        }
        return blobArray;
    }

}