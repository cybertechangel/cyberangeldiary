// hashAdmin.js
import bcrypt from 'bcryptjs';

// Vous décidez du mot de passe ici
const password = '@AthenaAdmin1!'; 

const hashPassword = async () => {
  try {
    // 👇 CETTE LIGNE MANQUAIT 👇
    const salt = await bcrypt.genSalt(10); 

    // Maintenant, 'salt' existe et peut être utilisé ici
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Il affiche juste le résultat
    console.log('--- COPIEZ CE HASH ---');
    console.log(hashedPassword);
    console.log('-------------------------');

  } catch (err) {
    console.error("Erreur lors du hashage:", err);
  }
};

hashPassword();
