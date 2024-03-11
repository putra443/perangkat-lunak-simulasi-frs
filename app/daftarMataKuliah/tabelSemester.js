"use client"
import { id } from "date-fns/locale";
import { useState } from "react";
export default function TabelSemester(daftarMataKuliah){
    const curSem = daftarMataKuliah.sem
    const sem = daftarMataKuliah.daftarMataKuliah.filter(
        (daftarMataKuliah) => daftarMataKuliah.semester === curSem
        );
    let mataKuliahTerambil = ""

    return(
        <table className=' table text-center mt-5 rounded-xl bg-gray-200'>
                        <thead>
                            <tr className='bg-sky-700 text-white'>
                                <th className='p-5'>No</th>
                                <th className='p-5'>Nama Mata Kuliah</th>
                                <th className='p-5'>Kelas</th>
                                <th className='p-5'>Checked</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sem.map((daftarMataKuliah, index)=>(
                                <tr  key={index} className='hover:text-indigo-700 transition-all'>
                                    <td className=" font-semibold">{index+1}</td>
                                    <td className=" font-semibold">{daftarMataKuliah.namaMataKuliah}</td>
                                    <td className='font-semibold' >{daftarMataKuliah.kelas}</td>
                                    <td className='font-semibold' >
                                        <input type="checkbox" value={daftarMataKuliah.idJadwalMataKuliah} className="checkbox border-black hover:bg-slate-300"></input>
                                    </td>
                                    
                                </tr>
                            ))}
                        </tbody>
                    </table>
    )
}