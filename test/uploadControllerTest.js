const should = require('chai').should();
const UploadController = require('../server/controllers/UploadController');

const uploadController = new UploadController();

describe('UploadController', () => {
  describe('#checkParameters()', () => {

    it('environment is no DEVELOPMENT/PRODUCTION result.isValid should be false', async () => {

      const result = uploadController.checkParameters({});

      result.isValid.should.equal(false);
    })

    it('parameters check', async () => {
      const result = uploadController.checkParameters({
        environment : "PRODUCTION",
        version: '1.0',
        chnagelog: "test"
      });

      result.isValid.should.equal(false);
    })

  })
})
