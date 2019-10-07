import Meetup from '../models/Meetup';
import Registration from '../models/Registration';

class RegistrationController {
  async store(req, res) {
    const { id } = req.params;

    const meetup = await Meetup.findOne({
      where: { id },
    });

    if (meetup.manager_id == req.userId) {
      return res
        .status(400)
        .json({ error: 'You cant subscribe to your own meetup' });
    }

    const registration = await Registration.findOrCreate({
      where: { meetup_id: id },
      defaults: {
        meetup_id: id,
        participant_id: req.userId,
        manager_id: meetup.manager_id,
      },
    });

    registration.participant_id = [req.userId];

    return res.json(registration);
  }
}

export default new RegistrationController();
