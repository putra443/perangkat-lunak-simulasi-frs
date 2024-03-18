import pool from '@/db';
import { NextResponse } from 'next/server';

  export async function GET (req, res){
    try {
      const client = await pool.connect();
      const result = await client.query('select distinct on ("namaMataKuliah","kelas") "namaMataKuliah",* from jadwal_mata_kuliah');
      // res.status(200).json(result);
      client.release()
      return new Response(JSON.stringify(result.rows));
    } catch (err) {
      console.error(err);
      // res.status(500).json({ error: 'An error occurred' });
      return new Response(json({error: 'an error occured'}),{status:500});
  
    }
  };

  export async function POST (req, {params}){
    try {
      const request = await req.json()
      const client = await pool.connect();
      const result = await client.query(`insert into jadwal_mahasiswa("idJadwalMataKuliah","idMahasiswa") values (${request.idJadwalMataKuliah},${params.user[0]});`);
      // res.status(200).json(result);
      client.release()
      return new NextResponse(result);
      // return new NextResponse(JSON.stringify(params))
    } catch (err) {
      console.error(err);
      // res.status(500).json({ error: 'An error occurred' });
      return new Response(json({error: 'an error occured'}),{status:500});
  
    }
  };