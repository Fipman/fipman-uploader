
class File {
    constructor(file, index) {
        this.index = index || 0;
        
        this.fileName = file.name;
        this.fileDomObject = file;
        this.uploadUrl = "";
        this.formDataValues = [];
        this.size = file.size;
        this.uploadedSize = 0;
        this.progress = 0;
        this.fileStatus = 0;

        this.xhr = new XMLHttpRequest();
        this.xhr.upload.addEventListener("progress", this.onProgress.bind(this));
        this.xhr.addEventListener("error", this.onError.bind(this));
        this.xhr.addEventListener("readystatechange", this.onReadyStateChange.bind(this));
    }

    //Events
    onProgress(evt) {
        if (evt.lengthComputable) {
            this.progress = (event.loaded / event.total) * 100;
            this.uploadedSize = this.fileDomObject.size * (event.loaded / event.total);
            this.callback({ status : "uploading"});
        }
    }

    onReadyStateChange() {
        if (this.xhr.readyState == 4) {
            if(this.fileStatus !== 3)
                this.fileStatus = 1;
            const responseDoc = this.xhr.responseXML;
            if (responseDoc) {
                const location = responseDoc.getElementsByTagName("Location")[0].childNodes[0].nodeValue;
                const fileName = responseDoc.getElementsByTagName("Key")[0].childNodes[0].nodeValue;
                this.callback({
                    status: 'finished',
                    data: {
                        fileName: fileName,
                        url: location
                    }
                })
            }
        }
    }

    onError(){
        this.fileStatus = 2;
        this.callback({
            status : "error",
            message : "** An error occurred during the transaction"
        })
    }

    //Methods
    appendKey(key, value) {
        this.formDataValues.push({ key : key, value : value});
    }

    upload(callback) {
        if(this.fileStatus === 3) return;
        
        this.callback = callback;        
        this.xhr.open('POST', this.uploadUrl, true);
        var formData = new FormData();
        this.formDataValues.forEach(valueKey => {
            formData.append(valueKey.key, valueKey.value);
        });
        formData.append('file', this.fileDomObject);
        this.xhr.send(formData);
    }

    cancel(){
        this.fileStatus = 3;      
        
        if(this.xhr)
            this.xhr.abort();

        if(this.callback){
            this.callback({
                status: 'finished',
                data: {}
            })
        }
    }
}

export default File;