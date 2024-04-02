'use client'
import { useState, useEffect } from "react"
import { useSession } from 'next-auth/react';
import html2canvas from "html2canvas";
import html2canvaspro from 'html2canvas-pro'
import jsPDF from "jspdf";
import logoifunpar from '@/assets/logoifunpar3.png'


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

    const downloadPDF = () => {
        const capture = document.querySelector('.actual-receipt')
        setLoader(true)
        html2canvaspro(capture).then((canvas)=>{
            const imgData = canvas.toDataURL('img/png',1)
            const doc = new jsPDF('p','mm','a4')
            const componentWidth = 208
            const componentHeight = canvas.height * componentWidth / canvas.width
            doc.addImage(imgData,'PNG',0,0,componentWidth,componentHeight)
            setLoader(false)
            doc.save(`SimulasiFRS-${session?.user?.name}.pdf`)
        })
    
    }


    return (
        <div>
            <button className='float-left btn border-none text-white bg-green-700 hover:bg-green-800 mt-5 mx-3' onClick={handleChange} disabled={!statusConflict===false}>
                {statusConflict?(<span>Jadwal Bentrok</span>):(<span>Cetak PDF</span>)}</button>
            <input type="checkbox" checked={modal} onChange={handleChange} className="modal-toggle"></input>
            <div className="overflow-auto modal  modal-middle">
                <div className="my-5 lg:scale-100 p-10 rounded-xl bg-white text-black">
                    <div className="actual-receipt">
                        <div className="m-10">
                            <img className=" w-78 h-24 float-right" src={logoifunpar.src} alt="logoIfUnpar"></img>
                            <h1 className="my-4 text-xl font-bold">Hasil Simulasi FRS</h1>
                            <h1 className="my-4 text-xl font-bold">Nama : {session?.user?.name}</h1>
                            <h1 className="my-4 text-xl font-bold">NPM : {session?.user?.email.substring(0,10)}</h1>
                                <h1 className="my-2 border-black text-center text-xl font-bold">Jadwal Kuliah</h1>
                                <table className="table text-center">
                                    <thead>
                                        <tr className='bg-white text-black'>
                                                <th className='p-5'>No</th>
                                                <th className='p-5'>Nama Mata Kuliah</th>
                                                <th className='p-5'>Hari</th>
                                                <th className='p-5'>Jam Mulai</th>
                                                <th className='p-5'>Jam Selesai</th>
                                                <th className='p-5'>Kelas</th>
                                                <th className='p-5'>Sesi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {jadwalMahasiswa.children.map((jadwalMahasiswa, index)=>(
                                            <tr  key={index} className=''>
                                                <td className=" font-semibold">{index+1}</td>
                                                <td className=" font-semibold">{jadwalMahasiswa.namaMataKuliah}</td>
                                                <td className=" font-semibold">{jadwalMahasiswa.hari}</td>
                                                <td className=" font-semibold">{jadwalMahasiswa.jam_mulai}</td>
                                                <td className=" font-semibold">{jadwalMahasiswa.jam_selesai}</td>
                                                <td className='font-semibold' >{jadwalMahasiswa.kelas}</td>
                                                <td className='font-semibold' >{jadwalMahasiswa.sesi}</td>
                                            </tr>
                                    ))}
                                    </tbody>
                                </table>
                                <h1 className="my-2 border-black text-center text-xl font-bold">Jadwal ujian</h1>
                                <table className='table text-center'>
                                <thead>
                                    <tr className='text-black'>
                                        <th className='p-5'>No</th>
                                        <th className='p-5'>Nama Mata Kuliah</th>
                                        <th className='p-5'>Tanggal UTS</th>
                                        <th className='p-5'>Waktu Mulai UTS</th>
                                        <th className='p-5'>Waktu Selesai UTS</th>
                                        <th className='p-5'>Tanggal UAS</th>
                                        <th className='p-5'>Waktu Mulai UAS</th>
                                        <th className='p-5'>Waktu Selesai UAS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {jadwalMahasiswa.jadwalUjian.map((jadwalUjian, index)=>(
                                        <tr  key={index}>
                                            <td className=" font-semibold">{index+1}</td>
                                            <td className=" font-semibold">{jadwalUjian.namaMataKuliah}</td>
                                            <td className=" font-semibold">{jadwalUjian.formatteduts}</td>
                                            <td className=" font-semibold">{jadwalUjian.jam_mulai_uts}</td>
                                            <td className=" font-semibold">{jadwalUjian.jam_selesai_uts}</td>
                                            <td className='font-semibold'>{jadwalUjian.formatteduas}</td>
                                            <td className='font-semibold'>{jadwalUjian.jam_mulai_uas}</td>
                                            <td className=" font-semibold pt-3 pb-3">{jadwalUjian.jam_selesai_uas}</td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <p className="float-right mt-5 text-sm">Dibuat pada tanggal : {currentTime.toLocaleDateString('id-ID', options)}</p>
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