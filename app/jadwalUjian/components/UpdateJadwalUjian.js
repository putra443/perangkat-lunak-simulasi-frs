"use client"
import { SyntheticEvent,useState } from "react"
import { useRouter } from "next/navigation"

export default function UpdateJadwalUjian(jadwalUjian){
    const[idjadwalUjian, setId] = useState(jadwalUjian.idUjian)
    const [jamMulai, setJamMulai] = useState(jadwalUjian.jam_mulai_uts)
    const [jamSelesai, setJamSelesai] = useState(jadwalUjian.jam_selesai_uts)
    const [tanggalUTS, setTanggalUTS] = useState(jadwalUjian.formatteduts)
    const [tanggalUAS, setTanggalUAS] = useState(jadwalUjian.formatteduas)
    const [modal, setModal] =useState(false);
    const [isMutating, setIsMutating] =useState(false)

    const router = useRouter();

    function handleChange(){
        setModal(!modal)
    }

    async function handleUpdate(e){
        setIsMutating(true)
        e.preventDefault();
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/homeAdmin/ujian`,{
            method:"PATCH",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idUjian : idjadwalUjian,
                jamMulai : jamMulai,
                jamSelesai : jamSelesai,
                tanggalUTS : tanggalUTS,
                tanggalUAS : tanggalUAS
            })
        })
        setIsMutating(false)

        router.refresh()
        setModal(false)
    }
    
    return (
        <div>

            <button className="btn btn-info btn-sm text-white mt-2" onClick={handleChange}>Edit</button>
            <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle"></input>
            
            <div className="modal">
                <div className="w-3/5 overflow-scroll overflow-x-hidden p-10 rounded-2xl bg-white text-black">
                    <h3 className="font-bold text-lg">Edit Jadwal Ujian {jadwalUjian.namaMataKuliah}</h3>
                    <form onSubmit={handleUpdate}>
                        <div className="form-control">
                            <label className="label font-bold">Tanggal UTS</label>
                            <input type="date" value={tanggalUTS} onChange={(e)=> setTanggalUTS(e.target.value)} className="input w-full input-berdered bg-white text-black border-cyan-400 border-1" placeholder="Input Tanggal UTS"></input>
                        </div>
                        <div className="form-control">
                            <label className="label font-bold">Tanggal UAS</label>
                            <input type="date" value={tanggalUAS} onChange={(e)=> setTanggalUAS(e.target.value)} className="input w-full input-berdered bg-white text-black border-cyan-400 border-1" placeholder="Input Tanggal UTS"></input>
                        </div>
                        <div className="form-control">
                            <label className="label font-bold">Jam Mulai UTS</label>
                            <input type="text" value={jamMulai} onChange={(e)=> setJamMulai(e.target.value)} className="input w-full input-berdered bg-white text-black border-cyan-400 border-1" placeholder="Jam Mulai UTS"></input>
                        </div>
                        <div className="form-control">
                            <label className="label font-bold">Jam Selesai UTS</label>
                            <input type="text" value={jamSelesai} onChange={(e)=> setJamSelesai(e.target.value)} className="input w-full input-berdered bg-white text-black border-cyan-400 border-1" placeholder="Jam Selesai UTS"></input>
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