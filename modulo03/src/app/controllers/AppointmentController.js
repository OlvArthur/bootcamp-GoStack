import { startOfHour, parseISO, isBefore } from 'date-fns';
import * as Yup from 'yup';

import Appointment from '../models/Appointment';
import User from '../models/User';
import File from '../models/File';

class AppointmentController {
  async index(req, res) {
    const appointmets = await Appointment.findAll({
      where: { user_id: req.userId, canceled_at: null },
      order: ['date'],
      attributes: ['id', 'date'],
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['id', 'name'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['url', 'path', 'id'],
            },
          ],
        },
      ],
    });

    return res.json(appointmets);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      provider_id: Yup.number().required(),
      date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { provider_id, date } = req.body;

    /**
     * Check if provider_id corresponds to a provider
     */
    const isProvider = await User.findOne({
      where: { id: provider_id, provider: true },
    });

    if (!isProvider) {
      return res
        .status(401)
        .json({ error: 'you can only create appointments with providers ' });
    }

    /**
     * always set the date to the start of the hour. e.g: 19:23 => 19:00
     */
    const hourStart = startOfHour(parseISO(date));

    /**
     * check if the date isn't past, meaning before the current date
     */
    if (isBefore(hourStart, new Date())) {
      return res.status(400).json({ error: 'Past dates are not allowed' });
    }

    /**
     * check Date availability
     */
    const availability = await Appointment.findOne({
      where: {
        provider_id,
        date: hourStart,
        canceled_at: null,
      },
    });

    if (availability) {
      return res
        .status(400)
        .json({ error: 'Appointment date is not available' });
    }

    const appointment = await Appointment.create({
      user_id: req.userId,
      provider_id,
      date,
    });

    return res.json(appointment);
  }
}

export default new AppointmentController();
