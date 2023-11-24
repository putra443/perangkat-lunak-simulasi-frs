import LayoutAdmin from '../layoutAdmin'
import AddMataKuliah from './addMataKuliah';
import UpdateMataKuliah from './updateMataKuliah';
import DeleteMataKuliah from './deleteMataKuliah';
import CsvUpload from './csvUpload';
import SearchBar from './searchBar';
import bg from '../../assets/background_unpar.jpg'


async function getMataKuliah(){
    const res = await fetch('http://localhost:3000/api/homeAdmin',{cache:'no-store'})
    const result = await res.json();
    return result
}

export default async function HomeAdmin(){
    const mataKuliah = await getMataKuliah()
    return(
        <div className="flex overflow-y-scroll overflow-x-hidden min-h-screen flex-col items-center px-20 text-center bg-cover bg-center h-screen" style={{backgroundImage: `url(${bg.src})`}}>
            <LayoutAdmin/>
            <div className='flex flex-col px-20 w-screen h-max  bg-gradient-to-br from-teal-500'>
                <div className="rounded-2xl flex flex-col text-left mt-10 text-xl" >
                    <p className='text-4xl text-white'>Selamat Datang di Perangkat Lunak Simulasi FRS</p>
                    <p className='text-l text-white bg-cyan-600 rounded-2xl p-2 m-5 w-1/6 text-center'> Kelola Mata kuliah</p>
                    <AddMataKuliah/>
                    <CsvUpload/>
                    <div className='w-2/5 mt-3 mb-3'>
                        {/* <SearchBar></SearchBar> */}
                    </div>
                    <div className='overflow-scroll no-scrollbar'>
                        <table className='mb-10 table text-center mt-5 rounded-2xl bg-gray-200'>
                        <thead>
                            <tr className='bg-cyan-600 text-white'>
                                <th className='p-5'>No</th>
                                <th className='p-5'>Nama Mata Kuliah</th>
                                <th className='p-5'>Hari</th>
                                <th className='p-5'>Jam Mulai</th>
                                <th className='p-5'>Jam Selesai</th>
                                <th className='p-5'>Kelas</th>
                                <th className='p-5'>Sesi</th>
                                <th className='p-5'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        {mataKuliah.map((mataKuliah, index)=>(
                            <tr  key={mataKuliah.idJadwalMataKuliah}>
                                <td className=" font-semibold">{index+1}</td>
                                <td className=" font-semibold" >{mataKuliah.namaMataKuliah}</td>
                                <td className=" font-semibold" >{mataKuliah.hari}</td>
                                <td className=" font-semibold" >{mataKuliah.jam_mulai}</td>
                                <td className=" font-semibold" >{mataKuliah.jam_selesai}</td>
                                <td className='font-semibold' >{mataKuliah.kelas}</td>
                                <td className='font-semibold' >{mataKuliah.sesi}</td>
                                <td className=" font-semibold pt-3 pb-3" key={mataKuliah.idJadwalMataKuliah}>
                                    <UpdateMataKuliah {...mataKuliah}></UpdateMataKuliah>
                                    <DeleteMataKuliah {...mataKuliah}/>
                                </td>

                            </tr>
                        ))}
                        </tbody>
                        </table>
                    </div>
                    
                </div>
                
            </div>            
        </div>
    )
}