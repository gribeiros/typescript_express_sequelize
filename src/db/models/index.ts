import { Sequelize, Options } from 'sequelize';
let config: Options

if (process.env.NODE_ENV == 'development') {
  config=require('../../db/config.js').development
} else {
  config=require('../../db/config.js').test
}

class Database {
  public connection!: Sequelize;

  constructor() {
    this.init();
  }

  init(): void {
    this.connection = new Sequelize(config);
  }
}


export default new Database();