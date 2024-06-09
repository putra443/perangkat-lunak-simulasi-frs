// import pool from '../../../../db';
import {query} from '@/db'

export async function GET (req, res){
  try {
    const result = await query(`SELECT distinct on ("namaMataKuliah") "namaMataKuliah", * from jadwal_mata_kuliah join master_mata_kuliah on jadwal_mata_kuliah."kodeMataKuliah" = master_mata_kuliah."kodeMataKuliah" order by "namaMataKuliah"`);
    return new Response(JSON.stringify(result.rows));
  } catch (err) {
    console.error(err);
    return new Response(json({error: 'an error occured'}),{status:500});

  }
};