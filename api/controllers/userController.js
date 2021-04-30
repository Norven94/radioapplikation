const sqlite3 = require("sqlite3");
const Encrypt = require("../Encrypt");
const path = require("path");

const utils = require("../core/utilities");

const db = new sqlite3.Database(path.join(__dirname, "../../radioDB.db"));

const whoami = (req, res) => {
  res.json(req.session.user || null);
};

const login = (req, res) => {

  let query = `SELECT * FROM users WHERE email = $email`;
  let params = { $email: req.body.email };

  db.get(query, params, (err, userInDB) => {
    if (!userInDB) {
      res.status(401).json({ error: "Bad credentials" });
      return;
    }

    req.body.password = Encrypt.encrypt(req.body.password);
    if (userInDB.password === req.body.password) {
      delete userInDB.password;
      req.session.user = userInDB;
      console.log(req.session.user)
      res.status(200).json({ success: "Login successfull", loggedInUser: userInDB });
      return;
    } else {
      res.status(401).json({ error: "Bad credentials" });
      return;
    }
  });
};

const logout = (req, res) => {
  delete req.session.user;
  res.json({ success: "Logout Successfully" });
};

const register = (req, res) => {
  let userToRegister = req.body;
  let noError = true

  let query = `SELECT * FROM users WHERE email = $email`;
  let params = { $email: userToRegister.email };
  db.get(query, params, (err, userExist) => {
    if (userExist) {
      noError = false;
      res.status(400).json({ error: "User with that email already exists" });
      return;
    }
    let validPassword = utils.checkPassword(userToRegister.password)
    let validEmail = utils.checkEmail(userToRegister.email)
    if (!validPassword) {
      res.status(400).json({ error: "Password must contain atleast 8 characters with atleast one number and letter. It also needs a special character" });
    }
    else if (!validEmail) {
      res.status(400).json({ error: "Email is not valid! example@example.com" });
    }
    else {
      userToRegister.password = Encrypt.encrypt(userToRegister.password);
      query = `INSERT INTO users (userName, email, password, county) VALUES ($userName, $email, $password, $county)`;
      params = {
        $userName: userToRegister.username,
        $email: userToRegister.email,
        $password: userToRegister.password,
        $county: userToRegister.county
      };

      db.run(query, params, function (err) {
        if (err) {
          res.status(400).json({ error: err });
          return;
        }
        res.json({ success: "User register successfull", lastID: this.lastID });
      });
    }
  });
};

module.exports = { whoami, login, logout, register };