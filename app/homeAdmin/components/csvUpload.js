'use client'
import { useRouter } from "next/navigation"
import PapaParser from 'papaparse'
import { useState} from 'react'
// import fs from 'fs'
import { Download } from "@phosphor-icons/react"


export default function CsvUpload(){
    const [hari, setHari] = useState("Senin")

    const [dataExcel, setDataExcel] = useState(null)
    const [parsedData, setParsedData] = useState(null)

    const [modal, setModal] =useState(false);
    const [isMutating, setIsMutating] =useState(false)

    const router = useRouter();

    const acceptableCSVFileTypes = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, .csv"

    function handleChange(){
        setModal(!modal)
    }

    function onFileChangeHandler(e){
            // e.preventDefault();
            setIsMutating(true)

            if(!dataExcel){
                alert("please select file")
                setIsMutating(false)
                return
            }
            
            PapaParser.parse(dataExcel,{
                header:true,
                skipEmptyLines:true,
                complete: function(result){
                    // console.log(result.data[0]);
                    upload(result.data)
                }
            })
            setDataExcel()
            setHari("Senin")
            setIsMutating(false)
            setModal(false)
            router.refresh()   
    }

    function downloadTemplate(){
        const headers = ['kode', 'nama_mata_kuliah', 'hari', 'jam_mulai', 'jam_selesai', 'kelas', 'sesi']
        const csv = headers.join(';') + '\n'
        const encodedURI = encodeURIComponent(csv)
        const blob = new Blob([csv], { type: 'text/csv' });
        const filename = 'template_jadwal_kuliah.csv'
        const url = window.URL.createObjectURL(blob)

        // fs.writeFileSync(filename, csv);
        const element = document.createElement('a')
        element.href = url
        element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodedURI)
        element.setAttribute('download', filename)
        document.body.appendChild(element)
        element.click()
        document.body.removeChild(element)
    }

    async function upload(res){
        await fetch("http://localhost:3000/api/homeAdmin",{
                method:"POST",
                body:JSON.stringify({
                    dataExcel:res
                })
                        
            })
    }


        return(
            <div>
                <button className="btn mt-5 bg-green-700 hover:bg-green-800 text-white border-none" onClick={handleChange}>Unggah File Excel</button>
                <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle"></input>
                
                <div className={`modal`}>
                    <div className=" lg:w-3/5 w-4/5  overflow-scroll overflow-x-hidden lg:p-10 p-5 rounded-2xl  bg-white text-black">
                        <h1 className="font-bold text-2xl">Tambah Mata Kuliah</h1>
                        <form onSubmit={onFileChangeHandler}>
                            <div className="form-control">
                                <label className="label font-bold">Upload File Excel Disini : </label>
                                <input onChange={(e)=>setDataExcel(e.target.files[0])} type="file" name="file" id="file" accept={acceptableCSVFileTypes} className=" text-sm lg:text-base lg:m-3  p-3 rounded-2xl btn-primary hover:bg-green-700 bg-cyan-700 text-white border-none"></input>
                            </div>
                            <div className="modal-action">
                                    <button className="btn bg-cyan-700 text-white border-none" type="button" onClick={handleChange}>Tutup</button>
                                    <button className="btn bg-cyan-700 text-white border-none" type="button" onClick={downloadTemplate}>Unduh Template</button> 
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