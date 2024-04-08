"use client"
import { SyntheticEvent,useState } from "react"
import { useRouter } from "next/navigation"

export default function UpdateMataKuliah(mataKuliah){
    const[idMataKuliah, setId] = useState(mataKuliah.idMataKuliah)
    const [nama, setNama] = useState(mataKuliah.namaMataKuliah)
    const [jamMulai, setJamMulai] = useState(mataKuliah.jam_mulai)
    const [jamSelesai, setJamSelesai] = useState(mataKuliah.jam_selesai)
    const [modal, setModal] =useState(false);
    const [isMutating, setIsMutating] =useState(false)

    const router = useRouter();

    function handleChange(){
        setModal(!modal)
    }

    async function handleUpdate(e){
        setIsMutating(true)
        e.preventDefault();
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/post`,{
            method:"PATCH",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                idMataKuliah:idMataKuliah,
                nama:nama,
                jamMulai: jamMulai,
                jamSelesai: jamSelesai
            })
        })
        setIsMutating(false)

        router.refresh()
        setModal(false)
    }
    
    return (
        <div>

            <button className="btn btn-info btn-sm" onClick={handleChange}>Edit Mata Kuliah</button>
            <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle"></input>
            
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Edit Mata Kuliah {mataKuliah.namaMataKuliah}</h3>
                    <form onSubmit={handleUpdate}>
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
                            <button className="btn btn-primary" type="submit">Update</button>   
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