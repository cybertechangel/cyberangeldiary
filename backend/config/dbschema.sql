-- Create the database
CREATE DATABASE IF NOT EXISTS cyberangeldiary
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

-- Use the database
USE cyberangeldiary;

-- Table admins
CREATE TABLE IF NOT EXISTS admins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table articles
CREATE TABLE IF NOT EXISTS articles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    imageUrl VARCHAR(500) NOT NULL,
    category ENUM('fashion', 'beauty') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add admin user (password = 'password' hashed with bcrypt)
INSERT IGNORE INTO admins (username, password) VALUES
('admin', '$2b$10$7QJH8K1jFz9eYz1Z6h8OeO5jFz9eYz1Z6h8OeO5jFz9eYz1Z6h8OeO');