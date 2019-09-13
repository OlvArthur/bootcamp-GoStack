import Sequelize from 'sequelize';

import User from '../app/models/User';
<<<<<<< HEAD

import databaseConfig from '../config/database';

const models = [User];
=======
import File from '../app/models/File';
import Appointment from '../app/models/Appointment';

import databaseConfig from '../config/database';

const models = [User, File, Appointment];
>>>>>>> cdf85f522ceee73a96c386ac098c57d7429d1f90

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

<<<<<<< HEAD
    models.map(model => model.init(this.connection));
=======
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
>>>>>>> cdf85f522ceee73a96c386ac098c57d7429d1f90
  }
}

export default new Database();
