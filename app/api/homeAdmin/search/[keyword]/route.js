// import pool from '@/db';
import {query} from '@/db'
import { NextResponse } from 'next/server';

export async function GET (req, {params}){
    try {
        const result = await query(`SELECT * FROM jadwal_mata_kuliah join master_mata_kuliah on jadwal_mata_kuliah."kodeMataKuliah" = master_mata_kuliah."kodeMataKuliah" WHERE "namaMataKuliah" ILIKE '%${params.keyword}%' ORDER BY "idJadwalMataKuliah"`);
        return NextResponse.json(result.rows)
    } catch (err) {
        console.error(err);
        return NextResponse.json({error: 'an error occured'})

  
    }
  };
  
