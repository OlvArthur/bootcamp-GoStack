import { startOfDay, endOfDay, parseISO } from 'date-fns';
import { Op } from 'sequelize';

import Meetup from '../models/Meetup';
import User from '../models/User';

class ScheduleController {
  async index(req, res) {
    const checkManager = await User.findOne({
      where: { id: req.userId, manager: true },
    });

    if (!checkManager) {
      return res.status(401).json({ error: 'You must be a manager' });
    }
    const { pages = 1 } = req.query;

    const { date } = req.query;
    const parsedDate = parseISO(date);

    const schedule = await Meetup.findAll({
      where: {
        manager_id: req.userId,
        date: {
          [Op.between]: [startOfDay(parsedDate), endOfDay(parsedDate)],
        },
      },
      order: ['date'],
      limit: 20,
      offset: (pages - 1) * 20,
    });

    return res.json(schedule);
  }
}

export default new ScheduleController();
