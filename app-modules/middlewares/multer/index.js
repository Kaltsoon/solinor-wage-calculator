const multer = require('multer');
const objectId = require('bson-objectid');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, '/tmp');
  },
  filename(req, file, cb) {
    cb(null, objectId().toHexString());
  }
});

const limits = {
  files: 10,
  fileSize: 100000
}

function makeMulter(options = {}) {
  return multer({
    storage: options.storage || storage,
    limits: options.limits || limits
  });
}

module.exports = makeMulter;
