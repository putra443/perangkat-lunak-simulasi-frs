"use client"
import { SyntheticEvent,useEffect,useState } from "react"
import { useRouter } from "next/navigation"
import { Josefin_Sans } from "next/font/google"

export default function addMataKuliah(mataKuliah){
    const[idMataKuliah, setId] = useState(mataKuliah.idMataKuliah)
    const [nama, setNama] = useState("")
    const [kelas,setKelas] = useState("A")
    const [modal, setModal] =useState(false);
    const [isMutating, setIsMutating] =useState(false)

    const router = useRouter();

    function handleChange(){
        setModal(!modal)
    }

    async function handleSubmit(e){
        setIsMutating(true)
        e.preventDefault();
        await fetch("http://localhost:3000/api/simulasi",{
            method:"POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nama:nama,
                kelas:kelas
            })
        })

        setIsMutating(false)

        setNama("")
        setKelas("A")
        router.refresh()
        setModal(false)
    }
    // const data = Array.prototype.map.call(mataKuliah, item => item)
    // console.log(mataKuliah);
    return (
        <div>

            <button className="btn bg-green-700 hover:bg-green-800 text-white border-none" onClick={handleChange}>Add Mata Kuliah Baru</button>
            <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle"></input>
            
            <div className="modal">
                <div className="w-3/5  overflow-scroll overflow-x-hidden p-10 rounded-2xl  bg-white text-black">
                    <h3 className="font-bold text-lg">Tambah Mata Kuliah</h3>
                    <form onSubmit={handleSubmit}>
                        <div className="form-control">
                            <label className="label font-bold">Pilih Mata Kuliah</label>
                            {/* <input type="text" value={nama} onChange={(e)=> setNama(e.target.value)} className="input w-full input-berdered bg-white text-black border-cyan-400 border-1" placeholder="Input Nama Mata Kuliah"></input> */}
                            <select onChange={(e)=>setNama(e.target.value)} className="input w-full input-berdered bg-white text-black border-cyan-400 border-1">
                                <option>Pilih Mata Kuliah</option>
                                {mataKuliah.children.map((mataKuliah)=>(
                                    <option key={mataKuliah.idMataKuliah}>{mataKuliah.namaMataKuliah}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-control">
                            <label className="label font-bold">Pilih Kelas</label>
                            <select onChange={(e)=>setKelas(e.target.value)} className="input w-full input-berdered bg-white text-black border-cyan-400 border-1">
                                <option value="A" className="input w-full input-berdered bg-white text-black border-cyan-400 border-1">A</option> 
                                <option value="B" className="input w-full input-berdered bg-white text-black border-cyan-400 border-1">B</option> 
                                
                            </select>
                        </div>
                        <div className="modal-action">
                            <button className="btn bg-cyan-700 text-white border-none" type="button" onClick={handleChange}>Close</button>
                            {!isMutating? (
                            <button className="btn btn-primary hover:bg-green-700 bg-cyan-700 text-white border-none" type="submit">Save</button>   
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