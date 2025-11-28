import bcrypt from 'bcryptjs';

const password = '@AthenaAdmin1!';

const hashPassword = async () => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log('--- COPY THIS HASH ---');
    console.log(hashedPassword);
    console.log('------------------------');
  } catch (err) {
    console.error('Error hashing:', err);
  }
};

hashPassword();
