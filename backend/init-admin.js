import bcrypt from 'bcryptjs';
import User from './models/User.js';
import sequelize from './config/database.js';

async function initAdmin() {
  try {
    await sequelize.sync();
    
    const existingUser = await User.findOne({ where: { email: 'admin@example.com' } });
    
    if (!existingUser) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await User.create({
        email: 'admin@example.com',
        password: hashedPassword,
        name: 'Nirdosh Prasher'
      });
      console.log('✅ Admin user created successfully!');
      console.log('Email: admin@example.com');
      console.log('Password: admin123');
    } else {
      console.log('✅ Admin user already exists');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

initAdmin();
