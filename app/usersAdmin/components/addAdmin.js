"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddAdmin(){
    const [email, setEmail] = useState("")
    const [fullname, setFullname] = useState("")
    const [role, setRole] = useState("Admin")

    const [modal, setModal] = useState(false)
    const [isMutating, setIsMutating] =useState(false)

    const router = useRouter()

    function handleChange(){
        setModal(!modal)
    }

    async function handleSubmit(e){
        setIsMutating(true)
        e.preventDefault();
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/usersAdmin`,{
            method:"POST",
            body: JSON.stringify({
                email:email,
                fullname:fullname,
                role:role
            })
        })
        setIsMutating(false)
        setModal(false)
        setEmail("")
        setFullname("")
        router.refresh()
    }

    return(
        <div>

            <button className="mb-5 btn bg-green-700 hover:bg-green-800 text-white border-none" onClick={handleChange}>Tambah Admin</button>
            <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle"></input>
            
            <div className="modal ">
                <div className=" lg:w-3/5  overflow-scroll overflow-x-hidden p-10 rounded-2xl  bg-white text-black">
                    <h1 className="font-bold text-2xl">Tambah Admin</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-control">
                            <label className="label font-bold">Email</label>
                            <input type="text" value={email} onChange={(e)=> setEmail(e.target.value)} className="input w-full input-berdered bg-white text-black border-cyan-400 border-1" placeholder="....@gmail.com"></input>
                        </div>
                        <div className="form-control">
                            <label className="label font-bold">Nama Lengkap</label>
                            <input type="text" value={fullname} onChange={(e)=> setFullname(e.target.value)} className="input w-full input-berdered bg-white text-black border-cyan-400 border-1" placeholder="Nama Lengkap"></input>
                        </div>
                        <div className="modal-action">
                            <button className="btn bg-cyan-700 text-white border-none" type="button" onClick={handleChange}>Tutup</button>
                            {!isMutating? (
                            <button className="btn btn-primary hover:bg-green-700 bg-cyan-700 text-white border-none" type="submit">Simpan</button>   
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