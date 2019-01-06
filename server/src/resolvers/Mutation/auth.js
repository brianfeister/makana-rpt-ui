const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// @TODO - add client side validation, but server side was quicker
// and not having any kind of email validation was bugging me
const validateEmail = email => {
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(email).toLowerCase());
}

const auth = {
  async signup(parent, args, ctx, info) {
    const password = await bcrypt.hash(args.password, 10);
    const user = await ctx.db.mutation.createUser({
      data: { ...args, password }
    });

    if (!args.email) {
      throw new Error(`Email address is required`);
    }
    if (!validateEmail(args.email)){
      throw new Error(`Not a valid email address`);
    }
    if (!args.password) {
      throw new Error(`Password cannot be empty`)
    }
    if (args.password.length < 8) {
      throw new Error(`Password must be at least 8 characters`)
    }

    return {
      token: jwt.sign(
        { userId: user.id, name: user.name },
        process.env.APP_SECRET
      ),
      user
    };
  },

  async login(parent, { email, password }, ctx, info) {
    const user = await ctx.db.query.user({ where: { email } });
    if (!user) {
      throw new Error(`No such user found for email: ${email}`);
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error('Invalid password');
    }

    return {
      token: jwt.sign(
        { userId: user.id, name: user.name },
        process.env.APP_SECRET
      ),
      user
    };
  }
};

module.exports = { auth };
