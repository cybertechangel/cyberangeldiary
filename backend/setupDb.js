import db from './config/db.js';
import bcrypt from 'bcryptjs';

const init = async () => {
    console.log("Attempting to connect to the database...");

    try {
        await db.query(`
            CREATE TABLE IF NOT EXISTS articles (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                content TEXT NOT NULL,
                imageUrl VARCHAR(255) NOT NULL,
                category ENUM('fashion', 'beauty') NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log("Table 'articles' ensured.");

        await db.query(`
            CREATE TABLE IF NOT EXISTS admins (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(100) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL
            )
        `);
        console.log("Table 'admins' ensured.");

        const [existingAdmins] = await db.query("SELECT * FROM admins WHERE username = 'admin'");

        if (existingAdmins.length === 0) {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash('@AthenaAdmin1!', salt);
            await db.query(`INSERT INTO admins (username, password) VALUES ('admin', ?)`, [hash]);
            console.log("Admin user 'admin' created!");
        } else {
            console.log("ℹAdmin user 'admin' already exists.");
        }

        console.log("Database initialized successfully!");
        process.exit(0);

    } catch (e) {
        console.error("ERROR:", e);
        process.exit(1);
    }
};

init();
