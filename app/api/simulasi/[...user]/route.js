import { NextResponse } from 'next/server';
// import pool from '@/db';
import {query} from '@/db'

  
  export async function GET (req, {params}){
    try {
      const id = await query(`select "idUser" from "user" where email = '${params.user[0]}'`)
      const result = await query(`SELECT * FROM jadwal_mahasiswa
      join jadwal_mata_kuliah on
      jadwal_mahasiswa."idJadwalMataKuliah" = jadwal_mata_kuliah."idJadwalMataKuliah"
      join master_mata_kuliah on
      jadwal_mata_kuliah."kodeMataKuliah" = master_mata_kuliah."kodeMataKuliah"
      where "idMahasiswa"= ${id.rows[0].idUser}
      ORDER BY CASE 
        when hari = 'Senin' then 1
        when hari = 'Selasa' then 2
        when hari = 'Rabu' then 3
        when hari = 'Kamis' then 4
        when hari = 'Jumat' then 5
        else 6
        end,
        jam_mulai ASC
        `);
      return NextResponse.json(result.rows)
    } catch (err) {
      console.error(err);
      return NextResponse.json({error:"an error occured"})
  
    }
  };

  
  export async function POST(req,{params}){
    try{
      const request = await req.json()
      if(request.kelas=="default"){
        throw Error("Masukkan Kelas Pararel!")
      }
      const id = await query(`select "idUser" from "user" where email = '${params.user[0]}'`)
      const duplicate = await query(`Select * from jadwal_mahasiswa join jadwal_mata_kuliah on 
      jadwal_mahasiswa."idJadwalMataKuliah"= jadwal_mata_kuliah."idJadwalMataKuliah" join master_mata_kuliah on
      master_mata_kuliah."kodeMataKuliah" =  jadwal_mata_kuliah."kodeMataKuliah" 
      where master_mata_kuliah."namaMataKuliah" = '${request.nama}' and jadwal_mahasiswa."idMahasiswa"= ${id.rows[0].idUser}`)
      if(duplicate.rowCount>0){
        throw Error("Tidak boleh mengambil mata kuliah yang sama lebih dari satu kali")
      }
      else{
        const result = await query(`INSERT INTO jadwal_mahasiswa("idJadwalMataKuliah","idMahasiswa") 
        select "idJadwalMataKuliah",${id.rows[0].idUser} from jadwal_mata_kuliah join master_mata_kuliah on
        jadwal_mata_kuliah."kodeMataKuliah" = master_mata_kuliah."kodeMataKuliah"
        where kelas='${request.kelas}' and 
        "namaMataKuliah"='${request.nama}';`)
        const resultUjian = await query (`insert into jadwal_ujian_mahasiswa("idJadwalUjian","idMahasiswa")
        select "idUjian",${id.rows[0].idUser} from jadwal_ujian join master_mata_kuliah on 
        jadwal_ujian."kodeMataKuliah" = master_mata_kuliah."kodeMataKuliah"
        where "namaMataKuliah"='${request.nama}'`)
        return new NextResponse(result + resultUjian)
      }
      
    }catch (err){
      console.error(err);
      return new NextResponse(JSON.stringify({error:"an error occured"}))
    }
  }
  
  
  export async function DELETE(req,{params}){
    try{
      const request = await req.json();
      const id = await query(`select "idUser" from "user" where email = '${params.user[0]}'`)
      const result = await query(`DELETE FROM jadwal_mahasiswa WHERE "idMahasiswa"=${id.rows[0].idUser} and "idJadwalMataKuliah" IN (select "idJadwalMataKuliah" from jadwal_mata_kuliah join master_mata_kuliah on jadwal_mata_kuliah."kodeMataKuliah" = master_mata_kuliah."kodeMataKuliah" where "namaMataKuliah" ='${request.namaMataKuliah}');
      delete from jadwal_ujian_mahasiswa  where "idMahasiswa"=${id.rows[0].idUser} and "idJadwalUjian" IN (select "idUjian" from jadwal_ujian join master_mata_kuliah on jadwal_ujian."kodeMataKuliah" = master_mata_kuliah."kodeMataKuliah"
      where "namaMataKuliah"= '${request.namaMataKuliah}');
      `);
      return new NextResponse(result)
    }catch(err){
      console.error(err);
      return new NextResponse(JSON.stringify({error:"an error occured"}))

    }
  }