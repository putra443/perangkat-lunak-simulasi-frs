"use client"
import { useRouter } from "next/navigation"
import { useState } from "react";

export default function DeleteMataKuliah(mataKuliah){
    const[idMataKuliah, setId] = useState(mataKuliah.idJadwalMataKuliah)
    const [modal, setModal] =useState(false);
    const [isMutating, setIsMutating] =useState(false)

    const router = useRouter();

    function handleChange(){
        setModal(!modal)
    }

    async function handleDelete(idMataKuliah){
        setIsMutating(true)
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/homeAdmin`,{
            method:"DELETE",
            headers:{
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                idMataKuliah:idMataKuliah
            })  
        })

        setIsMutating(false)

        router.refresh()
        setModal(false)
    }
    
    return (
        <div>

            <button className="btn m-3 btn-error bg-red-600 hover:bg-red-700 btn-sm text-white" onClick={handleChange}>Hapus</button>
            <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle"></input>
            
            <div className="modal">
                <div className="modal-box text-black bg-white">
                    <h3 className="text-left font-bold text-lg">HAPUS</h3> 
                    <p className="font-bold text-lg">Apakah anda yakin akan menghapus jadwal mata kuliah {mataKuliah.namaMataKuliah}?</p>

                        <div className="modal-action">
                            <button className="btn bg-cyan-600 hover:bg-cyan-900 text-white border-none" type="button" onClick={handleChange}>Tutup</button>
                            {!isMutating? (
                            <button className="btn btn-primary bg-cyan-600 text-white border-none hover:bg-red-600" type="button" onClick={() => handleDelete(mataKuliah.idMataKuliah)}>Hapus</button>   
                            ):(
                            <button type="button" className="btn loading">Sedang menghapus . . .</button>
                            )}
                        </div>
                </div>
            </div>
        </div>
    )
}