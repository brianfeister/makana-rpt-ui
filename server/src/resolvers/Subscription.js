const { getUserIdOptional } = require('../utils');

const Subscription = {
  feedSubscription: {
    subscribe: (parent, args, ctx, info) => {
      const userId = getUserIdOptional(ctx);

      const query =
        userId === -1
          ? { isPublic: true }
          : { author: { id: userId } };
      return ctx.db.subscription.comment(
        {
          where: {
            node: query
          }
        },
        info
      );
    }
  }
};

module.exports = { Subscription };
