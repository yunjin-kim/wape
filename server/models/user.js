const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model{
  static init(sequelize){
    return super.init({
      number: {
        type: Sequelize.STRING(11),
        allowNull: true,
        unique: true
      },
      nick: {
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      birth: {
        type: Sequelize.STRING(6),
        allowNull: false,
      },
      gender: {
        type: Sequelize.BOOLEAN(true),
        allowNull: false,
      },
      provider: {
        type: Sequelize.STRING(10),
        allowNull: false,
        defaultValue: 'local',
      }
    },{
      sequelize,
      timestamps: false,
      modelName: 'User',
      tableName: 'users',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci'
      }
    )
  }
}