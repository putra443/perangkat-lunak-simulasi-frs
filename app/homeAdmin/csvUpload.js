'use client'
import { data } from "autoprefixer"
import { useRouter } from "next/navigation"
import Papa from 'papaparse'
import { useState } from 'react'
export default function CsvUpload(){
    const [hari, setHari] = useState("Senin")

    const [dataExcel, setDataExcel] = useState()

    const [modal, setModal] =useState(false);
    const [isMutating, setIsMutating] =useState(false)

    const router = useRouter();

    const acceptableCSVFileTypes = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, .csv"
    let tempNama =""
    let tempKelas =""
    let tempSesi =""
    let tempWaktuMulai = 0
    let tempWaktuSelesai = 0

    function handleChange(){
        setModal(!modal)
    }

    function onFileChangeHandler(e){
        // e.preventDefault();
        setIsMutating(true)
        const file = dataExcel
        Papa.parse(file,{
            skipEmptyLines: true,
            worker:true,
            complete: function(results) {
                console.log(results.data);
                console.log(results.data.length);
                console.log(results.data[0].length);
                for (let i = 1; i < results.data.length; i++) {
                    for (let j = 0; j < 5; j++) {
                        if(j==0){
                            tempNama = results.data[i][j]
                        }
                        else if(j==1){
                            tempWaktuMulai = results.data[i][j]
                        }
                        else if(j==2){
                            tempWaktuSelesai = results.data[i][j]
                        }
                        else if(j==3){
                            tempKelas = results.data[i][j]
                        }
                        else if(j==4){
                            tempSesi = results.data[i][j]
                            upload()
                            
                        }
                    }
                }
            }
        })
        setIsMutating(false)
        router.refresh()
    }
    async function upload(){
        await fetch("http://localhost:3000/api/homeAdmin",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                nama:tempNama,
                hari:hari,
                jamMulai: tempWaktuMulai,
                jamSelesai: tempWaktuSelesai,
                sesiKelas:tempSesi,
                kelas:tempKelas
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
                                <input onChange={(e)=>setDataExcel(e.target.files[0])} type="file" id="csvFileSelector" accept={acceptableCSVFileTypes} className="m-3 p-3 rounded-2xl btn-primary hover:bg-green-700 bg-cyan-700 text-white border-none"></input>
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