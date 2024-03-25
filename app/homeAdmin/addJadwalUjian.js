"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function addJadwalUjian(mataKuliah){
    // console.log(mataKuliah.namaMataKuliah);
    const[idJadwalMataKuliah, setIdJadwalMataKuliah] = useState(mataKuliah.idJadwalMataKuliah)
    const [tanggalUTS, setTanggalUTS] = useState()
    const [tanggalUAS, setTanggalUAS] = useState()
    const [nama, setNama] = useState("")
    const [startUjian, setStartUjian] = useState("")
    const [endUjian, setEndUjian] = useState("")

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
                jamMulaiUjian: startUjian,
                jamSelesaiUjian: endUjian
            })
        })
        // console.log(nama,tanggalUTS,startUTS,endUTS,tanggalUAS,startUAS,endUAS);
        setIsMutating(false)
        // console.log(nama,jamMulai,jamSelesai,2," ",hari,3, " ", sesiKelas);
        setNama("")
        setStartUjian("")
        setEndUjian("")
        setTanggalUTS("")
        setTanggalUAS("")
        setIdJadwalMataKuliah("")
        router.refresh()
        setModal(false)
        
    }
    
    return (
        <div>

            <button className="btn mt-5 bg-green-700 hover:bg-green-800 text-white border-none" onClick={handleChange}>Add Jadwal Ujian</button>
            <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle"></input>
            
            <div className="modal ">
                <div className=" lg:w-3/5  overflow-scroll overflow-x-hidden p-10 rounded-2xl  bg-white text-black">
                    <h1 className="font-bold text-2xl">Tambah Jadwal Ujian</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-control">
                            <label className="label font-bold">Nama Mata Kuliah</label>
                            <select onChange={(e)=>setNama(e.target.value)} onInput={(e)=>setIdJadwalMataKuliah(e.target.key)} className="input w-full input-berdered bg-white text-black border-cyan-400 border-1">
                                <option>Pilih Mata Kuliah</option>
                                {mataKuliah.children.map((mataKuliah,index)=>(
                                        <option key={index}>{mataKuliah.namaMataKuliah}</option>
                                    ))}
                            </select>
                        </div>
                        <div className="form-control">
                            <label className="label font-bold">Tanggal UTS</label>
                            <input type="date" onChange={(e)=>setTanggalUTS(e.target.value)} className="input w-full input-berdered bg-white text-black border-cyan-400 border-1"></input>
                        </div>
                        <div className="form-control">
                            <label className="label font-bold">Tanggal UAS</label>
                            <input type="date" onChange={(e)=>setTanggalUAS(e.target.value)} className="input w-full input-berdered bg-white text-black border-cyan-400 border-1"></input>
                        </div>
                        <div className="form-control">
                            <label className="label font-bold">Jam Mulai Ujian</label>
                            <input type="text" onChange={(e)=>setStartUjian(e.target.value)} className="input w-full input-berdered bg-white text-black border-cyan-400 border-1"></input>
                        </div>
                        <div className="form-control">
                            <label className="label font-bold">Jam Selesai Ujian</label>
                            <input type="text" onChange={(e)=>setEndUjian(e.target.value)} className="input w-full input-berdered bg-white text-black border-cyan-400 border-1"></input>
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