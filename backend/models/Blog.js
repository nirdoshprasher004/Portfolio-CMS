import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Blog = sequelize.define('Blog', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT
  },
  excerpt: {
    type: DataTypes.TEXT
  },
  image: {
    type: DataTypes.STRING
  },
  slug: {
    type: DataTypes.STRING,
    unique: true
  },
  published: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

export default Blog;
