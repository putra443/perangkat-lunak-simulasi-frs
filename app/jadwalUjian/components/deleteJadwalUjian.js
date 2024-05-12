"use client"
import { useRouter } from "next/navigation"
import { useState } from "react";

export default function DeleteJadwalUjian(jadwalUjian){
    const[idJadwalUjian, setId] = useState(jadwalUjian.idUjian)
    
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
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/homeAdmin/ujian`,{
            method:"DELETE",
            body: JSON.stringify({
                idUjian:idJadwalUjian,
            })  
        })

        setIsMutating(false)

        router.refresh()
        setModal(false)
    }
    
    return (
        <div>

            <button className=" mt-1.5 btn btn-error bg-red-600 hover:bg-red-700 btn-sm text-white" onClick={handleChange}>Hapus</button>
            <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle"></input>
            
            <div className="modal">
                <div className="modal-box text-black bg-white">
                    <h3 className="text-left font-bold text-lg">HAPUS</h3>
                    <p className="font-bold text-lg">Apakah anda yakin akan menghapus Jadwal Ujian {jadwalUjian.namaMataKuliah}?</p>
                    
                        <div className="modal-action">
                            <button className="btn text-white border-none" type="button" onClick={handleChange}>Tutup</button>
                            {!isMutating? (
                            <button className="btn btn-primary bg-cyan-600 text-white border-none hover:bg-red-600" type="button" onClick={() => handleDelete(jadwalUjian.idUjian)}>Hapus</button>   
                            ):(
                            <button type="button" className="btn loading">Sedang menghapus . . .</button>
                            )}
                        </div>
                </div>
            </div>
        </div>
    )
}