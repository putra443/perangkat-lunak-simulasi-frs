'use client'
import { SyntheticEvent,useState } from "react"
import { useRouter } from "next/navigation"



export default function cekBentrok(hasilCek){
    const [modal, setModal] = useState(false);
    const [hasil, setHasil] = useState(hasilCek);
    function handleChange(){
        setModal(!modal)
    }
    // console.log(hasil.children)
    if(hasil.children==true){
        const string = "asdasd"
    }else{
        const string = ""
    }
    
    return(
        <div>
            <button className="btn border-none text-white bg-green-700 hover:bg-green-800 mt-5" onClick={handleChange}>Cek Bentrok</button>
            <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle"></input>
            <div className="modal">
                <div className="modal-box bg-white text-black">
                    <p>{hasilCek.children}</p>
                    <button className="btn btn-primary bg-cyan-700 text-white border-none" onClick={handleChange}>Confirm</button>
                </div>
            </div>
        </div>
    )
}