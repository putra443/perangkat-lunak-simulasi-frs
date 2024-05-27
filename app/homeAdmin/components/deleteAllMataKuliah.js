
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
        e.preventDefault();
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/homeAdmin`,{
            method:"DELETE",
            body: JSON.stringify({
                deleteAll: true
            })
        })

        setIsMutating(false)
        router.refresh()
        setModal(false)
    }
    return (
        <div>

            <button className="mt-5 btn hover:bg-red-800 bg-red-600 text-white border-none" onClick={handleChange}>Hapus Semua Mata Kuliah</button>
            <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle"></input>
            
            <div className="modal">
                <div className="lg:w-3/5 overflow-hidden overflow-x-hidden p-10 rounded-2xl  bg-white text-black">
                    <h3 className="font-bold text-lg">HAPUS</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-control">
                            <label className="label font-bold">Apakah anda yakin ingin menghapus semua jadwal mata kuliah?</label>
                        </div>
                        <div className="modal-action">
                            <button className="btn bg-cyan-600 hover:bg-cyan-900 text-white border-none" type="button" onClick={handleChange}>Tutup</button>
                            {!isMutating? (
                            <button className="btn btn-primary hover:bg-red-600 bg-cyan-600 text-white border-none" type="submit">Hapus</button>   
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