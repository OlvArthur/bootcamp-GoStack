import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

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
      foreignKey: 'meetup_id',
      through: 'registration',
      as: 'meetup',
    });
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
