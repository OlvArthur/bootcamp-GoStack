import User from '../models/User';

class UserController {
  async store(req, res) {
    // const user = await User.create(req.body);
    const name = req.body;

    console.log(name);

    return res.json();

    // return res.json(user);
    /*
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
    */
  }
}

export default new UserController();
