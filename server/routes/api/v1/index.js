const router = require('express').Router();

router.use('/wage-files', require('./wage-files'));

module.exports = router;
