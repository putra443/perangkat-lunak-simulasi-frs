"use client"
import { id } from "date-fns/locale";
import { useState } from "react";

export default function TabelSemester(daftarMataKuliah){
    const curSem = daftarMataKuliah.sem
    // console.log(daftarMataKuliah.arrayId);
    const namaKelas = daftarMataKuliah.daftarMataKuliah.filter(
        (daftarMataKuliah) => daftarMataKuliah.semester === curSem
        );
    const key = "namaMataKuliah"
    const key2 = "kelas"
    const uniqueNama = [...new Set(namaKelas.map(item=>item.namaMataKuliah))]
    // console.log(uniqueNama);
    // console.log(uniqueNama);
    //untuk add mata kuliah

    
    function handleCheckbox(id){
        // const statusId = [...daftarMataKuliah.daftarMataKuliah]
        // const index = statusId.findIndex(item => item.idJadwalMataKuliah == id)
        // // console.log(statusId[0].idJadwalMataKuliah,index,id);
        if(daftarMataKuliah.arrayId.findIndex(item=>item==id)==-1){
            daftarMataKuliah.arrayId.push(id)
        }else{
            daftarMataKuliah.arrayId.pop(id)
            
        }
        // console.log(daftarMataKuliah.arrayId);
    }

    return(
        <table className=' table text-center mt-5 rounded-xl bg-gray-200'>
                        <thead>
                            <tr className='bg-sky-700 text-white'>
                                <th className='lg:p-5 p-2'>No</th>
                                <th className='lg:p-5 p-2'>Nama Mata Kuliah</th>
                                <th className='lg:p-5 p-2'>Kelas</th>
                                <th className='lg:p-5 p-2'>Checked</th>
                            </tr>
                        </thead>
                        <tbody>
                            {namaKelas.map((daftarMataKuliah, index)=>(
                                <tr  key={index} className='hover:text-indigo-700 transition-all'>
                                    <td className=" font-semibold">{index+1}</td>
                                    <td className=" font-semibold">{daftarMataKuliah.namaMataKuliah}</td>
                                    <td className='font-semibold' >{daftarMataKuliah.kelas}</td>
                                    <td className='font-semibold' >
                                        <input id={daftarMataKuliah.idMataKuliah} 
                                        type="checkbox" 
                                        onChange={(e)=> handleCheckbox(e.target.value)} value={daftarMataKuliah.idJadwalMataKuliah} className="checkbox border-black hover:bg-slate-300"></input>
                                    </td>
                                    
                                </tr>
                            ))}
                        </tbody>
                    </table>
    )
}