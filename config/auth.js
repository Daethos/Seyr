const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

module.exports = function(req, res, next) {
  let token = req.get('Authorization') || req.query.token || req.body.token;
  if (token) {
    token = token.replace('Bearer ', '');
    jwt.verify(token, SECRET, function(err, decoded) {
      if (err) {
        req.user = null;
        return next();
      } else {
        req.user = decoded.user 
        return next();
      };
    });
  } else {
    req.user = null;
    next();
  };
};
