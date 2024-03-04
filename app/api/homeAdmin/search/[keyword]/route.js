import pool from '@/db';
import { NextResponse } from 'next/server';

export async function GET (req, {params}){
    try {
        // const request = await req.json()
        const client = await pool.connect();
        const result = await client.query(`SELECT * FROM jadwal_mata_kuliah WHERE "namaMataKuliah" ILIKE '%${params.keyword}%' ORDER BY "idJadwalMataKuliah"`);
        //res.status(200).json(result);
        console.log(params);
        console.log(result);
        // console.log(req);
        return new Response(JSON.stringify(result.rows));
        // console.log(params.keyword);
        // return NextResponse.json({msg:"hello world"})
    } catch (err) {
        console.error(err);
        // res.status(500).json({ error: 'An error occurred' });
        return new Response(json({error: 'an error occured'}),{status:500});
  
    }
  };
  
