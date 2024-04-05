// import pool from '@/db'
import {query} from '@/db'
import { NextResponse } from 'next/server';

export async function GET(req, res){
    try {
        // const client = await pool.connect();
        const result = await query(`SELECT * from "user" order by role`);
        // res.status(200).json(result);
        // return new Response(JSON.stringify(result.rows));
        // client.release()
        return NextResponse.json(result.rows)
      } catch (err) {
        console.error(err);
        // res.status(500).json({ error: 'An error occurred' });
        // return new Response(json({error: 'an error occured'}),{status:500});
        return NextResponse.json({error: 'an error occured'})
      }
}


export async function POST (req, res){
  try {
    const request = await req.json()
    // const client = await pool.connect()
    const result = await query(`insert into "user" (email, fullname, role) values ('${request.email}', '${request.fullname}', '${request.role}')`)
    // client.release()
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({error:"an error occured"})
  }
}
export async function PATCH(req, res){
  try {
      const request = await req.json()
      // const client = await pool.connect();
      const result = await query(`UPDATE "user" SET role='${request.role}' where "idUser" = ${request.userId}`);
      // res.status(200).json(result);
      // return new Response(JSON.stringify(result.rows));
      // client.release()
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
      const request = await req.json()
      if(request.idAdmin!=null){
        // const client = await pool.connect();
      const result = await query(`DELETE FROM "user" where "idUser" = '${request.idAdmin}'`);
      // res.status(200).json(result);
      // return new Response(JSON.stringify(result.rows));
      // client.release()
      return NextResponse.json(result)
      }else{
        // const client = await pool.connect();
        const result = await query(`DELETE FROM jadwal_mahasiswa;
        DELETE FROM jadwal_ujian_mahasiswa;
        DELETE FROM "user" where role ILIKE '%mahasiswa%';`);
        // res.status(200).json(result);
        // return new Response(JSON.stringify(result.rows));
        // client.release()
        return NextResponse.json(result)
      }
    } catch (err) {
      console.error(err);
      // res.status(500).json({ error: 'An error occurred' });
      // return new Response(json({error: 'an error occured'}),{status:500});
      return NextResponse.json({error: 'an error occured'})
    }
}