//db 연동
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const User = require('./user');

const db = {};
const sequelize = new Sequelize(
  config.database, config
)