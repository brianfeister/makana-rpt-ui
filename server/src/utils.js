const jwt = require('jsonwebtoken');

function getAuthorization(ctx) {
  if (ctx.request) return ctx.request.get('Authorization');
  if (ctx.connection) return ctx.connection.context['Authorization'];
}

function getUserId(ctx, optional = false) {
  const Authorization = getAuthorization(ctx);
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    return userId;
  }

  if (!optional) {
    throw new AuthError();
  }

  return -1;
}

function getUserIdOptional(ctx) {
  return getUserId(ctx, true);
}

class AuthError extends Error {
  constructor() {
    super('Not authorized');
  }
}

module.exports = {
  getUserId,
  getUserIdOptional,
  AuthError
};
