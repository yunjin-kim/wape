const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize){
    return super.init({
      number: {
        type: Sequelize.STRING(11),
        allowNull: true,
        unique: true,
      },
      password: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      birth: {
        type: Sequelize.STRING(8),
        allowNull: false,
      },
      provider: {
        type: Sequelize.STRING(10),
        allowNull: false,
        defaultValue: 'local',
      },
      gender: {
        type: Sequelize.TEXT(''),
        allowNull: false,
      }
    },{
      sequelize,
        timestamps: true,
        underscored: false,
        modelName: 'User',
        tableName: 'Users',
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
    });
  }

  static associate(db){
    
  }
}

