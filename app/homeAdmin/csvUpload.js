'use client'
import Papa from 'papaparse'
import { useState } from 'react'
export default function CsvUpload(){
    const [nama,setNama] = useState("")
    const [jamMulai, setJamMulai] = useState("")
    const [jamSelesai, setJamSelesai] = useState("")
    const [kelas, setKelas] = useState("")
    const [sesi, setSesi] = useState("")
    const [hari, setHari] = useState("Senin")

    const acceptableCSVFileTypes = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, .csv"
    var tempNama =""
    var tempKelas =""
    var tempSesi =""
    var tempWaktuMulai = 0
    var tempWaktuSelesai = 0

    function onFileChangeHandler(e){
        const data = e.target.files[0]
        
        Papa.parse(data,{
            skipEmptyLines: true,
            complete: function(results) {
                console.log(results.data);
                for (let i = 1; i < results.data.length; i++) {
                    for (let j = 1; j < results.data[i].length; j++) {
                        if(results.data[i][j]=="-"){
                            tempWaktuSelesai=j+6
                            upload()
                            tempWaktuMulai=0
                            tempWaktuSelesai=0
                            break;
                        }                        
                        if(results.data[i][j]!=""){
                            if(results.data[i][j]!="-"){
                                tempWaktuMulai=j+6
                                const element = results.data[i][j].split(':')
                                tempNama = element[0]
                                tempKelas = element[1]
                                tempSesi = element[2]
                                
                            }
                        }
                }
            }
        }
        })

    }
    async function upload(){
        await fetch("http://localhost:3000/api/homeAdmin",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                nama:tempNama,
                kelas:tempKelas,
                sesiKelas:tempSesi,
                jamMulai:tempWaktuMulai,
                jamSelesai:tempWaktuSelesai
            })
        })
    }

        return(
            <input 
                onChange={onFileChangeHandler} type="file" id="csvFileSelector" accept={acceptableCSVFileTypes} className=" w-1/6 m-3 btn btn-primary hover:bg-green-700 bg-cyan-700 text-white border-none"></input>
        )
}