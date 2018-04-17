import EventEmitter from 'events';
import File from './File';

class UploaderBase {
    constructor(options) {        
        this.apiKey = options.apiKey;
        this.allowMultipleUpload = options.allowMultipleUpload;
        this.maxFileSize = (options.maxFileSize || 0) * 1024; //convert kb to byte
        this.init();
    }

    init() {
        this.uploadQueue = [];
    }

    addFile(files) {
        this.uploadQueue = files.filter(file => {
            return this.maxFileSize === 0 ? true : this.maxFileSize >= file.size
        }).map((file, i) => new File(file, i));
    }

    uploadFiles() {
        return new Promise((resolve, reject) => {
            let response = [];
            this.uploadQueue.forEach(file => {
                file.upload(res => {

                     if (res.status === 'finished') {
                        
                        if (res.data && res.data.url) {
                            response.push(res.data);
                        }

                        if (this.uploadQueue.every(file => file.fileStatus > 0)) {
                            resolve(response);
                        }
                    }
                })
            })
        })
    }

    cancelUpload(){
        this.uploadQueue.forEach(file => file.cancel());
    }
}

export default UploaderBase;