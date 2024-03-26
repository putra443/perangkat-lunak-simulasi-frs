"use client"
import { SyntheticEvent,useState } from "react"
import { useRouter } from "next/navigation"

export default function UpdateMataKuliah(mataKuliah){
    // console.log(mataKuliah);
    const[idJadwalMataKuliah, setIdJadwal] = useState(mataKuliah.idJadwalMataKuliah)
    const [nama, setNama] = useState(mataKuliah.namaMataKuliah)
    const [hari, setHari] = useState(mataKuliah.hari)
    const [jamMulai, setJamMulai] = useState(mataKuliah.jam_mulai)
    const [jamSelesai, setJamSelesai] = useState(mataKuliah.jam_selesai)
    const [kelas, setKelas] = useState(mataKuliah.kelas)
    const [sesiKelas, setSesiKelas] = useState(mataKuliah.sesi)
    const [modal, setModal] =useState(false);
    const [isMutating, setIsMutating] =useState(false)

    const router = useRouter();

    function handleChange(){
        setModal(!modal)
    }

    async function handleUpdate(e){
        setIsMutating(true)
        e.preventDefault();
        await fetch(`http://localhost:3000/api/homeAdmin`,{
            method:"PATCH",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idJadwalMataKuliah:idJadwalMataKuliah,
                nama:nama,
                hari:hari,
                jamMulai: jamMulai,
                jamSelesai: jamSelesai,
                kelas:kelas,
                sesiKelas:sesiKelas
            })
        })
        setIsMutating(false)

        router.refresh()
        setModal(false)
    }
    
    return (
        <div>

            <button className="btn m-3 text-white btn-info btn-sm" onClick={handleChange}>Update</button>
            <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle"></input>
            
            <div className="modal ">
                <div className="w-3/5 overflow-scroll overflow-x-hidden p-10 rounded-2xl bg-white text-black">
                    <h3 className="font-bold text-lg">Edit Mata Kuliah : {mataKuliah.namaMataKuliah}</h3>
                    <form onSubmit={handleUpdate}>
                        <div className="form-control">
                            <label className="label font-bold">Nama Mata Kuliah</label>
                            <input type="text" value={nama} onChange={(e)=> setNama(e.target.value)} className="input w-full input-berdered bg-white text-black border-cyan-400 border-1" placeholder="Input Nama Mata Kuliah"></input>
                        </div>
                        <div className="form-control">
                            <label className="label font-bold">Kelas</label>
                            <select value={kelas} onChange={(e)=> setKelas(e.target.value)} className="input w-full input-berdered bg-white text-black border-cyan-400 border-1">
                                <option value="A" >A</option>
                                <option value="B" >B</option>
                            </select>
                        </div>
                        <div className="form-control">
                            <label className="label font-bold">Hari</label>
                            <select value={hari} onChange={(e)=> setHari(e.target.value)} className="input w-full input-berdered bg-white text-black border-cyan-400 border-1">
                                <option value="Senin">Senin</option>
                                <option value="Selasa">Selasa</option>
                                <option value="Rabu">Rabu</option>
                                <option value="Kamis">Kamis</option>
                                <option value="Jumat">Jumat</option>

                            </select>
                        </div>
                        <div className="form-control">
                            <label className="label font-bold">Sesi Kelas</label>
                            <select value={sesiKelas} onChange={(e)=> setSesiKelas(e.target.value)} className="input w-full input-berdered bg-white text-black border-cyan-400 border-1">
                                <option value="Kuliah">Kuliah</option>
                                <option value="Praktikum">Praktikum</option>
                                <option value="Responsi">Responsi</option>
                            </select>
                        </div>
                        <div className="form-control">
                            <label className="label font-bold">Jam Mulai</label>
                            <input type="text" value={jamMulai} onChange={(e)=> setJamMulai(e.target.value)} className="input w-full input-berdered bg-white text-black border-cyan-400 border-1" placeholder="Input Jam Mulai"></input>
                        </div>
                        <div className="form-control">
                            <label className="label font-bold">Jam Selesai</label>
                            <input type="text" value={jamSelesai} onChange={(e)=> setJamSelesai(e.target.value)} className="input w-full input-berdered bg-white text-black border-cyan-400 border-1" placeholder="Jam Selesai"></input>
                        </div>
                        <div className="modal-action">
                            <button className="btn bg-cyan-700 text-white border-none" type="button" onClick={handleChange}>Close</button>
                            {!isMutating? (
                            <button className="btn btn-primary hover:bg-green-700 bg-cyan-700 text-white border-none" type="submit">Update</button>   
                            ):(
                            <button type="button" className="btn loading">Updating . . .</button>
                            )}

                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}