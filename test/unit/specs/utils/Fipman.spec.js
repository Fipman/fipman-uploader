import Fipman from '@/utils/Fipman';
import AmazonUploader from '@/utils/uploader/AmazonUploader';

describe('Fipman Object', () => {
    it('should set S3 uploader if options contain s3 type', () => {
        const fipman = new Fipman({ apiKey : "fake-api-key", blob : 'S3'});
        expect(fipman.uploader instanceof AmazonUploader).to.be.true;
    })
})