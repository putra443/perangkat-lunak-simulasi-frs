
'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeleteMahasiswa(){
    const [modal, setModal] =useState(false);
    const [isMutating, setIsMutating] =useState(false)

    const router = useRouter();
    function handleChange(){
        setModal(!modal)
    }
    async function handleSubmit(e){
        // console.log(matakuliah.user);
        setIsMutating(true)
        // e.preventDefault();
        await fetch(`http://localhost:3000/api/usersAdmin`,{
            method:"DELETE",
            body: JSON.stringify({
                
            })
        })

        setIsMutating(false)
        router.refresh()
        setModal(false)
    }
    return (
        <div>

            <button className="btn hover:bg-red-800 bg-red-600 text-white border-none" onClick={handleChange}>Hapus Mahasiswa</button>
            <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle"></input>
            
            <div className="modal">
                <div className="lg:w-3/5 overflow-hidden overflow-x-hidden p-10 rounded-2xl  bg-white text-black">
                    <h3 className="font-bold text-lg">HAPUS</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-control">
                            <label className="label font-bold">Apakah anda yakin ingin menghapus semua Mahasiswa?</label>
                        </div>
                        <div className="modal-action">
                            <button className="btn bg-cyan-700 text-white border-none" type="button" onClick={handleChange}>Tutup</button>
                            {!isMutating? (
                            <button className="btn btn-primary hover:bg-red-800 bg-red-600 text-white border-none" type="submit">Hapus</button>   
                            ):(
                            <button type="button" className="btn loading">Sedang menghapus . . .</button>
                            )}

                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}