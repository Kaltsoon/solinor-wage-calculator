const router = require('express').Router();
const cors = require('cors');

router.use('/', require('./pages'));
router.use('/api', cors());
router.use('/api', require('./api'));

module.exports = router;
