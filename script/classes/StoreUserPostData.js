export class StoreUserPostData {
    
    getData() {
        var data = localStorage.getItem("post_data");
        return JSON.parse(data);
    }
    setData(data) {
        localStorage.setItem("post_data", data);
    }
    modifyData(tuple) {
        var jsonData = this.getData(),
            key      = tuple[0].toString(),
            value    = tuple[1];

        if(key in jsonData) {
            this.editData(jsonData, key, value);
        }
        else {
            this.addData(jsonData, key, value);
        }
    }
    addData(jsonData, key, value) {
        let data = {
            [key] : {
                "reaction" : value
            } 
        }
        // jsonData.push(data);
        jsonData = Object.assign(jsonData, data);
        this.setData(JSON.stringify(jsonData));
    }
    editData(jsonData, key, value) {
        jsonData[key]["reaction"] = value;
        this.setData(JSON.stringify(jsonData));
    }
}