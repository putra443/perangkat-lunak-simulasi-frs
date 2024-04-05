// import pool from '../../../../db';
import {query} from "@/db"
import { NextResponse } from 'next/server';

export async function GET (req, res){
  try {
    // const client = await pool.connect();
    const result = await query(`SELECT *,to_char(tanggal_uts,'DD-MM-YYYY')as formatteduts,to_char(tanggal_uas,'DD-MM-YYYY')as formatteduas from jadwal_ujian`);
    // res.status(200).json(result);
    // client.release()
    return new Response(JSON.stringify(result.rows));
  } catch (err) {
    console.error(err);
    // res.status(500).json({ error: 'An error occurred' });
    return new Response(json({error: 'an error occured'}),{status:500});

  }
};

  
export async function POST(req,res){
    try {
        const request = await req.json()
      if(!request.dataExcel){
        // const client = await pool.connect();
        const result = await query(`INSERT INTO jadwal_ujian
        ("namaMataKuliah",tanggal_uts,
        jam_mulai_uts, jam_selesai_uts,tanggal_uas,
        jam_mulai_uas, jam_selesai_uas) VALUES 
        ('${request.nama}','${request.tanggalUTS}',
        '${request.jamMulaiUjian}','${request.jamSelesaiUjian}','${request.tanggalUAS}',
        '${request.jamMulaiUjian}','${request.jamSelesaiUjian}'
        )`)
        // client.release()
        return new Response(result);
      }
      else{
        const data = request.dataExcel
        // const client = await pool.connect()
        data.map((element)=>{
          const nama = element.nama_mata_kuliah
          // console.log(nama);
          const tanggalUTS = element.tanggalUTS
          const tanggalUAS = element.tanggalUAS
          const jam_mulai = element.jam_mulai
          const jam_selesai = element.jam_selesai
          const result = query(`INSERT INTO jadwal_ujian
          ("namaMataKuliah", tanggal_uts, tanggal_uas, jam_mulai_uts, jam_selesai_uts, jam_mulai_uas, jam_selesai_uas) VALUES 
          ('${nama}','${tanggalUTS}','${tanggalUAS}','${jam_mulai}','${jam_selesai}','${jam_mulai}','${jam_selesai}')`)
          return new Response(result) 
        })
        // const result = "data masuk"
        
        // const client = await pool.connect();
        // const result = await client.query(`INSERT INTO jadwal_mata_kuliah
        // ("namaMataKuliah", hari, jam_mulai, jam_selesai, kelas,sesi) VALUES 
        // ('${request.nama}','${request.hari}','${request.jamMulai}','${request.jamSelesai}','${request.kelas}','${request.sesiKelas}')`)
        // client.release()
        return new Response()
      }
    } catch (e) {
      console.log(e);
      return new Response(e)
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
      const result = await query(`UPDATE jadwal_ujian
      SET tanggal_uts ='${request.tanggalUTS}', tanggal_uas='${request.tanggalUAS}', 
      jam_mulai_uts='${request.jamMulai}', jam_selesai_uts='${request.jamSelesai}', jam_mulai_uas='${request.jamMulai}',
      jam_selesai_uas='${request.jamSelesai}'
      WHERE "idUjian"=${request.idUjian};`)
      // client.release()
      
      return new Response(result);
    }catch(err){
      console.error(err);
      return new Response(json({error: 'an error occured'}),{status:500});
    }
  }
  
 
  export async function DELETE (req, res){
    try {
      const request = await req.json()
      if(request.deleteAll==true){
        // const client = await pool.connect();
        const result = await query(`DELETE FROM jadwal_ujian`);
        // client.release()
        return NextResponse.json(result)
      }
      else{
        // const client = await pool.connect();
        const result = await query(`DELETE FROM jadwal_ujian WHERE "idUjian" = '${request.idUjian}';`);
        // client.release()
        return NextResponse.json(result)
      }
    } catch (err) {
      console.error(err);
      // res.status(500).json({ error: 'An error occurred' });
      // return new Response(json({error: 'an error occured'}),{status:500});
      return new NextResponse.json({error:'an error occured'})
  
    }
  };