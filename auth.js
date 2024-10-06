const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Person = require('./models/Person');

// Passport local strategy for authentication
passport.use(new LocalStrategy(async (username, password, done) => {
    try {
      // console.log('Received credentials:', username, password);
      
      // Find user by username
      const user = await Person.findOne({ username });
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      
      // Compare passwords (add hashing if needed)
      const isPasswordMatch = await user.comparePassword(password);
      if (isPasswordMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Incorrect password.' });
      }
    } catch (err) {
      return done(err);
    }
  }));

module.exports = passport; //export configured passport