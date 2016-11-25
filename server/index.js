const router = require('express').Router();

const routes = require('./routes');
const errorHandlers = require('app-modules/middlewares/error-handlers');

router.use(routes);

router.use(errorHandlers.notFoundErrorHandler());
router.use(errorHandlers.apiErrorHandler());

module.exports = router;
