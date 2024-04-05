'use client'
import { SyntheticEvent,useRef,useState } from "react"
import { useRouter } from "next/navigation"
import classNames from "classnames";

export default function CekBentrok(hasilCek){
    const [modal, setModal] = useState(false);
    const [hasil, setHasil] = useState(hasilCek);
    const [status, setStatus] = useState(hasilCek.statusCek)
    function handleChange(){
        setModal(!modal)
    }
    // console.log(status)
    return(
        <div>
            <button className="float-left btn border-none text-white bg-green-700 hover:bg-green-800 mt-5" onClick={handleChange}>Cek Bentrok</button>
            <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle"></input>
            <div className="modal">
                <div className="overflow-scroll no-scrollbar modal-box bg-white text-black">
                    <h1 className="my-2 font-bold">Hasil cek bentrok jadwal kuliah :</h1>
                    <p className="text-sm lg:text-base">{hasilCek.children}</p>
                    <h1 className="my-2 font-bold">Hasil cek bentrok jadwal ujian :</h1>
                    <p className="my-2 text-sm lg:text-base">{hasilCek.cekUjian}</p>
                    <button className="btn btn-primary bg-cyan-700 text-white border-none" onClick={handleChange}>Tutup</button>
                </div>
            </div>
        </div>
    )
}
