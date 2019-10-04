import Sequelize, { Model } from 'sequelize';

class Meetup extends Model {
  static init(sequelize) {
    super.init(
      {
        description: Sequelize.STRING,
        title: Sequelize.STRING,
        locale: Sequelize.STRING,
        date: Sequelize.DATE,
        //manager_id: Sequelize.INTEGER,
        //banner_id: Sequelize.INTEGER,
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
  }
}

export default Meetup;
