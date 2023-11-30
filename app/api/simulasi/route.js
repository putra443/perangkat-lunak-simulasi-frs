import pool from '../../../db';

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

  export async function GET (req, res){
    try {
      const client = await pool.connect();
      const result = await client.query(`SELECT * FROM jadwal_mahasiswa
      join jadwal_mata_kuliah on
      jadwal_mahasiswa."idJadwalMataKuliah" = jadwal_mata_kuliah."idJadwalMataKuliah"
      ORDER BY "namaMataKuliah"`);
      // res.status(200).json(result);
      return new Response(JSON.stringify(result.rows));
    } catch (err) {
      console.error(err);
      // res.status(500).json({ error: 'An error occurred' });
      return new Response(json({error: 'an error occured'}),{status:500});
  
    }
  };

  
  export async function POST(req,res){
    try{
      const request = await req.json()
      const client = await pool.connect();
      const result = await client.query(`INSERT INTO jadwal_mahasiswa("idJadwalMataKuliah") 
      select * from jadwal_mata_kuliah
      where jadwal_mata_kuliah.kelas='${request.kelas}' and 
      jadwal_mata_kuliah."namaMataKuliah"=${request.nama}`)
      return new Response(result);
    }catch (err){
      console.error(err);
      return new Response(json({error: 'an error occured'}),{status:500});
    }
  }
  
//   export async function PATCH(req, res){
//     try{
//       const request = await req.json()
//     //   console.log(request.nama);
//     //   console.log(request.jamMulai);
//     //   console.log(request.jamSelesai);
//     //   console.log(request.hari);
//     //   console.log(request.kelas)
//     //   console.log(request.sesiKelas);
//     //   console.log(request.idJadwalMataKuliah);

//       const client = await pool.connect();
//       const result = await client.query(`UPDATE jadwal_mata_kuliah
//       SET "namaMataKuliah"='${request.nama}',kelas='${request.kelas}',hari='${request.hari}', 
//       sesi='${request.sesiKelas}', jam_mulai='${request.jamMulai}', jam_selesai='${request.jamSelesai}'
//       WHERE "idJadwalMataKuliah"=${request.idJadwalMataKuliah};`)
//       return new Response(result);
//     }catch(err){
//       console.error(err);
//       return new Response(json({error: 'an error occured'}),{status:500});
//     }
//   }
  
//   export async function DELETE(req, res){
//     try{
//       const request = await req.json();
//       const client = await pool.connect();
//       const result = await client.query(`DELETE FROM jadwal_mata_kuliah WHERE "idJadwalMataKuliah"=${request.idMataKuliah}`);
//       return new Response(result);
//     }catch(err){
//       console.error(err);
//       return new Response(json({error: 'an error occured'}),{status:500});
//     }
//   }