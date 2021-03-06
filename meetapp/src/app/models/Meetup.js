import Sequelize, { Model } from 'sequelize';
import { isBefore } from 'date-fns';

class Meetup extends Model {
  static init(sequelize) {
    super.init(
      {
        description: Sequelize.STRING,
        title: Sequelize.STRING,
        locale: Sequelize.STRING,
        date: Sequelize.DATE,
        past: {
          type: Sequelize.VIRTUAL,
          get() {
            return isBefore(this.date, new Date());
          },
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'banner_id', as: 'banner' });
    this.belongsToMany(models.User, {
      foreignKey: 'participant_id',
      as: 'participant',
      through: 'registrations',
    });

    this.belongsTo(models.User, { foreignKey: 'manager_id', as: 'manager' });
    //this.hasMany(models.Registration, { foreignKey: 'meetup_id' });
  }
}

export default Meetup;
