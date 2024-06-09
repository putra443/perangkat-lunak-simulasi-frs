import { NextResponse } from 'next/server';
// import pool from '../../../db';
import {query} from "@/db"

  export async function GET (req, res){
    try {
      const result = await query(`SELECT DISTINCT ON ("namaMataKuliah","kelas") "namaMataKuliah",* FROM jadwal_mata_kuliah 
      join master_mata_kuliah on jadwal_mata_kuliah."kodeMataKuliah" = master_mata_kuliah."kodeMataKuliah" ORDER BY "namaMataKuliah"`);
      return NextResponse.json(result.rows)
    } catch (err) {
      console.error(err);
      return new NextResponse.json({error:'an error occured'})
  
    }
  };
