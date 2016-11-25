const fs = require('fs');

const wageFileParser = require('app-modules/helpers/wage-file-parser');
const errors = require('app-modules/errors');

function parseFile(getFile) {
  return (req, res, next) => {
    const file = getFile(req);

    if(!file || !file.path) {
      return next(new errors.InvalidRequestError('File is required'));
    }

    wageFileParser.parseFromReadStream(fs.createReadStream(file.path))
      .then(data => {
        fs.unlink(file.path, () => {
          req.wages = data;

          return next();
        });
      })
      .catch(() => {
        return next(new errors.InvalidRequestError('File is invalid'));
      });
  }
}

module.exports = {
  parseFile
};
