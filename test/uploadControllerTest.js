const should = require('chai').should();
const UploadController = require('../controllers/uploadController.js');

const uploadController = new UploadController();

describe('UploadController', () => {
  describe('#checkParameters()', () => {

    it('environment is no DEVELOPMENT/PRODUCTION result.isValid should be false', async () => {

      const result = uploadController.checkParameters({});

      result.isValid.should.equal(false);
    })

    it('PRODUCTION environment parameters check', async () => {
      const result = uploadController.checkParameters({
        environment : "PRODUCTION"
      });

      result.isValid.should.equal(false);
    })

    it('DEVELOPMENT environment parameters check', async () => {
      const result = uploadController.checkParameters ({
        environment : "DEVELOPMENT",
        frameworkName : "test",
        commitHash : "kajdlfj2olkj",
        featureName : "test"
      });

      result.isValid.should.equal(true);
    })

    it ('check file path', () => {
      const path = uploadController.getFileAbsolutePathWithParameters({
        environment : "DEVELOPMENT",
        frameworkName : "frameworkName",
        commitHash : "kajdlfj2olkj",
        featureName : "featureName"
      });

      console.log("path:" + path);
      
    })

  })
})
