import Meetup from '../models/Meetup';
import User from '../models/User';
import File from '../models/File';
import Registration from '../models/Registration';

import { isBefore, startOfHour, parseISO } from 'date-fns';

class MeetupController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const meetups = await Registration.findAll({
      where: { user_id: req.userId },
      order: ['date'],
      attributes: ['id', 'title', 'description', 'locale', 'date'],
      limit: 20, //number of listed appointments
      offset: (page - 1) * 20,
      include: [
        {
          model: File,
          as: 'banner',
          attributes: ['url', 'path', 'id'],
        },
      ],
    });

    return res.json(meetups);
  }

  async store(req, res) {
    const checkManager = await User.findOne({
      where: {
        manager: true,
        id: req.userId,
      },
    });

    if (!checkManager) {
      return res
        .status(400)
        .json({ error: 'Only managers can create meetups' });
    }

    /*const { originalname: name, filename: path } = req.file;

    const file = await File.create({
      name,
      path,
    });
*/
    const { title, description, locale, date, banner_id } = req.body;

    const hourStart = startOfHour(parseISO(date));

    if (isBefore(hourStart, new Date())) {
      return res.status(400).json({ error: 'Past dates are not allowed' });
    }

    const meetup = await Meetup.create({
      title,
      description,
      locale,
      date,
      manager_id: req.userId,
      banner_id,
    });

    return res.json(meetup);
  }

  async update(req, res) {
    const { id } = req.params;

    const meetup = await Meetup.findOne({
      where: {
        id,
      },
    });

    if (!meetup) {
      return res.status(404).json({ error: "Meetup doesn't exist" });
    }

    if (meetup.manager_id !== req.userId) {
      return res
        .status(400)
        .json({ error: 'You can only update meetups you manage' });
    }

    const { title, date, description, locale, banner_id } = await meetup.update(
      req.body
    );

    const hourStart = startOfHour(parseISO(date));

    if (isBefore(meetup.date, new Date()) || isBefore(hourStart, new Date())) {
      return res.status(400).json({ error: 'Past Dates are not allowed' });
    }

    return res.json({
      title,
      date,
      description,
      locale,
      banner_id,
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    const meetup = await Meetup.findOne({
      where: { id },
      //attributes: ['id', 'title', 'description', 'date'],
      include: [
        {
          model: File,
          as: 'banner',
          attributes: ['id', 'name', 'path'],
        },
      ],
    });

    if (!meetup) {
      return res.status(404).json({ error: "Meetup doesn't exist" });
    }
    console.log(meetup.manager_id, req.userId);
    if (meetup.manager_id !== req.userId) {
      return res
        .status(400)
        .json({ error: 'You can only cancel meetups you manage' });
    }

    if (isBefore(meetup.date, new Date())) {
      return res.status(400).json({ error: 'This meetup already happened' });
    }

    await meetup.destroy();

    return res.json(meetup);
  }
}

export default new MeetupController();
