import Meetup from '../models/Meetup';
import Registration from '../models/Registration';
import User from '../models/User';

import Mail from '../../lib/Mail';

import { isBefore, startOfHour, parseISO } from 'date-fns';

class RegistrationController {
  async store(req, res) {
    const user = await User.findByPk(req.userId);
    const meetup = await Meetup.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'manager',
          attributes: ['id', 'name', 'email'],
        },
      ],
    });

    if (meetup.manager.id == req.userId) {
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
        meetup_id: req.params.id,
      },
    });
    if (doubleSubscription) {
      return res.status(401).json({ error: 'You have already subscribed' });
    }

    const checkDate = await Registration.findOne({
      where: { participant_id: req.userId },
      include: [
        {
          model: Meetup,
          as: 'meetup',
          required: true,
          where: {
            date: meetup.date,
          },
        },
      ],
    });

    if (checkDate) {
      return res.status(404).json({
        error: 'You are subscribed to a diferent meetup at the same time',
      });
    }

    const registration = await Registration.create({
      participant_id: req.userId,
      meetup_id: meetup.id,
    });

    await Mail.sendMail({
      to: `${meetup.manager.name} <${meetup.manager.email}>`,
      subject: `Inscrição em ${meetup.title}`,
      text: `O usuário ${user.name} se inscreveu no meetup ${meetup.title} `,
    });

    return res.json(registration);
  }
}

export default new RegistrationController();
