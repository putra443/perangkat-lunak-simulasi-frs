"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function addJadwalUjian(mataKuliah){
    // console.log(mataKuliah.namaMataKuliah);
    const[idJadwalMataKuliah, setIdJadwalMataKuliah] = useState(mataKuliah.idJadwalMataKuliah)
    const [tanggalUTS, setTanggalUTS] = useState()
    const [tanggalUAS, setTanggalUAS] = useState()
    const [nama, setNama] = useState("")
    const [startUTS, setStartUTS] = useState("")
    const [endUTS, setEndUTS] = useState("")
    const [startUAS, setStartUAS] = useState("")
    const [endUAS, setEndUAS] = useState("")

    const [modal, setModal] =useState(false);
    const [isMutating, setIsMutating] =useState(false)

    const router = useRouter()

    function handleChange(){
        setModal(!modal)
    }
    
    async function handleSubmit(e){
        setIsMutating(true)
        e.preventDefault();
        await fetch("http://localhost:3000/api/homeAdmin/ujian",{
            method:"POST",
            body: JSON.stringify({
                nama:nama,
                tanggalUTS:tanggalUTS,
                tanggalUAS: tanggalUAS,
                jamMulaiUTS: startUTS,
                jamSelesaiUTS: endUTS,
                jamMulaiUAS:startUAS,
                jamSelesaiUAS: endUAS
            })
        })
        // console.log(nama,tanggalUTS,startUTS,endUTS,tanggalUAS,startUAS,endUAS);
        setIsMutating(false)
        // console.log(nama,jamMulai,jamSelesai,2," ",hari,3, " ", sesiKelas);
        setNama("")
        setStartUTS("")
        setEndUTS("")
        setStartUAS("")
        setEndUAS("")
        setTanggalUTS("")
        setTanggalUAS("")
        setIdJadwalMataKuliah("")
        router.refresh()
        setModal(false)
        
    }
    
    return (
        <div>

            <button className="btn ml-5 bg-green-700 hover:bg-green-800 text-white border-none" onClick={handleChange}>Add Jadwal Ujian</button>
            <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle"></input>
            
            <div className="modal ">
                <div className=" w-3/5  overflow-scroll overflow-x-hidden p-10 rounded-2xl  bg-white text-black">
                    <h1 className="font-bold text-2xl">Tambah Jadwal UTS</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-control">
                            <label className="label font-bold">Nama Mata Kuliah</label>
                            <select onChange={(e)=>setNama(e.target.value)} onInput={(e)=>setIdJadwalMataKuliah(e.target.key)} className="input w-full input-berdered bg-white text-black border-cyan-400 border-1">
                                <option>Pilih Mata Kuliah</option>
                                {mataKuliah.children.map((mataKuliah)=>(
                                        <option key={mataKuliah.idJadwalMataKuliah}>{mataKuliah.namaMataKuliah}</option>
                                    ))}
                            </select>
                        </div>
                        <div className="form-control">
                            <label className="label font-bold">Tanggal UTS</label>
                            <input type="date" onChange={(e)=>setTanggalUTS(e.target.value)} className="input w-full input-berdered bg-white text-black border-cyan-400 border-1"></input>
                        </div>
                        <div className="form-control">
                            <label className="label font-bold">Jam Mulai UTS</label>
                            <input type="text" onChange={(e)=>setStartUTS(e.target.value)} className="input w-full input-berdered bg-white text-black border-cyan-400 border-1"></input>
                        </div>
                        <div className="form-control">
                            <label className="label font-bold">Jam Selesai UTS</label>
                            <input type="text" onChange={(e)=>setEndUTS(e.target.value)} className="input w-full input-berdered bg-white text-black border-cyan-400 border-1"></input>
                        </div>
                        <h1 className="font-bold text-2xl mt-5">Tambah Jadwal UAS</h1>
                        <div className="form-control">
                            <label className="label font-bold">Tanggal UAS</label>
                            <input type="date" onChange={(e)=>setTanggalUAS(e.target.value)} className="input w-full input-berdered bg-white text-black border-cyan-400 border-1"></input>
                        </div>
                        <div className="form-control">
                            <label className="label font-bold">Jam Mulai UAS</label>
                            <input type="text" onChange={(e)=>setStartUAS(e.target.value)} className="input w-full input-berdered bg-white text-black border-cyan-400 border-1"></input>
                        </div>
                        <div className="form-control">
                            <label className="label font-bold">Jam Selesai UAS</label>
                            <input type="text" onChange={(e)=>setEndUAS(e.target.value)} className="input w-full input-berdered bg-white text-black border-cyan-400 border-1"></input>
                        </div>
                        <div className="modal-action">
                            <button className="btn bg-cyan-700 text-white border-none" type="button" onClick={handleChange}>Close</button>
                            {!isMutating? (
                            <button className="btn btn-primary hover:bg-green-700 bg-cyan-700 text-white border-none" type="submit">Save</button>   
                            ):(
                            <button type="button" className="btn loading">Saving . . .</button>
                            )}

                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}