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
    console.log(status)
    
    const classnameTrue = classNames(
        "mx-3",
        "btn",
        "border-none",
        "text-white",
        "bg-green-700",
        "hover:bg-green-700",
        "mt-5",
        "cursor-not-allowed",
        "opacity-50"

    )
    const classnameFalse = classNames(
        "mx-3",
        "btn",
        "border-none",
        "text-white",
        "bg-green-700",
        "hover:bg-green-800",
        "mt-5",

    )
    return(
        <div>
            <button className="float-left btn border-none text-white bg-green-700 hover:bg-green-800 mt-5" onClick={handleChange}>Cek Bentrok</button>
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