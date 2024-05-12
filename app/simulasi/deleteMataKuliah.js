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
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/simulasi/${mataKuliah.user}`,{
            method:"DELETE",
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

            <button className="btn btn-error bg-red-600 hover:bg-red-700 btn-sm text-white" onClick={handleChange}>Hapus</button>
            <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle"></input>
            
            <div className="modal">
                <div className="modal-box text-black bg-white">
                    <h1 className="text-lg font-bold text-left">HAPUS</h1>
                    <h3 className="font-bold text-lg">Apakah anda yakin akan menghapus mata kuliah {mataKuliah.namaMataKuliah}?</h3>
                    
                        <div className="modal-action">
                            <button className="btn bg-cyan-600 hover:bg-cyan-900 text-white border-none" type="button" onClick={handleChange}>Tutup</button>
                            {!isMutating? (
                            <button className="btn btn-primary bg-cyan-600 text-white border-none hover:bg-red-600" type="button" onClick={() => handleDelete(mataKuliah.idMataKuliah,mataKuliah.namaMataKuliah)}>Hapus</button>   
                            ):(
                            <button type="button" className="btn loading">Menghapus . . .</button>
                            )}
                        </div>
                </div>
            </div>
        </div>
    )
}