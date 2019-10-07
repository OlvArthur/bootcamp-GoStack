import Sequelize, { Model } from 'sequelize';

class Registration extends Model {
  static init(sequelize) {
    super.init({
    })
  }

  static associate(models) {
    this.belongsToMany()
  }
}

export default Registration;
