import userService from '../service/userService.js';

class UserController {
  async registration(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userService.registration(email, password);
      res.cookie('refreshtoken', userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async login(req, res, next) {
    try {
      return res.json();
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async logout(req, res, next) {
    try {
      return res.json();
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async refresh(req, res, next) {
    try {
      return res.json(deletedTodo);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async users(req, res, next) {
    try {
      return res.json([123, 3213123, 2222]);
    } catch (e) {
      console.log(e);
      res.status(500).json(e.message);
    }
  }
}

export default new UserController();
