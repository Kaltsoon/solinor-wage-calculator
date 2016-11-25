const errors = require('app-modules/errors');

function apiErrorHandler() {
  return (err, req, res, next) => {
    if(process.env.NODE_ENV === 'development') {
      console.log(err);
    }

    let statusCode = 500;
    let properties = {};
    let message = err instanceof errors.ApiError
      ? err.message
      : 'Something went wrong';

    if(err instanceof errors.NotFoundError) {
      statusCode = 404;
    } else if(err instanceof errors.InvalidRequestError) {
      statusCode = 400;
    } else if(err instanceof errors.ForbiddenError) {
      statusCode = 403;
    }

    res.status(statusCode).json({ message, properties: err.properties || properties, status: statusCode });
  }
}

function notFoundErrorHandler() {
  return (req, res, next) => {
    next(new errors.NotFoundError('Couldn\'t find the path you were looking for'));
  }
}

module.exports = {
  apiErrorHandler,
  notFoundErrorHandler
};
