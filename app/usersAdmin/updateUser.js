"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function UpdateMataKuliah(user){
    console.log(user.children.role);
    const [userId, setUserId] = useState(user.children.idUser)
    const[role, setRole] = useState(user.children.role)
    const [modal, setModal] =useState(false);
    const [isMutating, setIsMutating] =useState(false)

    const router = useRouter();
    // console.log(user);
    function handleChange(){
        setModal(!modal)
    }

    async function handleUpdate(e){
        setIsMutating(true)
        e.preventDefault();
        await fetch(`http://localhost:3000/api/usersAdmin`,{
            method:"PATCH",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                role : role,
                userId:userId
            })
        })
        setIsMutating(false)

        router.refresh()
        setModal(false)
    }
    
    return (
        <div>

            <button className="btn m-3 text-white btn-info btn-sm" onClick={handleChange}>Update</button>
            <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle"></input>
            
            <div className="modal ">
                <div className="w-3/5 overflow-scroll overflow-x-hidden p-10 rounded-2xl bg-white text-black">
                    <h3 className="font-bold text-lg">Edit Role User : {user.children.fullname}</h3>
                    <form onSubmit={handleUpdate}>
                        <div className="form-control">
                            <label className="label font-bold">Kelas</label>
                            <select value={role} onChange={(e)=> setRole(e.target.value)} className="input w-full input-berdered bg-white text-black border-cyan-400 border-1">
                                <option value="Admin" >Admin</option>
                                <option value={"mahasiswa" || "Mahasiswa"} >Mahasiswa</option>
                                <option value={"Admin / Mahasiswa" || "admin / mahasiswa"}>Admin / Mahasiswa</option>
                            </select>
                        </div>
                        <div className="modal-action">
                            <button className="btn bg-cyan-700 text-white border-none" type="button" onClick={handleChange}>Close</button>
                            {!isMutating? (
                            <button className="btn btn-primary hover:bg-green-700 bg-cyan-700 text-white border-none" type="submit">Update</button>   
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