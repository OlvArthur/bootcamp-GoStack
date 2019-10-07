import Sequelize, { Model } from 'sequelize';

class Meetup extends Model {
  static init(sequelize) {
    super.init(
      {
        description: Sequelize.STRING,
        title: Sequelize.STRING,
        locale: Sequelize.STRING,
        date: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'banner_id', as: 'banner' });
    this.belongsTo(models.User, { foreignKey: 'manager_id', as: 'manager' });
    this.belongsToMany(models.User, {
      foreignKey: 'participant_id',
      through: 'registration',
      as: 'participant',
    });
  }
}

export default Meetup;
