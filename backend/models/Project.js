import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Project = sequelize.define('Project', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  image: {
    type: DataTypes.STRING
  },
  link: {
    type: DataTypes.STRING
  },
  github: {
    type: DataTypes.STRING
  },
  technologies: {
    type: DataTypes.STRING
  }
});

export default Project;
