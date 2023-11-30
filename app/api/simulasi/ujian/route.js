import pool from '../../../../db';


export async function GET (req, res){
    try {
      const client = await pool.connect();
      const result = await client.query(`SELECT *,to_char(tanggal_uts,'DD-MM-YYYY')as formatteduts,to_char(tanggal_uas,'DD-MM-YYYY')as formatteduas FROM jadwal_ujian ORDER BY "idUjian"`);
      // res.status(200).json(result);
      return new Response(JSON.stringify(result.rows));
    } catch (err) {
      console.error(err);
      // res.status(500).json({ error: 'An error occurred' });
      return new Response(json({error: 'an error occured'}),{status:500});
  
    }
  };