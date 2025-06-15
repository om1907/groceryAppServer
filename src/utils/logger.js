import winston from "winston";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.simple()
  ),
  transports: [new winston.transports.Console()],
});

const info = (data) => {
  try {
    let currentTime = new Date();

    if (typeof data == "string") {
      console.info("string log => ", data, " at ", currentTime);
    }
    if (typeof data == "object") {
      data.logType = "info";
      data.dt = currentTime;
      console.info("Info log =>", JSON.stringify(data));
    }
  } catch (err) {
    console.log("Error in logging info function", JSON.stringify(err));
  }
};

const error = (data) => {
  try {
    let currentTime = new Date();
    if (typeof data == 'string') {
      console.error('string log =>', data, 'at', currentTime);
    }
    if (typeof data == 'object') {
      data.logType = 'error';
      data.dt = currentTime;
      console.error('Error log =>', JSON.stringify(data));
    }
  } catch (err) {
    console.error('Error in Logging error function', JSON.stringify(err));
  }
};

export { info, error, logger };