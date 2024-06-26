"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Josefin_Sans } from "next/font/google"
import { set } from "date-fns"


export default function AddMataKuliah(mataKuliah){
    const [nama, setNama] = useState('default')
    const [kelas,setKelas] = useState('default')
    const [modal, setModal] =useState(false);
    const [isMutating, setIsMutating] =useState(false)
    const [curSemester, SetCurSemester] = useState('default')
    const router = useRouter();
    function handleChange(){
        setModal(!modal)
    }
    //untuk filter current semester yang dipilih  
    async function handleSubmit(e){
        e.preventDefault();
        setIsMutating(true)
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/simulasi/${mataKuliah.user}`,{
            method:"POST",
            body: JSON.stringify({
                nama:nama,
                kelas:kelas
            })
        })

        setIsMutating(false)
        SetCurSemester('default')
        setNama('default')
        setKelas('default')
        router.refresh()
        setModal(false)
    }
    return (
        <div>

            <button className="btn bg-green-700 hover:bg-green-800 text-white border-none" onClick={handleChange}>Tambah Mata Kuliah Baru</button>
            <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle"></input>
            
            <div className="modal">
                <div className="lg:w-3/5 overflow-scroll no-scrollbar overflow-x-hidden p-10 rounded-2xl  bg-white text-black">
                    <h3 className="font-bold text-lg">Tambah Mata Kuliah</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-control">
                            <label className="label font-bold">Pilih Semester / Mata Kuliah Pilihan</label>
                            <select value={curSemester} onChange={(e) => SetCurSemester(e.target.value)} className="input w-full input-berdered bg-white text-black border-cyan-400 border-1">
                                <option value='default'>Pilih Semester</option>
                                <option value='1'>Semester 1</option>
                                <option value='2'>Semester 2</option>
                                <option value='3'>Semester 3</option>
                                <option value='4'>Semester 4</option>
                                <option value='5'>Semester 5</option>
                                <option value='6'>Semester 6</option>
                                <option value='7'>Semester 7</option>
                                <option value='8'>Semester 8</option>
                                <option value='0'>Mata Kuliah Pilihan</option>
                            </select>
                        </div>
                        <div className="form-control">
                            <label className="label font-bold">Pilih Mata Kuliah</label>
                            {/* <input type="text" value={nama} onChange={(e)=> setNama(e.target.value)} className="input w-full input-berdered bg-white text-black border-cyan-400 border-1" placeholder="Input Nama Mata Kuliah"></input> */}
                            <select onChange={(e)=>setNama(e.target.value)} className="input w-full input-berdered bg-white text-black border-cyan-400 border-1">
                                <option value='default'>Pilih Mata Kuliah</option>
                                {mataKuliah.children.filter((mataKuliah)=> {
                                    return curSemester === '' ? mataKuliah : mataKuliah.semester == curSemester
                                }).filter((mataKuliah,index, self)=>{
                                    return self.findIndex((m)=> m.namaMataKuliah === mataKuliah.namaMataKuliah) === index
                                })
                                .map((mataKuliah,index)=>(
                                    <option key={index}>{mataKuliah.namaMataKuliah}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-control">
                            <label className="label font-bold">Pilih Kelas</label>
                            <select onChange={(e)=>setKelas(e.target.value)} className="input w-full input-berdered bg-white text-black border-cyan-400 border-1">
                                <option value='default'>Pilih Kelas</option>
                                {mataKuliah.children.filter((mataKuliah)=> {
                                        return nama === '' ? mataKuliah : mataKuliah.namaMataKuliah == nama
                                    })
                                    .filter((mataKuliah, index, self)=>{
                                        return self.findIndex((m) => m.kelas === mataKuliah.kelas)=== index
                                    })
                                    .map((mataKuliah,index)=>(
                                        <option key={index}>{mataKuliah.kelas}</option>
                                    ))}
                            </select>
                        </div>
                        <div className="modal-action">
                            <button className="btn bg-cyan-700 text-white border-none" type="button" onClick={handleChange}>Tutup</button>
                            {!isMutating? (
                            <button className="btn btn-primary hover:bg-green-700 bg-cyan-700 text-white border-none" type="submit">Simpan</button>   
                            ):(
                            <button type="button" className="btn loading">Sedang Menyimpan . . .</button>
                            )}

                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}