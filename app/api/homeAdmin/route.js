import { NextResponse } from 'next/server';
// import pool from '../../../db';
import {query} from "@/db"

export async function GET (req, res){
    try {
      // const client = await pool.connect();
      const result = await query('SELECT * FROM jadwal_mata_kuliah ORDER BY "idJadwalMataKuliah"');
      // res.status(200).json(result);
      // return new Response(JSON.stringify(result.rows));
      // client.release()
      return new NextResponse(JSON.stringify(result.rows))
    } catch (err) {
      console.error(err);
      // res.status(500).json({ error: 'An error occurred' });
      // return new Response(json({error: 'an error occured'}),{status:500});
      return new NextResponse.json({error: 'an error occured'})
  
    }
  };

  
export async function POST(req,res){
    try {
        const request = await req.json()
      if(!request.dataExcel){
        // const client = await pool.connect();
        const result = await query(`INSERT INTO jadwal_mata_kuliah
        (kode ,"namaMataKuliah", hari, jam_mulai, jam_selesai, kelas,sesi) VALUES 
        ('${request.kode}','${request.nama}','${request.hari}','${request.jamMulai}','${request.jamSelesai}','${request.kelas}','${request.sesiKelas}')`)
        // return new Response(result);
        // client.release()
        return new NextResponse(result)
      }
      else{
        const data = request.dataExcel
        // const client = await pool.connect()
        data.map((element)=>{
          const kode = element.kode
          const nama = element.nama_mata_kuliah
          const hari = element.hari
          const jam_mulai = element.jam_mulai
          const jam_selesai = element.jam_selesai
          const kelas = element.kelas
          const sesi = element.sesi
          const result = query(`INSERT INTO jadwal_mata_kuliah
          (kode ,"namaMataKuliah", hari, jam_mulai, jam_selesai, kelas,sesi) VALUES 
          ('${kode}','${nama}','${hari}','${jam_mulai}','${jam_selesai}','${kelas}','${sesi}')`)
          return new Response(result)
          // return new NextResponse(result)
        })
        // const result = "data masuk"
        
        // const client = await pool.connect();
        // const result = await client.query(`INSERT INTO jadwal_mata_kuliah
        // ("namaMataKuliah", hari, jam_mulai, jam_selesai, kelas,sesi) VALUES 
        // ('${request.nama}','${request.hari}','${request.jamMulai}','${request.jamSelesai}','${request.kelas}','${request.sesiKelas}')`)
        return new Response()
      }
    } catch (e) {
      console.log(e);
      // return new Response(e)
      return NextResponse.json(e)
      
    }

  }

  
  export async function PATCH(req, res){
    try{
      const request = await req.json()
    //   console.log(request.nama);
    //   console.log(request.jamMulai);
    //   console.log(request.jamSelesai);
    //   console.log(request.hari);
    //   console.log(request.kelas)
    //   console.log(request.sesiKelas);
    //   console.log(request.idJadwalMataKuliah);

      // const client = await pool.connect();
      const result = await query(`UPDATE jadwal_mata_kuliah
      SET "namaMataKuliah"='${request.nama}',kelas='${request.kelas}',hari='${request.hari}', 
      sesi='${request.sesiKelas}', jam_mulai='${request.jamMulai}', jam_selesai='${request.jamSelesai}'
      WHERE "idJadwalMataKuliah"=${request.idJadwalMataKuliah};`)
      // return new Response(result);
      // client.release()
      return new NextResponse(result)
    }catch(err){
      console.error(err);
      // return new Response(json({error: 'an error occured'}),{status:500});
      return NextResponse.json({error: 'an error occured'})

    }
  }
  
  export async function DELETE(req, res){
    try{
      const request = await req.json();
      if(request.deleteAll==true){
        // const client = await pool.connect();
        const result = await query(`DELETE FROM jadwal_mata_kuliah`);
        // client.release()
        return new NextResponse(result)
      }
      else{
        // const client = await pool.connect();
        const result = await query(`DELETE FROM jadwal_mata_kuliah WHERE "idJadwalMataKuliah"=${request.idMataKuliah}`);
        // client.release()
        return new NextResponse(result)
      }
      
    }catch(err){
      console.error(err);
      // return new Response(json({error: 'an error occured'}),{status:500});
      return NextResponse.json({error: 'an error occured'})

    }
  }