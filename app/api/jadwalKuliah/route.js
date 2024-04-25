import { NextResponse } from 'next/server';
// import pool from '../../../db';
import {query} from "@/db"

  export async function GET (req, res){
    try {
      // const client = await pool.connect();
      const result = await query(`SELECT DISTINCT ON ("namaMataKuliah","kelas") "namaMataKuliah",* FROM jadwal_mata_kuliah 
      join master_mata_kuliah on jadwal_mata_kuliah."kodeMataKuliah" = master_mata_kuliah."kodeMataKuliah" ORDER BY "namaMataKuliah"`);
      // res.status(200).json(result);
      // return new Response(JSON.stringify(result.rows));
      // client.release()
      return NextResponse.json(result.rows)
    } catch (err) {
      console.error(err);
      // res.status(500).json({ error: 'An error occurred' });
      // return new Response(json({error: 'an error occured'}),{status:500});
      return new NextResponse.json({error:'an error occured'})
  
    }
  };
