import { Router } from 'express';
import User from './app/models/User';

const routes = new Router();

routes.get('/', async (req, res) => {
  const user = await User.create({
    name: 'Arthur Oliveira',
    email: 'olvarthur@gmail.com',
    password_hash: '97938479847',
  });
  return res.json(user);
});

export default routes;
