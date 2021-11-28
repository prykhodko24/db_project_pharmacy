import { Sequelize } from 'sequelize';
import userModel from './models/userModel';
import { itemModel } from './models/productModel';

const sequelize = new Sequelize('pharmacy', 'postgres', 'qwerty', {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
});

userModel(sequelize);
itemModel(sequelize);

export default sequelize;
