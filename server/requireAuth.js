

// Middleware function to require authentication
const requireAuth = (req, res, next) => {
  // Authenticate using Passport JWT strategy
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err || !user) {
      // Unauthorized if authentication fails
      return res.status(401).json({ message: 'Unauthorized' });
    }
    // Authentication successful, user is available in req.user
    req.user = user;
    next();
  })(req, res, next);
};

// Export requireAuth middleware for use in routes
module.exports = requireAuth;