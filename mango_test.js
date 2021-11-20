const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('pharmacy', 'postgres', 'qwerty', {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
});

sequelize.authenticate().then(() => {
  console.log('Nice');
});
