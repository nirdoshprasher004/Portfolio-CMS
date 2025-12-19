import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const About = sequelize.define('About', {
  bio: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING
  },
  image: {
    type: DataTypes.STRING
  }
});

export default About;
