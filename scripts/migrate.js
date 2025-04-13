
/**
 * Database Migration Script
 * This script will initialize the database with the necessary tables and seed data
 */

import fs from 'fs';
import path from 'path';
import mysql from 'mysql2/promise';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

// Get current file's directory (ES modules don't have __dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Database connection configuration
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'smartfarm',
  multipleStatements: true
};

async function runMigration() {
  console.log('Starting database migration...');
  let connection;

  try {
    // Create database connection
    connection = await mysql.createConnection({
      host: dbConfig.host,
      port: dbConfig.port,
      user: dbConfig.user,
      password: dbConfig.password,
      multipleStatements: true
    });
    
    // Check if database exists, create if not
    console.log(`Checking if database '${dbConfig.database}' exists...`);
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${dbConfig.database}`);
    console.log(`Database '${dbConfig.database}' is ready.`);
    
    // Use the database
    await connection.query(`USE ${dbConfig.database}`);
    
    // Read schema SQL file
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');
    
    // Execute schema SQL to create tables and seed data
    console.log('Creating tables and seeding initial data...');
    await connection.query(schemaSql);
    
    console.log('Database migration completed successfully!');
  } catch (error) {
    console.error('Error during database migration:', error);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Run the migration
runMigration().catch(console.error);
