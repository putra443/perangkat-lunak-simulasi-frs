
'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeleteMahasiswa(listUser){
    const [idMahasiswa, setIdMahasiswa] = useState("")
    const [modal, setModal] =useState(false);
    const [isMutating, setIsMutating] =useState(false)

    const router = useRouter();
    function handleChange(){
        setModal(!modal)
    }
    async function handleSubmit(e){
        setIsMutating(true)
        e.preventDefault();
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/usersAdmin`,{
            method:"DELETE",
            body: JSON.stringify({
                idMahasiswa:idMahasiswa
            })
        })
        setIdMahasiswa("")
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
                            <label className="label font-bold">Pilih Mahasiswa yang ingin dihapus : </label>
                            <select onChange={(e) => setIdMahasiswa(e.target.value)} className="input w-full input-berdered bg-white text-black border-cyan-400 border-1">
                               <option>Pilih Mahasiswa</option>
                               {listUser.children.filter((user)=>(
                                user.role==="Mahasiswa" ? user : null
                               )).map((user, index)=>(
                                <option key={index} value={user.idUser}>{user.fullname}</option>
                               ))
                               }
                            </select>
                        </div>
                        <div className="modal-action">
                            <button className="btn bg-cyan-600 hover:bg-cyan-900 text-white border-none" type="button" onClick={handleChange}>Tutup</button>
                            {!isMutating? (
                            <button className="btn btn-primary bg-cyan-600 text-white border-none hover:bg-red-600" type="submit">Hapus</button>   
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