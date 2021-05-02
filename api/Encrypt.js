const crypto = require("crypto");

module.exports = class Encrypt {
  static encrypt(password) {
    return (
      crypto
        .createHmac("sha256", "RadioHash")
        .update(password)
        .digest("hex")
    );
  }
};
