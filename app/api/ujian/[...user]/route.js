import { NextResponse } from 'next/server';
// import pool from '@/db';
import {query} from '@/db'

export async function GET (req,{params}){
    try {
      const id = await query(`select "idUser" from "user" where email = '${params.user[0]}'`)
      const result = await query(`SELECT *,to_char(tanggal_uts,'DD/MM/YYYY')as formatteduts,to_char(tanggal_uas,'DD/MM/YYYY')as formatteduas FROM jadwal_ujian_mahasiswa
      join jadwal_ujian on jadwal_ujian_mahasiswa."idJadwalUjian" = jadwal_ujian."idUjian"
      join master_mata_kuliah on jadwal_ujian."kodeMataKuliah" = master_mata_kuliah."kodeMataKuliah" where "idMahasiswa"=${id.rows[0].idUser} 
      ORDER BY "tanggal_uts" ASC, jam_mulai_uts ASC`);
      return NextResponse.json(result.rows)
    } catch (err) {
      console.error(err);
      return NextResponse.json({error: 'an error occured'})
  
    }
  };