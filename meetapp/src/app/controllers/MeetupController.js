import Meetup from '../models/Meetup';
import User from '../models/User';
import File from '../models/File';

import { isBefore, startOfHour, parseISO } from 'date-fns';

class MeetupController {
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

    console.log(title);
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

    return res.json();
  }
}

export default new MeetupController();
