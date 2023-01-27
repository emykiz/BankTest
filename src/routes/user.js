
const router = require("express").Router();
const app = express();
import {AccountService} from '../controllers/accountTransfer'
import {userService} from '../controllers/user'

// User routes
app.post('/signup', async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await userService.create(username, password);
      res.status(201).json(user);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  
  app.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await userService.login(username, password);
      res.status(200).json(user);
    } catch (err) {
      res.status(401).json({ error: err.message });
    }
  });

module.exports = app;
