import User from './models/User.js';
import sequelize from './config/database.js';

async function updateAdminEmail() {
  try {
    await sequelize.sync();
    
    // Get current admin user
    const currentUser = await User.findOne({ where: { email: 'admin@example.com' } });
    
    if (!currentUser) {
      console.log('❌ Admin user with email admin@example.com not found');
      process.exit(1);
    }
    
    // Prompt for new email (you can change this directly in the script)
    const newEmail = 'nirdosh@example.com'; // Change this to your desired email
    
    // Update the email
    await User.update(
      { email: newEmail },
      { where: { email: 'admin@example.com' } }
    );
    
    console.log('✅ Admin email updated successfully!');
    console.log(`Old email: admin@example.com`);
    console.log(`New email: ${newEmail}`);
    console.log(`Password remains: admin123`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

updateAdminEmail();