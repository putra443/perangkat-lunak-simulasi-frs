import pool from '@/db'
import { NextResponse } from 'next/server';

export async function GET(req, res){
    try {
        const client = await pool.connect();
        const result = await client.query(`SELECT * from "user" order by role`);
        // res.status(200).json(result);
        // return new Response(JSON.stringify(result.rows));
        return NextResponse.json(result.rows)
      } catch (err) {
        console.error(err);
        // res.status(500).json({ error: 'An error occurred' });
        // return new Response(json({error: 'an error occured'}),{status:500});
        return NextResponse.json({error: 'an error occured'})
      }
}

export async function PATCH(req, res){
  try {
      const request = await req.json()
      const client = await pool.connect();
      const result = await client.query(`UPDATE "user" SET role='${request.role}' where "idUser" = ${request.userId}`);
      // res.status(200).json(result);
      // return new Response(JSON.stringify(result.rows));
      return NextResponse.json(result)
    } catch (err) {
      console.error(err);
      // res.status(500).json({ error: 'An error occurred' });
      // return new Response(json({error: 'an error occured'}),{status:500});
      return NextResponse.json({error: 'an error occured'})
    }
}

export async function DELETE(req, res){
  try {
      // const request = await req.json()
      const client = await pool.connect();
      const result = await client.query(`DELETE FROM jadwal_mahasiswa;
      DELETE FROM jadwal_ujian_mahasiswa;
      DELETE FROM "user" where role ILIKE 'mahasiswa';`);
      // res.status(200).json(result);
      // return new Response(JSON.stringify(result.rows));
      return NextResponse.json(result)
    } catch (err) {
      console.error(err);
      // res.status(500).json({ error: 'An error occurred' });
      // return new Response(json({error: 'an error occured'}),{status:500});
      return NextResponse.json({error: 'an error occured'})
    }
}