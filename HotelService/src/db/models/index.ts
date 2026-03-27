import { Sequelize, DataTypes } from 'sequelize';
import { dbConfig } from '../../config/index';
import fs from 'fs';
import path from 'path';

declare const __dirname: string;
declare const __filename: string;

const basename = path.basename(__filename);

interface DbInterface {
  [key: string]: any;
  sequelize: Sequelize;
  Sequelize: typeof Sequelize;
}

const db: DbInterface = {} as DbInterface;

let sequelize: Sequelize;

sequelize = new Sequelize({
  dialect: 'mysql',
  host: dbConfig.DB_HOST,
  username: dbConfig.DB_USER,
  password: dbConfig.DB_PASSWORD,
  database: dbConfig.DB_NAME,
  logging: true,
});

// Load all model files
fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      (file.slice(-3) === '.ts' || file.slice(-3) === '.js') &&
      file.indexOf('.test.ts') === -1 &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

// Associate models if they have associate method
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
