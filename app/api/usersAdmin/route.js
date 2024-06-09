// import pool from '@/db'
import {query} from '@/db'
import { NextResponse } from 'next/server';

export async function GET(req, res){
    try {
        const result = await query(`SELECT * from "user" order by role`);
        return NextResponse.json(result.rows)
      } catch (err) {
        console.error(err);
        return NextResponse.json({error: 'an error occured'})
      }
}


export async function POST (req, res){
  try {
    const request = await req.json()
    const result = await query(`insert into "user" (email, fullname, role) values ('${request.email}', '${request.fullname}', '${request.role}')`)
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({error:"an error occured"})
  }
}
export async function PATCH(req, res){
  try {
      const request = await req.json()
      const result = await query(`UPDATE "user" SET role='${request.role}' where "idUser" = ${request.userId}`);
      return NextResponse.json(result)
    } catch (err) {
      console.error(err);
      return NextResponse.json({error: 'an error occured'})
    }
}

export async function DELETE(req, res){
  try {
      const request = await req.json()
      if(request.idAdmin!=null){
      const result = await query(`DELETE FROM "user" where "idUser" = '${request.idAdmin}'`);
      return NextResponse.json(result)
      }
      else if(request.idMahasiswa=="all"){
        const result = await query(`DELETE FROM jadwal_mahasiswa;
        ALTER TABLE jadwal_mahasiswa ALTER COLUMN "idJadwalMahasiswa" RESTART WITH 1;
        DELETE FROM jadwal_ujian_mahasiswa;
        ALTER TABLE jadwal_ujian_mahasiswa ALTER COLUMN "idJadwalUjianMahasiswa" RESTART WITH 1;
        DELETE FROM "user" where role ILIKE '%mahasiswa%';
        ALTER TABLE "user" ALTER COLUMN "idUser" RESTART WITH 1;`);
        return NextResponse.json(result)
      }
      else if(request.idMahasiswa!=null){

        const result = await query(`
        DELETE FROM jadwal_mahasiswa where "idMahasiswa" = ${request.idMahasiswa};
        DELETE FROM jadwal_ujian_mahasiswa where "idMahasiswa" = ${request.idMahasiswa};
        DELETE FROM "user" where "idUser" = ${request.idMahasiswa};`);

        return NextResponse.json(result)
      }
    } catch (err) {
      console.error(err);
      return NextResponse.json({error: 'an error occured'})
    }
}