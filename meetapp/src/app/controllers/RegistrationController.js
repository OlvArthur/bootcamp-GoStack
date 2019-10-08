import Meetup from '../models/Meetup';
import Registration from '../models/Registration';
import User from '../models/User';

import { isBefore, startOfHour, parseISO } from 'date-fns';

class RegistrationController {
  async store(req, res) {
    const { id } = req.params;

    const meetup = await Meetup.findByPk(id, {
      include: [
        {
          model: User,
        },
      ],
    });

    if (meetup.manager_id == req.userId) {
      return res
        .status(400)
        .json({ error: 'You cant subscribe to your own meetup' });
    }

    if (isBefore(meetup.date, new Date())) {
      return res.status(400).json({ error: 'Past dates are not allowed' });
    }

    const doubleSubscription = await Registration.findOne({
      where: {
        participant_id: req.userId,
        meetup_id: id,
      },
    });
    if (doubleSubscription) {
      return res.status(401).json({ error: 'You have already subscribed' });
    }

    const sameDate = await Registration.findAll({
      where: { participant_id: req.userId },
      include: [
        {
          model: Meetup,
          as: 'meetup',
          attributes: ['date'],
        },
      ],
    });

    console.log(sameDate.Meetup);

    const registration = await Registration.create({
      participant_id: req.userId,
      meetup_id: meetup.id,
    });

    return res.json(sameDate);
  }
}

export default new RegistrationController();
