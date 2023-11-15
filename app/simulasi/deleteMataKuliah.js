"use client"
import { useRouter } from "next/navigation"
import { useState } from "react";

export default function deleteMataKuliah(mataKuliah){
    const[idMataKuliah, setId] = useState(mataKuliah.idMataKuliah)
    const [modal, setModal] =useState(false);
    const [isMutating, setIsMutating] =useState(false)

    const router = useRouter();

    function handleChange(){
        setModal(!modal)
    }

    async function handleDelete(){
        setIsMutating(true)
        await fetch(`http://localhost:3000/api/post`,{
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

            <button className="btn btn-error bg-red-600 hover:bg-red-700 btn-sm text-white" onClick={handleChange}>Delete</button>
            <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle"></input>
            
            <div className="modal">
                <div className="modal-box text-black bg-white">
                    <h3 className="font-bold text-lg">Apakah anda yakin akan menghapus mata kuliah {mataKuliah.nama}?</h3>
                    
                        <div className="modal-action">
                            <button className="btn text-white border-none" type="button" onClick={handleChange}>Close</button>
                            {!isMutating? (
                            <button className="btn btn-primary bg-cyan-600 text-white border-none hover:bg-red-600" type="button" onClick={() => handleDelete(mataKuliah.idMataKuliah)}>Delete</button>   
                            ):(
                            <button type="button" className="btn loading">Deleting . . .</button>
                            )}
                        </div>
                </div>
            </div>
        </div>
    )
}