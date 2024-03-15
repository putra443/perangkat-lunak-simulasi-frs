import { NextResponse } from 'next/server';
import pool from '@/db';

// export async function GET (req, res){
//     try {
//       const client = await pool.connect();
//       const result = await client.query('SELECT * FROM jadwal_mahasiswa join jadwal_mata_kuliah on jadwal_mahasiswa."idJadwalMataKuliah" = jadwal_mata_kuliah."idJadwalMataKuliah"ORDER BY "idJadwalMahasiswa"');
//       // res.status(200).json(result);
//       return new Response(JSON.stringify(result.rows));
//     } catch (err) {
//       console.error(err);
//       // res.status(500).json({ error: 'An error occurred' });
//       return new Response(json({error: 'an error occured'}),{status:500});
  
//     }
//   };
  
  export async function GET (req, {params}){
    try {
      // console.log(params.user[0]);
      const client = await pool.connect();
      const result = await client.query(`SELECT * FROM jadwal_mahasiswa
      join jadwal_mata_kuliah on
      jadwal_mahasiswa."idJadwalMataKuliah" = jadwal_mata_kuliah."idJadwalMataKuliah"
      where "idMahasiswa"= ${params.user[0]}
      ORDER BY "namaMataKuliah"`);
      client.release();
      // // res.status(200).json(result);
      // // return new Response(JSON.stringify(result.rows));
      // // console.log(result.rows);
      return new NextResponse(JSON.stringify(result.rows))
    } catch (err) {
      console.error(err);
      // res.status(500).json({ error: 'An error occurred' });
      // return new Response(json({error: 'an error occured'}),{status:500});
      return NextResponse.json({error:"an error occured"})
  
    }
  };

  
  export async function POST(req,{params}){
    try{
      const request = await req.json()
      const client = await pool.connect();
      const result = await client.query(`INSERT INTO jadwal_mahasiswa("idJadwalMataKuliah","idMahasiswa") 
      select "idJadwalMataKuliah",${params.user[0]} from jadwal_mata_kuliah
      where kelas='${request.kelas}' and 
      "namaMataKuliah"='${request.nama}';
      insert into jadwal_ujian_mahasiswa("idJadwalUjian","idMahasiswa")
      select "idUjian",${params.user[0]} from jadwal_ujian
      where "namaMataKuliah"='${request.nama}'`)
      client.release()
      // return new Response(result);
      return new NextResponse(result)
    }catch (err){
      console.error(err);
      // return new Response(json({error: 'an error occured'}),{status:500});
      return new NextResponse(JSON.stringify({error:"an error occured"}))
    }
  }
  
  
  export async function DELETE(req,{params}){
    try{
      const request = await req.json();
      const client = await pool.connect(); 
      const result = await client.query(`DELETE FROM jadwal_mahasiswa WHERE "idMahasiswa"=${params.user[0]} and "idJadwalMataKuliah" IN (select "idJadwalMataKuliah" from jadwal_mata_kuliah where "namaMataKuliah" ='${request.namaMataKuliah}');
      delete from jadwal_ujian_mahasiswa  where "idJadwalUjian" IN (select "idUjian" from jadwal_ujian
      where "namaMataKuliah"= '${request.namaMataKuliah}');
      `);
      // return new Response(result);
      client.release()
      return new NextResponse(result)
    }catch(err){
      console.error(err);
      // return new Response(json({error: 'an error occured'}),{status:500});
      return new NextResponse(JSON.stringify({error:"an error occured"}))

    }
  }