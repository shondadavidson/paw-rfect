const bcrypt = require("bcryptjs");

module.exports = {
  register: async (req, res) => {
    const { email, password, name } = req.body;
    const { session } = req;
    const db = req.app.get("db");
    let takenEmail = await db.check_email({ email });
    takenEmail = +takenEmail[0].count;
    if (takenEmail !== 0) {
      return res.sendStatus(409);
    }
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);
    let user = await db.register({ email, password: hash, name });
    user = user[0];
    session.user = user;
    res.status(200).send(session.user);
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    const { session } = req;
    const db = req.app.get("db");
    let user = await db.login({ email: email });
    user = user[0];
    if (!user) {
      return res.sendStatus(404);
    }
    let authenticated = bcrypt.compareSync(password, user.password);
    console.log(authenticated)
    if (authenticated) {
      delete user.password;
      session.user = user;
      session.save()
      res.status(200).send(session.user);
    } else {
      res.sendStatus(401);
    }
  },
  logout: (req, res) => {
    req.session.destroy(function() {
      res.sendStatus(200);
    });
  },
  getUser: (req, res) => {
    const {user } = req.session;
    if (user) {
      res.status(200).send(user);
    } else {
      res.sendStatus(401);
    }
  }
};