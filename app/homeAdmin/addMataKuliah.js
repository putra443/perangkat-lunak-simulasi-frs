"use client"
import { SyntheticEvent,useState } from "react"
import { useRouter } from "next/navigation"

export default function AddMataKuliah(){
    const [nama, setNama] = useState("")
    const [kode, setKode] = useState("")
    const [hari, setHari] = useState("Senin")
    const [jamMulai, setJamMulai] = useState("")
    const [jamSelesai, setJamSelesai] = useState("")
    const [kelas, setKelas] = useState("A")

    const [sesiKelas, setSesiKelas] = useState("Kuliah")

    const [modal, setModal] =useState(false);
    const [isMutating, setIsMutating] =useState(false)

    const router = useRouter();

    function handleChange(){
        setModal(!modal)
    }
    
    async function handleSubmit(e){
        setIsMutating(true)
        e.preventDefault();
        await fetch("http://localhost:3000/api/homeAdmin",{
            method:"POST",
            body: JSON.stringify({
                kode:kode,
                nama:nama,
                hari:hari,
                jamMulai: jamMulai,
                jamSelesai: jamSelesai,
                sesiKelas:sesiKelas,
                kelas:kelas
            })
        })

        setIsMutating(false)
        // console.log(nama,jamMulai,jamSelesai,2," ",hari,3, " ", sesiKelas);
        setKode("")
        setNama("")
        setJamMulai("")
        setJamSelesai("")
        setHari("Senin")
        setSesiKelas("Kuliah")
        setKelas("A")
        router.refresh()
        setModal(false)
        
    }
    
    return (
        <div>

            <button className="btn bg-green-700 hover:bg-green-800 text-white border-none" onClick={handleChange}>Tambah Mata Kuliah Baru</button>
            <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle"></input>
            
            <div className="modal ">
                <div className=" lg:w-3/5  overflow-scroll overflow-x-hidden p-10 rounded-2xl  bg-white text-black">
                    <h1 className="font-bold text-2xl">Tambah Mata Kuliah</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-control">
                            <label className="label font-bold">Kode Mata Kuliah</label>
                            <input type="text" value={kode} onChange={(e)=> setKode(e.target.value)} className="input w-full input-berdered bg-white text-black border-cyan-400 border-1" placeholder="Input Nama Mata Kuliah"></input>
                        </div>
                        <div className="form-control">
                            <label className="label font-bold">Nama Mata Kuliah</label>
                            <input type="text" value={nama} onChange={(e)=> setNama(e.target.value)} className="input w-full input-berdered bg-white text-black border-cyan-400 border-1" placeholder="Input Nama Mata Kuliah"></input>
                        </div>
                        <div className="form-control">
                            <label className="label font-bold">Kelas</label>
                            <select value={kelas} onChange={(e)=> setKelas(e.target.value)} className="input w-full input-berdered bg-white text-black border-cyan-400 border-1">
                                <option value="A">A</option>
                                <option value="B">B</option>
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
                            <label className="label font-bold">Jam Mulai Kuliah</label>
                            <input type="text" value={jamMulai} onChange={(e)=> setJamMulai(e.target.value)} className="input w-full input-berdered bg-white text-black border-cyan-400 border-1" placeholder="Input Jam Mulai"></input>
                        </div>
                        <div className="form-control">
                            <label className="label font-bold">Jam Selesai Kuliah</label>
                            <input type="text" value={jamSelesai} onChange={(e)=> setJamSelesai(e.target.value)} className="input w-full input-berdered bg-white text-black border-cyan-400 border-1" placeholder="Jam Selesai"></input>
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