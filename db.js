import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: `perangkat lunak simulasi frs`,
  password: 'fransiskus31',
  port: 5432,
});


export async function query(text,params){
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return result;
  } finally {
    client.release(); // Release the client back to the pool
  }
}
// export default pool;