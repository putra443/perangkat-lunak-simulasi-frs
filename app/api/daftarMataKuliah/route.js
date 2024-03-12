import pool from '../../../db';

  export async function GET (req, res){
    try {
      const client = await pool.connect();
      const result = await client.query('select distinct on ("namaMataKuliah","kelas") "namaMataKuliah",* from jadwal_mata_kuliah');
      // res.status(200).json(result);
      return new Response(JSON.stringify(result.rows));
    } catch (err) {
      console.error(err);
      // res.status(500).json({ error: 'An error occurred' });
      return new Response(json({error: 'an error occured'}),{status:500});
  
    }
  };