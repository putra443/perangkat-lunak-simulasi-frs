import bg from '../../assets/background_unpar.jpg'
import LayoutAdmin from '../layoutAdmin'
import DeleteUjian from './components/deleteJadwalUjian'
import UpdateUjian from './components/UpdateJadwalUjian'
import AddJadwalUjian from './components/addJadwalUjian'
import DeleteAllUjian from './components/deleteAllUjian'
import CsvUploadUjian from './components/csvUploadUjian'


export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

async function getJadwalUjian(){
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/homeAdmin/ujian`,{cache:'no-store'});
    const result = await res.json()
    return result
}

async function getNamaMataKuliah (){
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/homeAdmin/ujianAdd`,{cache:'no-store'})
    const result = await res.json();
    return result
}

export default async function Simulasi(){
    const jadwalUjian = await getJadwalUjian()
    const namaMataKuliah = await getNamaMataKuliah()
    return(
        <main className="flex overflow-y-auto overflow-x-hidden min-h-screen max-h-content flex-col items-center px-20 text-center bg-auto bg-center" style={{backgroundImage: `url(${bg.src})`}}>
           <LayoutAdmin/>
            <div className='flex flex-col lg:px-20 px-5 w-screen min-h-screen max-h-content bg-gradient-to-br from-sky-500 pb-5'>
                <div className="rounded-2xl flex flex-col text-left mt-10 text-xl" >
                    <p className='text-l  text-white mt-5 bg-sky-600 lg:w-1/6 text-center p-3 rounded-2xl'>Kelola Jadwal Ujian</p>
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
                                {jadwalUjian[0]!=null ? (
                                jadwalUjian.map((jadwalUjian, index)=>(
                                    <tr  key={jadwalUjian?.idUjian} className='hover:text-indigo-700 transition-all'>
                                        <td className=" font-semibold">{index+1}</td>
                                        <td className=" font-semibold">{jadwalUjian.namaMataKuliah}</td>
                                        <td className=" font-semibold">{jadwalUjian.formatteduts}</td>
                                        <td className=" font-semibold">{jadwalUjian.jam_mulai_uts}</td>
                                        <td className=" font-semibold">{jadwalUjian.jam_selesai_uts}</td>
                                        <td className='font-semibold'>{jadwalUjian.formatteduas}</td>
                                        <td className='font-semibold'>{jadwalUjian.jam_mulai_uas}</td>
                                        <td className=" font-semibold pt-3 pb-3">{jadwalUjian.jam_selesai_uas}</td>
                                        <td>
                                            <UpdateUjian {...jadwalUjian}></UpdateUjian>
                                            <DeleteUjian {...jadwalUjian}/>
                                        </td>
                                    </tr>
                                ))) :
                                (<tr className='hover:text-indigo-700 transition-all font-semibold text-l'><td colSpan={9} className=' text-center'>Belum ada jadwal</td></tr>)
                            }
                            </tbody>
                        </table>                 
                    </div>
                </div>
            </div>
        </main>
    )
        
}