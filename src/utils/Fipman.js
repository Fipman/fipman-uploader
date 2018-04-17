import AmazonUploader from "./uploader/AmazonUploader";

class Fipman {
    constructor(options){
        this.apiKey = options.apiKey;
        this.blobType = options.blob.toLowerCase();
        this.uploader =  this.blobType === "s3" ? new AmazonUploader(options) : null;
    }
}

export default Fipman;