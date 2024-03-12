'use client'
import { useState } from "react"
import PDFFIle from "./PDFFile"
import { PDFDownloadLink } from "@react-pdf/renderer"

export default function ModalPrint(jadwalMahasiswa){
    const [modal, setModal] = useState(false)
    

    function handleChange(){
        setModal(!modal)
    }

    return (
        <div>
            <button className='float-left btn border-none text-white bg-green-700 hover:bg-green-800 mt-5 mx-3' onClick={handleChange}>Print PDF</button>
            <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle"></input>
            <div className="modal">
                <div className="modal-box bg-white text-black">
                    <p>{jadwalMahasiswa.children.namaMataKuliah}</p>
                    {/* <PDFFIle>{jadwalMahasiswa}</PDFFIle> */}
                    {/* <PDFDownloadLink document={<PDFFIle/>} fileName="Hasil_Print">
                       <button>Download</button>
                    </PDFDownloadLink> */}
                    <button className="btn btn-primary bg-cyan-700 text-white border-none" onClick={handleChange}>Confirm</button>
                </div>
            </div>
        </div>
    )
}