import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './config/db.js';

import userRoutes from './routes/userRoutes.js';
import errorHandlingFunction from './middlewares/errorHandler.js';
import createUserTable from './data/createUserTable.js';

dotenv.config();

const app = express()
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', userRoutes);

// Error handling middleware
app.use(errorHandlingFunction);

// Create users table if it doesn't exist
createUserTable()

//Testing database connection
app.get('/', async (req, res) => {
  const result = await pool.query('SELECT current_database()')
  res.send(`The Database Name Is : ${result.rows[0].current_database}`);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});