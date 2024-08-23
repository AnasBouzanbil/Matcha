import { Pool } from 'pg';

// Create a new Pool instance with your database configuration
const pool = new Pool({
    user: 'elhazin',
    password: '123321',
    host: 'localhost',
    port: 5432,
    database: 'db',
});

// Export an object with a query method
export default {
    query: (text: string, params: any) => pool.query(text, params),
};
