'use client'
import { Kelly_Slab } from "next/font/google"
import { useRouter } from "next/navigation"
import PapaParser from 'papaparse'
import { useState } from 'react'


export default function CsvUpload(){
    const [hari, setHari] = useState("Senin")

    const [dataExcel, setDataExcel] = useState()

    const [modal, setModal] =useState(false);
    const [isMutating, setIsMutating] =useState(false)

    const router = useRouter();

    class jadwal{
        constructor(nama,hari, jamMulai, jamSelesai, kelas, sesi){
            this.nama = nama
            this.hari = hari
            this.jamMulai = jamMulai
            this.jamSelesai = jamSelesai
            this.kelas = kelas
            this.sesi = sesi
        }  
    } 

    const acceptableCSVFileTypes = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, .csv"

    function handleChange(){
        setModal(!modal)
    }

    function checkValue(value){
        console.log(value);
    }

   

    async function onFileChangeHandler(e){
            e.preventDefault();
            setIsMutating(true)
            if(!dataExcel)return
            
            let tempNama = ""
            let tempJamMulai = ""
            let tempJamSelesai = ""
            let tempKelas = ""
            let tempSesi=""
            let dataJson
            

            PapaParser.parse(dataExcel,{
                skipEmptyLines:true,
                skipFirstNLines: 1,
                fastMode:true,
                delimiter:';',
                complete:function (results) {
                    const res = results.data
                    console.log(JSON.stringify({data:res}))
                }
            })
            setHari("Senin")
            setIsMutating(false)
            
            setModal(false)
            router.refresh()   
    }
    async function upload(element){
        await fetch("http://localhost:3000/api/homeAdmin",{
                    method:"POST",
                    body:JSON.stringify({
                        nama:element.nama,
                        hari:hari,
                        jamMulai:element.jamMulai,
                        jamSelesai:element.jamSelesai,
                        kelas:element.kelas,
                        sesiKelas:element.sesi
                    })
                    })
    }

        return(
            <div>
                <button className="btn bg-green-700 hover:bg-green-800 text-white border-none" onClick={handleChange}>Upload File Excel</button>
                <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle"></input>
                
                <div className={`modal`}>
                    <div className=" w-3/5  overflow-scroll overflow-x-hidden p-10 rounded-2xl  bg-white text-black">
                        <h1 className="font-bold text-2xl">Tambah Mata Kuliah</h1>
                        <form onSubmit={onFileChangeHandler}>
                            <div className="form-control">
                                <label className="label font-bold">Pilih Hari</label>
                                <select value={hari} onChange={(e)=> setHari(e.target.value)} className="input w-full input-berdered bg-white text-black border-cyan-400 border-1">
                                    <option value="Senin">Senin</option>
                                    <option value="Selasa">Selasa</option>
                                    <option value="Rabu">Rabu</option>
                                    <option value="Kamis">Kamis</option>
                                    <option value="Jumat">Jumat</option>
                                </select>
                            </div>
                            <div className="form-control">
                                <label className="label font-bold">Upload File Excel Disini : </label>
                                <input onChange={(e)=>setDataExcel(e.target.files[0])} type="file" name="file" id="file" accept={acceptableCSVFileTypes} className="m-3 p-3 rounded-2xl btn-primary hover:bg-green-700 bg-cyan-700 text-white border-none"></input>
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