import { NextResponse } from 'next/server';
import pool from '../../../../db';


export async function GET (req, res){
    try {
      const client = await pool.connect();
      const result = await client.query(`SELECT *,to_char(tanggal_uts,'DD-MM-YYYY')as formatteduts,to_char(tanggal_uas,'DD-MM-YYYY')as formatteduas FROM jadwal_ujian_mahasiswa
      join jadwal_ujian on jadwal_ujian_mahasiswa."idJadwalUjian" = jadwal_ujian."idUjian" ORDER BY "namaMataKuliah"`);
      // res.status(200).json(result);
      // return new Response(JSON.stringify(result.rows));
      return NextResponse.json(result.rows)
    } catch (err) {
      console.error(err);
      // res.status(500).json({ error: 'An error occurred' });
      // return new Response(json({error: 'an error occured'}),{status:500});
      return NextResponse.json({error: 'an error occured'})
  
    }
  };