
//packages
const rateLimit = require("express-rate-limit");

//rates in general for now
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 15 minutes (milisecond so 1 min  = 1*60*1000)
    max: 20, // limit each IP to max per windowMs
    message:
      "too many requests pls try again in a minuite"
  });
//exports
module.exports ={ globallimiter : limiter}