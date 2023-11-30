import pool from '../../../../db';

// export async function GET (req, res){
//     try {
//       const client = await pool.connect();
//       const result = await client.query(`SELECT * FROM jadwal_mata_kuliah ORDER BY "idJadwalMataKuliah"`);
//       // res.status(200).json(result);
//       return new Response(JSON.stringify(result.rows));
//     } catch (err) {
//       console.error(err);
//       // res.status(500).json({ error: 'An error occurred' });
//       return new Response(json({error: 'an error occured'}),{status:500});
  
//     }
//   };

  
export async function POST(req,res){
    try {
        const request = await req.json()
      if(!request.dataExcel){
        const client = await pool.connect();
        const result = await client.query(`INSERT INTO jadwal_ujian
        ("namaMataKuliah",tanggal_uts,
        jam_mulai_uts, jam_selesai_uts,tanggal_uas,
        jam_mulai_uas, jam_selesai_uas) VALUES 
        ('${request.nama}','${request.tanggalUTS}',
        '${request.jamMulaiUTS}','${request.jamSelesaiUTS}','${request.tanggalUAS}',
        '${request.jamMulaiUAS}','${request.jamSelesaiUAS}'
        )`)
        return new Response(result);
      }
      else{
        const data = request.dataExcel
        const client = await pool.connect()
        data.map((element)=>{
          const nama = element.nama_mata_kuliah
          const jam_mulai = element.jam_mulai
          const jam_selesai = element.jam_selesai
          const kelas = element.kelas
          const sesi = element.sesi
          const result = client.query(`INSERT INTO jadwal_mata_kuliah
          ("namaMataKuliah", hari, jam_mulai, jam_selesai, kelas,sesi) VALUES 
          ('${nama}','${request.hari}','${jam_mulai}','${jam_selesai}','${kelas}','${sesi}')`)
          return new Response(result) 
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

      const client = await pool.connect();
      const result = await client.query(`UPDATE jadwal_mata_kuliah
      SET "namaMataKuliah"='${request.nama}',kelas='${request.kelas}',hari='${request.hari}', 
      sesi='${request.sesiKelas}', jam_mulai='${request.jamMulai}', jam_selesai='${request.jamSelesai}'
      WHERE "idJadwalMataKuliah"=${request.idJadwalMataKuliah};`)
      return new Response(result);
    }catch(err){
      console.error(err);
      return new Response(json({error: 'an error occured'}),{status:500});
    }
  }
  
  export async function DELETE(req, res){
    try{
      const request = await req.json();
      const client = await pool.connect();
      const result = await client.query(`DELETE FROM jadwal_mata_kuliah WHERE "idJadwalMataKuliah"=${request.idMataKuliah}`);
      return new Response(result);
    }catch(err){
      console.error(err);
      return new Response(json({error: 'an error occured'}),{status:500});
    }
  }