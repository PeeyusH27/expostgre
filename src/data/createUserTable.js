import pool from '../config/db.js';

const createUserTable = async () => {
    const queryText = `
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT NOW()
    )`;
    try {
        await pool.query(queryText);
        console.log("Users table created successfully");
    } catch (err) {
        console.error("Error creating users table:", err);
    }
}

export default createUserTable;