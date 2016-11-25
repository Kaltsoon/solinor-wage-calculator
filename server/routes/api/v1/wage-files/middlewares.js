const fs = require('fs');

const wageFileParser = require('app-modules/helpers/wage-file-parser');

function parseFile(getFile) {
  return (req, res, next) => {
    const file = getFile(req);

    wageFileParser.parseFromReadStream(fs.createReadStream(file.path))
      .then(data => {
        fs.unlink(file.path, () => {
          console.log(data);

          req.wages = data;

          return next();
        });
      })
      .catch(next);
  }
}

module.exports = {
  parseFile
};
