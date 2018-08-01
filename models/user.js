const Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql://root@localhost:3306/expressjm');

const User = sequelize.define('usuarios',{
  nome:{
    type: Sequelize.STRING
  },
  sobrenome:{
    type: Sequelize.STRING
  }
});

module.exports = User;
