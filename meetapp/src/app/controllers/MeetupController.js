import Meetup from '../models/Meetup';
import User from '../models/User';
import File from '../models/File';

class MeetupController {
  async store(req, res) {
    const checkManager = await User.findOne({
      where: {
        manager: true,
        id: req.userId,
      },
    });

    if (!checkManager) {
      return res.json({ error: 'Only managers can create meetups' });
    }

    /*const { originalname: name, filename: path } = req.file;

    const file = await File.create({
      name,
      path,
    });
*/
    const { title, description, locale, date } = req.body;

    const meetup = await Meetup.create({
      title,
      description,
      locale,
      date,
      manager_id: req.userId,
      //banner_id: file.id,
    });

    return res.json(meetup);
  }
}

export default new MeetupController();
