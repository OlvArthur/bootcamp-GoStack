import Notification from '../schemas/Notification';
import User from '../models/User';

class NotificationController {
  async index(req, res) {
    const isProvider = await User.findOne({
      where: { id: req.userId, provider: true },
    });

    if (!isProvider) {
      return res.status(401).json({ error: 'You must login as a provider' });
    }

    /**
     * No caso do mongo para achar varios objetos, usa-se o find(), não findAll()
     */
    const notifcations = await Notification.find({
      user: req.userId,
    })
      .sort({ createdAt: 'desc' })
      .limit(20);

    return res.json(notifcations);
  }
}

export default new NotificationController();
