"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function AddJadwalUjian(mataKuliah){
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
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/homeAdmin/ujian`,{
            method:"POST",
            body: JSON.stringify({
                nama:nama,
                tanggalUTS:tanggalUTS,
                tanggalUAS: tanggalUAS,
                jamMulaiUjian: startUjian,
                jamSelesaiUjian: endUjian
            })
        })
        setIsMutating(false)
        setNama("")
        setStartUjian("")
        setEndUjian("")
        setTanggalUTS("")
        setTanggalUAS("")
        router.refresh()
        setModal(false)
        
    }
    
    return (
        <div>

            <button className="btn mt-5 bg-green-700 hover:bg-green-800 text-white border-none" onClick={handleChange}>Tambah Jadwal Ujian</button>
            <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle"></input>
            
            <div className="modal ">
                <div className=" lg:w-3/5  overflow-scroll no-scrollbar overflow-x-hidden p-10 rounded-2xl  bg-white text-black">
                    <h1 className="font-bold text-2xl">Tambah Jadwal Ujian</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-control">
                            <label className="label font-bold">Nama Mata Kuliah</label>
                            <select onChange={(e)=>setNama(e.target.value)} className="input w-full input-berdered bg-white text-black border-cyan-400 border-1">
                                <option>Pilih Mata Kuliah</option>
                                {mataKuliah.children[0]!=null ? (
                                mataKuliah.children.map((mataKuliah,index)=>(
                                        <option key={index}>{mataKuliah.namaMataKuliah}</option>
                                    ))) :
                                    (<option key={1}>Belum ada jadwal</option>)
                                }
                            </select>
                        </div>
                        <div className="form-control">
                            <label className="label font-bold">Tanggal UTS</label>
                            <input type="date" onChange={(e)=>setTanggalUTS(e.target.value)} required className="input w-full input-berdered bg-white text-black border-cyan-400 border-1"></input>
                        </div>
                        <div className="form-control">
                            <label className="label font-bold">Tanggal UAS</label>
                            <input type="date" onChange={(e)=>setTanggalUAS(e.target.value)} required className="input w-full input-berdered bg-white text-black border-cyan-400 border-1"></input>
                        </div>
                        <div className="form-control">
                            <label className="label font-bold">Jam Mulai Ujian</label>
                            <input type="text" onChange={(e)=>setStartUjian(e.target.value)} required className="input w-full input-berdered bg-white text-black border-cyan-400 border-1" placeholder="Input Jam Mulai Ujian"></input>
                        </div>
                        <div className="form-control">
                            <label className="label font-bold">Jam Selesai Ujian</label>
                            <input type="text" onChange={(e)=>setEndUjian(e.target.value)} required className="input w-full input-berdered bg-white text-black border-cyan-400 border-1" placeholder="Input Jam Selesai Ujian"></input>
                        </div>
                        <div className="modal-action">
                            <button className="btn bg-cyan-700 text-white border-none" type="button" onClick={handleChange}>Tutup</button>
                            {!isMutating? (
                            <button className="btn btn-primary hover:bg-green-700 bg-cyan-700 text-white border-none" type="submit">Simpan</button>   
                            ):(
                            <button type="button" className="btn loading">Sedang menyimpan . . .</button>
                            )}

                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}