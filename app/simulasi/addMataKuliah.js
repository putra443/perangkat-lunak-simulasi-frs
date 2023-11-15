"use client"
import { SyntheticEvent,useState } from "react"
import { useRouter } from "next/navigation"

export default function addMataKuliah(){
    const [nama, setNama] = useState("")
    const [jamMulai, setJamMulai] = useState("")
    const [jamSelesai, setJamSelesai] = useState("")
    const [modal, setModal] =useState(false);
    const [isMutating, setIsMutating] =useState(false)

    const router = useRouter();

    function handleChange(){
        setModal(!modal)
    }

    async function handleSubmit(e){
        setIsMutating(true)
        e.preventDefault();
        await fetch("http://localhost:3000/api/post",{
            method:"POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nama:nama,
                jamMulai: jamMulai,
                jamSelesai: jamSelesai
            })
        })

        setIsMutating(false)

        setNama("")
        setJamMulai("")
        setJamSelesai("")
        router.refresh()
        setModal(false)
    }
    
    return (
        <div>

            <button className="btn bg-cyan-700 text-white border-none" onClick={handleChange}>Add Mata Kuliah Baru</button>
            <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle"></input>
            
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Tambah Mata Kuliah</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-control">
                            <label className="label font-bold">Nama Mata Kuliah</label>
                            <input type="text" value={nama} onChange={(e)=> setNama(e.target.value)} className="input w-full input-berdered" placeholder="Input Nama Mata Kuliah"></input>
                        </div>
                        <div className="form-control">
                            <label className="label font-bold">Jam Mulai</label>
                            <input type="text" value={jamMulai} onChange={(e)=> setJamMulai(e.target.value)} className="input w-full input-berdered" placeholder="Input Jam Mulai"></input>
                        </div>
                        <div className="form-control">
                            <label className="label font-bold">Jam Selesai</label>
                            <input type="text" value={jamSelesai} onChange={(e)=> setJamSelesai(e.target.value)} className="input w-full input-berdered" placeholder="Jam Selesai"></input>
                        </div>
                        <div className="modal-action">
                            <button className="btn" type="button" onClick={handleChange}>Close</button>
                            {!isMutating? (
                            <button className="btn btn-primary" type="submit">Save</button>   
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