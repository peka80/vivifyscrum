module.exports = {
  log(message, color) {
    color = color || "\x1b[0m";
    switch (color) {
      case "success":
        color = "\x1b[32m";
        break;
      case "info":
        color = "DodgerBlue";
        break;
      case "error":
        color = "\x1b[31m";
        break;
      case "warning":
        color = "\x1b[93m";
        break;
      default:
        color = color;
    }
    console.log(`${color}${message} \x1b[0m`);
  },
};
