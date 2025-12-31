const mobileBlockerMiddleware = (req, res, next) => {
  // Get the user agent string
  const userAgent = req.headers['user-agent'];
  
  // Regular expression to detect mobile devices
  const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  
  // Check if it's a mobile device
  if (mobileRegex.test(userAgent)) {
    return res.status(403).json({
      error: 'Mobile access denied',
      message: 'This application is only available on desktop devices.'
    });
  }
  
  // If not mobile, continue to next middleware
  next();
};

module.exports = mobileBlockerMiddleware;
