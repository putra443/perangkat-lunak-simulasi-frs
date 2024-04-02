import bg from '../../assets/background_unpar.jpg'
import LayoutAdmin from '../layoutAdmin'
import DeleteUjian from '../jadwalUjian/deleteJadwalUjian'
import UpdateUjian from '../jadwalUjian/UpdateJadwalUjian'
import AddJadwalUjian from '../homeAdmin/addJadwalUjian'
import DeleteAllUjian from './deleteAllUjian'
import CsvUploadUjian from './csvUploadUjian'
import format from 'date-fns'

async function getJadwalUjian(){
    const res = await fetch('http://localhost:3000/api/homeAdmin/ujian',{cache:'no-store'});
    const result = await res.json()
    return result
}

async function getNamaMataKuliah (){
    const res = await fetch('http://localhost:3000/api/homeAdmin/ujianAdd',{cache:'no-store'})
    const result = await res.json();
    return result
}

export default async function Simulasi(){
    const jadwalUjian = await getJadwalUjian()
    const namaMataKuliah = await getNamaMataKuliah()
    // console.log(jadwalUjian);
    // const ujian = await getJadwalUjian()
    // const dataMaster = await getJadwalMaster()
    // console.log(mataKuliah);
    return(
        <main className="flex overflow-y-auto overflow-x-hidden min-h-screen max-h-content flex-col items-center px-20 text-center bg-auto bg-center" style={{backgroundImage: `url(${bg.src})`}}>
           <LayoutAdmin/>
            <div className='flex flex-col lg:px-20 px-5 w-screen min-h-screen max-h-content bg-gradient-to-br from-sky-500'>
                <div className="rounded-2xl flex flex-col text-left mt-10 text-xl" >
                    <p className='text-xl  text-white mt-5 bg-sky-600 lg:w-1/5 text-center p-3 rounded-2xl'>Jadwal Ujian</p>
                    <div className='flex flex-col text-left'>
                        <AddJadwalUjian>{...namaMataKuliah}</AddJadwalUjian>
                        <CsvUploadUjian></CsvUploadUjian>
                        <DeleteAllUjian/>
                    </div>
                    
                    <div className='overflow-scroll no-scrollbar rounded-xl'>
                        <table className='rounded-2xl table text-center mt-5 bg-gray-200'>
                            <thead>
                                <tr className='bg-sky-600 text-white'>
                                    <th className='p-5'>No</th>
                                    <th className='p-5'>Nama Mata Kuliah</th>
                                    <th className='p-5'>Tanggal UTS</th>
                                    <th className='p-5'>Waktu Mulai UTS</th>
                                    <th className='p-5'>Waktu Selesai UTS</th>
                                    <th className='p-5'>Tanggal UAS</th>
                                    <th className='p-5'>Waktu Mulai UAS</th>
                                    <th className='p-5'>Waktu Selesai UAS</th>
                                    <th className='p-5'>Edit/Hapus</th>
                                </tr>
                            </thead>
                            <tbody>
                                {jadwalUjian.map((jadwalUjian, index)=>(
                                    <tr  key={index}>
                                        <td className=" font-semibold">{index+1}</td>
                                        <td className=" font-semibold">{jadwalUjian.namaMataKuliah}</td>
                                        <td className=" font-semibold">{jadwalUjian.formatteduts}</td>
                                        <td className=" font-semibold">{jadwalUjian.jam_mulai_uts}</td>
                                        <td className=" font-semibold">{jadwalUjian.jam_selesai_uts}</td>
                                        <td className='font-semibold'>{jadwalUjian.formatteduas}</td>
                                        <td className='font-semibold'>{jadwalUjian.jam_mulai_uas}</td>
                                        <td className=" font-semibold pt-3 pb-3">{jadwalUjian.jam_selesai_uas}</td>
                                        <td>
                                            <DeleteUjian {...jadwalUjian}/>
                                            <UpdateUjian {...jadwalUjian}/>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>                 
                    </div>
                </div>
            </div>
        </main>
    )
        
}