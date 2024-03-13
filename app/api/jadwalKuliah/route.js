import { NextResponse } from 'next/server';
import pool from '../../../db';

  export async function GET (req, res){
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT DISTINCT ON ("namaMataKuliah") "namaMataKuliah","idJadwalMataKuliah" FROM jadwal_mata_kuliah ORDER BY "namaMataKuliah"');
      // res.status(200).json(result);
      // return new Response(JSON.stringify(result.rows));
      return NextResponse.json(result.rows)
    } catch (err) {
      console.error(err);
      // res.status(500).json({ error: 'An error occurred' });
      // return new Response(json({error: 'an error occured'}),{status:500});
      return new NextResponse.json({error:'an error occured'})
  
    }
  };