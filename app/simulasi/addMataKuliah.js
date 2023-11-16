"use client"
import { SyntheticEvent,useEffect,useState } from "react"
import { useRouter } from "next/navigation"
import { list } from "postcss"
import { data } from "autoprefixer"

export default function addMataKuliah(mataKuliah){
    const[idMataKuliah, setId] = useState(mataKuliah.idMataKuliah)
    const [nama, setNama] = useState("")
    const [jamMulai, setJamMulai] = useState("")
    const [jamSelesai, setJamSelesai] = useState("")
    const [modal, setModal] =useState(false);
    const [isMutating, setIsMutating] =useState(false)

    const router = useRouter();

    function handleChange(){
        setModal(!modal)
    }

    async function handleSubmit(e){
        setIsMutating(true)
        e.preventDefault();
        await fetch("http://localhost:3000/api/post",{
            method:"POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nama:nama,
                jamMulai: jamMulai,
                jamSelesai: jamSelesai
            })
        })

        setIsMutating(false)

        setNama("")
        setJamMulai("")
        setJamSelesai("")
        router.refresh()
        setModal(false)
    }
    const data = mataKuliah
    // console.log(data);

    return (
        <div>

            <button className="btn bg-green-700 hover:bg-green-800 text-white border-none" onClick={handleChange}>Add Mata Kuliah Baru</button>
            <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle"></input>
            
            <div className="modal">
                <div className="modal-box bg-white text-black">
                    <h3 className="font-bold text-lg">Tambah Mata Kuliah</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-control">
                            <label className="label font-bold">Nama Mata Kuliah</label>
                            {/* <input type="text" value={nama} onChange={(e)=> setNama(e.target.value)} className="input w-full input-berdered bg-white text-black border-cyan-400 border-1" placeholder="Input Nama Mata Kuliah"></input> */}
                            <select className="input w-full input-berdered bg-white text-black border-cyan-400 border-1">
                                <option value="" className="input w-full input-berdered bg-white text-black border-cyan-400 border-1">Pilih Mata Kuliah</option> 
                                
                            </select>
                        </div>
                        <div className="form-control">
                            <label className="label font-bold">Kelas</label>
                            <select className="input w-full input-berdered bg-white text-black border-cyan-400 border-1">
                                <option value="" className="input w-full input-berdered bg-white text-black border-cyan-400 border-1">Pilih Kelas</option> 
                                
                            </select>
                        </div>
                        <div className="modal-action">
                            <button className="btn bg-cyan-700 text-white border-none" type="button" onClick={handleChange}>Close</button>
                            {!isMutating? (
                            <button className="btn btn-primary bg-cyan-700 text-white border-none" type="submit">Save</button>   
                            ):(
                            <button type="button" className="btn loading">Saving . . .</button>
                            )}

                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}