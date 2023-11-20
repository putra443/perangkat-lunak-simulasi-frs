import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'perangkat lunak simulasi frs',
  password: 'fransiskus31',
  port: 5432,
});

export default pool;