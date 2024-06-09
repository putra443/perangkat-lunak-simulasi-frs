import { NextResponse } from 'next/server';
// import pool from '../../../db';
import {query} from "@/db"

export async function GET (req, res){
    try {
      const result = await query('SELECT * FROM jadwal_mata_kuliah join master_mata_kuliah on jadwal_mata_kuliah."kodeMataKuliah" = master_mata_kuliah."kodeMataKuliah" ORDER BY "idJadwalMataKuliah"');
      return new NextResponse(JSON.stringify(result.rows))
    } catch (err) {
      console.error(err);
      return new NextResponse.json({error: 'an error occured'})
  
    }
  };

  
export async function POST(req,res){
    try {
        const request = await req.json()
      if(!request.dataExcel){
        const result = await query(`INSERT INTO jadwal_mata_kuliah
        ("kodeMataKuliah" , hari, jam_mulai, jam_selesai, kelas,sesi) VALUES 
        ('${request.kode}','${request.hari}','${request.jamMulai}','${request.jamSelesai}','${request.kelas}','${request.sesiKelas}')`)
        return new NextResponse(result)
      }
      else{
        const data = request.dataExcel
        data.map((element)=>{
          const kode = element['Kode']
          const hari = element['Hari']
          const jam_mulai = element['Jam Mulai']
          const jam_selesai = element['Jam Selesai']
          const kelas = element['Kelas']
          const sesi = element['Sesi']
          const result = query(`INSERT INTO jadwal_mata_kuliah
          ("kodeMataKuliah" , hari, jam_mulai, jam_selesai, kelas,sesi) VALUES 
          ('${kode}','${hari}','${jam_mulai}','${jam_selesai}','${kelas}','${sesi}')`)
          return new Response(result)
        })
        return new Response()
      }
    } catch (e) {
      console.log(e);
      return NextResponse.json(e)
      
    }

  }

  
  export async function PATCH(req, res){
    try{
      const request = await req.json()

      const result = await query(`UPDATE jadwal_mata_kuliah
      SET kelas='${request.kelas}',hari='${request.hari}', 
      sesi='${request.sesiKelas}', jam_mulai='${request.jamMulai}', jam_selesai='${request.jamSelesai}'
      WHERE "idJadwalMataKuliah"=${request.idJadwalMataKuliah};`)
      return new NextResponse(result)
    }catch(err){
      console.error(err);
      return NextResponse.json({error: 'an error occured'})

    }
  }
  
  export async function DELETE(req, res){
    try{
      const request = await req.json();
      if(request.deleteAll==true){
        const result = await query(`DELETE FROM jadwal_mata_kuliah;
        ALTER TABLE jadwal_mata_kuliah ALTER COLUMN "idJadwalMataKuliah" RESTART WITH 1;`);
        return new NextResponse(result)
      }
      else{
        const result = await query(`DELETE FROM jadwal_mata_kuliah WHERE "idJadwalMataKuliah"=${request.idMataKuliah}`);
        return new NextResponse(result)
      }
      
    }catch(err){
      console.error(err);
      return NextResponse.json({error: 'an error occured'})

    }
  }