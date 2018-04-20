import UploaderBase from './UploaderBase';
import axios from 'axios';
const config = require('../../config');

class AmazonUploader extends UploaderBase {
    constructor(options) {
        super(options);
    }

    getClientCridentials() {
        const apiKey = this.apiKey;
        const fileNames = this.uploadQueue.map(x => x.fileName);
        return axios.get(`${config.api_url}/clients/${apiKey}/s3?fileNames=${fileNames}`)
            .then(x => x.data);
    }

    setFormData(file, cridential) {
        file.appendKey('key', cridential.params.key);
        file.appendKey('acl', cridential.params.acl);
        file.appendKey('success_action_status', cridential.params.success_action_status);
        file.appendKey('policy', cridential.params.policy);
        file.appendKey('x-amz-algorithm', cridential.params["x-amz-algorithm"]);
        file.appendKey('x-amz-credential', cridential.params["x-amz-credential"]);
        file.appendKey('x-amz-date', cridential.params["x-amz-date"]);
        file.appendKey('x-amz-signature', cridential.params["x-amz-signature"]);
    }

    start() {
        return new Promise((resolve, reject) => {
            if(this.uploadQueue.length === 0)
                return reject('no file for upload');
            this.getClientCridentials().then(results => {
                if (results.errorMessage) {
                    reject(results.errorMessage);
                    return;
                }

                this.uploadQueue.forEach(file => {
                    const cridential = results.find(cridential => cridential.params.key === file.fileName);
                    file.uploadUrl = cridential.uploadUrl;
                    this.setFormData(file, cridential);
                });

                this.uploadFiles().then(x=> resolve(x));
            });
        })
    }
}

export default AmazonUploader;