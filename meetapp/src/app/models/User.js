import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';
import Registration from './Registration';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        // campos que o usuário pode disponibilizar ao se cadastrar, atualizar,etc
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        // VIRTUAL indica que o cmapo não vai exisitir na base de dados,
        //apenas no lado do codigo
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        manager: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
    this.belongsToMany(models.Meetup, {
      foreignKey: 'participant_id',
      through: 'registrations',
    });

    //this.hasMany(models.Meetup, { foreignKey: 'manager_id', as: 'manager' });
    //this.hasMany(models.Registration);
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
