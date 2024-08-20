const { Pool } = require('pg');


const pool = new Pool({
    user: 'elhazin',
    password: '123321',
    host: 'localhost',
    port: 5432,
    database: 'db'
  }); 

  module.exports = {
    query : (text : string , params : any) => pool.query(text,params)
} ;