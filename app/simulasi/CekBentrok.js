'use client'
import { useState } from "react"


export default function CekBentrok(hasilCek){
    const [modal, setModal] = useState(false);
    function handleChange(){
        setModal(!modal)
    }
    return(
        <div>
            <button className="float-left btn border-none text-white bg-green-700 hover:bg-green-800 mt-5" onClick={handleChange}>Cek Bentrok</button>
            <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle"></input>
            <div className="modal">
                <div className="overflow-scroll no-scrollbar modal-box bg-white text-black">
                    <h1 className="my-2 font-bold lg:text-xl text-lg">Hasil cek bentrok jadwal kuliah :</h1>
                    <p style={{ whiteSpace: 'pre-line' }} className="text-sm lg:text-base">{hasilCek.children}</p>
                    <h1 className="my-2 font-bold lg:text-xl text-lg">Hasil cek bentrok jadwal ujian :</h1>
                    <p style={{ whiteSpace: 'pre-line' }} className="my-2 text-sm lg:text-base">{hasilCek.cekUjian}</p>
                    <button className="btn btn-primary bg-cyan-700 text-white border-none float-right" onClick={handleChange}>Tutup</button>
                </div>
            </div>
        </div>
    )
}
