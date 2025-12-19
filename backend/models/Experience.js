import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Experience = sequelize.define('Experience', {
  company: {
    type: DataTypes.STRING,
    allowNull: false
  },
  position: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  startDate: {
    type: DataTypes.DATE
  },
  endDate: {
    type: DataTypes.DATE
  },
  current: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

export default Experience;
