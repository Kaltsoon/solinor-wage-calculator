const router = require('express').Router();

const upload = require('app-modules/middlewares/multer')();
const middlewares = require('./middlewares');

router.post('/',
  upload.single('wageFile'),
  middlewares.parseFile(req => req.file),
  (req, res, next) => {
    res.json(req.wages);
  });

module.exports = router;
