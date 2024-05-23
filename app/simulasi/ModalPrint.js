'use client'
import { useState, useEffect } from "react"
import { useSession } from 'next-auth/react';
import html2canvas from "html2canvas";
import html2canvaspro from 'html2canvas-pro'
import jsPDF from "jspdf";
import jsPDFautotable from "jspdf-autotable";

import logoifunpar from '@/assets/logoifunpar3.png'
import Image from "next/image";

export default function ModalPrint(jadwalMahasiswa){
    const [modal, setModal] = useState(false)
    const [loader, setLoader] = useState(false)
    const statusConflict = jadwalMahasiswa.statusConflict
    const curdate = new Date()
    const [currentTime, setCurrentTime] = useState(curdate)
    // console.log(statusConflict);
    const {data:session, status} = useSession()
    // console.log(jadwalMahasiswa);
    function handleChange(){
        setModal(!modal)
    }

    // useEffect(() => {
    //     const intervalId = setInterval(() => {
    //       setCurrentTime(new Date());
    //     }, 1000); // Update every second
    
    //     return () => clearInterval(intervalId);
    //   }, []);

    const options = { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit', 
        hour: '2-digit', 
        minute: '2-digit' 
      };

    // const downloadPDF = () => {
    //     const capture = document.querySelector('.actual-receipt')
    //     setLoader(true)
    //     html2canvaspro(capture).then((canvas)=>{
    //         const imgData = canvas.toDataURL('img/png',1)
    //         const doc = new jsPDF('p','mm','a4')
    //         const componentWidth = 208
    //         const componentHeight = canvas.height * componentWidth / canvas.width
    //         doc.addImage(imgData,'PNG',0,0,componentWidth,componentHeight)
    //         setLoader(false)
    //         doc.save(`SimulasiFRS-${session?.user?.name}.pdf`)
    //     })
    
    // }

    const downloadPDF = () => {
        const capture = document.querySelector('.actual-receipt').innerText
        const image = document.querySelector('.myImage')

        setLoader(true)
        const doc = new jsPDF('p','mm','a4')
        doc.setFontSize(9)
        doc.addImage(image,"png",140,15,60,18,"logoifunpar")
        let y = 20
        const lines = capture.split('\n')
        for(let i =0; i<8;i++){
            if(i==7){
                y+=5
            }
            if(lines[i]!=""){
                if(i==0 || i==1 || i==2){
                    doc.setFontSize(11)
                    doc.setFont("helvetica","bold")
                    doc.text(lines[i],10,y)
                    y+=8
                    doc.setFontSize(10)
                    doc.setFont("helvetica","normal")
                }
                // if(i==3 || i==4){
                //     doc.setFontSize(9)
                //     doc.text(lines[i],10,y)
                //     y+=5
                //     doc.setFontSize(10)
                // }
                else{
                    doc.text(lines[i],10,y)
                    y+=5  
                }
                 
            }
        }
        doc.setFontSize(13)
        doc.text("Jadwal Kuliah",10,y)
        const tableKuliah = document.querySelector('.actual-receipt .kuliah')
        const headers = Array.from(tableKuliah.querySelectorAll('thead th')).map(header => header.innerText)
        const rows = Array.from (tableKuliah.querySelectorAll('tbody tr')).map(row=> Array.from(row.querySelectorAll('td')).map(cell=> cell.innerText))

        doc.autoTable({
            head:[headers],
            body:rows,
            styles:{
                fillColor: [255, 255, 255],  
                textColor: [0, 0, 0], 
                lineColor: [0, 0, 0],
                fontSize:10,
                halign : 'center'
            },
            headStyles: {
                fillColor: [255, 255, 255],  // Header background color
                textColor: [0, 0, 0],  // Header text color
            },
            tableLineColor: [0, 0, 0],
            tableLineWidth: 0.1,
            startY: y+5,
            didDrawPage: (data)=>{
                const endY = data.cursor.y
                y=endY
                doc.text("Jadwal Ujian",10,y+10)

            },
            margin: {left: 10 , bottom:10,right:10}
        })

        const tableUjian = document.querySelector('.actual-receipt .ujian')
        const headersUjian = Array.from(tableUjian.querySelectorAll('thead th')).map(header => header.innerText)
        const rowsUjian = Array.from (tableUjian.querySelectorAll('tbody tr')).map(row=> Array.from(row.querySelectorAll('td')).map(cell=> cell.innerText))
        doc.autoTable({
            head:[headersUjian],
            body:rowsUjian,
            styles:{
                fillColor: [255, 255, 255],  
                textColor: [0, 0, 0], 
                lineColor: [0, 0, 0],
                fontSize:10,
                halign : 'center'  
            },
            headStyles: {
                fillColor: [255, 255, 255],  // Header background color
                textColor: [0, 0, 0],  // Header text color
            },
            tableLineColor: [0, 0, 0],
            tableLineWidth: 0.1,
            startY: y+15,
            margin: {left: 10 , bottom:10,right:10}
        })
        // doc.text("Jadwal Ujian",10,y)
        // doc.text(capture,20,20)
        setLoader(false)
        doc.save(`testing file`)
    }


    return (
        <div>
            <button className='float-left btn border-none text-white bg-green-700 hover:bg-green-800 mt-5 mx-3' onClick={handleChange} disabled={!statusConflict===false}>
                {statusConflict?(<span className= "text-white">Jadwal Bentrok</span>):(<span>Cetak PDF</span>)}</button>
            <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle"></input>
            <div className="overflow-auto modal  modal-middle">
                <div className="my-5 lg:scale-100 p-10 rounded-xl bg-white text-black">
                    <div className="actual-receipt">
                        <div className="m-10 px-10">
                            <Image className=" w-60 h-18 float-right myImage" src={logoifunpar.src} priority sizes='(max-width: 350px)' width={350} height={24}  alt="logoIfUnpar"/>
                            <h1 className="my-2 text-xl font-bold">Hasil Simulasi FRS</h1>
                            <h1 className="my-2 text-xl font-bold">Nama : {session?.user?.name}</h1>
                            <h1 className="my-2 text-xl font-bold">NPM : {session?.user?.email.substring(0,10)}</h1>
                            <p className=" mt-3 mr-5 text-sm">Total SKS : {jadwalMahasiswa.totalSKS}</p>
                            <p className=" text-sm">Dibuat pada tanggal : {currentTime.toLocaleDateString('id-ID', options)}</p>
                                <h1 className="my-2 text-left text-xl ">Jadwal Kuliah</h1>
                                <table className="text-sm w-full border border-collapse border-black text-center kuliah">
                                    <thead>
                                        <tr className='bg-white text-black'>
                                                <th className='p-2'>No</th>
                                                <th className='p-2'>Nama Mata Kuliah</th>
                                                <th className='p-2'>Hari</th>
                                                <th className='p-2'>Jam Mulai</th>
                                                <th className='p-2'>Jam Selesai</th>
                                                <th className='p-2'>Kelas</th>
                                                <th className='p-2'>Sesi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {jadwalMahasiswa.children.map((jadwalMahasiswa, index)=>(
                                            <tr  key={index} className=''>
                                                <td className=" font-semibold p-1">{index+1}</td>
                                                <td className=" font-semibold p-1">{jadwalMahasiswa.namaMataKuliah}</td>
                                                <td className=" font-semibold p-1">{jadwalMahasiswa.hari}</td>
                                                <td className=" font-semibold p-1">{jadwalMahasiswa.jam_mulai}</td>
                                                <td className=" font-semibold p-1">{jadwalMahasiswa.jam_selesai}</td>
                                                <td className=" font-semibold p-1" >{jadwalMahasiswa.kelas}</td>
                                                <td className=" font-semibold p-1" >{jadwalMahasiswa.sesi}</td>
                                            </tr>
                                    ))}
                                    </tbody>
                                </table>
                                <h1 className="my-2 text-left text-xl  mt-5">Jadwal ujian</h1>
                                <table className='text-sm w-full border border-collapse border-black text-center ujian'>
                                <thead>
                                    <tr className='text-black'>
                                        <th className='p-2'>No</th>
                                        <th className='p-2'>Nama Mata Kuliah</th>
                                        <th className='p-2'>Tanggal UTS</th>
                                        <th className='p-2'>Waktu Mulai UTS</th>
                                        <th className='p-2'>Waktu Selesai UTS</th>
                                        <th className='p-2'>Tanggal UAS</th>
                                        <th className='p-2'>Waktu Mulai UAS</th>
                                        <th className='p-2'>Waktu Selesai UAS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {jadwalMahasiswa.jadwalUjian.map((jadwalUjian, index)=>(
                                        <tr  key={index}>
                                            <td className=" font-semibold p-1">{index+1}</td>
                                            <td className=" font-semibold p-1">{jadwalUjian.namaMataKuliah}</td>
                                            <td className=" font-semibold p-1">{jadwalUjian.formatteduts}</td>
                                            <td className=" font-semibold p-1">{jadwalUjian.jam_mulai_uts}</td>
                                            <td className=" font-semibold p-1">{jadwalUjian.jam_selesai_uts}</td>
                                            <td className=" font-semibold p-1">{jadwalUjian.formatteduas}</td>
                                            <td className=" font-semibold p-1">{jadwalUjian.jam_mulai_uas}</td>
                                            <td className=" font-semibold p-1">{jadwalUjian.jam_selesai_uas}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <div className=" flex-col float-right">
                                
                            </div>
                            
                        </div>
                        
                    </div>
                    
                    <button className="btn btn-primary bg-cyan-700 text-white border-none mx-4" 
                    onClick={downloadPDF}
                    disabled={!(loader===false)}
                    > 
                    {loader?(<span>Sedang mengunduh</span>):(<span>Unduh</span>)}
                    </button>
                    <button className="btn btn-primary bg-cyan-700 text-white border-none" onClick={handleChange}>Tutup</button>
                </div>
            </div>
        </div>
    )
}