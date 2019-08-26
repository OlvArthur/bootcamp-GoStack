/* eslint-disable class-methods-use-this */
import User from '../models/User';

class UserController {
  async store(req, res) {
    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }
    const { id, name, email, provider } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
      provider,
    });
  }

  async update(req, res) {
    const user = await User.findOne({ where: { id: req.userId } });

    const { email } = req.body;

    user.email = email;

    const { id, name, email } = user;

    return res.json({
      user: {
        id,
        name,
        email,
      },
    });
  }
}

export default new UserController();
