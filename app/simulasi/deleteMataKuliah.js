"use client"
import { useRouter } from "next/navigation"
import { useState } from "react";

export default function DeleteMataKuliah(mataKuliah){
    const[idMataKuliah, setId] = useState(mataKuliah.idJadwalMataKuliah)
    const[namaMataKuliah, setIdUjian] = useState(mataKuliah.namaMataKuliah)
    const [modal, setModal] =useState(false);
    const [isMutating, setIsMutating] =useState(false)
    const router = useRouter();
    // console.log(mataKuliah.idJadwalMataKuliah);
    // console.log(mataKuliah.namaMataKuliah);
    function handleChange(){
        setModal(!modal)
    }

    async function handleDelete(){
        setIsMutating(true)
        await fetch(`http://localhost:3000/api/simulasi`,{
            method:"DELETE",
            headers:{
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                idJadwalMataKuliah:idMataKuliah,
                namaMataKuliah:namaMataKuliah
            })  
        })

        setIsMutating(false)

        router.refresh()
        setModal(false)
    }
    
    return (
        <div>

            <button className="btn btn-error bg-red-600 hover:bg-red-700 btn-sm text-white" onClick={handleChange}>Delete</button>
            <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle"></input>
            
            <div className="modal">
                <div className="modal-box text-black bg-white">
                    <h3 className="font-bold text-lg">Apakah anda yakin akan menghapus mata kuliah {mataKuliah.nama}?</h3>
                    
                        <div className="modal-action">
                            <button className="btn text-white border-none" type="button" onClick={handleChange}>Close</button>
                            {!isMutating? (
                            <button className="btn btn-primary bg-cyan-600 text-white border-none hover:bg-red-600" type="button" onClick={() => handleDelete(mataKuliah.idMataKuliah,mataKuliah.namaMataKuliah)}>Delete</button>   
                            ):(
                            <button type="button" className="btn loading">Deleting . . .</button>
                            )}
                        </div>
                </div>
            </div>
        </div>
    )
}